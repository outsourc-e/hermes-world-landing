// Cloudflare Pages Function: POST /api/game-auth/check-password
// Verifies a typed game password against the live game DB (via VPS bridge) for the
// signed-in Supabase identity. Used by the launcher's enter-password prompt so a
// typo (or a "new" password typed into the wrong box) is caught BEFORE being stored.

export interface Env {
  BRIDGE_URL?: string;
  BRIDGE_SHARED_SECRET?: string;
}

const DEFAULT_BRIDGE_URL = 'https://play.hermes-world.ai/play/web';
const DEFAULT_BRIDGE_SHARED = '2db20ce0d15715ed2c61bbe567410d357e264eba17bddb21';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: { jwt?: string; password?: string } = {};
    try { body = await request.json(); } catch { /* empty */ }
    if (!body?.jwt || !body?.password) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    let bridgeBase = env.BRIDGE_URL || DEFAULT_BRIDGE_URL;
    if (bridgeBase.includes('bridge.hermes-world.ai')) bridgeBase = DEFAULT_BRIDGE_URL;
    const sharedSecret = env.BRIDGE_SHARED_SECRET || DEFAULT_BRIDGE_SHARED;
    const r = await fetch(`${bridgeBase}/check-password`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-bridge-shared': sharedSecret },
      body: JSON.stringify({ jwt: body.jwt, password: body.password }),
    });
    const txt = await r.text();
    return new Response(txt, { status: r.status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' } });
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
