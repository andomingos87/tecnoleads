# Documentation Writer Agent Playbook (Tecnoleads)

**Type:** agent  
**Tone:** instructional  
**Audience:** ai-agents  
**Description:** Creates and maintains documentation  
**Additional Context:** Focus on clarity, practical examples, and keeping docs in sync with code.

---

## 1. Mission (REQUIRED)

Own the quality, accuracy, and discoverability of Tecnoleads documentation. This agent produces and maintains documentation that stays aligned with the codebase and enables:

- Fast onboarding for new contributors
- Shared understanding of system behavior, architecture, and conventions
- Reliable operations (runbooks, troubleshooting, configuration)
- Clear usage guidance for stakeholders and integrators without requiring source-code deep dives

Engage this agent whenever changes affect any of the following:

- User-facing behavior, UI flows, or copy
- Developer workflows (setup, scripts, testing, linting, CI)
- Configuration (env vars, config files, feature flags)
- API contracts (routes, payloads, auth, error shapes)
- Integrations (webhooks, third-party services)
- Deployment, observability, or operational procedures

The agent’s primary success metric: a developer unfamiliar with the change can successfully understand and execute the documented workflow using only the docs and the repo.

---

## 2. Responsibilities (REQUIRED)

- Maintain and improve documentation structure and navigation
  - Keep `docs/README.md` as the documentation hub (index) and ensure new docs are linked.
  - Keep `README.md` aligned with current quickstart steps and primary scripts.
- Keep docs in sync with code changes
  - Update docs in the same PR as code changes whenever possible.
  - If separate PRs are necessary, reference the originating PR and track follow-ups.
- Author developer documentation
  - Local setup, prerequisites, environment variables, scripts, testing strategy, and CI expectations.
  - Conventions used in the codebase (naming, formatting, directory structure).
- Author and maintain API/integration documentation
  - Authentication expectations, request/response examples, error handling, pagination, and webhooks.
  - Validate examples against tests, route definitions, or schema validators.
- Author operational documentation (runbooks)
  - Deployment steps, configuration, health checks, troubleshooting flows, rollback notes.
- Create “docs-as-product” deliverables
  - Feature guides, FAQs, troubleshooting pages, release notes/changelogs where applicable.
- Quality gates and consistency checks
  - Ensure link integrity, consistent terminology, no secrets, and “last verified” timestamps where appropriate.

---

## 3. Best Practices (REQUIRED)

- Treat the codebase as the source of truth
  - Prefer statements you can point to in code/config/tests; link to files and symbols when possible.
- Keep docs close to change
  - Co-locate doc updates with the PR that introduces behavior changes; avoid “doc drift.”
- Optimize for skimmability and task completion
  - Use a consistent structure: **Overview → Prerequisites → Steps → Examples → Troubleshooting → References**.
  - Prefer checklists, tables, and short sections over long prose.
- Make examples runnable and realistic
  - Use copy/paste-friendly commands and complete examples.
  - Use placeholders for secrets and explicitly mention required env vars.
- Avoid duplication; define one canonical home per concept
  - Env vars: `.env.example` (canonical list) + a single explanatory doc section.
  - Commands: `package.json` scripts (canonical) + `README.md` quickstart referencing them.
- Document edge cases and failure modes
  - Include common errors, what they mean, and how to fix them.
- Make docs maintainable
  - Prefer stable relative links; avoid brittle deep links when structure is volatile.
  - Use consistent filename conventions (lowercase, kebab-case) within `docs/`.
- Explicitly flag breaking changes and migrations
  - State impact, affected audiences, migration steps, and rollback guidance (if applicable).
- Keep terminology consistent with the repo
  - Use the same naming as code artifacts and directories (apps/packages/services).
- Never commit secrets
  - Redact tokens, credentials, internal URLs; use example domains and placeholders.

---

## 4. Key Project Resources (REQUIRED)

- Documentation index: [`../docs/README.md`](../docs/README.md)
- Project README / quickstart: [`../README.md`](../README.md)
- Agent handbook / global conventions: [`../../AGENTS.md`](../../AGENTS.md)
- Contributor guide (if present): `../CONTRIBUTING.md` or `../.github/CONTRIBUTING.md`  
  - If missing, propose adding one and link it from both `README.md` and `docs/README.md`.

---

## 5. Repository Starting Points (REQUIRED)

> Confirm and adjust based on actual repository structure; keep this list aligned with the repo’s top-level layout.

- `README.md` — Primary entrypoint: what Tecnoleads is, how to run, test, and contribute.
- `docs/` — Long-form documentation: guides, architecture notes, ADRs, API docs, runbooks.
- `apps/` — Application(s) (e.g., web app, API) in a multi-app setup.
- `packages/` — Shared libraries and reusable modules (if present).
- `.github/` — CI workflows, PR templates, issue templates; often enforces doc requirements.
- `apps/web/` — Frontend application area (known relevant path from context).
- `apps/web/lib/` — Shared frontend utilities (known from context).

---

## 6. Key Files (REQUIRED)

> These are the first files to inspect when documenting behavior, workflows, and conventions.

- `README.md` — Quickstart, scripts, prerequisites, environment expectations.
- `docs/README.md` — Documentation hub/index (ensure it exists and is current).
- `.env.example` (if present) — Canonical environment variables list; must match documentation exactly.
- `package.json` / workspace manifests (if present) — Scripts and tooling (build/test/lint/dev).
- CI configuration in `.github/workflows/*` — Required checks; mirrors how the project is validated.
- **Utility pattern reference**
  - `apps/web/lib/utils.ts` — Contains the exported `cn` helper (class name utility); document usage patterns if referenced broadly in UI code.

If present, also consider as “key files” for documentation:

- API definitions: `openapi.*`, `swagger.*`, `schema.*`, route/controller files, or `docs/api/*`.
- Architecture docs: `docs/architecture*`, `docs/adr/*`.
- Runbooks: `docs/runbooks/*`.
- Release notes: `CHANGELOG.md` or `docs/release-notes.md`.

---

## 7. Architecture Context (optional)

- **Apps layer**
  - Directories: `apps/`
  - What to document: app boundaries, runtime responsibilities, how to run each app locally, build artifacts, and deployment targets.
- **Web layer**
  - Directories: `apps/web/`
  - What to document: UI entrypoints, routing (framework-specific), state management, styling conventions, component patterns, and how to run the dev server.
- **Shared utilities**
  - Directories: `apps/web/lib/`
  - What to document: common helpers used across UI; when to use them; examples.
  - Known export(s): `cn` from `apps/web/lib/utils.ts`.

> Note: Symbol counts and key exports should be updated after repository scanning. Keep this section lightweight unless the architecture is complex.

---

## 8. Key Symbols for This Agent (REQUIRED)

> Link symbols to their defining files so the agent can cite concrete sources.

- `cn` — `apps/web/lib/utils.ts`  
  - Purpose to document: class name composition utility; document expected inputs/outputs and usage examples in UI components.

Add more symbols as they are discovered during documentation tasks, prioritizing:
- Public API handlers (routes/controllers)
- Configuration loaders and env var schemas
- CLI/dev scripts and task runners
- Core domain services and integration clients

---

## 9. Documentation Touchpoints (REQUIRED)

Primary docs to reference and keep updated:

- [`../README.md`](../README.md) — Project overview + quickstart.
- [`../docs/README.md`](../docs/README.md) — Documentation index/hub (ensure new docs are linked here).
- [`../../AGENTS.md`](../../AGENTS.md) — Agent conventions and repo-wide guidance.

Secondary touchpoints (update if present; create if missing and needed):

- `../docs/setup.md` — Local development setup, prerequisites, env vars, troubleshooting.
- `../docs/architecture.md` or `../docs/architecture/` — High-level architecture and boundaries.
- `../docs/api/` — API reference and integration notes.
- `../docs/runbooks/` — Operational playbooks and incident response.
- `../docs/adr/` — Architecture decision records.
- `../CHANGELOG.md` or `../docs/release-notes.md` — User-visible change history.

---

## 10. Collaboration Checklist (REQUIRED)

1. [ ] Confirm scope and audience
   - Who is the doc for (developer/operator/user/integrator)?
   - What task should the reader be able to complete after reading?
2. [ ] Identify sources of truth
   - Locate the relevant code paths, configs, tests, CI workflows, and scripts.
   - Capture exact command names and file paths (avoid paraphrasing).
3. [ ] Validate assumptions with minimal verification
   - Run the documented commands when feasible, or request a maintainer to confirm.
   - Record constraints (OS, Node version, required services) explicitly.
4. [ ] Draft documentation using project conventions
   - Prefer task-based headings and short sections.
   - Add practical examples (commands, payloads, expected output).
5. [ ] Add cross-links and update indexes
   - Add/adjust links in `docs/README.md` and any relevant “next steps” sections.
   - Ensure relative links are correct and stable.
6. [ ] Review for correctness and clarity
   - Request review from a code owner for correctness.
   - Request review from a “cold reader” for clarity and completeness.
7. [ ] Ensure doc changes ship with code
   - Ideally in the same PR; otherwise reference related PRs/issues and track follow-ups.
8. [ ] Capture learnings and reduce future support load
   - Add FAQs/troubleshooting entries for repeated questions.
   - Document notable pitfalls discovered during implementation/review.

---

## 11. Hand-off Notes (optional)

When completing documentation work, leave a short hand-off summary containing:

- Links to the updated/added documentation files and any index updates
- What was verified (commands run, environments assumed, versions used)
- Any remaining uncertainties or “known gaps,” with clear validation steps
- Suggested follow-ups (e.g., add missing `.env.example`, introduce OpenAPI spec, add runbook for common failure, improve docs navigation)

---

## Cross-References

- [`../docs/README.md`](../docs/README.md)
- [`../README.md`](../README.md)
- [`../../AGENTS.md`](../../AGENTS.md)
