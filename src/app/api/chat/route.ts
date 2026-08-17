import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { CHAT_SYSTEM_PROMPT } from '@/lib/chatSystemPrompt'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

const MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 512
const MAX_MESSAGE_LENGTH = 1000
const MAX_HISTORY_TURNS = 8 // paires user/assistant

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, maxRequests: 10 }

const FALLBACK_MESSAGE =
  "Je ne suis pas disponible pour le moment. Vous pouvez utiliser le parcours guidé ci-dessus ou notre formulaire de contact — nous répondons sous 24h."

const chatRequestSchema = z.object({
  message: z.string().min(1, 'Message vide').max(MAX_MESSAGE_LENGTH, 'Message trop long'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(MAX_MESSAGE_LENGTH),
      }),
    )
    .max(MAX_HISTORY_TURNS * 2)
    .optional()
    .default([]),
})

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

/**
 * Circuit breaker en mémoire : si l'API Anthropic échoue plusieurs fois de
 * suite, on coupe temporairement les appels (réponse de repli immédiate) au
 * lieu de laisser chaque visiteur attendre un timeout et de multiplier les
 * requêtes vouées à échouer pendant un incident amont.
 */
const CIRCUIT_FAILURE_THRESHOLD = 3
const CIRCUIT_OPEN_MS = 60 * 1000
let consecutiveFailures = 0
let circuitOpenUntil = 0

function isCircuitOpen(): boolean {
  return Date.now() < circuitOpenUntil
}

function recordSuccess() {
  consecutiveFailures = 0
}

function recordFailure() {
  consecutiveFailures += 1
  if (consecutiveFailures >= CIRCUIT_FAILURE_THRESHOLD) {
    circuitOpenUntil = Date.now() + CIRCUIT_OPEN_MS
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (isRateLimited('chat-llm', ip, RATE_LIMIT)) {
    return NextResponse.json(
      { error: 'Trop de questions envoyées. Réessayez dans quelques minutes, ou utilisez le parcours guidé.' },
      { status: 429 },
    )
  }

  if (!anthropic || isCircuitOpen()) {
    if (!anthropic) console.error('ANTHROPIC_API_KEY manquante — fallback LLM désactivé')
    return NextResponse.json({ reply: FALLBACK_MESSAGE })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = chatRequestSchema.safeParse(body)
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Données invalides'
    return NextResponse.json({ error: firstError }, { status: 400 })
  }

  const { message, history } = result.data
  // Défensif : le client plafonne déjà l'historique, on le retronque côté serveur.
  const trimmedHistory = history.slice(-MAX_HISTORY_TURNS * 2)

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature: 0.3,
      system: CHAT_SYSTEM_PROMPT,
      messages: [...trimmedHistory, { role: 'user', content: message }],
    })

    recordSuccess()

    const reply = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim()

    return NextResponse.json({ reply: reply || FALLBACK_MESSAGE })
  } catch (error) {
    recordFailure()
    console.error('Anthropic API error:', error)
    return NextResponse.json({ reply: FALLBACK_MESSAGE })
  }
}
