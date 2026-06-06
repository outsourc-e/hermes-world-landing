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
}

// VPS-local provision endpoint base (path /provision is appended below).
const DEFAULT_BRIDGE_URL = 'https://play.hermes-world.ai/play/web';
const DEFAULT_BRIDGE_SHARED = '2db20ce0d15715ed2c61bbe567410d357e264eba17bddb21';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: { jwt?: string } = {};
    try { body = await request.json(); } catch { /* empty or invalid body */ }
    if (!body?.jwt) {
      return new Response(JSON.stringify({ error: 'missing_jwt' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
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
