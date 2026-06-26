// Cloudflare Pages Function: POST /api/game-auth/session-put
// The browser (after Google login + /api/game-auth/launch) stores the resolved game creds
// in a short-TTL, one-time slot keyed by a high-entropy session code that the native client
// generated. The native client then polls /api/game-auth/session-get to retrieve them once.
//
// Security: session must be a long random string (>=24 chars). Slot TTL is short. Creds are
// never logged. The slot is deleted on first successful get. HTTPS only (Pages).

export interface Env {
  GAME_AUTH_SESSIONS?: KVNamespace; // KV binding (wrangler.toml)
}

const SESSION_RE = /^[A-Za-z0-9_-]{24,128}$/;
const TTL_SECONDS = 180; // 3 min window to return to the app

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!env.GAME_AUTH_SESSIONS) return json({ error: 'kv_not_configured' }, 500);
    let body: { session?: string; username?: string; gamePassword?: string } = {};
    try { body = await request.json(); } catch { /* ignore */ }
    const session = String(body?.session || '');
    const username = String(body?.username || '');
    const gamePassword = String(body?.gamePassword || '');
    if (!SESSION_RE.test(session)) return json({ error: 'bad_session' }, 400);
    if (!username || !gamePassword) return json({ error: 'missing_creds' }, 400);

    // Store one-time. Value carries creds + a not-yet-read flag.
    await env.GAME_AUTH_SESSIONS.put(
      `sess:${session}`,
      JSON.stringify({ username, gamePassword, putAt: Date.now() }),
      { expirationTtl: TTL_SECONDS },
    );
    return json({ ok: true });
  } catch (err: any) {
    return json({ error: 'session_put_failed', message: String(err?.message || err) }, 500);
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
