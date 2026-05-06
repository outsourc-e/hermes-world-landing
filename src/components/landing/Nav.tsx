import { Link } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { LogOut, Play, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

const links = [
  { label: "World", href: "#world" },
  { label: "Agents", href: "#agents" },
  { label: "Sigils", href: "#sigils" },
  { label: "Preview", href: "#preview" },
  { label: "Updates", href: "#updates" },
];

export function Nav() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  const avatarUrl = session?.user.user_metadata?.avatar_url as string | undefined;
  const displayName =
    (session?.user.user_metadata?.full_name as string | undefined) ||
    session?.user.email ||
    "Account";

  return (
    <header className="sticky top-0 z-50 bg-obsidian/95 backdrop-blur-xl border-b border-gold/25 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[80px] flex items-center">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold/40 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/hermesworld/art/hermesworld-logo-h.png"
              alt="HermesWorld"
              width={48}
              height={48}
              className="relative h-11 w-11 lg:h-12 lg:w-12 rounded-full object-cover ring-1 ring-gold/40 drop-shadow-[0_0_18px_rgba(241,197,109,0.55)]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="font-display font-bold tracking-tight text-[22px] lg:text-[26px] bg-gradient-to-b from-[#FFFBE9] via-[#F5D97A] to-[#C89C2A] bg-clip-text text-transparent"
              style={{ letterSpacing: "0.01em" }}
            >
              HermesWorld
            </span>
            <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.28em] text-gold/70 font-body font-bold mt-1.5">
              Persistent Agent RPG
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 ml-10 lg:ml-16 text-[13px] lg:text-[14px] font-body font-medium text-parchment/75">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 flex-none">
          {session ? (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-gold/35 bg-parchment/5 px-2 py-1.5 text-xs font-semibold text-parchment transition hover:border-gold/60"
                aria-label="Open account menu"
              >
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gold/35 bg-gold/10 text-gold">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <UserRound className="h-4 w-4" />
                  )}
                </span>
                <span className="hidden max-w-28 truncate lg:inline">{displayName}</span>
              </button>
              <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-gold/25 bg-obsidian/95 p-2 opacity-0 shadow-[0_18px_48px_-18px_rgba(0,0,0,0.85)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <Link
                  to="/account"
                  className="block rounded-lg px-3 py-2 text-sm text-parchment/78 transition hover:bg-gold/10 hover:text-gold"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-parchment/78 transition hover:bg-gold/10 hover:text-gold"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth/signin"
              className="inline-flex items-center gap-1.5 text-[10px] lg:text-[11px] uppercase tracking-[0.1em] font-body font-bold px-3 lg:px-4 py-2 rounded-md border border-gold/45 bg-gold/10 text-gold hover:bg-gold/15 transition-all whitespace-nowrap"
            >
              Sign In
            </Link>
          )}
          <a
            href="https://hermes-world.ai/play/"
            className="hidden md:inline-flex items-center gap-1.5 text-[10px] lg:text-[11px] uppercase tracking-[0.1em] font-body font-bold px-3 lg:px-5 py-2 lg:py-2.5 rounded-md border border-gold bg-gradient-to-r from-[#F6D98A] via-[#E8B85C] to-[#B68A4A] text-obsidian hover:brightness-110 transition-all whitespace-nowrap shadow-[0_4px_16px_-4px_rgba(241,196,109,0.5)]"
          >
            <Diamond /> Enter the World <Diamond />
          </a>
          <a
            href="#preview"
            className="hidden lg:inline-flex items-center gap-2 text-[10px] lg:text-[11px] uppercase tracking-[0.1em] font-body font-semibold px-3 lg:px-4 py-2 rounded-md bg-parchment/5 border border-parchment/30 text-parchment hover:bg-parchment/10 transition-colors whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Watch Preview
          </a>
        </div>
      </div>
    </header>
  );
}

function Diamond() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className="text-gold/60" fill="currentColor">
      <polygon points="4,0 8,4 4,8 0,4" />
    </svg>
  );
}
