# T.O.P by HAI — Master Implementation Plan
Version: 1.0 | Status: Planning baseline | Owner: HomelandAI

## Vision and scope
Taste of Paradise (T.O.P by HAI) is a family-led tropical rooftop culinary test kitchen plus a website/app for discovering, developing, voting on and testing innovative recipes. Weekly live broadcasts combine cooking, 3–4 two-person reaction groups, chef/host interactions, locally invited audiences and sponsor-enabled signature drops. Core motto: **Cook. Vote. Collect.**

### Outcomes
1. Establish a beautiful accessible website and mobile-first PWA.
2. Catalog current and future recipes, including credited social-source bookmarks.
3. Publish rotating signature breakfast, lunch, dinner, dessert and savory collections.
4. Convert local interest into consented taste-testing applications and RSVP attendance.
5. Provide reliably moderated live polling, staged cook-along progression and remote participation.
6. Operate a transparent, ledger-backed loyalty and digital cookbook unlock system.
7. Measure sponsor campaigns, local engagement, conversion and content retention.
8. Provide NCRD (North Coast RD Live) discovery gateway and optional AUKI location experiences.
9. Make brand, menus, currencies, language and policy settings configurable per establishment.

## Scope boundaries and principles
- An idea/prompt/render is **not** a tested or approved menu item. Track states: idea, research, bench-test, approved, scheduled, available, archived.
- All current sample viewership, availability, sponsors, claimed partnerships and recipe images are examples unless verified.
- Recipe imports store links, creator attribution and authorized metadata. Do not copy protected social media content or private posts without authorization.
- Unverified product brands are marked *illustrative ingredient reference*, not sponsored partnerships.
- Store minors' personal data only if explicitly supported by a reviewed safety and consent policy; MVP signups are adults-only.
- No cash-prize or paid-lottery system; the unrelated prize document is out of scope.
- All cooking safety decisions, heat settings, allergies and food handling remain under qualified staff control. Audience 'heat' votes influence engagement UI, not hazardous physical heating operations.
- Accessible, mobile-first, bilingual-ready (English and Dominican Spanish), venue-aware, security-by-default.

## Operating model and release trains
MVP-A (public discovery): Phases 0–3, with visual menu, discoverable recipes and working administrator controls.
MVP-B (local participation): Phase 4, with registration, waitlist, consent, RSVPs and filmed reaction workflow.
Beta-C (interactive show): Phases 5–6, with verified voting, live stream companion and Cookbook collectibles.
Public V1: Phase 7–9, with sponsor campaigns, NCRD integration, QA, analytics and live venue pilot.

## Phases, deliverables, dependencies and exit gates
| Phase | Goal | Deliverables | Dependencies | Exit criteria |
|---|---|---|---|---|
| P0 Discovery & governance | freeze scope and decision log | PRD, personas, journey maps, risk register, licenses, success metrics, backlog | none | product owner approves MVP scope and acceptance tests |
| P1 Design & asset system | build visual foundation | Figma-style token spec, mobile/tablet/desktop layouts, HAI/NCRD brand pack, copy and image licensing inventory | P0 | approved responsive prototypes and WCAG review |
| P2 Platform foundation | establish secure skeleton | React/TypeScript/Vite app, routing, Supabase migrations, Auth, role/RLS policies, Storage, Edge Functions, CI, preview environments | P0/P1 | CI green; security smoke tests pass; repeatable deploy |
| P3 Recipe and menu systems | publish real content | recipe CRUD, source attribution, versions, media approval, search/filter, collection/season/drop publishing, edit-establishment settings | P2 | seeded signed-off collections; filters and edit lifecycle pass |
| P4 Taste tester operations | recruit local guests | application + waitlist, consent, food-allergy handling, venue RSVP/QR check-in, scheduling, releases, reaction ingestion | P2/P3 | end-to-end invite/check-in/withdrawal works |
| P5 Live production & voting | link show and audience | Twitch/Maestro link/embeds, production event controls, Sear Stage, Menu Lab, moderated votes, stream delay awareness, outage fallback | P2–P4 | two complete dry-run shows with auditable results |
| P6 Loyalty / VIP / Cookbook | reward participation | ledger, tiers, entitlements, digital recipe cards, user gallery, unlock rules, abuse controls | P3/P5 | reward issuance idempotent and privilege tests pass |
| P7 Sponsorship & NCRD | commercial and local ecosystem | sponsor campaigns, disclosure tags, coupons/metrics, NCRD gateway, optionally AUKI venue QR/domain pilot | P3–P6 | campaign reporting works; external gateway tested |
| P8 Hardening and pilot | make reliable | accessibility, performance, security, privacy, disaster recovery, permissions, integration tests, live rehearsal | all core | signed go/no-go checklist and incident runbook |
| P9 Release and iteration | operate and improve | rollout, analytics dashboard, support queue, weekly releases, feedback backlog, content operations | P8 | operational owner accepts handover |

## Feature inventory
### Signature food collections
- Signature Seared Cakes + Crumble Bowls; Paradise Bars / flash-fried mousse-filled dippers; Paradise Shells / tropical madeleines; Island Tarts / scratch-made pop-tarts; T.O.P Cups; T.O.P Linzer Tart collections; T.O.P Crepes; Signature Burnt Ends; gourmet franks and rotating experimental recipes.
- Seed featured flavors accurately from the dedicated source menus, keeping the published final sweets and savory lists separate from exploratory ideas.
- Culinary metadata: base technique, flavor variants, dip/glaze, allergens, alcohol content flag, skill level, origin/credit, test status, cooking time, availability, seasonal dates, photography, clips.
- Display *seasonal rotation*, limited drops, fan-voted winners, VIP previews, creator collaboration drops and educational ingredient stories.

### App and website surfaces
Public: homepage with scroll headers, food galleries, signature menu, filters, recipe vault, chef and reaction clips, watch live, upcoming event schedule, sponsor disclosure, social icons and links, NCRD gateway.
Authenticated: polls, saved recipes, comment/moderation, taste tester signup, waitlist and RSVP, digital collections, loyalty, VIP access.
Staff: content CMS, creator attribution, release approvals, live stage controls, vote window admin, ingredient constraints, waitlist operations, media permissions, sponsor CMS, analytics.
Platform owner: tenant/establishment settings, roles, audit log, integrations and secret management.

### Live content execution
- Pre-show food preview and local signups; recipe introduction; host cooks; PREP→HEAT→SEAR→REST→PLATE; live ingredient IN/OUT matrix; flavor-profile ring; 3–4 pairs of tasters (availability-dependent); audience reaction vs trained palate notes; result reveal; cookbook candidate and clip production.
- Cook controls stage; poll clock and event timestamps are server authoritative.
- 5,000-vote target is configurable and never implies recipe approval. Review and safety gates still apply.
- Maestro for curated owned experience and possible gated features; Twitch for public reach/chat; integrations must respect current provider policies and embed requirements.
- AUKI overlays only when validated against actual SDK capabilities and venue mapping; browser/QR fallback for unsupported devices.

## Metrics and reporting
North-star: weekly returning qualified participants who watch, vote, save, taste or submit feedback.
Acquisition: social→site conversion, local vs remote signup, NCRD referral visits.
Engagement: live sessions, unique authenticated voters, votes/session, 7/30-day retention, recipe saves, repeat visits.
Operations: waitlist application→invite→RSVP→attendance, no-show, consent withdrawal time, recipe bench-test pass.
Content: clip conversion, average viewer watch time by provider where available, reaction performance, completed cookbook unlocks.
Commerce: disclosed sponsor impressions, clicked links, redeemed offers; VIP conversion/churn.
Quality: uptime, p95 load, vote duplication rate, permission failures, error rate, accessibility findings.
Each KPI has owner, definition, segmentation and dashboard query; do not manufacture audience figures.

## Critical dependencies and choices
- Canonical backend: Supabase PostgreSQL, Auth, RLS, Edge Functions, Realtime and Storage.
- User's prior prompt referred to Firebase Realtime. Document it as optional adapter only; do not deploy both canonical authorities.
- External stream platform authorization and embed rights are prerequisites for live overlays.
- Local Dominican Republic venue licensing, food handling, emergency plan, electrical/weather readiness and guest capacity require local professional verification before in-person opening.
- App loyalty and contests require jurisdiction-specific review; no purchase-required sweepstakes are assumed.
- Schedule estimates in planning docs are indicative; gated milestones are more important than calendar dates.

## Work breakdown rules
Every issue requires: outcome, scope, dependencies, acceptance criteria, test proof, definition of done, priority (P0/P1/P2) and target phase. PRs reference an issue. No 'complete' without merged implementation, passing checks, screenshots for UI and operational signoff for venue workflows.

## Change control
Maintain docs/project/DECISIONS.md and risk register. New providers or paid features require impact review for cost, data, permissions and rollback. Do not silently substitute providers. Product owner approves scope changes.
