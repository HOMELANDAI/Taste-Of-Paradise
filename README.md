# Taste of Paradise — T.O.P by HAI

**Taste of Paradise (T.O.P by HAI)** is a HomelandAI culinary innovation concept built around a luxury rooftop tropical test kitchen, live streaming, community recipe voting, signature menu drops, sponsor-ready food collaborations, taste tester participation, and collectible HAI Cookbook recipe cards.

The core idea: **Cook. Vote. Collect.**

This repository organizes the concept in a normal GitHub-ready format with documentation, image prompts, website/app build prompts, seed data, backend schema notes, and visual assets.

---

## Repository Structure

```text
.
├── README.md
├── .gitignore
├── docs/
│   ├── concept-overview.md
│   ├── brand-guide.md
│   ├── signature-menu.md
│   ├── live-ui-systems.md
│   ├── recipe-database.md
│   ├── gamification-loyalty.md
│   ├── sponsor-ready-system.md
│   ├── ncrd-gateway.md
│   ├── twitch-maestro-analysis.md
│   └── implementation-roadmap.md
├── prompts/
│   ├── app-prompts/
│   │   ├── base44-application-prompt.md
│   │   ├── google-gemini-application-prompt.md
│   │   └── google-gemini-website-prompt.md
│   └── image-prompts/
│       ├── app-icons-and-social.md
│       ├── rooftop-test-kitchen.md
│       ├── top-cups.md
│       ├── linzer-tarts.md
│       ├── burnt-ends.md
│       └── menu-posters.md
├── data/
│   ├── menu-collections.json
│   ├── seed-recipes.json
│   ├── badges.json
│   ├── sponsors.json
│   └── establishment-settings.json
├── backend/
│   ├── schema.sql
│   ├── firestore-structure.md
│   └── api-endpoints.md
├── src/
│   ├── App.jsx
│   ├── styles.css
│   └── data/seedData.js
└── assets/images/
```

---

## Core Product Pillars

1. **T.O.P Signature Menu** — premium rotating food collections including T.O.P Cups, Linzer Tarts, Burnt Ends, Seared Cakes, Paradise Bars, Paradise Shells, Island Tarts, and Crepes.
2. **Paradise Menu Lab** — live community recipe-building through ingredient voting and flavor-profile visualization.
3. **The Sear Stage** — live cooking interface with technique stages, heat votes, caramelization meter, and collectible recipe unlocks.
4. **Recipe Vault** — searchable database for current recipes with breakfast, lunch, dinner, desserts, sponsor, and visibility filters.
5. **Taste Tester Waitlist** — local and VIP participant signup system for filming reactions and testing fan-voted recipes.
6. **Sponsor-Ready Drops** — structured brand integrations for sauces, syrups, fruit farms, local rum, cacao, coffee, cookware, and more.
7. **NCRD Gateway** — portal linking T.O.P by HAI to North Coast RD Live for Dominican Republic North Coast discovery, events, tastings, venues, and rewards.

---

## Visual Identity

- Dark navy / near-black rooftop background
- Metallic gold typography
- Amber-copper heat glow
- Cyan accent lines
- Tropical palm and hibiscus motifs
- Parchment recipe cards
- Glossy food photography
- Premium Figma-inspired layouts

---

## Suggested Next Steps

1. Create a GitHub repository named `taste-of-paradise-top-by-hai`.
2. Upload this folder structure.
3. Add final image assets to `assets/images/`.
4. Use `prompts/app-prompts/google-gemini-website-prompt.md` in Google Gemini Studio.
5. Convert seed JSON into the target backend database.
6. Build a minimum viable website first: Home, Signature Menu, Recipe Vault, Taste Tester, Sponsor Page, NCRD Gateway.
