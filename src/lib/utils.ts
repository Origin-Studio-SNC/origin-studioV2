import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-CH', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/** Payload `liveUrl` / liens externes : trim + `https://` si protocole absent */
export function normalizeExternalHref(raw: string | null | undefined): string | null {
  const t = typeof raw === 'string' ? raw.trim() : ''
  if (!t) return null
  if (/^https?:\/\//i.test(t)) return t
  return `https://${t}`
}
