# GitHub Projects Board — Setup and Operating Model

This repository already contains the phased implementation plan and **21 open GitHub Issues** (plus several closed duplicate records from the initial backlog creation). Those issues are the execution source of truth. The native **GitHub Projects v2 board is not created merely by committing this file**: creation requires explicit Projects write permission at the HOMELANDAI account level.

## One-time installation (owner action)
1. Create an appropriately scoped GitHub personal access token for `HOMELANDAI` that can manage GitHub Projects and read this repository's Issues. The GitHub CLI identifies the `project` scope as the minimum required for classic tokens; private repositories also need repository access. Give the token the narrowest access permitted by your account.
2. In [repository Actions secrets](https://github.com/HOMELANDAI/Taste-Of-Paradise/settings/secrets/actions), add a secret named exactly `GH_PROJECTS_TOKEN`. **Do not paste the token into source, an issue, or a chat.**
3. Open [Bootstrap T.O.P GitHub Project workflow](https://github.com/HOMELANDAI/Taste-Of-Paradise/actions/workflows/bootstrap-github-project.yml). Select **Run workflow** on `main`. The run summary should return the actual board URL.

The script is repeatable: it locates a same-titled board, creates it if necessary, makes Phase/Priority/Domain fields, links the project to the repository, adds open P0–P9 issues and sets each item's fields. Existing issue descriptions and repository documentation are preserved. GitHub CLI is installed on GitHub-hosted Ubuntu runners.

### What the board is called
**T.O.P by HAI — Taste of Paradise | Implementation**

### Recommended board views
Create or adjust these views in the GitHub Projects UI after bootstrap (GitHub CLI cannot configure all native views):
- **Delivery Board** — board grouped by Status (Todo, In Progress, Done), filtered to active items.
- **Phase Roadmap** — table grouped by Phase P0–P9, sorted by Priority.
- **MVP-A** — P0–P3 (foundation, website, menu and Recipe Vault).
- **MVP-B** — P4 (tester intake, consent, RSVPs).
- **Beta-C** — P5–P6 (stream and community engagement).
- **V1 Launch** — P7–P9 (sponsors, NCRD, QA, pilot and rollout).
- **Blocked / Risks** — filtered by Blocked status or explicit blocker labels.

### Fields
| Field | Values | Use |
|---|---|---|
| Status | Project default | Kanban execution state |
| Phase | P0–P9 | Delivery sequencing |
| Priority | P0 - Critical, P1 - High, P2 - Planned | Development urgency, not a claim about completed work |
| Domain | Governance, Design, Platform, Content, Community, Live, Loyalty, Partnerships, QA, Launch | Team handoff |
| Assignees | GitHub built-in | Named individual accountable for delivery |
| Linked pull requests | GitHub built-in | Code evidence for completion |

### Phase map
| Phase | Scope | Existing issues |
|---|---|---|
| P0 | Scope/governance and success measures | #1 |
| P1 | Brand system, responsive design, assets | #2 |
| P2 | React/Supabase foundation, migrations, security | #3–5 |
| P3 | Recipe Vault, Signature Menu, configurable restaurant | #6–8 |
| P4 | Taste tester applications, privacy, invitations | #9–10 |
| P5 | Sear Stage, Menu Lab, Twitch/Maestro | #11–13 |
| P6 | Loyalty, VIP, Cookbook collectibles | #14–15 |
| P7 | Sponsor campaigns, NCRD Gateway, optional AR | #16–18 |
| P8 | Security/QA, operational rooftop pilot | #19–20 |
| P9 | Release, monitoring and handover | #25 |

### Canonical source documents
- [Master implementation plan](../docs/project/MASTER-IMPLEMENTATION-PLAN.md)
- [Technical architecture and backend contracts](../docs/project/ARCHITECTURE-AND-DATA.md)
- [Operations, QA and launch](../docs/project/OPERATIONS-CONTENT-AND-RELEASE.md)
- [Architecture decisions and risks](../docs/project/DECISIONS-AND-RISKS.md)
- [Backlog and acceptance criteria](../docs/project/BACKLOG-AND-ACCEPTANCE.md)
- [Current implementation roadmap](../docs/implementation-roadmap.md)

### Operating cadence
- Weekly prioritization: product owner confirms next two weeks of Phase items and resolves blocker ownership.
- Every work item should include requirements, dependency references, acceptance proof and linked PR or document changes.
- A phase is complete only after staging QA, privacy and accessibility acceptance and operational signoff where relevant.
- Never mistake food concept renders or prototypes for deployed systems, granted licenses or signed sponsor agreements.
- Keep approved recipe media and sponsor relationships properly attributed and permissioned.

## Troubleshooting
- **Resource not accessible / 403:** check that the token belongs to a user with permission to create Projects under HOMELANDAI and has appropriate `project` authorization.
- **GH_PROJECTS_TOKEN missing:** add the Actions secret; the workflow intentionally stops rather than creating an incomplete project.
- **Project already exists:** the bootstrap reuses the exact matching title; if more than one same-named board exists, rename the unintended duplicate before running.
- **Link failed:** the script continues loading issues; manually link the board to the repository if account permissions prevent linkage.
- **Field option mismatch:** check the board's Phase/Priority/Domain options exactly match those specified here; avoid manually creating fields with incompatible options before bootstrap.
- **GitHub API rate limit or network issue:** rerun the manual workflow; it checks existing items to avoid duplicate adds.
- **Board not visible:** check whether the project is private and set visibility in the native GitHub Projects settings when appropriate.
- **Issue not imported:** only open issues whose titles begin with `[P0]` through `[P9]` are imported; verify title and open state.

## Credentials and visibility
The script reads `GH_PROJECTS_TOKEN` only from Actions secrets. It does not write credentials to disk. Grant only necessary permissions, rotate if exposed, and review project visibility before adding confidential operational data. Publishing this repository does not grant permissions to Project boards.
