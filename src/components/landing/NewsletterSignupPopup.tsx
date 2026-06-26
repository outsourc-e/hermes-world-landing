import { useEffect, useState } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const DISMISSED_KEY = "hw_newsletter_popup_dismissed";
const SUBSCRIBED_KEY = "hw_newsletter_popup_subscribed";
const DELAY_MS = 9000;
const SCROLL_RATIO = 0.35;

function hasSeenPopup() {
  if (typeof window === "undefined") return true;
  return (
    window.localStorage.getItem(DISMISSED_KEY) === "1" ||
    window.localStorage.getItem(SUBSCRIBED_KEY) === "1"
  );
}

export function NewsletterSignupPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasSeenPopup()) return;

    let triggered = false;
    const show = () => {
      if (triggered || hasSeenPopup()) return;
      triggered = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_RATIO) show();
    };

    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setOpen(false);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    if (!isSupabaseConfigured) {
      setStatus("error");
      setMessage("Signup is not configured in this local preview.");
      return;
    }

    const { error } = await supabase.from("newsletter_signups").insert({
      email: normalizedEmail,
      source: "landing_popup",
      metadata: {
        path: window.location.pathname,
        referrer: document.referrer || null,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message || "Could not save your signup. Try again in a minute.");
      return;
    }

    window.localStorage.setItem(SUBSCRIBED_KEY, "1");
    setStatus("success");
    setMessage("You're on the list. Watch for alpha updates from the Agora.");
    window.setTimeout(() => setOpen(false), 1800);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[90] flex justify-center pointer-events-none sm:bottom-6">
      <section className="pointer-events-auto w-full max-w-md rounded-2xl border border-gold/35 bg-obsidian/95 p-5 text-parchment shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold/80">
              Join the dispatch
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-gold">
              Get HermesWorld updates
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-parchment/20 px-2.5 py-1 text-xs text-parchment/70 transition hover:border-gold/50 hover:text-gold"
            aria-label="Dismiss newsletter signup"
          >
            ×
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-parchment/78">
          No spam. Just build updates, alpha windows, and the occasional dispatch from a world where
          agents have jobs.
        </p>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-xl border border-parchment/20 bg-black/30 px-4 py-3 text-sm text-parchment outline-none transition placeholder:text-parchment/35 focus:border-gold/60"
            autoComplete="email"
            required
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-xl border border-gold bg-gradient-to-r from-[#F6D98A] via-[#E8B85C] to-[#B68A4A] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-obsidian transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Joining..." : "Notify Me"}
          </button>
        </form>
        {message ? (
          <p
            className={`mt-3 text-sm ${status === "error" ? "text-red-300" : "text-emerald-300"}`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </section>
    </div>
  );
}
