// Cloudflare Pages Function: POST /api/game-auth/launch
// Browser is logged into Supabase, sends its JWT; we proxy to the VPS provision endpoint.
// Returns { username, gamePassword } that the WebGL/Win launcher can use.
//
// 2026-06-06: consolidated onto our ops (VPS). Provisioning now writes the LIVE game DB
// directly on the VPS (play.hermes-world.ai/play/web/provision), not the old
// Mac-Studio->PC1 bridge. Defaults below keep this working even if the CF dashboard
// env vars still point at the old bridge.

export interface Env {
  BRIDGE_URL?: string;            // optional override; default = VPS provision base
  BRIDGE_SHARED_SECRET?: string;  // shared header with bridge for origin check
  HERMESWORLD_SUPABASE_URL?: string;
  HERMESWORLD_SUPABASE_SERVICE_ROLE_KEY?: string;
}

// VPS-local provision endpoint base (path /provision is appended below).
const DEFAULT_BRIDGE_URL = 'https://play.hermes-world.ai/play/web';
const DEFAULT_BRIDGE_SHARED = '2db20ce0d15715ed2c61bbe567410d357e264eba17bddb21';

const normalizeUsername = (value: string) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .replace(/^_+|_+$/g, '')
    .slice(0, 24);

const trimForSuffix = (base: string, suffix: string) =>
  normalizeUsername(base || 'traveler').slice(0, Math.max(3, 24 - suffix.length));

function candidateBase(user: any) {
  const candidates = [
    user?.user_metadata?.preferred_username,
    user?.user_metadata?.user_name,
    user?.user_metadata?.full_name,
    user?.user_metadata?.name,
    user?.email?.split('@')?.[0],
    'traveler',
  ];
  for (const c of candidates) {
    const normalized = normalizeUsername(String(c || ''));
    if (normalized.length >= 3) return normalized;
  }
  return 'traveler';
}

async function supabaseRest(env: Env, path: string, init: RequestInit = {}) {
  const url = (env.HERMESWORLD_SUPABASE_URL || '').replace(/\/$/, '');
  const key = env.HERMESWORLD_SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('supabase_not_configured');
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

async function getSupabaseUser(env: Env, jwt: string) {
  const url = (env.HERMESWORLD_SUPABASE_URL || '').replace(/\/$/, '');
  const key = env.HERMESWORLD_SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return null;
  const res = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, authorization: `Bearer ${jwt}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function usernameAvailable(env: Env, username: string, currentUserId: string) {
  const res = await supabaseRest(
    env,
    `profiles?select=id,username&username=eq.${encodeURIComponent(username)}&limit=1`,
    { headers: { accept: 'application/json' } },
  );
  if (!res.ok) return false;
  const rows = await res.json() as any[];
  return rows.length === 0 || rows[0]?.id === currentUserId;
}

async function uniqueUsername(env: Env, base: string, currentUserId: string) {
  const normalizedBase = normalizeUsername(base || 'traveler') || 'traveler';
  if (await usernameAvailable(env, normalizedBase, currentUserId)) return normalizedBase;
  for (let i = 0; i < 30; i += 1) {
    const suffix = `_${Math.floor(1000 + Math.random() * 900000)}`;
    const candidate = `${trimForSuffix(normalizedBase, suffix)}${suffix}`;
    if (await usernameAvailable(env, candidate, currentUserId)) return candidate;
  }
  throw new Error('unique_username_failed');
}

async function ensureProfileUsername(env: Env, jwt: string) {
  if (!env.HERMESWORLD_SUPABASE_URL || !env.HERMESWORLD_SUPABASE_SERVICE_ROLE_KEY) return;
  const user = await getSupabaseUser(env, jwt);
  if (!user?.id) return;

  const currentRes = await supabaseRest(
    env,
    `profiles?select=id,username,display_name,avatar_url&id=eq.${encodeURIComponent(user.id)}&limit=1`,
    { headers: { accept: 'application/json' } },
  );
  const currentRows = currentRes.ok ? await currentRes.json() as any[] : [];
  if (currentRows[0]?.username) return;

  const username = await uniqueUsername(env, candidateBase(user), user.id);
  const payload = {
    id: user.id,
    username,
    display_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email || username,
    avatar_url: user.user_metadata?.avatar_url || null,
  };
  const upsertRes = await supabaseRest(env, 'profiles?on_conflict=id', {
    method: 'POST',
    headers: { prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(payload),
  });
  if (!upsertRes.ok) throw new Error(`profile_username_failed:${await upsertRes.text()}`);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: { jwt?: string } = {};
    try { body = await request.json(); } catch { /* empty or invalid body */ }
    if (!body?.jwt) {
      return new Response(JSON.stringify({ error: 'missing_jwt' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    // Make Play resilient: if the Supabase account has no profile username yet, assign
    // a unique one before provisioning so Google/display-name collisions never block launch.
    await ensureProfileUsername(env, body.jwt);

    // Force VPS endpoint unless an env override explicitly points elsewhere and is NOT the retired Studio bridge.
    let bridgeBase = env.BRIDGE_URL || DEFAULT_BRIDGE_URL;
    if (bridgeBase.includes('bridge.hermes-world.ai')) bridgeBase = DEFAULT_BRIDGE_URL; // retire old Studio->PC1 bridge
    const sharedSecret = env.BRIDGE_SHARED_SECRET || DEFAULT_BRIDGE_SHARED;
    const r = await fetch(`${bridgeBase}/provision`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-bridge-shared': sharedSecret,
      },
      body: JSON.stringify({ jwt: body.jwt }),
    });
    const txt = await r.text();
    return new Response(txt, {
      status: r.status,
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'bridge_unreachable', message: String(err?.message || err) }), { status: 502, headers: { 'content-type': 'application/json' } });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'content-type,authorization',
    },
  });
