// Cloudflare Pages Function: POST /api/game-auth/set-password
// User must be Supabase-authenticated. Pass their JWT and the new password.
// Bridge updates master.account.password (MD5).

export interface Env {
  BRIDGE_URL?: string;
  BRIDGE_SHARED_SECRET?: string;
}

// VPS-local endpoint (consolidated onto our ops 2026-06-06).
const DEFAULT_BRIDGE_URL = 'https://play.hermes-world.ai/play/web';
const DEFAULT_BRIDGE_SHARED = '2db20ce0d15715ed2c61bbe567410d357e264eba17bddb21';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: { jwt?: string; newPassword?: string } = {};
    try { body = await request.json(); } catch { /* empty or invalid body */ }
    if (!body?.jwt || !body?.newPassword) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    let bridgeBase = env.BRIDGE_URL || DEFAULT_BRIDGE_URL;
    if (bridgeBase.includes('bridge.hermes-world.ai')) bridgeBase = DEFAULT_BRIDGE_URL;
    const sharedSecret = env.BRIDGE_SHARED_SECRET || DEFAULT_BRIDGE_SHARED;
    const r = await fetch(`${bridgeBase}/set-password`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-bridge-shared': sharedSecret,
      },
      body: JSON.stringify({ jwt: body.jwt, newPassword: body.newPassword }),
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
