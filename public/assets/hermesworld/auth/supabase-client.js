import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

// IMPORTANT: vanity domain hermesworld.supabase.co is NOT provisioned (NXDOMAIN). Keep the real project URL.
// Anon key payload "ref":"gwcdgbbbsykfhgnlfzxs" confirms this is the correct host.
const SUPABASE_URL = 'https://gwcdgbbbsykfhgnlfzxs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y2RnYmJic3lrZmhnbmxmenhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMDE2NDcsImV4cCI6MjA4NTU3NzY0N30.LlXFUR2H9SE6SViXLoPQw_yYm2DGBx2zmw0ayZyykbQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // We exchange the code manually inside /auth/callback/. Keeping this true
    // races with our manual exchangeCodeForSession() and produces
    // "Auth session missing!" because the code is consumed twice.
    detectSessionInUrl: false,
    flowType: "pkce",
  },
});

export function normalizeUsername(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "")
    .slice(0, 24);
}

export function suggestUsername(user) {
  const candidates = [
    user?.user_metadata?.preferred_username,
    user?.user_metadata?.user_name,
    user?.user_metadata?.full_name,
    user?.user_metadata?.name,
    user?.email?.split("@")[0],
  ];

  for (const candidate of candidates) {
    const normalized = normalizeUsername(candidate || "");
    if (normalized.length >= 3) return normalized;
  }

  return "traveler";
}

function trimForSuffix(base, suffix) {
  return normalizeUsername(base || "traveler").slice(0, Math.max(3, 24 - suffix.length));
}

export async function isUsernameAvailable(username, currentUserId = null) {
  const normalized = normalizeUsername(username);
  if (normalized.length < 3) return false;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', normalized)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') throw error;
  return !data || (currentUserId && data.id === currentUserId);
}

export async function generateUniqueUsername(base, currentUserId = null) {
  const normalizedBase = normalizeUsername(base || "traveler") || "traveler";
  if (await isUsernameAvailable(normalizedBase, currentUserId)) return normalizedBase;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const suffix = `_${Math.floor(1000 + Math.random() * 9000)}`;
    const candidate = `${trimForSuffix(normalizedBase, suffix)}${suffix}`;
    if (await isUsernameAvailable(candidate, currentUserId)) return candidate;
  }

  const cryptoObj = globalThis.crypto;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    let n = Math.floor(100000 + Math.random() * 900000);
    if (cryptoObj?.getRandomValues) {
      const arr = new Uint32Array(1);
      cryptoObj.getRandomValues(arr);
      n = 100000 + (arr[0] % 900000);
    }
    const suffix = `_${n}`;
    const candidate = `${trimForSuffix(normalizedBase, suffix)}${suffix}`;
    if (await isUsernameAvailable(candidate, currentUserId)) return candidate;
  }

  throw new Error('Could not find an available username.');
}

export function authRedirectTo() {
  return window.location.origin + '/auth/callback';
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: authRedirectTo() },
  });
}

export async function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({
    email: (email || '').trim(),
    password: password || '',
  });
}

export async function signUpWithEmail(email, password) {
  return supabase.auth.signUp({
    email: (email || '').trim(),
    password: password || '',
    options: { emailRedirectTo: authRedirectTo() },
  });
}

export async function sendPasswordReset(email) {
  return supabase.auth.resetPasswordForEmail((email || '').trim(), {
    redirectTo: authRedirectTo(),
  });
}

export async function exchangeCodeFromCurrentUrl() {
  const href = window.location.href;
  let response = await supabase.auth.exchangeCodeForSession(href);

  if (response?.error) {
    const code = new URL(href).searchParams.get('code');
    if (code) {
      const fallback = await supabase.auth.exchangeCodeForSession(code);
      if (!fallback?.error) return fallback;
    }
  }

  return response;
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data?.session || null;
}

export async function getCurrentUser() {
  // Check session first so we never throw AuthSessionMissingError to callers.
  const session = await getCurrentSession();
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data?.user || null;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return { user: null, profile: null };

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, created_at')
    .eq('id', user.id)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') throw error;

  return { user, profile: data || null };
}

export async function reserveUsername(username) {
  const { user } = await getCurrentProfile();
  if (!user) throw new Error('No authenticated user');

  const normalized = normalizeUsername(username);
  if (normalized.length < 3) throw new Error('Username must be at least 3 characters');

  const payload = {
    id: user.id,
    username: normalized,
    display_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email || normalized,
    avatar_url: user.user_metadata?.avatar_url || null,
  };

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select('id, username, display_name, avatar_url, created_at')
    .single();

  if (error) throw error;
  return data;
}

export async function reserveUniqueUsername(preferredUsername) {
  const { user } = await getCurrentProfile();
  if (!user) throw new Error('No authenticated user');

  const preferred = normalizeUsername(preferredUsername || suggestUsername(user));
  let lastError = null;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = attempt === 0
      ? await generateUniqueUsername(preferred, user.id)
      : await generateUniqueUsername(`${preferred}_${Math.floor(1000 + Math.random() * 9000)}`, user.id);
    try {
      return await reserveUsername(candidate);
    } catch (error) {
      lastError = error;
      if (error?.code !== '23505') throw error;
    }
  }

  throw lastError || new Error('Could not reserve a unique username.');
}

export async function getDestination() {
  // Signed-in users go through the SSO launch flow: it provisions their game account
  // (VPS) and redirects into the V1 web client already logged in -> straight to
  // character selection, no second login screen. (v0 prototype retired.)
  return '/play-webgl/launch.html';
}

export async function signOut() {
  return supabase.auth.signOut();
}
