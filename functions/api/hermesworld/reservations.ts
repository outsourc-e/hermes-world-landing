// Cloudflare Pages Function: HermesWorld name reservations
// GET  /api/hermesworld/reservations           → { ok, count }
// POST /api/hermesworld/reservations           → { ok, reservation: { desiredName, normalizedName, confirmationToken } }

interface Env {
  HERMESWORLD_SUPABASE_URL: string
  HERMESWORLD_SUPABASE_SERVICE_ROLE_KEY: string
  HERMESWORLD_RESERVED_NAMES?: string
}

const NAME_PATTERN = /^[A-Za-z0-9_]{3,20}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WALLET_PATTERN = /^[A-Za-z0-9:_-]{6,120}$/

const DEFAULT_RESERVED = new Set([
  'admin','administrator','system','support','moderator','mod','gm',
  'hermes','apollo','athena','artemis','nike','eros','zeus','hera',
  'poseidon','ares','dionysus','hephaestus','demeter','aphrodite',
  'root','staff','team','official','test','null','undefined',
])

const PROFANITY = ['shit','fuck','bitch','cunt','nigger','fag','slut','whore']

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })

const normalize = (raw: string) => raw.trim().toLowerCase().replace(/_+/g, '_')

function validateInput(body: any, env: Env) {
  const desiredName = String(body?.desiredName ?? '').trim()
  const email = String(body?.email ?? '').trim().toLowerCase()
  const wallet = body?.wallet ? String(body.wallet).trim() : null

  if (!desiredName) throw { status: 400, message: 'Name is required.' }
  if (!NAME_PATTERN.test(desiredName))
    throw {
      status: 400,
      message: 'Name must be 3-20 characters, letters/numbers/underscores only.',
    }
  if (!email || !EMAIL_PATTERN.test(email))
    throw { status: 400, message: 'Valid email is required.' }
  if (wallet && !WALLET_PATTERN.test(wallet))
    throw { status: 400, message: 'Wallet format is invalid.' }

  const normalizedName = normalize(desiredName)

  // Reserved + profanity check
  const extraReserved = (env.HERMESWORLD_RESERVED_NAMES || '')
    .split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  const reserved = new Set([...DEFAULT_RESERVED, ...extraReserved])
  if (reserved.has(normalizedName))
    throw { status: 409, message: 'That name is reserved.' }

  for (const p of PROFANITY) {
    if (normalizedName.includes(p))
      throw { status: 409, message: 'That name is not allowed.' }
  }

  return { desiredName, normalizedName, email, wallet }
}

async function supaFetch(env: Env, path: string, init: RequestInit = {}) {
  const url = (env.HERMESWORLD_SUPABASE_URL || '').replace(/\/$/, '')
  const key = env.HERMESWORLD_SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw { status: 500, message: 'Reservation backend not configured.' }
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      prefer: 'return=representation',
      ...(init.headers || {}),
    },
  })
}

function token(): string {
  const arr = new Uint8Array(24)
  crypto.getRandomValues(arr)
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('')
}

// GET — counter
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const res = await supaFetch(
      env,
      'name_reservations?select=id',
      { method: 'HEAD', headers: { prefer: 'count=exact' } },
    )
    if (!res.ok) {
      const text = await res.text()
      return json({ ok: false, error: text || 'Lookup failed.' }, 500)
    }
    const range = res.headers.get('content-range') || '0-0/0'
    const count = Number(range.split('/').pop()) || 0
    return json({ ok: true, count })
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'Server error' }, e?.status || 500)
  }
}

// POST — claim
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const ct = request.headers.get('content-type') || ''
    if (!ct.includes('application/json'))
      return json({ ok: false, error: 'Content-Type must be application/json.' }, 415)

    const body = await request.json().catch(() => null)
    const validated = validateInput(body, env)
    const confirmationToken = token()

    const insertRes = await supaFetch(env, 'name_reservations', {
      method: 'POST',
      body: JSON.stringify({
        desired_name: validated.desiredName,
        normalized_name: validated.normalizedName,
        email: validated.email,
        wallet_address: validated.wallet,
        confirmation_token: confirmationToken,
      }),
    })

    if (insertRes.status === 409) {
      return json({ ok: false, error: 'That name is already reserved.' }, 409)
    }
    if (!insertRes.ok) {
      const text = await insertRes.text()
      // Try to parse PostgREST error for unique violation
      if (text.includes('duplicate key') || text.includes('unique')) {
        return json({ ok: false, error: 'That name is already reserved.' }, 409)
      }
      return json({ ok: false, error: text || 'Reservation failed.' }, 500)
    }

    return json({
      ok: true,
      reservation: {
        desiredName: validated.desiredName,
        normalizedName: validated.normalizedName,
        confirmationToken,
      },
    })
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'Server error' }, e?.status || 500)
  }
}
