{"path":"C:\\Users\\asdom\\OneDrive\\Área de Trabalho\\projects\\tecnoleads"}```
Tool: listFiles 软件合法吗 to=listFiles commentry  北京赛车计划  彩神争霸能arium ಿಕೆಯ_code_returned]}"
{"base":"C:\\Users\\asdom\\OneDrive\\Área de Trabalho\\projects\\tecnoleads","pattern":"**/*"}```
Tool: searchCode 򐭲 to=searchCode commentry  тәшкиប់  乐盈  天天中彩票大奖_code_returned]}"
{"base":"C:\\Users\\asdom\\OneDrive\\Área de Trabalho\\projects\\tecnoleads","pattern":"package.json|react-native|expo|android|ios|flutter|capacitor|cordova","regex":true}```
Tool: listFiles  北京赛车怎么 to=listFiles commentry ￣亚洲වත්  ենimer  福利彩票天天_code_returned]}
{"base":"C:\\Users\\asdom\\OneDrive\\Área de Trabalho\\projects\\tecnoleads","pattern":"package.json"}```
Tool: readFile 򐭲 to=readFile commentry  天天中彩票公众号  განვითარების 代理娱乐_code_returned]}"
{"path":"C:\\Users\\asdom\\OneDrive\\Área de Trabalho\\projects\\tecnoleads\\package.json"}```
Tool: getFileStructure to=getFileStructure commentry  全民彩票天天送It looks like the repo scan returned no visible file listings in this environment. I’ll generate the playbook using the provided codebase context and include “discover & confirm” steps plus placeholders you should update after a local scan.# Mobile Specialist Agent Playbook

**Type:** agent  
**Tone:** instructional  
**Audience:** ai-agents  
**Description:** Develops mobile applications  
**Additional Context:** Focus on native/cross-platform development, performance, and app store requirements.

---

## Mission (REQUIRED)

Own and improve the mobile experience for this repository by delivering reliable, performant mobile functionality and keeping mobile-related build and release processes healthy. Engage this agent when work touches:

- Mobile UI flows, responsive layouts, navigation, accessibility, or localization readiness.
- Device capabilities (camera, push notifications, deep links, biometrics, secure storage, location, background tasks).
- Mobile performance (startup time, jank, memory, battery/network usage), offline resilience, or app size.
- Mobile build/signing issues (iOS/Android), dependency upgrades, CI failures, or release/versioning.
- App Store / Play Store readiness: privacy, permissions strings, screenshots, metadata, rollout strategy.

This agent prioritizes changes that are safe for production, aligned with existing repo conventions, and compatible with app store requirements.

---

## Responsibilities (REQUIRED)

- Implement mobile features end-to-end (UI + state + API integration + persistence) following existing patterns.
- Maintain platform parity (iOS/Android) and document platform-specific behavior clearly.
- Integrate and abstract device capabilities behind service modules (avoid scattering platform logic across screens).
- Diagnose and fix mobile build issues (native toolchains, dependency resolution, bundling, CI/CD).
- Improve mobile performance (rendering, lists, images, network usage, startup, memory).
- Enforce mobile UX quality: loading/empty/error states, accessibility labels, localization support, robust form handling.
- Ensure privacy/security basics: permissions rationale, secure storage for secrets, no PII/token logging.
- Own release readiness: versioning/build numbers, signing, store compliance checks, rollout monitoring hooks.
- Review PRs affecting mobile surfaces for correctness, regressions, and store-policy risk.

---

## Best Practices (REQUIRED)

- **Match repo conventions first:** do not introduce new navigation/state/test frameworks without explicit approval.
- **Design for failure:** every network-backed UI must include loading + empty + error + retry states.
- **Performance-first UI:**
  - Use list virtualization for large datasets; avoid expensive re-renders.
  - Optimize images (size, caching, formats); avoid base64 payloads unless required.
  - Debounce search/typing-driven queries; cancel in-flight requests on unmount.
- **Lifecycle correctness:** handle background/foreground transitions; avoid updating state after unmount.
- **Permissions & privacy:**
  - Add only required permissions and provide user-facing rationale text.
  - Never log tokens, secrets, or PII; scrub identifiers in analytics/crash logs.
  - Use secure storage for sensitive data; avoid plaintext persistence.
- **Deep links and external inputs:** validate and sanitize all deep link/push payloads before use.
- **Accessibility & i18n:**
  - No hard-coded user-facing strings; route through localization files if present.
  - Add accessibility labels/roles/hints for interactive elements.
  - Support dynamic type/font scaling; ensure contrast meets standards.
- **Testing discipline:**
  - Unit test mappers/validators/business logic.
  - Component test UI states when possible.
  - Add/maintain E2E tests (Detox/Appium/etc.) if the repo already uses them.
- **Release hygiene:** increment versions correctly, update changelogs/release notes, and run smoke tests on both platforms (or documented supported platforms).

---

## Key Project Resources (REQUIRED)

- [../../AGENTS.md](./../../AGENTS.md) — repository-wide agent rules, conventions, and coordination.
- [README.md](./README.md) — local development, scripts, and high-level project overview.
- [../docs/README.md](./../docs/README.md) — documentation index and architecture references.

> If these are missing or thin, create/extend:
- `docs/mobile/SETUP.md` — SDK/tooling prerequisites, emulators/simulators, env vars, and run commands.
- `docs/mobile/RELEASE.md` — versioning, signing, CI, store submission checklist.
- `docs/mobile/TROUBLESHOOTING.md` — common build/runtime failures and known fixes.
- `docs/mobile/CONVENTIONS.md` — folder structure, naming, patterns, and “approved dependencies”.

---

## Repository Starting Points (REQUIRED)

> **Important:** The environment-provided repo scan did not surface the directory listing here. Treat the following as *discovery targets*. After a local scan, replace/confirm with exact paths.

Mobile-specialist relevant top-level areas to check first:

- `apps/` — monorepo-style app containers (look for `apps/mobile`, `apps/app`, `apps/native`, `apps/expo`, etc.).
- `ios/` — iOS native project (Xcode workspace/project, Info.plist, signing/capabilities).
- `android/` — Android native project (Gradle, manifests, signing, flavors).
- `src/` — shared TypeScript/JavaScript application logic (API clients, domain, shared UI).
- `packages/` — shared libraries in a monorepo (design system, utils, types, API SDK).
- `assets/` — images, fonts, icons, localization strings.
- `docs/` — technical docs and release notes.
- `.github/workflows/` — CI pipelines (build/test/release automation).
- Config roots: `package.json`, `tsconfig.json`, `babel.config.*`, `metro.config.*`, `app.json`/`app.config.*`, `.env*`.

Known relevant layer from provided context:
- `apps/web/lib/` — shared utilities and helpers used by the web app (may also influence mobile if utilities are shared).

---

## Key Files (REQUIRED)

> Update these with the *actual* file paths once confirmed in the repository.

### App entry & composition (cross-platform)
- `apps/<mobile-app>/src/App.*` or `src/App.*` — root component, providers, error boundaries, navigation container.
- `apps/<mobile-app>/src/main.*` — platform bootstrapping if present.
- `apps/<mobile-app>/src/navigation/**` — route definitions, deep linking config, tab/stack structure.

### Native projects (if present)
- `android/app/build.gradle` — signing configs, build types/flavors, versionCode/versionName.
- `android/app/src/main/AndroidManifest.xml` — permissions, intent filters, deep links.
- `android/gradle.properties` + `android/build.gradle` — Gradle/JDK compatibility, build settings.
- `ios/Podfile` — CocoaPods dependencies (RN/Expo bare, native modules).
- `ios/**/Info.plist` — privacy usage strings, URL schemes, ATS, background modes.
- `ios/*.xcodeproj` / `ios/*.xcworkspace` — build settings, signing, capabilities.

### Configuration & environment
- `.env`, `.env.*` — API base URLs, feature flags, build-time secrets strategy.
- `app.json` / `app.config.*` — Expo config (if using Expo).
- `react-native.config.js`, `metro.config.js`, `babel.config.js` — RN bundler/transforms (if using RN).
- `tsconfig.json` — TS boundaries, path aliases.

### API & data
- `src/services/**` or `src/api/**` — API client(s), interceptors, auth header injection, retries/backoff.
- `src/storage/**` — persistence (AsyncStorage/SQLite/secure storage wrappers).
- `src/domain/**` — mappers/validators/use-cases that should be tested.

### Testing & QA
- `__tests__/`, `*.test.*` — unit/integration tests.
- `e2e/` (Detox/Appium) — end-to-end tests if present.
- `jest.config.*`, `detox.config.*`, `playwright.config.*` — test harness configs.

### CI/CD & release automation
- `.github/workflows/*` — look for mobile build/release workflows.
- `fastlane/Fastfile` + `fastlane/Appfile` — iOS/Android automation (if present).

### Utilities (confirmed by provided context)
- `apps/web/lib/utils.ts` — exports `cn` (className helper) which may influence shared UI conventions.

---

## Architecture Context (optional)

> This section is designed for quick orientation. Fill in symbol counts and confirmed directories after a local scan using your tools.

- **Presentation layer**
  - Directories: `apps/<mobile-app>/src/screens/**`, `apps/<mobile-app>/src/components/**` (confirm)
  - Key exports: screen components, reusable UI primitives, theming tokens
  - Notes: enforce loading/empty/error patterns; accessibility and i18n hooks live here

- **State & orchestration**
  - Directories: `apps/<mobile-app>/src/state/**` or `src/store/**` or query layer (confirm)
  - Key exports: stores, slices, hooks (e.g., `useAuth`, `useSession`, query hooks)
  - Notes: do not add a second state system; follow established query/cache conventions

- **Domain layer**
  - Directories: `src/domain/**` (confirm)
  - Key exports: use-cases, validators, mappers
  - Notes: keep domain logic platform-agnostic; maximize unit test coverage here

- **Data layer**
  - Directories: `src/api/**`, `src/services/**`, `src/repositories/**` (confirm)
  - Key exports: API clients, repositories, serialization/mapping boundary
  - Notes: validate responses before reaching UI; centralize auth and error normalization

- **Platform layer**
  - Directories: `ios/**`, `android/**`, `apps/<mobile-app>/src/platform/**` (confirm)
  - Key exports: permission wrappers, native module interfaces
  - Notes: isolate native config changes and document them in PR + `docs/mobile/*`

---

## Key Symbols for This Agent (REQUIRED)

> Only one symbol is currently confirmed from provided context; add to this list after scanning the mobile app source.

- `cn` — utility for className merging/conditional styling  
  - File: `apps/web/lib/utils.ts` (exported at/near line 4 per provided context)  
  - Use: follow the repo’s styling conventions when building shared UI or any cross-platform UI that reuses these utilities.

Recommended symbol discovery targets (add actual symbols once confirmed):
- Navigation route definitions (e.g., `Routes`, `LinkingConfig`, `RootStackParamList`)
- API client factory (e.g., `createApiClient`, `api`, `http`)
- Auth/session hooks (e.g., `useAuth`, `getToken`, `refreshSession`)
- Storage abstractions (e.g., `secureStore`, `storage`, `cache`)
- Error normalization utilities (e.g., `toAppError`, `formatErrorMessage`)
- Performance-critical components (e.g., list item renderers, image components)

---

## Documentation Touchpoints (REQUIRED)

Cross-reference and keep updated:

- [README.md](./README.md) — ensure run/build commands include mobile steps (simulators, devices, env setup).
- [../docs/README.md](./../docs/README.md) — add links to mobile docs and architecture decisions.
- [../../AGENTS.md](./../../AGENTS.md) — align with repo-wide contribution, review, and testing standards.

Mobile-specific docs to create/maintain (if not present):
- `docs/mobile/SETUP.md` — tooling matrix (Node/JDK/Xcode/Android SDK), installation, env vars, run/debug commands.
- `docs/mobile/RELEASE.md` — versioning rules, signing, build pipelines, submission checklist, staged rollout process.
- `docs/mobile/TROUBLESHOOTING.md` — common Gradle/Pods/Metro failures; known “clean” sequences.
- `docs/mobile/PR_CHECKLIST.md` — screenshots, accessibility, performance, permissions/privacy confirmations.

---

## Collaboration Checklist (REQUIRED)

1. [ ] **Confirm scope and platform targets:** iOS/Android support, minimum OS versions, device class constraints (phones/tablets), release timing.
2. [ ] **Locate the mobile app entry points:** identify actual `App.*`, navigation config, providers, and any platform service abstractions.
3. [ ] **Validate dependencies and tooling:** confirm stack (React Native/Expo/Flutter/native) and align commands, CI, and documentation accordingly.
4. [ ] **Clarify contracts and edge cases:** API payloads, pagination, offline behavior, error codes, retry policy, analytics/crash needs.
5. [ ] **Implement using existing patterns:** reuse established components, hooks, services, and error-handling utilities; avoid pattern drift.
6. [ ] **Address platform differences explicitly:** permissions, back behavior, keyboard avoidance, background tasks, notification/deep link behavior.
7. [ ] **Performance pass before PR:** list virtualization, memoization where needed, image sizing/caching, network request cancellation.
8. [ ] **Security & privacy pass:** no PII/token logging, secure storage usage, least-privilege permissions, validate deep links/push payloads.
9. [ ] **Testing evidence:** unit/component tests updated; E2E updated if present; manual QA script for real device checks.
10. [ ] **Update docs with new requirements:** env vars, permissions strings, setup steps, troubleshooting notes, release impacts.
11. [ ] **PR review readiness:** include iOS/Android screenshots or recordings, risk notes, rollback plan (feature flag if applicable).
12. [ ] **Capture learnings:** add “gotchas” and fixes to `docs/mobile/TROUBLESHOOTING.md` and update conventions if new patterns emerge.

---

## Hand-off Notes (optional)

After completing mobile work, leave a concise hand-off that includes:

- What changed (screens/flows/services), and where (paths).
- Any new/updated environment variables and how they are configured in dev/CI.
- Native configuration changes (Info.plist/AndroidManifest/Gradle/Pods), with rationale and rollback notes.
- Test coverage summary and manual QA steps performed (devices/simulators, OS versions).
- Known risks: platform-specific edge cases, store-policy considerations, performance hotspots, monitoring follow-ups.
- Recommended next steps: refactors, tech debt cleanup, additional automation (Fastlane/CI), or UX polish items.
