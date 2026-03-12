# Code Audit: Ancol 360° CDP Dashboard — Full Webapp
Date: 2026-03-09

## Summary
- **Files reviewed:** 42 TypeScript/TSX source files across src/app, src/components, src/data, src/lib
- **Issues found:** 22 (4 critical, 9 major, 9 minor)
- **Test coverage:** 0% (no test infrastructure)
- **Rules applied:** security-principles.md, accessibility-principles.md, testing-strategy.md, typescript-idioms-and-patterns.md, code-organization-principles.md

---

## Critical Issues
Issues that must be fixed before deployment.

- [ ] **[TESTING] No test infrastructure exists** — `package.json` has no test script, no test runner (Vitest/Jest), no test dependencies, and 0 test files across all 42 source files. Violates testing-strategy.md requirement of >85% unit coverage. High-risk untested components include `SiteNav.tsx` (223 lines, stateful), `AnimatedCounter.tsx`, and all 12 page routes.
  - `package.json` (scripts block — no `test`, `test:watch`, `test:coverage`)

- [ ] **[ACCESSIBILITY] Interactive divs not keyboard accessible** — `UseCasesClient.tsx` has interactive `motion.div` elements for domain hotspots (lines ~143–159) and use-case grid cards (lines ~268–300), and `ArchitectureClient.tsx` has clickable layer cards (line ~122). None have `tabIndex`, `role="button"`, or `onKeyDown` handlers. Users cannot activate these via keyboard. Violates accessibility-principles.md: *"All interactive elements must be reachable via Tab key"* and WCAG 2.1 AA 2.1.1.
  - `src/app/use-cases/UseCasesClient.tsx` (hotspot divs ~L143–159, card divs ~L268–300)
  - `src/app/architecture/ArchitectureClient.tsx` (LayerCard motion.div ~L122–124)

- [ ] **[ACCESSIBILITY] Navigation drawer and use-case modal missing ARIA dialog semantics** — `SiteNav.tsx` drawer lacks `role="dialog"`, `aria-label`, `aria-modal`, and focus trap. `UseCasesClient.tsx` modal (~L322–335) lacks `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and focus trap. No focus restoration on close. Violates accessibility-principles.md: *"Custom components implement proper keyboard patterns (Escape to close modals)"*.
  - `src/components/SiteNav.tsx` (drawer ~L144–148)
  - `src/app/use-cases/UseCasesClient.tsx` (modal ~L322–335)

- [ ] **[LINT] No ESLint configuration** — `npm run lint` fails with an interactive setup prompt; ESLint is not configured. No `.eslintrc.*` or `eslint.config.*` file exists. TypeScript-specific lint rules (`@typescript-eslint/recommended-type-checked`) are entirely absent. This means static analysis (unused imports, floating promises, `any` types) runs silently in production builds.
  - `package.json` (lint script calls `next lint` with no config)

---

## Major Issues
Issues that should be fixed in the near term.

- [ ] **[ACCESSIBILITY] Accordion layer cards missing `aria-expanded`** — `ArchitectureClient.tsx` LayerCard (~L104–130) toggles `expandedLayerId` state on click but does not set `aria-expanded` on the trigger element or `aria-controls` pointing to the expanded panel. Screen readers cannot determine if a layer is expanded or collapsed. Violates accessibility-principles.md: *"Use aria-expanded, aria-controls for disclosure patterns"*.
  - `src/app/architecture/ArchitectureClient.tsx` (~L104–130)

- [ ] **[ACCESSIBILITY] Toggle and phase buttons missing `aria-pressed`/`aria-current`** — `ProblemClient.tsx` Before/After toggle buttons (~L214–226) and `RoadmapClient.tsx` timeline phase buttons (~L65–97) control visible state but have no `aria-pressed` or `aria-current` attribute to communicate active state to screen readers.
  - `src/app/problem/ProblemClient.tsx` (~L214–226)
  - `src/app/roadmap/RoadmapClient.tsx` (~L65–97)

- [ ] **[ACCESSIBILITY] Incorrect heading hierarchy** — `ArchitectureClient.tsx` uses `h1` for the eyebrow label "SYSTEM ARCHITECTURE" (~L21) and `h2` for the primary page title. Each page should have exactly one `<h1>` that is the primary page heading, not the decorative eyebrow. Violates accessibility-principles.md: *"Each page has exactly one h1, with proper heading hierarchy (h1 → h2 → h3, no skipping)"*.
  - `src/app/architecture/ArchitectureClient.tsx` (~L21–26)

- [ ] **[TYPESCRIPT] `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` not enabled** — `tsconfig.json` enables `strict: true` but omits these two options required by typescript-idioms-and-patterns.md. Without `noUncheckedIndexedAccess`, indexed Record access (e.g., `ICON_MAP[point.icon]` in `ProblemClient.tsx:117`, `heroUseCasesMap[heroDomain]` in `UseCasesClient.tsx:52`) returns typed values that can silently be `undefined`. Without `exactOptionalPropertyTypes`, optional fields like `unit?: string` accept explicit `undefined`.
  - `tsconfig.json` (compilerOptions block)
  - `src/app/problem/ProblemClient.tsx` (~L117)
  - `src/app/use-cases/UseCasesClient.tsx` (~L52)

- [ ] **[TYPESCRIPT] `ICON_MAP` Record accessed without type guard** — `ProblemClient.tsx:117` does `const IconComponent = ICON_MAP[point.icon]` with no null check. If `point.icon` doesn't match a key, `IconComponent` is `undefined` and the subsequent `<IconComponent />` JSX render will throw at runtime. No fallback or guard exists.
  - `src/app/problem/ProblemClient.tsx` (~L117–128)

- [ ] **[RELIABILITY] `dangerouslySetInnerHTML` used to inject CSS keyframes** — `DataFlowClient.tsx:69` injects a `<style>` block via `dangerouslySetInnerHTML`. The content is hardcoded and safe today, but this pattern creates a maintenance footprint where future contributors may accidentally pass unsanitized content. Should be replaced with Tailwind `@keyframes` in `globals.css` or a CSS module.
  - `src/app/data-flow/DataFlowClient.tsx` (~L69)

- [ ] **[RELIABILITY] No React Error Boundary** — No `ErrorBoundary` component exists anywhere in the codebase. Client component render errors (e.g., from `ICON_MAP` undefined access, or Framer Motion animation failures) will cause a full white-screen crash. A root-level or per-page error boundary is required to gracefully handle component failures.
  - `src/app/layout.tsx` (no error boundary wrapping `{children}`)

- [ ] **[CODE QUALITY] Large monolithic components** — Three client components significantly exceed the 50-line guideline in code-organization-principles.md and contain multiple distinct responsibilities that impede testing and readability:
  - `src/app/use-cases/UseCasesClient.tsx` — 391 lines: hero hotspot section, filter bar, grid view, and modal dialog all in one file
  - `src/app/journey/JourneyClient.tsx` — 343 lines: 4 journey phases + slider + phone mockup
  - `src/app/problem/ProblemClient.tsx` — 315 lines: headline, pain-point grid, quote callout, before/after viz

---

## Minor Issues
Style, naming, or minor improvements.

- [ ] **[TYPESCRIPT] `DOMAIN_COLORS` not marked readonly** — `src/data/use-cases.ts:37` exports `DOMAIN_COLORS: Record<string, string>` as a mutable object. Should use `as const` or `Readonly<Record<...>>` to prevent accidental mutation and enable narrower literal types. Applies to similar constants across data files.
  - `src/data/use-cases.ts` (~L37)

- [ ] **[TYPESCRIPT] Default exports throughout — prefer named exports** — All 20+ component files use `export default`, including `SiteNav`, `PageShell`, `KPICard`, `PageTransition`, all `*Client.tsx` files. TypeScript idioms rule states: *"Prefer named exports over default exports"* for refactor safety and IDE auto-import reliability.
  - `src/components/SiteNav.tsx`, `src/components/PageShell.tsx`, `src/components/KPICard.tsx`, all Client components

- [ ] **[ACCESSIBILITY] Scroll chevron SVG missing `aria-hidden`** — `HomeClient.tsx:98–110` contains a decorative scroll indicator SVG with no `aria-hidden="true"`. Screen readers will attempt to read its polyline coordinates as content.
  - `src/app/HomeClient.tsx` (~L98–110)

- [ ] **[ACCESSIBILITY] Modal close button touch target too small** — `UseCasesClient.tsx` modal close button is `w-8 h-8` (32px). WCAG 2.5.5 recommends 44×44px minimum. Other buttons in the app correctly use `w-11 h-11` (44px).
  - `src/app/use-cases/UseCasesClient.tsx` (~L336–340)

- [ ] **[RELIABILITY] Unsafe `split(":")[1]` in RoadmapClient** — `RoadmapClient.tsx:94–95` calls `phase.name.split(":")[0]` and `[1]`. If a phase name has no colon, index `[1]` is `undefined`, causing silent rendering of "undefined" text. A guard or destructured default is needed.
  - `src/app/roadmap/RoadmapClient.tsx` (~L94–95)

- [ ] **[CODE QUALITY] Duplicated System Ecosystem panel (mobile + desktop)** — `ArchitectureClient.tsx` renders the summary panel twice with `lg:hidden` / `hidden lg:block` visibility classes. Should be extracted into a shared `<EcosystemPanel />` component to avoid DRY violation.
  - `src/app/architecture/ArchitectureClient.tsx` (~L37–57, L72–96)

- [ ] **[CODE QUALITY] `getOwnerColor` and `getOwnerBorder` duplication** — Two near-identical if/switch functions in `ArchitectureClient.tsx` could be unified into a single `OWNER_STYLES` lookup map object.
  - `src/app/architecture/ArchitectureClient.tsx` (~L105–119)

- [ ] **[CODE QUALITY] Hardcoded `localhost:3000` in scripts** — Audit and screenshot scripts under `scripts/` hard-code `http://localhost:3000`. These should read from an environment variable or accept a CLI argument for flexibility across environments.
  - `scripts/screenshot-audit.js` (BASE_URL constant)
  - `scripts/dark-mode-audit.js` (BASE_URL constant)

- [ ] **[CODE QUALITY] Hardcoded Chrome executable path in Puppeteer scripts** — `scripts/screenshot-audit.js` and `scripts/dark-mode-audit.js` hard-code `executablePath: '/Applications/Google Chrome.app/...'`, making them macOS-only. Should use `process.env.CHROME_PATH` with a fallback.
  - `scripts/screenshot-audit.js` (~L14)
  - `scripts/dark-mode-audit.js` (~L14)

---

## Verification Results
- **Lint:** FAIL — ESLint not configured (no `.eslintrc.*` or `eslint.config.*`; `npm run lint` exits with interactive prompt)
- **Tests:** FAIL — No test runner, no test files, no test dependencies. 0% coverage (target: >85%)
- **Build:** PASS — `npm run build` succeeds, zero warnings, static export complete
- **Coverage:** 0% (0 of 42 source files have co-located tests)

---

## Recommended Fix Sequence

| Priority | Finding | Workflow |
|----------|---------|----------|
| 1 | Add test infrastructure (Vitest + Testing Library) | `/orchestrator` |
| 2 | Configure ESLint (`@typescript-eslint/recommended-type-checked`) | `/quick-fix` |
| 3 | Fix keyboard accessibility on interactive divs | `/quick-fix` |
| 4 | Add ARIA dialog attributes + focus traps | `/quick-fix` |
| 5 | Add Error Boundary component | `/quick-fix` |
| 6 | Enable `noUncheckedIndexedAccess` + fix ICON_MAP guard | `/quick-fix` |
| 7 | Add `aria-expanded` to accordion, `aria-pressed` to toggles | `/quick-fix` |
| 8 | Fix heading hierarchy in ArchitectureClient | `/quick-fix` |
| 9 | Split monolithic components | `/refactor` |
