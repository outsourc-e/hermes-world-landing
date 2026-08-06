// Cloudflare Pages Function: POST /api/game-auth/sync-password
// HW_PWSYNC_v1 (2026-08-06): unify website + game passwords.
// Called right after email sign-in/sign-up with the user's typed password.
// Bridge adopts it as the game password IF the account still has the derived
// secret (or stashes it as pending when the game account isn't provisioned yet).
// Never overwrites a custom game password.

export interface Env {
  BRIDGE_URL?: string;
  BRIDGE_SHARED_SECRET?: string;
}

const DEFAULT_BRIDGE_URL = 'https://play.hermes-world.ai/play/web';
const DEFAULT_BRIDGE_SHARED = '2db20ce0d15715ed2c61bbe567410d357e264eba17bddb21';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: { jwt?: string; password?: string } = {};
    try { body = await request.json(); } catch { /* empty or invalid body */ }
    if (!body?.jwt || !body?.password) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    let bridgeBase = env.BRIDGE_URL || DEFAULT_BRIDGE_URL;
    if (bridgeBase.includes('bridge.hermes-world.ai')) bridgeBase = DEFAULT_BRIDGE_URL;
    const sharedSecret = env.BRIDGE_SHARED_SECRET || DEFAULT_BRIDGE_SHARED;
    const r = await fetch(`${bridgeBase}/sync-password`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-bridge-shared': sharedSecret,
      },
      body: JSON.stringify({ jwt: body.jwt, password: body.password }),
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
