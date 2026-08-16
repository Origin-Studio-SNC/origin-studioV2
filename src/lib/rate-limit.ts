/**
 * Limiteur de débit en mémoire, paramétrable par route (`namespace`) pour donner
 * un budget de requêtes distinct à chaque endpoint (ex. /api/contact vs /api/chat/lead).
 *
 * ⚠️ En mémoire process : suffisant pour une seule instance Node (Vercel functions
 * isolées y compris — chaque instance a son propre budget, ce qui est acceptable ici).
 */

type RateLimitOptions = {
  /** Fenêtre glissante, en millisecondes */
  windowMs: number
  /** Nombre de requêtes autorisées par fenêtre */
  maxRequests: number
}

const namespaces = new Map<string, Map<string, number[]>>()

function getBucket(namespace: string): Map<string, number[]> {
  let bucket = namespaces.get(namespace)
  if (!bucket) {
    bucket = new Map()
    namespaces.set(namespace, bucket)
  }
  return bucket
}

export function isRateLimited(namespace: string, key: string, options: RateLimitOptions): boolean {
  const { windowMs, maxRequests } = options
  const now = Date.now()
  const bucket = getBucket(namespace)
  const requests = bucket.get(key) ?? []
  const recentRequests = requests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    bucket.set(key, recentRequests)
    return true
  }

  recentRequests.push(now)
  bucket.set(key, recentRequests)
  return false
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown'
}
