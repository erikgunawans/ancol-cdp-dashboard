---
name: axiara-design-system
description: Axiara Apple-inspired design system. Apply to all UI work.
---

# Axiara Design System

## Colors

- Background: #FAFAFA (light), #0A0A0B (dark sections)
- Cards: #FFFFFF, border #D2D2D7, rounded-2xl
- Text: #1D1D1F (primary), #6E6E73 (secondary), #86868B (caption)
- Accent: #C41E3A (crimson), #0071E3 (interactive blue)
- Glass: bg-white/[0.72] backdrop-blur-xl

## Typography (Inter)

- Hero: text-7xl md:text-8xl font-bold tracking-tight
- Section title: text-5xl font-semibold tracking-tight
- Body: text-lg leading-relaxed
- Caption: text-sm font-medium tracking-wide uppercase

## Layout

- Section padding: py-20 md:py-32
- Max width: max-w-5xl (text), max-w-7xl (dashboards)
- All spacing: multiples of 8px

## Animation (Framer Motion)

- Fade-up: initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
- Duration: 0.5-0.7s, easing: [0.32, 0.72, 0, 1]
- Stagger: 0.08-0.12s between children

## Conventions

- Always Tailwind utility classes, never custom CSS
- Framer Motion for all animations
- All data in typed .ts files under src/data/
