# Architecture Decisions, Open Questions and Risk Register

## Decisions
ADR-001: HomelandAI owns the parent brand; default establishment is T.O.P, but tenant settings can change venue branding.
ADR-002: Supabase PostgreSQL/Auth/Storage/Edge Functions/Realtime is the single canonical backend. Firebase references are historical prototype vocabulary; use an adapter only if justified later.
ADR-003: React/TypeScript/Vite is initial frontend; mobile-first PWA before separate native applications.
ADR-004: Twitch and Maestro are distribution channels; T.O.P controls app identity, voting, consent and loyalty data.
ADR-005: Cookbook cards are ordinary digital collectibles and entitlement records, not NFTs or tradable financial assets by default.
ADR-006: Taste testers and community voters do not operate unsafe equipment.
ADR-007: NCRD Gateway provides discovery and approved links first; deeper integration follows separate API and privacy reviews.
ADR-008: AUKI venue AR is optional and must degrade to QR/mobile menu flows.
ADR-009: No unrelated prize-distribution document or cash gaming system included.

## Open questions to resolve in Phase 0
- Final rooftop property, hosting jurisdiction, opening dates and local food regulations.
- Languages, accessibility standards, local/remote eligibility and minimum age.
- Which streaming subscription entitlements are verifiable on each platform?
- VIP tiers/prices and whether sponsorship inventory is included.
- Whether and how saved Instagram recipes may legally be imported or embedded.
- Staff capacity for up to eight tasters, video releases, dish preparation and food safety.
- Auth provider choices and whether NCRD identity will be shared.
- Approved external AUKI SDK/product capabilities and physical domain mapping.
- Final music/performance rights and recording/republication permissions.

## Risks and mitigation
| Risk | Severity | Mitigation / Owner |
|---|---|---|
| Rooftop venue safety, weather, power and cooking fire | Critical | local engineers/venue operator signoff, contingency kitchen, extinguishing/egress plan |
| Allergic reaction or cross-contact | Critical | documented allergen matrix, trained kitchen staff, disclosure process, refusal authority |
| Video/image consent and participant privacy | High | granular opt-in, restricted storage, removal workflow, release logs |
| Unlicensed third-party social recipes/media | High | keep source links/attribution, verify permission, remove noncompliant imports |
| Claims of brand sponsorship without agreement | High | separate illustrative products from active signed campaigns |
| Abusive/duplicate voting or loyalty inflation | High | server authority, CAPTCHA/rate limits, idempotency, anti-fraud reviews |
| Cross-tenant data exposure | Critical | RLS, role tests, storage policies, audit trails |
| Stream outage/provider restrictions | Medium | video placeholder, QR fallback, local recording, reconnect and cancellation plan |
| Unrealistic 5,000-vote threshold early stage | Medium | configurable threshold; never guarantee audience size |
| Cost/scope ballooning | High | MVP scope freeze, weekly review, feature flags and cut-line |
| AR tracking failures | Medium | QR/web fallback and staged compatibility testing |
| Premium design compromising accessibility | Medium | text contrast, motion controls, keyboard QA, responsive UX |

Review the risks weekly until initial public launch. Each risk needs named accountable staff assigned before implementation.
