import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

// Vanity subdomain — Google OAuth consent now shows "Continue to hermesworld.supabase.co"
const SUPABASE_URL = 'https://hermesworld.supabase.co';
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

  return "";
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

export async function getDestination() {
  const paths = ['/play/', '/dashboard/'];

  for (const path of paths) {
    try {
      const response = await fetch(path, { method: 'HEAD', cache: 'no-store' });
      if (response.ok) return path;
    } catch (error) {
      // ignore and continue
    }
  }

  return '/play/';
}

export async function signOut() {
  return supabase.auth.signOut();
}
