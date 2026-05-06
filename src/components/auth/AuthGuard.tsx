import { Link } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian text-parchment">
        Opening the vault...
      </div>
    );
  }

  if (!session) {
    return fallback ?? <AuthRequired />;
  }

  return <>{children}</>;
}

function AuthRequired() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#4a3214_0%,#11100d_44%,#050504_100%)] px-6 py-20 text-parchment">
      <div className="mx-auto max-w-lg rounded-2xl border border-gold/35 bg-obsidian/80 p-8 text-center shadow-[0_24px_80px_-32px_rgba(241,197,109,0.45)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <h1 className="font-display text-4xl text-gold">Sign in required</h1>
        <p className="mt-3 text-sm leading-6 text-parchment/70">
          Your account page and Founder Vault claims unlock after HermesWorld auth is enabled.
        </p>
        <Link
          to="/auth/signin"
          className="mt-7 inline-flex rounded-md border border-gold bg-gradient-to-r from-[#F6D98A] via-[#E8B85C] to-[#B68A4A] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-obsidian shadow-[0_8px_26px_-10px_rgba(241,197,109,0.85)] transition hover:brightness-110"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
