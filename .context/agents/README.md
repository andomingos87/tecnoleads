# Feature-Developer Agent Playbook — `tecnoleads`

> Purpose: implement new product features end-to-end (UI + API + data + tests) in a way that matches this repository’s structure, conventions, and quality bar.

---

## 0) Quick Orientation (what to open first)

### High-signal “how we work” docs
- `AGENTS.md` — agent knowledge base. **Update this** when you learn something new (commands, pitfalls, conventions).
- `CONTRIBUTING.md` — branch/PR rules, required checks, commit conventions.
- `docs/` (or `docs/README.md`) — feature/product docs and any ADR-like decisions.
- `.github/workflows/*` — **the real Definition of Done** (what CI runs must pass).

### Stack/tooling entry points (identify immediately)
Look for (and follow what exists):
- **Node/TS**: `package.json` (+ `pnpm-lock.yaml`/`package-lock.json`/`yarn.lock`)
- **Frontend frameworks**: `next.config.*`, `vite.config.*`, `tsconfig.json`
- **Backend frameworks**: `src/server.*`, `src/app.*`, `routes/`, `controllers/`
- **DB/migrations**: `prisma/schema.prisma`, `migrations/`, `db/`, ORM config files
- **Env**: `.env.example` (source of truth for required variables)
- **Lint/format**: `.eslintrc*`, `eslint.config.*`, `.prettierrc*`, `biome.json`, `.editorconfig`
- **Container/dev infra**: `docker-compose.yml`, `Dockerfile`

---

## 1) What the Feature-Developer Agent Owns

### You own
- Translating a feature spec into a working implementation across layers.
- API routes/handlers + validation + auth checks.
- UI pages/components + client-side validation + UX states (loading/error/empty).
- Data model changes (schema + migrations) and safe rollouts/backfills.
- Tests (unit + integration + e2e where present).
- Updating dev docs and `.env.example` when configuration changes.

### You do not own (escalate/propose)
- Broad refactors unrelated to the feature.
- Major architecture changes, framework migrations, deep security/perf audits.

---

## 2) Repository Areas to Focus On (find the nearest equivalent)

Because exact structure can vary, **always start by locating an existing similar feature** and mirror it. Typical “places” you’ll work in:

### Backend (common layouts)
- `src/routes/` or `src/api/` — route definitions / endpoint wiring
- `src/controllers/` or `src/handlers/` — HTTP-level handling
- `src/services/` or `src/use-cases/` — business logic (preferred home for rules)
- `src/repositories/` or `src/db/` — persistence layer, queries, ORM usage
- `src/middlewares/` — auth, validation, error handling
- `src/config/` — environment config parsing/validation

### Frontend (common layouts)
- `src/pages/` or `app/` — route-level UI
- `src/components/` — reusable components
- `src/features/` — feature modules (best boundary for larger features)
- `src/api/` or `src/lib/api/` — API client layer (centralize networking)
- `src/hooks/` — query/mutation hooks, state helpers
- `src/styles/` — styling primitives (or Tailwind config)

### Tests
- `__tests__/`, `*.test.*`, `*.spec.*` — unit/integration tests
- `cypress/` or `playwright/` — e2e tests (if present)
- `test/fixtures/`, `factories/`, `mocks/` — deterministic test data

---

## 3) “Feature Contract” Template (write before coding)

Write this in the PR description or `docs/` when the feature is non-trivial:

1. **User story**
2. **Acceptance criteria** (bullets)
3. **UI surfaces** (pages/components impacted)
4. **API contract**  
   - endpoints, methods  
   - request/response examples  
   - error cases and status codes
5. **Data model** (tables/collections, fields, constraints, indexes)
6. **Auth/permissions** (who can do what)
7. **Migration/backfill plan** (if schema changes)
8. **Test plan** (what you will test and where)

This prevents rework and guides reviewers.

---

## 4) Standard End-to-End Workflow (repeatable steps)

### Step 1 — Find the closest existing feature and copy its patterns
- Search for a similar UI flow (forms, tables, wizards).
- Search for a similar endpoint (create/update/list/detail).
- Mirror:
  - naming conventions
  - folder structure
  - validation strategy
  - error response shapes
  - test style and utilities

### Step 2 — Implement from the “contract boundary” inward
**Preferred order** (keeps integration tight):
1. Data model + migration (if needed)
2. Backend endpoint + validation + auth + service logic
3. Frontend UI + API client calls + UX states
4. Tests across layers
5. Docs + `.env.example` updates

### Step 3 — Keep changes incremental and reviewable
If large:
- Split into PRs: (schema) → (API) → (UI) → (polish/tests)
- Or gate behind a feature flag **only if the repo already has a pattern for it**

### Step 4 — Run the same checks CI runs
Use `.github/workflows/*` as your checklist:
- lint/format
- typecheck (if TS)
- unit/integration tests
- build step
- migration checks (if DB)

Record commands in PR “Test Plan”.

---

## 5) Common Feature Recipes (with concrete expectations)

### A) Add a new API endpoint (CRUD-style)
1. **Route wiring**: add new route next to similar routes.
2. **Validation**: validate body/query/params (use existing schema library/pattern).
3. **Auth**: enforce permissions server-side (do not trust client roles/flags).
4. **Business logic**: put domain rules in `services/` or `use-cases/`.
5. **Persistence**:
   - use repository/ORM layer consistently
   - use transactions for multi-write operations
   - add indexes for frequently filtered/sorted fields
6. **Errors**:
   - reuse standard error helpers/types
   - map to consistent HTTP status codes
   - keep user-safe messages separate from debug details
7. **Tests**:
   - happy path
   - validation failures
   - permission failures
   - important edge/boundary cases

**PR should include** endpoint examples (curl or JSON snippets).

---

### B) Add/modify a UI flow (form, list, detail)
1. Put UI in the same routing system used by the repo (`src/pages` or `app/`).
2. Reuse existing layout components and form patterns:
   - existing input components
   - existing form library (if used)
   - existing toast/notification pattern
3. Handle states consistently:
   - loading skeleton/spinner pattern
   - error presentation pattern
   - empty state pattern
4. Keep API calls centralized:
   - use existing API client module or hooks
   - avoid raw `fetch` scattered across components unless that is already the pattern
5. Tests:
   - component/unit tests for logic-heavy pieces
   - e2e coverage for critical flows if Cypress/Playwright exists

**PR should include** screenshots for UI changes.

---

### C) Change the database schema safely
1. Identify the migration tool (Prisma/TypeORM/etc.) and follow its workflow.
2. Decide constraints:
   - `NOT NULL` only when you can backfill safely
   - `UNIQUE` only when existing data satisfies it (or you’ve cleaned/backfilled)
3. Plan backfills:
   - if adding required field: introduce nullable → backfill → enforce not-null
4. Add indexes for query patterns introduced by the feature.
5. Tests:
   - migration runs in CI/local
   - integration test covers new persistence behavior

**PR should include** migration notes and any backfill scripts/steps.

---

### D) Integrate an external service (email/SMS/CRM/etc.)
1. Create a dedicated client module (single responsibility):
   - base URL + auth config
   - timeouts/retries (only if repo already has a standard)
   - error mapping to internal domain errors
2. Configuration:
   - add env vars to `.env.example`
   - document expected formats
3. Testing:
   - mock the client in unit tests
   - add contract tests only if the repo uses them already

---

## 6) Codebase-Fit Best Practices (enforced consistently)

### Match conventions (do not invent new ones casually)
- Naming: folder + file naming patterns used in repo (`kebab-case` vs `camelCase`)
- Exports: named vs default (follow local module style)
- Error shape: keep consistent across endpoints/UI
- Validation: use existing schema/validator conventions
- State management: use existing store/hooks conventions

### Keep boundaries clean
- Route/Controller: parse + validate + authorize + delegate
- Service/Use-case: domain rules and orchestration
- Repository/DB: data access only

### Safety and correctness
- Validate all external input (API and UI).
- Avoid trusting client-provided identifiers/roles for permission decisions.
- Avoid N+1 queries; prefer joins/includes/batching.
- Paginate list endpoints and keep sorting/filtering explicit.

### Logging/PII
- Don’t log secrets or sensitive lead/customer data.
- Log failures at system boundaries (DB/external APIs) using existing logger.

---

## 7) Testing Playbook (what to add and where)

### Minimum required coverage for a new feature
- Backend:
  - request validation failure tests
  - permission/unauthorized tests
  - core business rule tests
- Frontend:
  - rendering + state tests for key components
  - basic integration test for the critical path (if e2e exists)

### How to choose test types
- **Unit tests**: pure logic, services, utils
- **Integration tests**: route + DB behavior
- **E2E tests**: critical user flows (login → create/update → verify result)

### Determinism rules
- Avoid time-based flakiness: freeze time if needed.
- Use factories/fixtures if repo has them.
- Mock external services; don’t call real endpoints in tests.

---

## 8) PR Checklist (copy into PR description)

### Functional
- [ ] Meets acceptance criteria
- [ ] Handles empty/loading/error states (UI) and error codes (API)
- [ ] No breaking changes (or documented + migrated)

### Code quality
- [ ] Matches existing structure and conventions
- [ ] Business logic lives in the correct layer
- [ ] No duplicated domain rules across UI/API without a reason

### Data
- [ ] Migrations included and verified
- [ ] Backfill strategy documented (if needed)

### Tests / CI
- [ ] Added/updated tests for happy + negative paths
- [ ] Ran the same commands CI runs (list them)

### Docs / Config
- [ ] `.env.example` updated if new env vars are required
- [ ] `AGENTS.md` updated with any new learnings/pitfalls

---

## 9) “First 30 Minutes” Checklist for Any Feature

1. Read `CONTRIBUTING.md` and skim `.github/workflows/*`.
2. Locate a similar feature and copy its approach.
3. Identify where validation/auth/error handling are implemented.
4. Confirm DB migration workflow (and how to run it locally).
5. Draft the feature contract (even brief).
6. Implement iteratively with tests close behind.

---

## 10) Maintaining This Playbook (feedback loop)

After delivering a feature, append to `AGENTS.md`:
- required env vars you discovered
- local dev commands that matter (including DB setup)
- conventions that were not obvious
- common failure modes (lint rules, CI quirks, migration gotchas)
- where feature modules “should” live in this repo

This keeps future feature work faster and consistent.
