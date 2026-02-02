# Development Workflow

This repository follows a lightweight, developer-first workflow optimized for small, frequent changes. The goal is to keep the default branch always releasable, reduce long-running divergence, and make it easy to review and ship improvements safely.

---

## Day-to-day process

1. **Pick work**
   - Start from an issue/ticket (or create one) describing the change, acceptance criteria, and any user-facing impact.
   - If the change affects behavior, define expected outcomes and test coverage up front (see [testing-strategy.md](./testing-strategy.md)).

2. **Create a short-lived branch**
   - Branch from the default branch (typically `main`) and keep the scope tight.
   - Prefer incremental PRs over large “big bang” changes.

3. **Implement with fast feedback**
   - Run the app/service locally, iterate, and keep changes buildable.
   - Add/adjust tests alongside code changes.
   - Use the project tooling and scripts consistently (see [tooling.md](./tooling.md)).

4. **Open a Pull Request early**
   - Open a PR as soon as the direction is clear (even as “Draft”) to enable early review and collaboration.
   - Describe the **why**, **what**, and **how to validate**.

5. **Review, refine, and merge**
   - Address feedback, keep the PR focused, and ensure checks pass.
   - Merge using the repository’s preferred merge strategy (see [Branching & Releases](#branching--releases)).

6. **Release and verify**
   - Follow the release/tagging conventions below.
   - Confirm behavior in the target environment and close the loop by updating the issue/ticket with outcome notes.

---

## Branching & Releases

### Branching model: trunk-based development

- `main` is the single source of truth and should remain deployable.
- Feature branches are **short-lived** and merged frequently.

### Branch naming

Use a consistent prefix to communicate intent:

- `feat/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

If you track work in an issue system, include the ID:

- `feat/PROJ-123-add-lead-import`

### Pull Requests (PRs)

- Prefer **small PRs** that can be reviewed in under ~30 minutes.
- Use **Draft PRs** when work is in progress.
- Keep branches up to date with `main` if the PR lives longer than a day or two.

### Merge strategy

- Prefer **Squash merge** to keep history linear and easy to audit.
- Ensure the PR title and/or squash commit message is meaningful (what changed + why).
- Avoid merging broken builds into `main`.

### Releases & cadence

- Release cadence depends on product needs, but this workflow assumes you can release **frequently**.
- Releases should be **tagged** so builds can be traced back to a commit.

### Tagging convention

- Use Semantic Versioning tags where applicable: `vMAJOR.MINOR.PATCH` (e.g., `v1.4.2`).
- If the repository is not versioned as a package, use date-based tags when appropriate:
  - `release-YYYY-MM-DD` (e.g., `release-2026-02-02`)

### Hotfixes

If a production issue requires immediate action:

1. Branch from the tagged release (or the relevant commit).
2. Apply the fix, and open a PR targeting `main`.
3. Tag a patch release after merge (e.g., `v1.4.3`).
4. Backport only when necessary; prefer forward fixes into `main`.

---

## Local Development

Use the scripts and tooling defined in the repository to keep environments consistent. If your local commands differ, check [tooling.md](./tooling.md) for the authoritative setup guidance.

### Install dependencies

```sh
npm install
```

### Run locally (development mode)

```sh
npm run dev
```

### Run tests

```sh
npm test
```

For deeper guidance on what to run and when, see [testing-strategy.md](./testing-strategy.md).

### Build for distribution / production

```sh
npm run build
```

### Optional: lint/format (if configured)

```sh
npm run lint
npm run format
```

If you encounter environment issues (Node version, package manager expectations, editor setup, pre-commit hooks), refer to [tooling.md](./tooling.md).

---

## Code Review Expectations

Code review is a shared quality gate and knowledge-sharing practice. Reviews should focus on correctness, maintainability, security, and alignment with project conventions—not personal style preferences.

### PR description should include

- Problem statement and motivation (**why**).
- Summary of changes (**what**).
- How to validate (commands, steps, screenshots/logs if relevant).
- Risk notes (areas likely to break, rollout considerations).
- Any follow-ups intentionally deferred.

### Reviewer checklist

- **Correctness**
  - Behavior matches requirements and edge cases are considered.
  - No obvious regressions; changes are scoped to the intended area.
- **Testing**
  - New logic includes tests and existing tests remain meaningful.
  - Tests are deterministic (no time/network flakiness where avoidable).
  - See [testing-strategy.md](./testing-strategy.md) for expectations by change type.
- **Design & maintainability**
  - Names are clear; complexity is justified.
  - Code follows established patterns in the codebase.
  - Avoids unnecessary coupling and keeps modules cohesive.
- **Security & data handling**
  - Inputs are validated; sensitive data is not logged.
  - Permissions/auth boundaries are respected where applicable.
- **Performance & reliability**
  - Avoids obvious inefficiencies or unbounded operations.
  - Failure modes are handled and surfaced appropriately.
- **Documentation**
  - Updates docs when behavior, configuration, or operational steps change.
  - Notes any migration steps or breaking changes.

### Approvals

- Default expectation: **at least one approval** from a project maintainer or knowledgeable contributor before merging.
- High-risk changes (security, data migrations, production-impacting behavior) should get **two reviews** when possible.

### Agent-assisted work

- If collaborating with automation/agents, follow guidance in `AGENTS.md` (prompting conventions, change boundaries, and review tips).
- Agent-generated code must be held to the same bar: tests, clarity, and minimal scope.

---

## Onboarding Tasks (optional)

For new contributors:

1. **Get a local environment running**
   - Follow [Local Development](#local-development).
   - Verify you can run the test suite (see [testing-strategy.md](./testing-strategy.md)).

2. **Read the project conventions**
   - Tooling, scripts, and expected versions: [tooling.md](./tooling.md)
   - Testing expectations and what “done” means: [testing-strategy.md](./testing-strategy.md)
   - Agent collaboration practices: `AGENTS.md`

3. **Start with low-risk changes**
   - Documentation improvements, small bug fixes, or test coverage additions are ideal first PRs.
   - Look for “good first issue”, “help wanted”, or similarly labeled tickets in your tracker (or ask maintainers for starter work).

4. **Ask for early feedback**
   - Open a Draft PR early if you’re unsure about approach or scope.
   - Use the PR description to explicitly list questions you want reviewed.

---

## Related Resources

- [testing-strategy.md](./testing-strategy.md)
- [tooling.md](./tooling.md)
