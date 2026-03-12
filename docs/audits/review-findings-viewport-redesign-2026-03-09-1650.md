# Code Audit: Full-Viewport Single-Screen Redesign

Date: 2026-03-09

## Summary

- **Files reviewed:** 20 (layout + transitions, 8 page clients, 4 analytics stubs, 5 components, 1 globals.css, 2 data files)
- **Issues found:** 8 (1 critical, 5 major, 2 minor)
- **Test coverage:** 3/13 spec files — KPICard, SiteNav, ArchitectureClient covered; 10 page clients have no tests
- **Build:** Clean (zero TypeScript errors, zero ESLint warnings)

---

## Critical Issues

Issues that must be fixed before deployment.

- [ ] **4 high-severity npm CVEs in Next.js / eslint-config-next** — `npm audit` reports 4 high vulnerabilities:
  - GHSA-5j98: glob CLI command injection via -c/--cmd in eslint-config-next
  - GHSA-3h52: Next.js dev server info exposure (missing origin verification)
  - GHSA-g5qg: Next.js cache key confusion for Image Optimization API routes
  - GHSA-4342: Next.js improper middleware redirect handling → SSRF
  - Fix: `npm audit fix --force` (will upgrade to eslint-config-next@16.x — verify compatibility first)
  - Ref: security-mandate.md → "Vulnerable Components: Pin dependency versions. Scan for CVEs in CI/CD."

---

## Major Issues

Issues that should be fixed in the near term.

- [ ] **Missing ARIA tab semantics on all 4 new tab interfaces** — ProblemClient, DataFlowClient, JourneyClient, and ArchitectureClient all implement custom tab bars using `<button>` inside plain `<div>`, but none have:
  - `role="tablist"` on the container `<div>`
  - `role="tab"` on each tab `<button>`
  - `aria-selected={activeTab === tab.id}` on each tab button
  - `role="tabpanel"` + `aria-labelledby` on the panel content div
  - Arrow key navigation (WCAG 2.1 requires left/right arrow to move between tabs)
  - Ref: accessibility-principles.md → "ARIA: Use `role` attributes for custom widgets that lack native semantics" + "Arrow keys for menus"
  - Files: `src/app/problem/ProblemClient.tsx:50`, `src/app/data-flow/DataFlowClient.tsx`, `src/app/journey/JourneyClient.tsx:25`, `src/app/architecture/ArchitectureClient.tsx` (header tabs)

- [ ] **`<div role="button">` instead of native `<button>`** — Two locations use `role="button"` on a `<motion.div>` when `motion.button` (or `motion.create(button)`) would satisfy natively without ARIA override:
  - `src/app/architecture/ArchitectureClient.tsx:286` — LayerBar
  - `src/app/use-cases/UseCasesClient.tsx:146,279` — hero hotspot divs
  - Ref: accessibility-principles.md → "First rule of ARIA: Don't use ARIA if a native HTML element can do the job"

- [ ] **Non-null assertion `!` in production code** — `src/app/roadmap/RoadmapClient.tsx:10`:
  ```ts
  const selectedPhase = timelinePhases.find(p => p.id === selectedPhaseId) ?? timelinePhases[0]!;
  ```
  `timelinePhases[0]!` bypasses null safety. If the array is empty the `!` silences the error but code will still throw at runtime. Replace with:
  ```ts
  const selectedPhase = timelinePhases.find(p => p.id === selectedPhaseId) ?? timelinePhases[0] ?? null;
  ```
  and guard the render.
  - Ref: typescript-idioms-and-patterns.md → "Never use non-null assertion `!` in production code"

- [ ] **Test coverage gap: 10 page clients have zero test files** — Only KPICard, SiteNav, and ArchitectureClient have spec files. The following have no tests at all:
  - `src/app/HomeClient.tsx`
  - `src/app/overview/OverviewClient.tsx`
  - `src/app/problem/ProblemClient.tsx` (new tab logic)
  - `src/app/data-flow/DataFlowClient.tsx` (new tab logic)
  - `src/app/roadmap/RoadmapClient.tsx`
  - `src/app/journey/JourneyClient.tsx` (new tab logic)
  - `src/app/use-cases/UseCasesClient.tsx`
  - `src/components/PageShell.tsx`
  - All 5 analytics stubs (visitors, revenue, engagement, segments, realtime)
  - Ref: testing-strategy.md → ">85% coverage of domain logic"; new tab state machines in 4 clients represent critical interactive logic that should be verified

- [ ] **UseCasesClient not converted to full-viewport layout** — `src/app/use-cases/UseCasesClient.tsx:82` still uses `min-h-screen pb-32` while all other pages were updated to `h-full flex flex-col overflow-hidden`. This page will still require vertical scrolling, inconsistent with the rest of the app.

---

## Minor Issues

Style, naming, or minor improvements (backlog — not blocking).

- [ ] **`whileTap` prop leaks to DOM in test environment** — `src/components/SiteNav.tsx:160` attaches `whileTap={{ scale: 0.93 }}` to a `<motion.button>`. In the jsdom/Vitest environment the Framer Motion mock renders to a plain DOM button, making React warn: *"React does not recognize the `whileTap` prop on a DOM element."* The warning appears in every `SiteNav.spec` run. Not a production issue, but adds noise to the test suite. Fix: move the mock in `vitest.setup.ts` to strip Framer-specific props, or upgrade the Framer Motion mock.

- [ ] **Tab bar pattern duplicated 4×** — The tab bar (button group with `layoutId` animated underline, `text-[#F0F6FF]` active, `text-[#4D6B8A]` inactive) is copy-pasted into ProblemClient, DataFlowClient, JourneyClient, and ArchitectureClient. Reached the Rule of Three (3+ instances). Extract to a `src/components/ui/TabBar.tsx` primitive that also carries the ARIA fix above.
  - Ref: code-organization-principles.md → "Rule of Three (DRY)"; CLAUDE.md → "UI primitives: `src/components/ui/[Name].tsx`"

---

## Verification Results

- Lint: **PASS** (zero ESLint warnings or errors)
- Tests: **PASS** (13 passed, 0 failed)
- Build: **PASS** (zero TypeScript errors, 16 static pages generated)
- CVE Scan: **FAIL** (4 high severity — see Critical section above)
- Coverage: N/A (no coverage tooling configured — adding `@vitest/coverage-v8` is recommended)

---

## Positive Observations

- Viewport redesign successfully applied to 7 of 8 page clients (`UseCasesClient` pending)
- All new tab interfaces use `AnimatePresence mode="wait"` for clean transitions — correct Framer Motion pattern
- `motion.div` for tab underline with `layoutId` is idiomatic — smooth shared-element animation
- `h-full flex flex-col overflow-hidden` + `flex-1 min-h-0 overflow-y-auto` pattern correctly applied — no layout engine fighting between flex children
- Build size improved: OverviewClient dropped from 1.6 kB (no change) and DataFlowClient from 4.52 kB
- `OWNER_COLORS` config map in ArchitectureClient (replacing 3 switch-case helpers) resolves the DRY violation from the previous audit
- Zero TypeScript errors across all 16 routes — `exactOptionalPropertyTypes` compliance maintained
- Previous audit's critical/major issues all remain resolved (dangerouslySetInnerHTML gone, palette correct, focus rings in place)
