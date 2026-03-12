export const colors = {
  bg: {
    primary: "#060D1A",
    dark: "#060D1A",
    surface: "#0C1830",
    elevated: "#112040",
  },
  text: {
    primary: "#F0F6FF",
    secondary: "#8BA3C1",
    caption: "#4D6B8A",
  },
  card: {
    bg: "#0C1830",
    border: "#1E3A5F",
  },
  accent: {
    crimson: "#C41E3A",
    blue: "#0076CC",
    glow: "#38B6FF",
    teal: "#14B8A6",
    gold: "#F59E0B",
  },
} as const;

export const typography = {
  hero: "text-7xl md:text-8xl font-bold tracking-tight",
  sectionTitle: "text-5xl font-semibold tracking-tight",
  kpiNumber: "text-5xl font-bold tracking-tight text-[#F0F6FF]",
  body: "text-lg leading-relaxed text-[#8BA3C1]",
  caption: "text-xs font-medium tracking-widest uppercase text-[#4D6B8A]",
} as const;

export const layout = {
  sectionPadding: "py-16 md:py-24",
  maxWidthText: "max-w-5xl",
  maxWidthDashboard: "max-w-7xl",
} as const;

export const animation = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  stagger: {
    container: { transition: { staggerChildren: 0.08 } },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },
} as const;
