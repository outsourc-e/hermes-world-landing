# HermesWorld Landing Page Revamp

A single long-scroll landing page that mirrors the reference mockup and brand card you uploaded — cinematic, mythic, dark with gold accents, "where invisible progress becomes play."

## Design Direction

Pulled directly from your brand card:

- **Palette**: Midnight `#0F1622`, Obsidian `#0A0D12`, Slate `#182433`, Stone `#5A6F7E`, Gold `#F1C46D`, Bronze `#B68A4A`, Parchment `#F4E9D1`, Verdigris `#2E6B5E`
- **Typography**: Instrument Serif for display headlines (substituting for Canela), Inter for UI/body
- **Tone**: Mythic, cinematic, game-native. Glow accents, sigil/caduceus motifs, radial rings, constellation lines as decorative graphic elements
- **Imagery**: Use the existing zone art from hermes-world.ai (`/assets/hermesworld/zones/zone-1..6.jpg`) plus the world hub hero
- **Treatment**: Dark gradients, soft gold glows, thin gold borders on cards, subtle starfield/particles in hero and CTA bands

## Page Sections (top → bottom)

1. **Sticky Nav** — HermesWorld wordmark + caduceus sigil, "Preview Build" pill, links (World, Agents, Sigils, Preview, Updates), "Watch Preview" + gold "Enter HermesWorld" CTAs
2. **Hero** — Left: kicker "HERMES WORKSPACE EXPERIMENT // PERSISTENT AGENT RPG", massive serif headline "Your AI workspace is becoming a world." (last word in gold), subcopy, gold + ghost CTAs, fine print. Right: framed "Live World Preview" mock window using the Agora hero image with floating HUD chips (Zone, Companions, Sigils, minimap, quest-update card, party legend)
3. **Feature Strip** — Six icon+label+blurb cells in a single bordered band: Trending Build, Live Multiplayer Relay, 6 Launch Zones, Agent Companions, Persistent Profiles, Hermes Sigils
4. **The World Map** — Section header "Six zones. One persistent agent world." + six zone cards (Training Grounds, Forge, Agora, Grove, Oracle, Arena), each with art, colored zone tag, name, tagline, description, sigil footer
5. **Humans + Agents** — Two-column: left = headline "Your agents live in the world with you." + 3 feature rows (Agent Companions, Future Agent Takeover, Offline Progression); right = "Your Party" mock panel (Atlas/Forge/Oracle cards with status pills) and "Agent Console" terminal-style log
6. **World Verbs** — Pill row: `move_to`, `talk_to`, `equip`, `travel`, `attack`, `loot`, `rest`, `craft`, `inspect`, `accept_quest`, `complete_quest` + caption "Readable game verbs. Real agent behavior underneath."
7. **Hermes Sigils** — Bordered band with large glowing sigil medallion centered between copy and a 2x2 grid (Unlocks, Cosmetics, Agent Progression, Quests). Includes the "not financial advice" disclaimer
8. **Final CTA** — Full-bleed cinematic vista background with "Build with agents in a world, not a chat box." panel, gold "Enter the World" + ghost "Watch Preview" buttons, fine print
9. **Footer** — Stacked logo + tagline, link columns (Enter World, Watch Preview, Hermes Workspace, Updates, Terms, Privacy), social icons (X, Discord, YouTube, GitHub), Sigils disclaimer

## Interaction & Polish

- Smooth scroll between sections (still a single route, sections have anchor IDs for nav)
- Hover lift + gold border glow on zone/sigil cards
- Subtle entrance fades on scroll (intersection observer)
- Animated terminal lines in Agent Console
- Gold gradient underline accents under section headers
- Fully responsive: hero stacks, six-up grids collapse to 2-up then 1-up

## Technical Notes

- Single TanStack route at `/` (`src/routes/index.tsx`) with section components in `src/components/landing/`
- Brand tokens added to `src/styles.css` (gold, bronze, parchment, midnight, obsidian, slate, stone, verdigris) wired into Tailwind theme
- Instrument Serif + Inter loaded via Google Fonts in `__root.tsx` head
- Update root `head()` with HermesWorld title, description, og tags
- Reuse zone images from the live site via direct URLs (no upload needed); caduceus sigil rendered as inline SVG so it can glow/animate
- No backend, no auth, no DB — pure marketing page
