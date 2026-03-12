# Code Audit: Web & Mobile — Ancol 360° CDP Dashboard
Date: 2026-03-11

## Summary
- **Files reviewed:** 20 (all pages, components, lib, globals)
- **Issues found:** 16 (2 critical, 5 major, 4 moderate, 5 minor)
- **Build:** PASS (16 static routes generated)
- **TypeScript:** PASS (no type errors)
- **Test coverage:** N/A (no test suite present — see Major #5)

---

## Critical Issues
Issues that must be fixed before deployment.

- [x] **MermaidDiagram: raw innerHTML assignment without sanitization** — `src/components/ui/MermaidDiagram.tsx:51` ✅ Fixed 2026-03-11
  - Installed `dompurify` + `@types/dompurify`. SVG output from mermaid now sanitized with `DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } })` before DOM insertion.

- [x] **MermaidDiagram: silent empty catch block** — `src/components/ui/MermaidDiagram.tsx:59` ✅ Fixed 2026-03-11
  - Added `renderError` state; `.catch()` now logs to `console.error` and sets error state. Component renders a visible "Diagram unavailable" fallback with `role="alert"` when rendering fails.

---

## Major Issues
Issues that should be fixed in the near term.

- [ ] **globals.css: @import placed after @tailwind directives** — `src/app/globals.css:5`
  - `@import` must precede all non-`@charset`/`@layer` rules. Turbopack's CSS compiler was emitting a hard build failure (`@import rules must precede all rules`). **Fixed in this session** — `@import` moved to line 1.

- [ ] **Dual theme providers may conflict** — `src/app/layout.tsx:32`, `src/components/ThemeProvider.tsx`
  - A custom `ThemeProvider` (uses `data-theme` attribute + localStorage key `cdp-theme`) and a `next-themes` ThemeProvider both exist. `globals.css` uses `[data-theme="light"]` selectors, but next-themes applies `.dark` class. The two systems may diverge, causing visual inconsistencies. Fix: remove one — either drop next-themes entirely (leaving the custom context) or migrate globals.css to `.dark` class selectors and use next-themes exclusively.

- [ ] **Mobile drawer missing focus trap** — `src/components/SiteNav.tsx:357–374`
  - Drawer has `role="dialog"` and `aria-modal="true"` but keyboard users can Tab past the overlay to background content. WCAG 2.1 SC 2.1.2. Fix: install `focus-trap-react` and wrap `MobileNavContent`; restore focus to the hamburger trigger when drawer closes.

- [ ] **No error boundary in the application** — `src/app/` (entire tree)
  - No `ErrorBoundary` component exists. A runtime error in any client component (e.g. MermaidDiagram, AnimatedCounter) will crash the entire page with Next.js's generic error screen. Fix: create `src/components/ErrorBoundary.tsx`, wrap high-risk subtrees (diagrams, animated sections).

- [ ] **No test suite** — project root
  - Zero test files exist. No unit, integration, or accessibility tests. Per testing-strategy.md, critical paths must have coverage. Fix: add Vitest + React Testing Library for component tests; add Playwright for route smoke tests.

---

## Moderate Issues
Should be addressed soon.

- [ ] **Collapsed sidebar nav icons below 44×44px touch target** — `src/components/SiteNav.tsx:109`
  - Collapsed sidebar links use `w-10 h-10` (40×40px). WCAG 2.5.8 and mobile guidelines require 44×44px minimum. Fix: change to `w-11 h-11` or add `min-w-[44px] min-h-[44px]`.

- [ ] **Theme context hydration flicker** — `src/lib/theme-context.tsx:12–19`
  - `useState("dark")` initializes before `useEffect` can read localStorage. Even with the anti-flash inline script in `layout.tsx`, the React context state lags, which can cause components consuming `useTheme()` to render with wrong values on first paint. Fix: initialize state lazily via `useState(() => (typeof window !== 'undefined' ? localStorage.getItem('cdp-theme') ?? 'dark' : 'dark'))`.

- [ ] **Design tokens inconsistently applied** — Multiple files
  - `design-tokens.ts` defines reusable classes (e.g. `kpiNumber`, `hero`) but most pages hardcode Tailwind arbitrary values inline. This makes global design changes require editing each file. Fix: consistently import and apply tokens; remove redundant inline class strings.

- [ ] **Heading hierarchy not verified on all pages** — `src/app/overview/OverviewClient.tsx`, others
  - PageShell renders an `<h1>` in a `<section>` (not `<header>` landmark). Content cards may use `<h2>` or `<p>` inconsistently. WCAG 1.3.1. Fix: audit each page's heading tree; ensure every dashboard card title is an `<h2>`, and subsections use `<h3>`.

---

## Minor Issues
Style, naming, or small improvements.

- [ ] **Inline `style` with hardcoded color values in SummaryClient** — `src/app/summary/SummaryClient.tsx:309,312`
  - `style={{ borderTopColor: card.color + "40", background: ... }}` bypasses design tokens and Tailwind. Fix: define color variants in the data object or use Tailwind arbitrary classes.

- [ ] **AnimatedCounter has no error fallback** — `src/components/ui/AnimatedCounter.tsx:27–40`
  - rAF-based animation loop has no try/catch. In restricted environments (CSP, older browsers), a silent failure shows 0 instead of the static value. Fix: wrap in try/catch; fall back to rendering the target number statically.

- [ ] **External link `rel` attributes not set** — Check all `<Link>` components with external `href`
  - Next.js `<Link>` for internal routes is correct. Verify any future external `<a>` tags include `rel="noopener noreferrer"` to prevent tab-napping.

- [ ] **No `<meta name="viewport">` explicitly set** — `src/app/layout.tsx`
  - Next.js 14 injects a default viewport meta, but it's not explicitly declared. Add `export const viewport: Viewport = { width: 'device-width', initialScale: 1 }` in layout.tsx for explicit control per Next.js 14 conventions.

- [ ] **Tab state not persisted across navigation** — `src/app/problem/ProblemClient.tsx:44`
  - Selected tab resets on back-navigation. Low UX friction but worth addressing. Fix: sync tab state to URL query params (`?tab=root-causes`) using `useSearchParams`.

---

## Verification Results
- **Lint:** PASS (no ESLint errors reported)
- **TypeScript:** PASS (tsc --noEmit clean)
- **Build:** PASS ✓ — 16 static routes generated after fixing `@import` order in globals.css
- **Tests:** N/A — no test suite exists
- **Coverage:** 0% — no tests

---

## Fixed in This Session (Mobile Design Pass)
The following were resolved prior to this audit:

- ✅ Mobile content hidden behind fixed top bar — added `pt-16 md:pt-0` to layout.tsx content wrapper
- ✅ Drawer width capped at `min(280px, 85vw)` for very small screens
- ✅ Hamburger button enlarged to `w-12 h-12` (48×48px)
- ✅ Close button enlarged to `w-11 h-11` (44×44px)
- ✅ Theme toggle added to mobile drawer (was desktop-only)
- ✅ `pb-safe` applied to mobile drawer footer (iOS home indicator)
- ✅ `touch-action: manipulation` on all interactive elements (eliminates 300ms tap delay)
- ✅ `env(safe-area-inset-*)` utilities added to globals.css
- ✅ PageShell responsive padding: `px-4 sm:px-6`, `py-4 sm:py-5`
- ✅ HomeClient status badges: `gap-4 sm:gap-8`, `mt-10 sm:mt-14`
- ✅ `@import` moved before `@tailwind` directives (build fix)
