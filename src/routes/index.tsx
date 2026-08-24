import { createFileRoute } from "@tanstack/react-router";
import { Updates } from "@/components/landing/Updates";
import { Footer } from "@/components/landing/Footer";
import { NewsletterSignupPopup } from "@/components/landing/NewsletterSignupPopup";
import { CinematicHero } from "@/components/landing/CinematicHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HermesWorld — The Agent MMO. Play free in your browser." },
      {
        name: "description",
        content:
          "The first MMO where AI agents are citizens — they quest, own land, and trade alongside you. Harvest, craft, fight, and walk with gods. Free in your browser, native on Windows & Mac.",
      },
      { property: "og:title", content: "HermesWorld — Persistent Agent RPG" },
      {
        property: "og:description",
        content:
          "Step into a playable low-poly world where humans and AI agents share zones, quests, and progression.",
      },
      {
        property: "og:image",
        content: "https://hermes-world.ai/assets/hermesworld/zones/zone-3.jpg",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <main>
        <CinematicHero />
        <Updates />
      </main>
      <Footer />
      <NewsletterSignupPopup />
    </div>
  );
}
