# Project Overview — TecnoLeads

TecnoLeads is a lead-management and workflow automation project built to help teams capture, organize, and follow up on inbound opportunities with less manual effort. It centralizes the “from first contact to qualified lead” journey so sales and operations can move faster, keep data consistent, and reduce the risk of leads getting lost across tools and spreadsheets.

This document explains how the repository is organized, where to start, and how to navigate the project’s public utilities and supporting documentation.

---

## Repository at a Glance

- **Repository root:** `C:\Users\asdom\OneDrive\Área de Trabalho\projects\tecnoleads`
- **Primary documentation hub:** `docs/`
- **Codebase reference snapshot:** [`docs/codebase-map.json`](./codebase-map.json) (recommended starting point for up-to-date structure, entry points, and exports)

> For exact file counts, dependency graphs, and entry points in the current revision, use [`codebase-map.json`](./codebase-map.json) as the source of truth.

---

## Architecture & Code Organization

### High-level zones

Treat top-level directories as *capability zones* (product code vs. docs vs. automation). The exact tree can vary over time, so validate via the repo tree or [`codebase-map.json`](./codebase-map.json).

Common folders you may encounter:

- `docs/` — Project documentation (this file, architecture notes, workflows, tooling)
- `apps/` — Application(s) and runtime code (for example, the web app)
- `src/` (if present) — Core product code (domain logic/services/UI, depending on stack)
- `tests/` / `__tests__/` (if present) — Automated tests, fixtures, test utilities
- `scripts/` (if present) — Maintenance scripts (migrations, dev helpers)
- `config/` (if present) — Shared configuration (linting/build/runtime)
- `.github/` (if present) — CI workflows, templates, automation

### Utilities layer

The current symbol index highlights a utilities area:

- **Utils:** `apps/web/lib`

This is typically where shared, framework-agnostic helpers live (often consumed across UI components and feature modules).

---

## Entry Points (Where to Start)

Because TecnoLeads may include multiple runtimes (web app, API/server, scripts), “entry points” depend on what you’re working on.

Use [`codebase-map.json`](./codebase-map.json) → **Entry points** for the authoritative list, typically including:

- Main application entry (web runtime)
- Server/API entry (if present)
- CLI entry (if present)
- Library/public exports (shared modules)

---

## Public API & Key Exports

To avoid documentation drift, the full exported surface area is not duplicated here. Use:

- [`codebase-map.json`](./codebase-map.json) → **Exports/public API**

### Notable current export: `cn`

The current symbol index identifies one exported utility:

- **`cn`** — exported from `apps/web/lib/utils.ts`

This is commonly used in modern TypeScript/React codebases as a “class name composer” utility (often combining conditional classes and/or merging Tailwind classes). Confirm exact behavior in:

- `apps/web/lib/utils.ts`

#### Typical usage pattern

```ts
import { cn } from "@/lib/utils";

const classes = cn(
  "base",
  isActive && "active",
  isDisabled ? "opacity-50" : "opacity-100",
);
```

> Note: The exact import path alias (`@/lib/utils`) depends on your TS config/bundler setup. Use the actual relative or aliased path used elsewhere in the repo.

---

## Technology Stack Summary

TecnoLeads is structured as a modern, multi-environment codebase intended to support:

- Local development (“dev server” workflows)
- Repeatable builds
- CI validation (tests/lint/build gates)

For the precise toolchain, frameworks, and dependency list, consult:

- [`codebase-map.json`](./codebase-map.json)
- Package manifests (e.g., `package.json`, workspace configs) in the repo root and `apps/*` (if present)

---

## Development Workflow (Recommended Path)

Use these docs as your “happy path”:

- [`development-workflow.md`](./development-workflow.md) — how to install, run, test, and verify changes
- [`tooling.md`](./tooling.md) — prerequisites (runtime versions, package managers, required services)
- [`architecture.md`](./architecture.md) — boundaries, layering, and constraints

### Getting started checklist

1. Install prerequisites from [`tooling.md`](./tooling.md).
2. Install dependencies (use canonical commands from [`development-workflow.md`](./development-workflow.md)).
3. Configure environment:
   - Copy `.env.example`/templates if present.
   - Set required secrets/URLs for local dev.
4. Run the project in development mode (see [`development-workflow.md`](./development-workflow.md)).
5. Verify health (tests and/or smoke checks from [`development-workflow.md`](./development-workflow.md)).
6. Review architecture boundaries:
   - Read [`architecture.md`](./architecture.md)
   - Use [`codebase-map.json`](./codebase-map.json) to understand module relationships

---

## Navigation Tips

- Use [`codebase-map.json`](./codebase-map.json) when you need:
  - The current repo structure
  - Entry points per runtime
  - Exported/public APIs
  - Dependency and architecture mapping
- Use `docs/architecture.md` when deciding *where new code should live* and what patterns to follow.
- Start from `apps/` when you’re implementing product features (UI/flows), and from `apps/web/lib` when you need shared helpers.

---

## Related Documentation

- [Architecture](./architecture.md)
- [Development workflow](./development-workflow.md)
- [Tooling](./tooling.md)
- [Codebase map](./codebase-map.json)
