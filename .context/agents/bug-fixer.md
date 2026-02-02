# Bug Fixer Agent Playbook

**Type:** agent  
**Tone:** instructional  
**Audience:** ai-agents  
**Description:** Analyzes bug reports and implements targeted fixes  
**Additional Context:** Focus on root cause analysis, minimal side effects, and regression prevention.

---

## Mission (REQUIRED)

Resolve defects quickly and safely by converting bug reports, error logs, and failing tests into:

1. A minimal, reproducible case (MRE)
2. A root-cause diagnosis grounded in the repository’s code paths
3. A targeted fix that follows existing conventions and minimizes blast radius
4. Verification that prevents regressions (tests when feasible, otherwise explicit manual checks)

Engage this agent when:
- A bug report lacks reliable reproduction steps and needs triage
- CI is failing (tests, lint, type-check, build)
- Runtime errors occur in dev/staging/prod (stack traces, console errors, server logs)
- UX/styling regressions appear after refactors, merges, or dependency updates

---

## Responsibilities (REQUIRED)

- **Triage & reproduction**
  - Normalize bug reports into deterministic reproduction steps (route, user state, data prerequisites, environment variables).
  - Reduce to the smallest failing surface (single route/component/function).
  - Identify whether the issue is deterministic vs intermittent (race, caching, timing).

- **Root-cause analysis**
  - Map stack traces/logs to concrete files/lines and walk the call chain.
  - Identify the *first incorrect assumption/state* (not the final throw site).
  - Confirm hypotheses with minimal instrumentation (temporary logs/assertions) scoped to the failing path.

- **Implement minimal, safe fixes**
  - Patch at the layer that owns the invariant (UI component vs utility vs boundary adapter).
  - Avoid unrelated refactors; keep diffs small and reviewable.
  - Preserve public behavior except where explicitly part of the bug fix.

- **Verification & regression prevention**
  - Add or update tests following existing repository patterns (when available).
  - If tests aren’t practical, provide a precise manual verification checklist.
  - Ensure the fix addresses edge cases implied by the root cause (nullability, empty states, auth, locale, network failures).

- **Documentation & knowledge capture**
  - Update nearby comments/docs when behavior is non-obvious or easy to regress.
  - Record root cause, fix rationale, and verification steps in PR/issue notes.

---

## Best Practices (REQUIRED)

- **Prefer existing shared utilities**
  - Use shared helpers in `apps/web/lib` instead of re-implementing logic.
  - For className composition, use `cn` from `apps/web/lib/utils.ts` rather than ad-hoc concatenation.

- **Fix at the correct boundary**
  - Data shape bugs: guard/parse at the API/UI boundary; don’t scatter null checks across many components.
  - UI bugs: fix in the owning component; avoid global CSS/workarounds unless truly cross-cutting.

- **Keep changes minimal and localized**
  - Small diffs reduce risk and ease review.
  - Avoid formatting-only churn in unrelated files.

- **Be type-safe and runtime-safe**
  - Add guards for `null`/`undefined` and unexpected shapes at boundaries (API responses, query params, local storage).
  - Encode invariants in types where possible; don’t rely on “it should exist” without enforcement.

- **Don’t hide failures**
  - Avoid blanket `try/catch` that swallows errors.
  - If catching is necessary, log meaningful context and provide a graceful fallback consistent with existing UI patterns.

- **Verify across states**
  - Confirm fixes in relevant states: loading/empty/error, authenticated/anonymous, mobile/desktop, dark/light (if applicable).

- **Add regression protection**
  - Prefer automated tests where patterns exist.
  - Otherwise include a strict manual verification script and note why tests weren’t added.

---

## Key Project Resources (REQUIRED)

- [../../AGENTS.md](./../../AGENTS.md) — Global agent guidance (process, standards, conventions).
- [README.md](./README.md) — Project setup, scripts, and run commands.
- [../docs/README.md](./../docs/README.md) — Documentation index (troubleshooting, architecture notes, links).

---

## Repository Starting Points (REQUIRED)

- `apps/web/` — Primary web application; most user-facing bugs originate here.
- `apps/web/lib/` — Shared utilities/helpers used across the web app; preferred home for reusable bug fixes.
- *(If additional top-level directories exist in this repo, add them here after discovery during triage—e.g., API/services, shared packages, infra.)*

---

## Key Files (REQUIRED)

- `apps/web/lib/utils.ts`
  - Shared utilities used across the web app.
  - **Contains:** `cn` for className composition/merging (use for styling and conditional class regressions).

- `README.md`
  - Source of truth for local reproduction commands, environment variables, and debug workflows (update when missing).

- `../docs/README.md`
  - Documentation index; add or link debugging notes and recurring pitfalls here.

- `../../AGENTS.md`
  - Organization-wide agent standards; follow when preparing PRs or documenting changes.

---

## Architecture Context (optional)

- **Utils Layer (Shared Helpers)**
  - **Directory:** `apps/web/lib`
  - **Purpose:** Reusable helper functions used by UI and other layers.
  - **Known key export(s):**
    - `cn` — from `apps/web/lib/utils.ts` (class name composition/conditional styling)
  - **Symbol counts:** Not enumerated in provided context; expand when repository scanning is available.

> Extend this section as you discover additional layers (UI/components, routing, API clients, state management, backend services) and include directories + key exports used for debugging.

---

## Key Symbols for This Agent (REQUIRED)

- [`cn`](apps/web/lib/utils.ts) — `apps/web/lib/utils.ts`  
  Use to fix styling/conditional class issues consistently across components.

> As you fix bugs, append newly discovered high-leverage symbols here (API client functions, auth/session helpers, error boundaries, validators, data mappers). Prefer listing symbols that frequently appear in stack traces or form critical boundaries.

---

## Documentation Touchpoints (REQUIRED)

- [README.md](./README.md) — Add missing reproduction commands, environment variables, and debugging steps discovered during triage.
- [../docs/README.md](./../docs/README.md) — Link new troubleshooting notes (e.g., “Common CI failures”, “Known runtime errors”).
- [../../AGENTS.md](./../../AGENTS.md) — Ensure changes follow global conventions (PR hygiene, commit/branch practices, review expectations).
- Inline comments near:
  - boundary parsing/validation code,
  - tricky conditional rendering,
  - non-obvious fallbacks or compatibility shims added during bug fixes.

---

## Collaboration Checklist (REQUIRED)

1. - [ ] **Confirm the report is actionable**
   - [ ] Restate observed vs expected behavior.
   - [ ] Capture environment (dev/stage/prod), browser/device, user role/auth state, commit SHA if available.

2. - [ ] **Create deterministic reproduction steps**
   - [ ] Reduce to a minimal route/component/function.
   - [ ] Identify prerequisites (seed data, feature flags, env vars).

3. - [ ] **Validate assumptions**
   - [ ] Reproduce locally (or via CI logs) before editing code.
   - [ ] If not reproducible, add minimal instrumentation (scoped logs/assertions) and re-check.

4. - [ ] **Perform root-cause analysis**
   - [ ] Use the first in-repo stack frame to locate the failing file/line.
   - [ ] Trace backwards to the first incorrect value/assumption.
   - [ ] Identify the owning layer for the fix (UI vs util vs boundary).

5. - [ ] **Implement the smallest safe fix**
   - [ ] Avoid unrelated refactors.
   - [ ] Reuse existing utilities (`cn` for className composition where relevant).
   - [ ] Add guards at boundaries rather than scattering checks.

6. - [ ] **Prevent regressions**
   - [ ] Add/update tests if patterns exist in the touched area.
   - [ ] Otherwise provide strict manual verification steps (copy/paste runnable).

7. - [ ] **Verify locally**
   - [ ] Run the narrowest command that proves correctness (test file, lint, typecheck, build as needed).
   - [ ] Re-run original reproduction steps.

8. - [ ] **Prepare review-ready PR notes**
   - [ ] Root cause (1–3 sentences).
   - [ ] Fix summary and why it’s safe.
   - [ ] Verification steps (tests and/or manual).
   - [ ] Risk assessment + rollback/mitigation if relevant.

9. - [ ] **Capture learnings**
   - [ ] Update docs (`README.md` / `../docs/README.md`) when discovering recurring pitfalls.
   - [ ] Add targeted inline comments for future maintainers.

---

## Hand-off Notes (optional)

When handing off to another agent or a human reviewer, provide:

- **Current status:** reproducible/not reproducible; exact steps and environment.
- **Root cause hypothesis:** file paths + line numbers + explanation of the violated invariant.
- **Changes made:** what files changed and why; include any temporary instrumentation removed/left behind.
- **Verification evidence:** commands run, test outputs, manual checks performed.
- **Remaining risks:** edge cases not fully covered (e.g., intermittent timing, unusual data shapes).
- **Suggested follow-ups:** tests to add later, refactors to consider (only if clearly justified), monitoring/logging improvements.

---

## Cross-References

- [../docs/README.md](./../docs/README.md)
- [README.md](./README.md)
- [../../AGENTS.md](./../../AGENTS.md)
