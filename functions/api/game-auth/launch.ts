// Cloudflare Pages Function: POST /api/game-auth/launch
// Browser is logged into Supabase, sends its JWT, we proxy to bridge.hermes-world.ai.
// Returns { username, gamePassword } that the WebGL/Win launcher can use.

export interface Env {
  BRIDGE_URL: string;            // e.g. https://bridge.hermes-world.ai
  BRIDGE_SHARED_SECRET: string;  // shared header with bridge for origin check
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: { jwt?: string } = {};
    try { body = await request.json(); } catch { /* empty or invalid body */ }
    if (!body?.jwt) {
      return new Response(JSON.stringify({ error: 'missing_jwt' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    const r = await fetch(`${env.BRIDGE_URL}/provision`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-bridge-shared': env.BRIDGE_SHARED_SECRET || '',
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
