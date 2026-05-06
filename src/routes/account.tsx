import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { Crown, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { type Profile, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — HermesWorld" },
      { name: "description", content: "Manage your HermesWorld profile and Founder Vault access." },
    ],
  }),
  component: AccountRoute,
});

function AccountRoute() {
  return (
    <AuthGuard>
      <AccountPanel />
    </AuthGuard>
  );
}

function AccountPanel() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadAccount() {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData.user;

      if (!mounted) return;
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (!mounted) return;
      setProfile(profileData);
      setLoading(false);
    }

    loadAccount();

    return () => {
      mounted = false;
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  function claimFounderVault() {
    if (!profile?.is_founder) return;
    setClaimStatus(
      "Founder Vault claim queued. Reward fulfillment unlocks when the Supabase project is provisioned.",
    );
  }

  const displayName =
    profile?.display_name || user?.user_metadata?.full_name || "HermesWorld Adventurer";
  const username = profile?.username ? `@${profile.username}` : "Username not set";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#503513_0%,#14100b_46%,#050504_100%)] px-6 py-10 text-parchment">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-[0.25em] text-gold/75 hover:text-gold"
          >
            HermesWorld
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-md border border-parchment/25 bg-parchment/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-parchment/75 transition hover:border-gold/45 hover:text-gold"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </header>

        <section className="overflow-hidden rounded-[2rem] border border-gold/30 bg-obsidian/82 shadow-[0_34px_100px_-44px_rgba(241,197,109,0.55)]">
          <div className="border-b border-gold/20 bg-[linear-gradient(145deg,rgba(246,217,138,0.16),rgba(5,5,4,0.05))] p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-gold/10 text-gold">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-9 w-9" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold/70">
                  Account
                </p>
                <h1 className="mt-2 font-display text-5xl text-gold">{displayName}</h1>
                <p className="mt-2 text-sm text-parchment/62">{username}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
            <InfoCard icon={<ShieldCheck className="h-5 w-5" />} label="Profile Status">
              {loading
                ? "Loading profile..."
                : profile
                  ? "Profile synced from Supabase."
                  : "Profile row not found yet."}
            </InfoCard>

            <InfoCard icon={<Crown className="h-5 w-5" />} label="Founder Status">
              {profile?.is_founder
                ? `Founder${profile.founder_rank ? ` #${profile.founder_rank}` : ""}`
                : "Not marked as founder"}
            </InfoCard>

            <div className="md:col-span-2 rounded-2xl border border-gold/20 bg-black/20 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl text-gold">Founder Vault</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-parchment/65">
                    Founder rewards are claimable only when your profile is flagged as founder. This
                    keeps the UI ready without blocking on credentials or reward fulfillment.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!profile?.is_founder}
                  onClick={claimFounderVault}
                  className="rounded-md border border-gold bg-gradient-to-r from-[#F6D98A] via-[#E8B85C] to-[#B68A4A] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-obsidian shadow-[0_8px_26px_-10px_rgba(241,197,109,0.85)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Claim Founder Vault
                </button>
              </div>
              {claimStatus && (
                <p className="mt-5 rounded-md border border-gold/20 bg-gold/10 p-3 text-sm text-parchment/78">
                  {claimStatus}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-black/20 p-5">
      <div className="mb-3 flex items-center gap-2 text-gold/80">
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="text-sm leading-6 text-parchment/72">{children}</p>
    </div>
  );
}
