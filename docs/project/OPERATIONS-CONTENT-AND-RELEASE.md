# Culinary Operations, Production, QA and Release

## Venue
Reference visual: premium open tropical rooftop kitchen, pergola/canopy, mini palms, dark wood, black stone, string lights, functional ceiling fans and subtle amber-copper/cyan accent lights. Allocate zones for hot cooking, guest circulation, reaction tables, camera positions, food prep, wash stations and fire/weather egress. Venue capacity, roof structural load, wind/rain/electrical safety, permits, food licensing and accessible paths must be assessed by relevant local specialists. Photographic concepts are not construction plans.

## Weekly show run of show (pilot)
- T-7 days: select approved recipe candidates, source ingredients and confirm permissions/availability.
- T-5: menu lab shortlist and ingredient ballots open; rate-limit and local feedback QA.
- T-3: participant selection and RSVP, dietary/allergen questionnaire, filmed-release authorization.
- T-2: kitchen bench test, food-cost review, sponsor disclosure review, fallback ingredients.
- T-1: camera/microphone/lighting checks, network backup, stream platform rehearsal, graphics/QR run.
- Live: rooftop introduction, recipe/creator attribution, ingredient vote reveal, PREP→HEAT→SEAR→REST→PLATE, community heat meter, 3–4 two-person tasting groups (if staffed), real-time reaction segments, outcome, future poll and Cookbook candidate.
- Post: incident log, qualitative tasting score, hygiene and waste checklist, clip review, consent validation, recipe revision, sponsor report, analytics.
- T+2: publish reviewed short clips, update waiting list and release approved recipes; do not automatically release unapproved content.

## Taste tester requirements
- Adults-only for MVP and explicit on-camera opt-in; choosing not to be filmed does not automatically prohibit private participation.
- Separate consent for collection of dietary information, livestream appearance, post-event clip reuse and promotional sponsor use; revocable where applicable.
- Allergens flagged and verified by kitchen. Staff can reject unsafe combinations and stop tasting; no public display of sensitive preferences.
- Waitlist fairness strategy published; VIP priority cannot override safety, capacity or informed consent.
- Participant history includes invitations, attended sessions, recipes tasted and previous reaction prompts to improve variety without exploiting private traits.

## Culinary R&D gate
Ideation → benchmark reference → ingredient sourcing/costing → kitchen trial → food safety/allergen review → group tasting → revision → publication approval.
For each test record: batch sizes, measurements, sear time/temp, yield, sensory notes, provenance, tested variants, serving temp, allergen matrix, owner and date. 'AI sear grill' is a desired equipment concept, not assumed automated cooking safety. Alcohol-containing glazes are labeled; cooked alcohol is not presumed absent.

## Assets & branding
Design tokens: Navy #1A2332, Gold #D4AF37, Cyan #63D2FF, amber/ember accents, charcoal, cream parchment, sage/tropical green. HAI hexagonal or T.O.P monogram logo. Distinct assets: app icons Luxury Monogram and Tropical Heat, social portrait promo, rooftop night references, Signature Collections poster, Sweets Collection poster, food hero cards. Store provenance, rights and final approved images in /assets; an image existing in prior chat does not mean it is included in the repository. Never publish an AI-created brand bottle as evidence of sponsorship.

## QA matrix
- Recipes: create/edit/search/filter, pagination, rich ingredients, translation, versioning, approval, archive, safe import.
- Menu: active dates/timezones, breakfast/lunch/dinner/dessert categories, membership gates, sponsor disclosure.
- Votes: closing times, duplicates, switching, no-account behavior, concurrency, high traffic, stream delay, disconnect/reconnect.
- Testing: apply, consent, withdraw, invite, capacity, QR token replay, no-show, private video, reporting.
- Loyalty: idempotency, tier changes, earning caps, rollback/refunds, anti-abuse.
- Privacy: tenant isolation, expired access, exports/deletion, RLS policies, signed-media URL expiry.
- Compatibility: Android/iOS browsers, desktop, touch, keyboard, reduced motion, slow network.
- Platform: Twitch/Maestro embed restrictions, playback unavailable fallback, social links, consented analytics.
- Spatial: QR-only fallback, device compatibility, network outage and anchor accuracy.
- Operations: severe weather, network loss, kitchen safety, first aid, livestream cancellation and notification.

## Deployment & incident response
PR feature branch → unit tests/typecheck/lint → review → staging deploy + e2e smoke → pilot owner signoff → production migration → release notes and rollback checkpoint. Monitoring: 5xx error rate, Edge Function failures, long queries, realtime disconnects, upload errors, RSVP mismatch and duplicate reward alerts. Severity labels P0 outage/private data exposure, P1 broken event/critical voting, P2 cosmetic/low-impact. Revoke tokens, turn off write feature via flags, use read-only fallback, restore last good deployment and preserve event logs.

## Release criteria
MVP-A: navigation and content render, published menus indexed, edit/publish in authenticated admin, no tenant leak.
MVP-B: consented tester signups, invitations and check-in work with capacity and opt-out.
Beta-C: live voting and stage transition demo stable; Cookbook unlock follows human-approved gates.
Public V1: sponsor consent/disclosure, NCRD external link, analytics and QA evidence signed off.
Never mark a feature live because a mockup demonstrates it.
