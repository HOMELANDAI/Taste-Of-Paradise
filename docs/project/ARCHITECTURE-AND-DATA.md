# Technical Architecture and Data Contract

## Reference architecture
React + TypeScript + Vite, responsive mobile-first PWA. Route-based feature modules, shared typed UI components, design tokens and internationalization foundation. Supabase: PostgreSQL (canonical data), Auth (users), RLS (isolation), Edge Functions (privileged writes, webhooks, vote submission, rewards), Realtime (stage and vote events), Storage (photos/videos/consent documents with separate access policies). Delivery via CI/CD with dev/staging/production environments. Use an explicit integration adapter for Twitch, Maestro.tv, social publishing and NCRD; provider access is not assumed.

## Tenancy
Every restaurant-scoped table has establishment_id. Roles are global platform_admin and tenant-scoped owner/admin/chef/content_editor/event_host/moderator/sponsor_manager plus public member. All authorization is based on server-issued membership records, not editable client claims. Users may belong to several establishments with different permissions. T.O.P is the first tenant; editing branding does not rename immutable identifiers or leak another restaurant's content.

## Domain model (implementation targets)
- establishments, establishment_settings, memberships, profiles, user_preferences
- collections, recipes, recipe_versions, recipe_ingredients, recipe_steps, recipe_sources, recipe_media, menu_items, seasonal_drops
- sponsors, sponsor_products, campaigns, campaign_placements, coupon_offers, coupon_redemptions
- live_episodes, episode_segments, technique_stage_events, vote_sessions, vote_options, vote_ballots, vote_aggregates
- flavor_profiles, cookbook_volumes, collectible_editions, collectible_ownership
- tasting_events, tester_applications, tester_invitations, reservations, attendance, dietary_disclosures, media_consents, feedback, reaction_clips
- loyalty_rules, loyalty_ledger, loyalty_tiers, badge_definitions, user_badges, entitlements, entitlement_grants
- event_feed_links, ncrd_gateway_links, spatial_experiences, qr_markers
- notifications, notification_preferences, audit_logs, analytics_events, moderation_actions, media_assets, integration_settings

## Invariants
- UUID primary keys; timestamps stored UTC; timezone derived from per-establishment settings.
- Unique (vote_session_id, user_id, vote_option_group) where one ballot per person/group; switch vote with explicit policy and deadline if allowed.
- vote_aggregates calculated from ballots server-side, not from client-supplied counters.
- loyalty_ledger immutable, linked to verified idempotency_key and event; point balance is derived or transactionally maintained.
- cookbook claim unique per eligible user and edition unless explicit multi-claim setting.
- RSVP capacity and waitlist promotions transactionally checked to prevent overbooking.
- media consents are versioned; withdrawals remove further distribution and trigger reviewed deletion/takedown workflow.
- recipe source credit and license permissions never inferred from URLs alone.
- no provider secrets or service-role keys in browsers.
- campaign claims cannot imply sponsor endorsement without an approved agreement.

## Important workflows
1. Recipe submission → validation → attribution/license review → staff draft → kitchen safety review → publish candidate → menu lab → tasting outcome → final editorial approval → signature menu.
2. Poll → authorized participant → Edge Function rate limit + anti-replay → immutable ballot → aggregate update → Realtime broadcast → stream overlay; handle offline/reconnect without phantom votes.
3. Live stage → host invokes authenticated stage transition → server validates allowed transition → event appended → clients subscribe; emergency hold and abort available.
4. Tester joins → verifies locality and age eligibility → separate dietary disclosure from filming consent → selection (fairness policy and operational limits) → invitation → RSVP → check-in → recorded reaction if consented → score → opt-out retention.
5. Engagement → server verifies qualifying event → idempotent ledger entry → tier evaluation → optional collectible entitlement → audit.
6. Sponsor proposal → product/claims review → disclosure and campaign approval → scheduled placement → clicks/conversions on consented analytics → report.
7. NCRD Gateway → external link with analytics event; no implicit transfer of user profiles; optional signed API exchange only after consent and agreements.

## Security and privacy
PostgreSQL RLS on every tenant-owned resource; explicit public read-only views for published content; no public access to allergy/health responses, consent documents, guest identity or internal sponsor data. PII encrypted at rest by managed services; sensitive consent and health-like dietary fields protected via restricted schema/storage. CSRF/state protections for OAuth, token expiry, account deletion/export, privacy notices, controlled retention schedule, file upload validation, safe external URL handling, XSS-safe markdown rendering, audit of privileged actions and backups with tested restoration.

## API/Edge Function contracts
POST /api/v1/votes/ballot {sessionId, optionGroupId, optionId, idempotencyKey}
POST /api/v1/episodes/:id/transition {nextStage, expectedVersion}
POST /api/v1/tasters/apply {eventId, preferences, dietaryDisclosures, consentVersion}
POST /api/v1/tasters/:id/rsvp {response, idempotencyKey}
POST /api/v1/recipes {draft, sourceAttribution}
POST /api/v1/cookbook/:editionId/claim {idempotencyKey}
POST /api/v1/events/:id/check-in {qrToken}
GET  /api/v1/menu?establishmentId=&category=&visibility=
GET  /api/v1/recipes?search=&category=&tags=
POST /api/v1/integrations/:provider/webhook (signature verified)
All endpoints require validation, stable error codes, pagination and request IDs. Public reads are scoped to published fields; private resources require Auth. Endpoint paths are contracts to implement, not claims of deployed APIs.

## Streaming/Spatial adapters
- Show public live or replay embed only when configured and allowed by streaming provider; avoid exposing privileged streams.
- Live overlays take data from T.O.P event stream, not from uncontrolled chat messages.
- Realtime reconnect: initial snapshot/version, resume cursor if available, reconcile missed events.
- AUKI Domains may support anchored venue experience when independently verified; mobile QR voting and static menu remain functional without AR.
- Optional NCRD event/service exchange through explicit contract; manual CMS curation until live API exists.

## Operational environments
Local: dotenv.example without secrets, Supabase local stack where possible, seed fixtures and fake stream.
Staging: isolated project, fake sponsor/guest data, provider sandbox, automated integration tests.
Production: separate secrets, protected main releases, logs/traces, database migrations, Sentry-like monitoring or equivalent, rollback playbook, storage backups.

## Acceptance thresholds (initial targets, subject to pilot)
- Zero unauthenticated writes to private domains, zero cross-tenant reads.
- One effective ballot per eligible voter per option group; replay-safe on concurrent requests.
- WCAG 2.2 AA design intent; keyboard and reduced-motion behavior tested.
- Resilient empty/error/offline states throughout public and admin routes.
- Publish/retract a menu item without code changes; receipt in audit log.
- Two consecutive end-to-end livestream rehearsals with producer-controlled stage changes and fallback.
