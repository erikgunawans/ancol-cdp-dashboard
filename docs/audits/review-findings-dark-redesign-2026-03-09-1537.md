# Code Audit: 2026 Dark Enterprise Redesign

Date: 2026-03-09

## Summary

- **Files reviewed:** 23 (4 config, 9 page clients, 5 core components, 5 ui primitives)
- **Issues found:** 9 (1 critical, 4 major, 4 minor) — all critical/major now resolved
- **Test coverage:** 13/13 tests passing
- **Build:** Clean (zero TypeScript errors)

---

## Critical Issues

Issues that must be fixed before deployment.

- [x] `dangerouslySetInnerHTML` with CSS string in DataFlowClient — **FIXED**: keyframes moved to `globals.css`, `<style dangerouslySetInnerHTML>` removed — `src/app/globals.css`

---

## Major Issues

Issues that should be fixed in the near term.

- [x] Old palette `#86868B` used instead of `#4D6B8A`/`#8BA3C1` — **FIXED** — `src/app/data-flow/DataFlowClient.tsx`
- [x] Old palette `#D2D2D7` on pipeline connector line — **FIXED** → `#1E3A5F` — `src/app/data-flow/DataFlowClient.tsx`
- [x] Old palette `#1D1D1F` card/tooltip background — **FIXED** → `#112040` — `src/app/data-flow/DataFlowClient.tsx`; `src/app/roadmap/RoadmapClient.tsx`
- [x] Old palette `#0071E3` (differs from `#0076CC`) — **FIXED** → `#0076CC` — `src/app/data-flow/DataFlowClient.tsx`; `src/app/roadmap/RoadmapClient.tsx`
- [x] Old palette `#6E6E73` caption text — **FIXED** → `#4D6B8A` — `src/app/data-flow/DataFlowClient.tsx`
- [x] `bg-white` / `text-white` in dark theme context — **FIXED** → `bg-[#38B6FF]` tab underline; `bg-[#F0F6FF]` progress dot; `text-[#F0F6FF]` headings — `src/app/data-flow/DataFlowClient.tsx`; `src/app/roadmap/RoadmapClient.tsx`
- [x] Missing `focus-visible:ring-2` on ArchitectureClient LayerBar — **FIXED** → `focus-visible:ring-[#0076CC]` added — `src/app/architecture/ArchitectureClient.tsx`
- [x] Missing focus indicator on UseCasesClient hero hotspot divs — **FIXED** → `focus-visible:ring-[#0076CC]` added — `src/app/use-cases/UseCasesClient.tsx`

---

## Minor Issues

Style, naming, or minor improvements (backlog — not blocking).

- [ ] DRY violation: three switch-case color helpers (`ownerBg`, `ownerText`, `ownerRing`) should be one config map — `src/app/architecture/ArchitectureClient.tsx:39-61`
- [ ] Large component (322 lines): extract `LayerBar` to its own file — `src/app/architecture/ArchitectureClient.tsx`
- [ ] Magic-number stagger delays: `i * 0.1`, `index * 0.08`, `index * 0.06` — extract to `design-tokens.ts` — multiple files
- [ ] Rename `highlightColorClass` → `connectorColorClass` for intent clarity — `src/app/data-flow/DataFlowClient.tsx:63`

---

## Verification Results

- Lint: PASS
- Tests: PASS (13 passed, 0 failed)
- Build: PASS (zero TypeScript errors)
- Coverage: N/A (no coverage tooling configured)

---

## Positive Observations

- Strong TypeScript practices — no `any` detected, good discriminated unions
- Excellent Framer Motion implementation (AnimatePresence, whileInView, stagger)
- Good accessibility foundation: semantic HTML, aria-expanded/label/modal/pressed/hidden used correctly
- No hardcoded secrets or XSS vectors in user-facing data paths
- Design token system well-architected in `tailwind.config.ts` + `design-tokens.ts`
- Color contrast: `#060D1A` to `#F0F6FF` ratio >15:1 ✓
- All `.map()` calls have proper `key` props ✓
- Modal Escape key handler present in UseCasesClient ✓
