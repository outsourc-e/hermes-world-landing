// Cloudflare Pages Function: POST /api/game-auth/set-password
// User must be Supabase-authenticated. Pass their JWT and the new password.
// Bridge updates master.account.password (MD5).

export interface Env {
  BRIDGE_URL: string;
  BRIDGE_SHARED_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json<{ jwt?: string; newPassword?: string }>();
    if (!body?.jwt || !body?.newPassword) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    const r = await fetch(`${env.BRIDGE_URL}/set-password`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-bridge-shared': env.BRIDGE_SHARED_SECRET || '',
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
