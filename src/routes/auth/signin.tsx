import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/signin")({
  head: () => ({
    meta: [
      { title: "Sign In — HermesWorld" },
      {
        name: "description",
        content: "Sign in to HermesWorld with Google OAuth or an email magic link.",
      },
    ],
  }),
  component: SignInRoute,
});

function SignInRoute() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return `${window.location.origin}/account`;
  }, []);

  async function signInWithGoogle() {
    if (!isSupabaseConfigured) return;
    setStatus(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) setStatus(error.message);
    setSubmitting(false);
  }

  async function sendMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;
    setStatus(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    });

    setStatus(error ? error.message : "Magic link sent. Check your inbox to enter HermesWorld.");
    setSubmitting(false);
  }

  const disabled = !isSupabaseConfigured || submitting;
  const disabledTitle = !isSupabaseConfigured ? "auth coming soon" : undefined;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#5d3d16_0%,#15110b_46%,#050504_100%)] px-6 py-12 text-parchment">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2rem] border border-gold/30 bg-obsidian/80 shadow-[0_34px_100px_-44px_rgba(241,197,109,0.55)] backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-gold/20 bg-[linear-gradient(145deg,rgba(246,217,138,0.18),rgba(5,5,4,0.2))] p-8 md:border-b-0 md:border-r">
            <Link
              to="/"
              className="text-xs font-bold uppercase tracking-[0.25em] text-gold/75 hover:text-gold"
            >
              HermesWorld
            </Link>
            <h1 className="mt-10 font-display text-5xl leading-tight text-gold md:text-6xl">
              Claim your place in the world.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-parchment/72">
              Sign in now, wire Supabase later. Founder profiles, vault rewards, and account
              identity are staged behind the auth flag.
            </p>
            <div className="mt-8 rounded-xl border border-gold/20 bg-black/20 p-4 text-xs leading-6 text-parchment/65">
              {!isSupabaseConfigured ? (
                <span>
                  Auth is disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided.
                </span>
              ) : (
                <span>
                  Auth is live. Google OAuth and email magic links will redirect back to your
                  account.
                </span>
              )}
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-3xl text-gold">Sign In</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-parchment/50">
                  Google OAuth or magic link
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={disabled}
              title={disabledTitle}
              onClick={signInWithGoogle}
              className="flex w-full items-center justify-center rounded-md border border-gold bg-gradient-to-r from-[#F6D98A] via-[#E8B85C] to-[#B68A4A] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-obsidian shadow-[0_8px_26px_-10px_rgba(241,197,109,0.85)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55"
            >
              Continue with Google
            </button>

            <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-parchment/40">
              <span className="h-px flex-1 bg-gold/20" />
              or
              <span className="h-px flex-1 bg-gold/20" />
            </div>

            <form onSubmit={sendMagicLink} className="space-y-4">
              <label
                className="block text-xs font-bold uppercase tracking-[0.18em] text-gold/80"
                htmlFor="email"
              >
                Email magic link
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/55" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  disabled={!isSupabaseConfigured}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@domain.com"
                  title={disabledTitle}
                  className="w-full rounded-md border border-gold/25 bg-black/35 px-10 py-3 text-sm text-parchment outline-none placeholder:text-parchment/35 focus:border-gold disabled:cursor-not-allowed disabled:opacity-55"
                />
              </div>
              <button
                type="submit"
                disabled={disabled || !email}
                title={disabledTitle}
                className="w-full rounded-md border border-parchment/20 bg-parchment/8 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-parchment transition hover:bg-parchment/12 disabled:cursor-not-allowed disabled:opacity-55"
              >
                Send Magic Link
              </button>
            </form>

            {status && (
              <p className="mt-5 rounded-md border border-gold/20 bg-gold/10 p-3 text-sm text-parchment/78">
                {status}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
