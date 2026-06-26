import { readFileSync, existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const assertIncludes = (text, needle, label) => {
  if (!text.includes(needle)) {
    throw new Error(`${label}: missing ${needle}`);
  }
};

const hero = read("src/components/landing/Hero.tsx");
assertIncludes(hero, "Play as Guest", "hero guest CTA");
assertIncludes(hero, "/play/?guest=1", "hero guest CTA target");
assertIncludes(hero, "No account needed", "hero guest CTA helper copy");

const index = read("src/routes/index.tsx");
assertIncludes(index, "NewsletterSignupPopup", "landing route renders newsletter popup");

const newsletter = read("src/components/landing/NewsletterSignupPopup.tsx");
assertIncludes(newsletter, "newsletter_signups", "newsletter Supabase table");
assertIncludes(
  newsletter,
  "hw_newsletter_popup_dismissed",
  "newsletter once-per-visitor storage key",
);
assertIncludes(newsletter, "setTimeout", "newsletter delayed trigger");
assertIncludes(newsletter, "scroll", "newsletter scroll trigger");
assertIncludes(newsletter, "No spam. Just build updates", "newsletter non-annoying copy");

if (!existsSync(new URL("supabase/migrations/002_newsletter_signups.sql", root))) {
  throw new Error("newsletter migration: missing supabase/migrations/002_newsletter_signups.sql");
}

const migration = read("supabase/migrations/002_newsletter_signups.sql");
assertIncludes(
  migration,
  "create table if not exists public.newsletter_signups",
  "newsletter migration table",
);
assertIncludes(migration, "for insert", "newsletter migration anon insert policy");

console.log("landing quickwins checks passed");
