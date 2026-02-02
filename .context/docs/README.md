# Documentation Hub (`docs/README.md`)

This folder (`docs/`) is the canonical starting point for understanding the project beyond the top-level repository `README`. Use this page as a navigation index to the most important guides, specs, and reference material.

---

## How to use these docs

Recommended reading order:

1. **Project Overview** → What the product is, goals, scope, and high-level roadmap.
2. **Architecture Notes** → How the system is structured and why (boundaries, decisions, dependencies).
3. **Development Workflow** → How to work in the repo day-to-day (branches, CI, conventions).
4. **Testing Strategy** → How quality is ensured and how to run/extend tests.
5. Then consult the remaining guides as needed (domain, integrations, security, tooling).

---

## Core Guides

- [Project Overview](./project-overview.md)  
  High-level description of the project: goals, scope, stakeholders, and roadmap.

- [Architecture Notes](./architecture.md)  
  System structure, major components, boundaries, and architectural decisions.

- [Development Workflow](./development-workflow.md)  
  Branching strategy, commit conventions, CI expectations, local setup notes, and contribution flow.

- [Testing Strategy](./testing-strategy.md)  
  Test pyramid and suite breakdown, how to run tests, CI gates, and known limitations.

- [Glossary & Domain Concepts](./glossary.md)  
  Business terminology, core domain entities, and shared language for the team.

- [Data Flow & Integrations](./data-flow.md)  
  Data movement through the system, external integrations, events/queues (if applicable), and failure modes.

- [Security & Compliance Notes](./security.md)  
  Authentication/authorization model, secrets management, compliance constraints, and secure coding practices.

- [Tooling & Productivity Guide](./tooling.md)  
  Scripts, linters/formatters, IDE/editor settings, and productivity tips.

---

## Repository Snapshot (key top-level specs)

These files/directories contain product and implementation context that may feed into the docs above:

- `backlog_mvp.md/` — MVP backlog and prioritized scope (may be a folder depending on structure).
- `design_spec.md/` — UX/design specifications and flows.
- `prd.md/` — Product requirements document.
- `regras.md/` — Business rules / domain constraints.
- `stack.md/` — Technology stack decisions and rationale.

When updating docs, prefer linking to these sources rather than duplicating large sections verbatim.

---

## Document Map

A quick index of what each guide is expected to contain and which sources it should draw from:

| Guide | File | Primary Inputs |
| --- | --- | --- |
| Project Overview | `project-overview.md` | Roadmap, README, stakeholder notes |
| Architecture Notes | `architecture.md` | ADRs, service boundaries, dependency graphs |
| Development Workflow | `development-workflow.md` | Branching rules, CI config, contributing guide |
| Testing Strategy | `testing-strategy.md` | Test configs, CI gates, known flaky suites |
| Glossary & Domain Concepts | `glossary.md` | Business terminology, user personas, domain rules |
| Data Flow & Integrations | `data-flow.md` | System diagrams, integration specs, queue topics |
| Security & Compliance Notes | `security.md` | Auth model, secrets management, compliance requirements |
| Tooling & Productivity Guide | `tooling.md` | CLI scripts, IDE configs, automation workflows |

---

## Contributing to documentation

When adding or updating documentation:

- Keep guides **task-oriented** (how to do X) and **decision-oriented** (why X is done this way).
- Add links between related guides (e.g., Architecture ↔ Data Flow ↔ Security).
- Prefer small, focused updates with clear commit messages.
- If you introduce a new guide, add it to:
  - **Core Guides** section above, and
  - the **Document Map** table with its primary inputs.

---

## Related code reference (utilities)

While `docs/` focuses on product and engineering guides, there is at least one small shared utility worth knowing about when reading or updating technical docs that reference front-end conventions:

- **`cn` utility**: exported from `apps/web/lib/utils.ts`  
  Used to compose conditional CSS class names in the web app. If your docs include UI implementation examples or snippets, prefer the project’s existing `cn` helper rather than introducing new class-merging patterns.

> See: `apps/web/lib/utils.ts` (export: `cn`)
