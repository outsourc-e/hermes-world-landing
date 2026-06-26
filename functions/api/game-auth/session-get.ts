// Cloudflare Pages Function: GET /api/game-auth/session-get?session=<code>
// The native client polls this with its session code. When the browser has stored creds
// (via session-put), this returns them ONCE and deletes the slot. Otherwise returns pending.
//
// One-time semantics: first successful read deletes the KV slot so creds can't be replayed.

export interface Env {
  GAME_AUTH_SESSIONS?: KVNamespace;
}

const SESSION_RE = /^[A-Za-z0-9_-]{24,128}$/;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'cache-control': 'no-store',
    },
  });
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!env.GAME_AUTH_SESSIONS) return json({ error: 'kv_not_configured' }, 500);
    const url = new URL(request.url);
    const session = String(url.searchParams.get('session') || '');
    if (!SESSION_RE.test(session)) return json({ error: 'bad_session' }, 400);

    const key = `sess:${session}`;
    const raw = await env.GAME_AUTH_SESSIONS.get(key);
    if (!raw) return json({ status: 'pending' });

    // One-time: delete before returning so it can't be replayed.
    await env.GAME_AUTH_SESSIONS.delete(key);
    let data: any = {};
    try { data = JSON.parse(raw); } catch { return json({ status: 'pending' }); }
    return json({ status: 'ready', username: data.username, gamePassword: data.gamePassword });
  } catch (err: any) {
    return json({ error: 'session_get_failed', message: String(err?.message || err) }, 500);
  }
};

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,OPTIONS',
      'access-control-allow-headers': 'content-type,authorization',
    },
  });
