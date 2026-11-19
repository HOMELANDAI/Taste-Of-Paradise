# Work Breakdown Structure and Acceptance Checklist

## Milestone sequencing
P0: PRD, scope lock, data/integration inventory, KPI and risk register.
P1: design tokens, responsive sitemap, design asset catalogue, prototype review.
P2: secure Supabase tenancy + authentication + RLS + CI.
P3: Recipe Vault CRUD + provenance and approval + signature menu filtering and rotating editions.
P4: tasting event operations + private consent + invitations + reaction workflow.
P5: live technique states + heat-vote and ingredient ballot services + Twitch/Maestro stream connectors.
P6: points ledger + badges + VIP rules + HAI Cookbook collection.
P7: sponsor campaigns + disclosure + North Coast RD gateway + optional spatial.
P8: security/QA/performance + venue runbook + end-to-end rehearsal.
P9: deployment/monitoring/analytics + operating handover.

## Standard issue definition of done
- Requirements/AC referenced, design/state diagram if UI, database migration if data, relevant automated tests, permissions/RLS checks, accessibility/mobile check, error/empty/loading paths, telemetry, documentation, review evidence and merged PR.
- For live/venue issue: dry-run proof and assigned operator signature.
- For external integration: capability verified from provider docs, configured secrets outside repo and fallback for provider failures.

## Suggested kanban board
Backlog → Ready → In progress → In review → QA/Staging → Blocked → Done.
Fields: Phase, Priority, Domain, Owner, Dependencies, Estimate (optional), Acceptance Evidence, Release Target.
GitHub Issues are the source of execution tasks; this repository's docs are the source of product requirements.

## Pilot success criteria (targets, not forecasts)
- One rooftop show fully captured with host-operated stage transitions and one safe, recorded community poll.
- A local guest can complete signup, opt-in/out of filming, receive an invitation, RSVP and be checked in without manual database edits.
- A staff member can create/update a recipe, add ingredients and attribution, schedule a menu drop and publish/retract.
- A viewer can discover recipes by meal type, save and participate once in a ballot; spoof/repeat voting fails.
- A confirmed recipe passes tasting/editorial approval before being added to signature menu or cookbook.
- Sponsors cannot be displayed as approved without an explicit campaign approval flag.
- NCRD Gateway opens its correct destination and can track consented click analytics.
- Private allergies, filmed releases and guest identities remain inaccessible to public and other establishments.

## Implementation order within issues
For each vertical slice: (a) database contracts and policies, (b) server business logic, (c) frontend UI, (d) test suite, (e) observability and operator docs, (f) staging acceptance. Avoid a UI-only 'complete' state.
