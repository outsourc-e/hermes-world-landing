import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve your HermesWorld name" },
      {
        name: "description",
        content:
          "Claim your HermesWorld username before launch. Founders get exclusive starter gear, sigil drops, and early access.",
      },
      { property: "og:title", content: "Reserve your HermesWorld name" },
      {
        property: "og:description",
        content:
          "Claim your username before HermesWorld launches. Limited founder rewards for early reservers.",
      },
      { property: "og:image", content: "https://hermes-world.ai/assets/hermesworld/zones/zone-3.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReserveRoute,
});

type Counter = { loading: boolean; count: number; error: string | null };
type Submit =
  | { state: "idle"; message: string | null }
  | { state: "submitting"; message: string | null }
  | { state: "success"; message: string; reservation: { desiredName: string; normalizedName: string } }
  | { state: "error"; message: string };

function ReserveRoute() {
  const [desiredName, setDesiredName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [counter, setCounter] = useState<Counter>({ loading: true, count: 0, error: null });
  const [submit, setSubmit] = useState<Submit>({ state: "idle", message: null });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/hermesworld/reservations", { cache: "no-store" })
      .then(r => r.json())
      .then((d: { ok: boolean; count?: number; error?: string }) => {
        if (cancelled) return;
        if (d.ok) setCounter({ loading: false, count: d.count ?? 0, error: null });
        else setCounter({ loading: false, count: 0, error: d.error ?? "Counter unavailable." });
      })
      .catch(() => {
        if (cancelled) return;
        setCounter({ loading: false, count: 0, error: "Counter unavailable." });
      });
    return () => { cancelled = true; };
  }, []);

  const namePattern = useMemo(() => /^[A-Za-z0-9_]{3,20}$/, []);
  const nameValid = namePattern.test(desiredName);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmit({ state: "submitting", message: null });

    try {
      const res = await fetch("/api/hermesworld/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ desiredName, email, wallet: wallet || null }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setSubmit({
          state: "success",
          message: `${data.reservation.desiredName} is reserved.`,
          reservation: { desiredName: data.reservation.desiredName, normalizedName: data.reservation.normalizedName },
        });
        setDesiredName("");
        setCounter(c => ({ ...c, count: c.count + 1 }));
      } else {
        setSubmit({ state: "error", message: data?.error || "Reservation failed. Try again." });
      }
    } catch {
      setSubmit({ state: "error", message: "Network error. Try again." });
    }
  }

  return (
    <main className="min-h-screen bg-[#03080c] text-[#fff4dc] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-3 text-sm text-[#aab9b2] hover:text-[#fff4dc] transition-colors mb-8">
            ← Back to HermesWorld
          </a>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#f1c56d]/30 bg-[#f1c56d]/10 text-[#f1c56d] text-[10px] font-bold uppercase tracking-[0.22em]">
            Founder Reservations Open
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif leading-[0.95] tracking-tight mb-4">
            <span className="bg-gradient-to-b from-[#fffbe9] via-[#f5d97a] to-[#c89c2a] bg-clip-text text-transparent">
              Claim your name.
            </span>
          </h1>
          <p className="text-[#aab9b2] text-base leading-relaxed max-w-md mx-auto">
            HermesWorld launches soon. First reservers get founder gear, sigil drops, and early access to the world.
          </p>
          <div className="mt-6 text-xs uppercase tracking-[0.2em] text-[#aab9b2]">
            {counter.loading
              ? "loading reservations…"
              : counter.error
                ? `${counter.count.toLocaleString()} names reserved`
                : `${counter.count.toLocaleString()} ${counter.count === 1 ? "name" : "names"} reserved so far`}
          </div>
        </div>

        {submit.state === "success" ? (
          <div className="rounded-2xl border border-[#f1c56d]/40 bg-gradient-to-b from-[#0b1820] to-[#071318] p-8 text-center">
            <div className="text-5xl mb-4">🌙</div>
            <h2 className="font-serif text-3xl mb-3 bg-gradient-to-b from-[#fffbe9] to-[#c89c2a] bg-clip-text text-transparent">
              You're in.
            </h2>
            <p className="text-[#aab9b2] text-base leading-relaxed mb-6">
              <strong className="text-[#fff4dc]">{submit.reservation.desiredName}</strong> is reserved for you.
              We'll email you when HermesWorld opens for founders.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-b from-[#ffe6a4] via-[#e9aa3c] to-[#a95d18] text-[#160f07] font-bold text-sm border border-[#ffe5a8]/75 shadow-[0_22px_60px_rgba(244,166,54,0.25)]"
            >
              Back to HermesWorld
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#f1c56d]/20 bg-[#071318] p-6 sm:p-8">
            <div>
              <label htmlFor="desiredName" className="block text-xs font-bold uppercase tracking-[0.18em] text-[#c19c55] mb-2">
                Username
              </label>
              <input
                id="desiredName"
                type="text"
                required
                minLength={3}
                maxLength={20}
                pattern="[A-Za-z0-9_]{3,20}"
                value={desiredName}
                onChange={e => setDesiredName(e.target.value)}
                placeholder="Hermes_Trader"
                disabled={submit.state === "submitting"}
                className="w-full bg-[#03080c] border border-[#f1c56d]/20 rounded-lg px-4 py-3 text-[#fff4dc] placeholder-[#aab9b2]/50 focus:border-[#f1c56d]/60 focus:outline-none focus:ring-2 focus:ring-[#f1c56d]/20 transition-colors"
              />
              <p className="mt-1.5 text-[11px] text-[#aab9b2]/80">3-20 characters. Letters, numbers, underscores only.</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-[0.18em] text-[#c19c55] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={submit.state === "submitting"}
                className="w-full bg-[#03080c] border border-[#f1c56d]/20 rounded-lg px-4 py-3 text-[#fff4dc] placeholder-[#aab9b2]/50 focus:border-[#f1c56d]/60 focus:outline-none focus:ring-2 focus:ring-[#f1c56d]/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="wallet" className="block text-xs font-bold uppercase tracking-[0.18em] text-[#c19c55] mb-2">
                Wallet <span className="lowercase tracking-normal text-[#aab9b2]/70 font-normal">(optional)</span>
              </label>
              <input
                id="wallet"
                type="text"
                maxLength={120}
                value={wallet}
                onChange={e => setWallet(e.target.value)}
                placeholder="ETH or SOL address"
                disabled={submit.state === "submitting"}
                className="w-full bg-[#03080c] border border-[#f1c56d]/20 rounded-lg px-4 py-3 text-[#fff4dc] placeholder-[#aab9b2]/50 focus:border-[#f1c56d]/60 focus:outline-none focus:ring-2 focus:ring-[#f1c56d]/20 transition-colors"
              />
              <p className="mt-1.5 text-[11px] text-[#aab9b2]/80">Optional. Used for in-world prize drops.</p>
            </div>

            {submit.state === "error" && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submit.message}
              </div>
            )}

            <button
              type="submit"
              disabled={!nameValid || !emailValid || submit.state === "submitting"}
              className="w-full h-12 rounded-xl bg-gradient-to-b from-[#ffe6a4] via-[#e9aa3c] to-[#a95d18] text-[#160f07] font-bold text-sm border border-[#ffe5a8]/75 shadow-[0_22px_60px_rgba(244,166,54,0.25)] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:brightness-110"
            >
              {submit.state === "submitting" ? "Reserving…" : "Reserve my name"}
            </button>

            <p className="text-[11px] text-center text-[#aab9b2]/70 leading-relaxed">
              No password required. We'll email you when HermesWorld opens.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
