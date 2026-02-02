# Testing Strategy

This repository maintains quality through a layered testing approach (Unit → Integration → E2E), enforced by automation in CI and consistent local developer workflows.

## Goals

- **Prevent regressions** by validating behavior at the right level of granularity.
- **Keep feedback fast**: most logic should be covered by unit tests; heavier tests run less frequently but provide higher confidence.
- **Make failures actionable**: tests should be deterministic, isolated, and clearly scoped (ideally one “reason to fail” per test).
- **Enforce standards before merge**: linting, formatting, and coverage thresholds act as quality gates.

For the broader workflow (branches, PR expectations, CI checks), see: [development-workflow.md](./development-workflow.md).

---

## Principles

### Test behavior, not implementation details
Prefer testing public APIs (functions, services, endpoints, UI behavior) instead of private internals.

Example: test a utility’s output, not how it builds the output.

### Arrange–Act–Assert (AAA)
Keep tests readable and consistent:

```ts
// Arrange
const input = "foo";

// Act
const result = myFn(input);

// Assert
expect(result).toBe("bar");
```

### Hermetic by default
Tests should not depend on developer machine state (network, local files, environment). Use mocks/stubs for external services unless a test explicitly validates an integration boundary.

### Stable data setup
Use centralized fixtures/factories to avoid duplicated, brittle setups.

### CI parity
The same commands used locally must be used by CI to avoid “works on my machine” drift.

---

## Test Types

### 1) Unit Tests

**Purpose:** Validate pure logic and small units (utilities, services, validation, formatting) in isolation.  
**Framework:** Jest  
**File naming:** `*.test.ts` and/or `*.test.tsx` (UI components)

**Conventions**
- Mock external dependencies (network, DB, filesystem) by default.
- Prefer table-driven tests for input/output-heavy logic (`it.each`).
- Keep unit tests fast; avoid sleeps/timeouts.

**Example: table-driven unit test**
```ts
describe("formatting", () => {
  it.each([
    ["input-a", "output-a"],
    ["input-b", "output-b"],
  ])("formats %s -> %s", (input, expected) => {
    expect(formatValue(input)).toBe(expected);
  });
});
```

**Related code**
- Utilities live under `apps/web/lib`. A known public utility is `cn` in `apps/web/lib/utils.ts`, which should be tested as a pure function (input → output) without relying on internal implementation.

---

### 2) Integration Tests

**Purpose:** Validate interactions between modules and boundaries (e.g., API route + service + persistence layer), including serialization, validation, and error handling.  
**Framework:** Typically Jest, plus an HTTP harness when applicable (e.g., `supertest`).  
**File naming (recommended):** `*.int.test.ts` to distinguish from unit tests  
Alternative: colocate `*.test.ts` under an `/integration` folder.

**Typical tooling**
- HTTP harness (e.g., `supertest`) for endpoint integration tests
- Test database/container support (Docker Compose / Testcontainers) if a real DB is used
- Migration/seed tooling to ensure predictable schema/state

**Conventions**
- Prefer **real components** within the app; only stub true externals (third-party APIs, payment gateways).
- Manage lifecycle: setup → run → teardown, leaving no residue (DB reset, server close, cleanup).

---

### 3) End-to-End (E2E) Tests

**Purpose:** Validate critical user flows across the full system (frontend + backend + database), including routing, authentication, and primary “happy path” conversions.  
**Framework:** Cypress or Playwright (use what is configured in this repo).  
**File naming (common patterns):**
- Cypress: `cypress/e2e/**/*.cy.ts`
- Playwright: `e2e/**/*.spec.ts` or `tests/**/*.spec.ts`

**Required tooling**
- Predictable environment (local or CI) with the app running
- Stable test data setup/cleanup (seed scripts, dedicated test tenant/user)
- Optional: video/screenshot artifacts in CI for diagnosis

**Conventions**
- Test user journeys, not edge cases (edge cases belong in unit/integration).
- Avoid timing-based flakiness; wait for deterministic signals (element visible, request finished).

---

## Running Tests

Use the commands below as the canonical way to run tests locally and in CI.

### All tests
```bash
npm run test
```

### Watch mode
```bash
npm run test -- --watch
```

### Coverage
```bash
npm run test -- --coverage
```

If available in `package.json`:

### Unit tests only
```bash
npm run test:unit
```

### Integration tests only
```bash
npm run test:integration
```

### E2E (headed / interactive)
```bash
npm run test:e2e
```

### E2E (CI / headless)
```bash
npm run test:e2e:ci
```

---

## Quality Gates

### Coverage minimums (project-wide)
- Lines: **≥ 80%**
- Statements: **≥ 80%**
- Branches: **≥ 70%**
- Functions: **≥ 80%**

**Notes**
- High-risk modules (auth, billing, permissions, data integrity) should target **≥ 90%** line coverage.
- Coverage exclusions must be explicit and justified (generated code, type-only files, thin re-exports).

### Linting must pass
- No lint errors or warnings in CI (treat warnings as errors where feasible).
- Prefer autofixable rules; run formatting/lint fixes before pushing.

### Formatting must be consistent
- Code must be formatted with the repo-standard formatter (commonly Prettier).
- Avoid formatting drift in PRs; use pre-commit hooks if configured.

### No skipped or focused tests on mainline
Disallow committed:
- `it.skip`, `describe.skip`
- `it.only`, `describe.only`

CI should fail if these are present.

### Determinism
- Tests must be repeatable: no reliance on timezone/locale/network/shared state.
- Time-based code should use fake timers or injected clocks.

### PR expectations
- Every PR should add/adjust tests covering behavior changes.
- Bug fixes must include a regression test that fails before the fix and passes after.

For process and review requirements, see: [development-workflow.md](./development-workflow.md).

---

## Troubleshooting

### A test passes locally but fails in CI
- Ensure the test does not rely on local files, ports, credentials, or services.
- Check timezone/locale assumptions; prefer fixed dates and explicit locales.
- Verify required environment variables exist in CI.

### Random failures / flaky behavior
- Remove arbitrary sleeps; wait on deterministic signals (request completed, element visible, queue drained).
- Ensure cleanup/teardown (DB reset, server close, mocks restored).
- Avoid shared state between tests; reset modules/mocks between suites as needed.

### Long-running test suites
- Identify slow tests using Jest diagnostics:
  - `--detectOpenHandles` (diagnosis)
  - `--runInBand` (diagnosis)
- Keep broad scenarios out of unit tests; promote them to integration/E2E when appropriate.
- Parallelize where safe (watch for shared DB/state).

### Open handles / process not exiting (Jest)
- Ensure servers, DB connections, and timers are closed.
- Use `afterAll(async () => { /* close resources */ })`
- Restore mocks consistently, e.g.:
  ```ts
  afterEach(() => {
    jest.restoreAllMocks();
  });
  ```

---

## Related Resources

- [development-workflow.md](./development-workflow.md)
