# Tooling & Productivity Guide

This guide consolidates the tools, scripts, automation, and editor settings used in this repository to keep day-to-day development fast and consistent across contributors.

Pair this with **[development-workflow.md](./development-workflow.md)** for workflow conventions (branching, PR expectations, environments, etc.). This document focuses specifically on **tooling**: what to install, which commands to run, and how to configure your editor and automation so you get feedback early.

---

## Repository at a glance

- **Main app**: `apps/web`
- **Shared utilities**: `apps/web/lib`
  - Includes the exported `cn()` helper in `apps/web/lib/utils.ts` used for composing class names (commonly referenced throughout UI components).

---

## Required Tooling

Install these first (top-to-bottom) before running any project scripts.

### Git

- **Why**: Source control, branching, PRs, and hooks (if configured).
- **Install**
  - Windows: https://git-scm.com/download/win
  - macOS: `brew install git`
  - Linux (Debian/Ubuntu): `sudo apt-get install git`
- **Check**
  ```bash
  git --version
  ```

### Node.js + package manager

- **Why**: The repo relies on `package.json` scripts for local development, builds, linting/formatting, and CI parity.
- **Install (recommended)**: Use a Node version manager
  - macOS/Linux: `nvm` — https://github.com/nvm-sh/nvm
  - Windows: `nvm-windows` — https://github.com/coreybutler/nvm-windows
- **Version**: Use the version required by the repository config (in priority order):
  - `.nvmrc`
  - `.node-version`
  - `package.json > engines`
- **Package manager**: Prefer the one used by this repository:
  - `npm` / `pnpm` / `yarn` (check for `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`)
- **Check**
  ```bash
  node -v
  npm -v   # or pnpm -v / yarn -v
  ```

### Docker (recommended if containers exist)

- **Why**: Reproducible services (databases/queues), consistent local environments, easier onboarding.
- **Install**: https://www.docker.com/products/docker-desktop/
- **Check**
  ```bash
  docker --version
  docker compose version
  ```

### VS Code (or equivalent IDE)

- **Why**: This guide provides VS Code suggestions; other IDEs are fine if they match formatting/linting behavior.
- **Install**: https://code.visualstudio.com/

### Environment file support

- **Why**: Local development commonly requires environment variables.
- **Expectation**: If provided, copy `.env.example` → `.env` (or the repo’s equivalent).
- **Important**: Do not commit `.env` unless the repo explicitly requires it.

---

## Package scripts (local automation)

Most automation is standardized via `package.json` scripts. Common conventions:

- **Install dependencies**
  ```bash
  npm install
  ```
- **Run the dev server**
  ```bash
  npm run dev
  ```
- **Build**
  ```bash
  npm run build
  ```
- **Run tests**
  ```bash
  npm test
  # or:
  npm run test
  ```
- **Lint**
  ```bash
  npm run lint
  ```
- **Format**
  ```bash
  npm run format
  ```
- **Typecheck (TypeScript)**
  ```bash
  npm run typecheck
  ```

To see the actual scripts available in this repo, run:

```bash
npm run
```

> Tip: If the repository uses `pnpm` or `yarn`, replace `npm` accordingly.

---

## Pre-commit hooks (recommended)

If the project uses pre-commit hooks (commonly Husky + lint-staged), they should enforce quick, consistent checks on staged files:

- Format staged files (Prettier)
- Lint staged files (ESLint)
- Optional (if fast): typecheck or a small unit test set

Typical expectations:

1. Install dependencies (hooks often install on `npm install`):
   ```bash
   npm install
   ```
2. Verify hooks by committing a small change.
3. If hooks are missing/not firing:
   - Check for `.husky/` (Husky configuration)
   - Inspect `.git/hooks` (git hook installation location)

**Best practice**: Keep hooks fast; run full suites in CI.

---

## Watch modes & fast feedback loops

Prefer watch/serve modes during development:

- **Dev server**
  ```bash
  npm run dev
  ```
- **Tests in watch mode** (if available)
  ```bash
  npm run test:watch
  ```
- **Lint watch mode** (less common, but useful)
  ```bash
  npm run lint:watch
  ```

If these scripts don’t exist yet, consider adding them for common workflows to reduce context switching.

---

## Code generation / scaffolding (if applicable)

If the project includes generators (API clients, DB schema, component scaffolds), standardize a small set of scripts, for example:

- `npm run generate`
- `npm run generate:types`
- `npm run db:migrate`
- `npm run db:seed`

**Guidelines**
- Generated artifacts should be deterministic.
- Document:
  - where code is generated
  - when generation should run (post-checkout, pre-build, CI)
  - whether generated code is committed or produced at build time

---

## CI alignment (run what CI runs)

Local commands should match CI behavior as closely as possible. A typical baseline is:

```bash
npm run lint
npm run test
npm run build
```

When introducing new tooling, update this document and keep **development-workflow.md** consistent.

---

## IDE / Editor Setup (VS Code)

### Recommended extensions

- **ESLint** (`dbaeumer.vscode-eslint`)  
  Inline lint errors; can auto-fix when configured.
- **Prettier** (`esbenp.prettier-vscode`)  
  Consistent formatting across contributors.
- **EditorConfig** (`EditorConfig.EditorConfig`)  
  Keeps indentation/line endings consistent if `.editorconfig` exists.
- **Docker** (`ms-azuretools.vscode-docker`)  
  Useful for Dockerfiles and Compose workflows.
- **GitLens** (`eamodio.gitlens`) (optional)  
  Enhanced blame/history visibility.

### Workspace settings

If the repo uses VS Code workspace settings, align with a `.vscode/settings.json` like:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.eol": "\n"
}
```

Notes:
- If you format via ESLint instead of Prettier, set `editor.defaultFormatter` accordingly.
- `"explicit"` avoids unexpected edits; use `true` if your team prefers always-on fixups.

### Recommended `.editorconfig` (if missing)

If the repository doesn’t include one, consider:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

---

## Productivity Tips

### Shell aliases

Create simple aliases for frequently used commands:

```bash
alias ni="npm install"
alias nd="npm run dev"
alias nl="npm run lint"
alias nf="npm run format"
alias nt="npm test"
```

On Windows PowerShell, you can create functions in your profile (`$PROFILE`) similarly.

### Clean reinstall for dependency issues

If installs behave unexpectedly:

```bash
# npm
rm -rf node_modules package-lock.json
npm install
```

(Adjust lockfile for `pnpm` / `yarn`.)

### Container-first workflow (when supported)

If Docker Compose provides dependencies (DB, cache, etc.):

```bash
docker compose up -d
npm run dev
```

Stop containers when done:

```bash
docker compose down
```

### Keep secrets out of terminals and history

- Prefer gitignored `.env` files.
- Avoid exporting secrets into shell history.
- Use OS keychain/credential managers where practical.

---

## Related Resources

- **[development-workflow.md](./development-workflow.md)**
- Utilities overview: `apps/web/lib/utils.ts` (exports `cn()` for class name composition)
