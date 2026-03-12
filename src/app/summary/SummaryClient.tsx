"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.32, 0.72, 0, 1] as const;

const METRICS = [
  {
    value: "10M",
    label: "Annual Visitors",
    sub: "Indonesia's most visited paid attraction",
    color: "text-[#38B6FF]",
    border: "border-[#0076CC]/30",
    glow: "hover:shadow-[0_0_24px_0px_rgba(0,118,204,0.2)]",
  },
  {
    value: "71.6%",
    label: "Recreation Ticket Sales",
    sub: "% of total revenue — over-indexed",
    color: "text-[#F59E0B]",
    border: "border-[#F59E0B]/30",
    glow: "hover:shadow-[0_0_24px_0px_rgba(245,158,11,0.2)]",
  },
  {
    value: "0.4%",
    label: "Property Revenue",
    sub: "% of visitors converting to property",
    color: "text-[#C41E3A]",
    border: "border-[#C41E3A]/30",
    glow: "hover:shadow-[0_0_24px_0px_rgba(196,30,58,0.2)]",
  },
  {
    value: "IDR 10T+",
    label: "Property Revenue Opportunity",
    sub: "Largest untapped value in the portfolio",
    color: "text-[#14B8A6]",
    border: "border-[#14B8A6]/30",
    glow: "hover:shadow-[0_0_24px_0px_rgba(20,184,166,0.2)]",
  },
];

const BRIDGE_CARDS = [
  {
    icon: "📊",
    title: "Recreation Behavioral Data",
    color: "#0076CC",
    borderTopColor: "#0076CC40",
    bgGradient: "linear-gradient(90deg, #0076CC60, transparent)",
    items: [
      "Ride preferences & category affinity",
      "Recency, frequency & F&B spend",
      "Group composition & family lifecycle",
      "Emotion responses & dwell time",
      "10K+ data points per visit",
    ],
    badge: "INPUT",
    badgeColor: "bg-[#0076CC]/10 text-[#38B6FF] border-[#0076CC]/30",
  },
  {
    icon: "⚡",
    title: "Axiara.AI Intelligence Engine",
    color: "#C41E3A",
    borderTopColor: "#C41E3A40",
    bgGradient: "linear-gradient(90deg, #C41E3A60, transparent)",
    items: [
      "Identity Resolution & Customer DNA",
      "Behavioral Segmentation Engine",
      "Next-Best-Action AI",
      "Propensity Scoring Models",
      "SENTINEL Governed & UU PDP Compliant",
    ],
    badge: "ENGINE",
    badgeColor: "bg-[#C41E3A]/10 text-[#E05470] border-[#C41E3A]/30",
  },
  {
    icon: "🎯",
    title: "Qualified Property Leads",
    color: "#14B8A6",
    borderTopColor: "#14B8A640",
    bgGradient: "linear-gradient(90deg, #14B8A660, transparent)",
    items: [
      "Property-interest scored visitor leads",
      "Personalised property offers",
      "Matched lifecycle moments",
      "Cross-sell pipeline to sales teams",
      "IDR 10T+ addressable opportunity",
    ],
    badge: "OUTPUT",
    badgeColor: "bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/30",
  },
];

const USE_CASES = [
  {
    id: "01",
    title: "Recreation → Property Cross-Sell",
    roi: "ROI: 8x",
    roiColor: "text-[#14B8A6] bg-[#14B8A6]/10 border-[#14B8A6]/30",
    description:
      "AI identifies Ancol World families with premium-spend patterns as qualified buyers for Spektrum and Marina Cove developments. Recreation data becomes a property sales engine.",
    tag: "Qualified Sales Lead",
    tagColor: "bg-[#0076CC]/10 text-[#38B6FF] border-[#0076CC]/30",
    accentColor: "#0076CC",
  },
  {
    id: "02",
    title: "Dynamic Ticket Pricing",
    roi: "Revenue +23%",
    roiColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30",
    description:
      "Optimise ticket prices for Dufan, Sea World, and Samudra based on demand, weather, day-of-week, and remaining capacity. Maximises yield without reducing visitor numbers.",
    tag: "Revenue Optimisation",
    tagColor: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    accentColor: "#F59E0B",
  },
  {
    id: "03",
    title: "OTA Disintermediation",
    roi: "Margin +18%",
    roiColor: "text-[#C41E3A] bg-[#C41E3A]/10 border-[#C41E3A]/30",
    description:
      "Incentivise direct hotel bookings through personalised experiences OTAs cannot replicate. Migrate bookings from Traveloka/Pegi.com to Ancol's own platform, recapturing margins and first-party data.",
    tag: "Direct Booking",
    tagColor: "bg-[#C41E3A]/10 text-[#E05470] border-[#C41E3A]/30",
    accentColor: "#C41E3A",
  },
];

const SPRINT_PHASES = [
  {
    phase: "01",
    title: "Discover",
    duration: "Week 1–2",
    desc: "Map Ancol's full data landscape. Audit 10 source systems. Identify integration feasibility and data quality.",
    color: "#0076CC",
  },
  {
    phase: "02",
    title: "Prototype",
    duration: "Week 2–3",
    desc: "Build working AI models on real data samples. Demonstrate identity resolution and propensity scoring live.",
    color: "#8B5CF6",
  },
  {
    phase: "03",
    title: "Validate",
    duration: "Week 3–4",
    desc: "Quantify business impact with real numbers. Produce a SENTINEL-grade architecture blueprint and 80-use-case roadmap.",
    color: "#14B8A6",
  },
];

const COMPLIANCE_BADGES = [
  {
    icon: "🛡️",
    title: "UU PDP Compliant",
    desc: "Government procurement compliant. Sprint operates under strictly governed data access protocols.",
    color: "#0076CC",
  },
  {
    icon: "🏛️",
    title: "BUMD-Ready",
    desc: "Designed for BUMD procurement cycles. Zero vendor lock-in. All IP remains with Ancol.",
    color: "#F59E0B",
  },
  {
    icon: "🔒",
    title: "SENTINEL Governed",
    desc: "Every AI model trained for fairness, accuracy, and regulatory compliance — monitored by SENTINEL.",
    color: "#14B8A6",
  },
  {
    icon: "📋",
    title: "80 Use Cases Mapped",
    desc: "Pre-scoped use cases across 9 domains, ready for prioritisation and BUMD delivery schedule.",
    color: "#C41E3A",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.07 },
  }),
};

export default function SummaryClient() {
  return (
    <main className="h-full overflow-y-auto bg-[#060D1A]">

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden border-b border-[#1E3A5F]">
        {/* Gradient orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0076CC]/8 blur-[120px] pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#C41E3A]/6 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0076CC] to-[#C41E3A] flex items-center justify-center text-white text-[10px] font-black">
                Ax
              </div>
              <span className="text-xs font-black tracking-widest text-[#F0F6FF] uppercase">Axiara.AI</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#4D6B8A] border border-[#1E3A5F] rounded px-2 py-0.5">
                Strategic Insight Brief
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C41E3A] border border-[#C41E3A]/30 bg-[#C41E3A]/5 rounded px-2 py-0.5">
                Confidential
              </span>
            </div>
          </div>

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4D6B8A] mb-3">
            Prepared for PT Pembangunan Jaya Ancol TBK
          </p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl md:text-4xl font-bold text-[#F0F6FF] leading-tight mb-2"
          >
            The{" "}
            <span className="bg-gradient-to-r from-[#F59E0B] to-[#0076CC] bg-clip-text text-transparent">
              IDR 10 Trillion
            </span>{" "}
            Question:
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="text-2xl md:text-3xl font-bold text-[#8BA3C1] mb-5"
          >
            How AI Bridges Recreation Data to Property Revenue
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-sm text-[#4D6B8A] max-w-3xl leading-relaxed"
          >
            Ancol&apos;s 10 million annual visitors generate one of Indonesia&apos;s richest behavioural datasets — but today,
            none of that intelligence reaches the property division. Here&apos;s how governed AI changes the equation.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* ── Revenue Architecture Gap ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#C41E3A]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#4D6B8A]">
              The Revenue Architecture Gap
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className={`bg-[#0C1830] border ${m.border} rounded-2xl p-5 ${m.glow} transition-all duration-300`}
              >
                <p className={`text-3xl font-bold ${m.color} mb-1`}>{m.value}</p>
                <p className="text-sm font-semibold text-[#F0F6FF] mb-1">{m.label}</p>
                <p className="text-xs text-[#4D6B8A] leading-snug">{m.sub}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 bg-[#0C1830]/60 border border-[#1E3A5F] rounded-xl px-5 py-3">
            <p className="text-xs text-[#8BA3C1] leading-relaxed">
              <span className="text-[#F0F6FF] font-semibold">The core issue:</span>{" "}
              F&amp;B, recreation and property segments operate as disconnected businesses. The behavioural data from
              10 million visits per year remains siloed — invisible to the teams who could use it most.
            </p>
          </div>
        </section>

        {/* ── AI-Powered Data Bridge ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0076CC] to-[#14B8A6]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#4D6B8A]">
              The AI-Powered Data Bridge
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Connector lines (desktop only) */}
            <div className="hidden md:flex absolute top-1/2 left-1/3 right-1/3 -translate-y-1/2 items-center justify-center z-10 pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-[#0076CC]/40 via-[#8B5CF6]/60 to-[#14B8A6]/40" />
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8B5CF6]" />
            </div>

            {BRIDGE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6 hover:border-[#1E3A5F] hover:bg-[#112040] transition-all duration-300 relative"
                style={{ borderTopColor: card.borderTopColor }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: card.bgGradient }} />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{card.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${card.badge === "ENGINE" ? "bg-[#C41E3A]/10 text-[#E05470] border-[#C41E3A]/30" : card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#F0F6FF] mb-3">{card.title}</h3>
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#8BA3C1]">
                      <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: card.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Top 3 Use Cases ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#0076CC]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#4D6B8A]">
              3 Highest-Impact Use Cases from 80 Identified
            </h2>
          </div>
          <div className="space-y-3">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-5 hover:bg-[#112040] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                  style={{ background: uc.accentColor }} />
                <div className="flex items-start justify-between gap-4 pl-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#4D6B8A]">#{uc.id}</span>
                      <h3 className="text-sm font-bold text-[#F0F6FF]">{uc.title}</h3>
                    </div>
                    <p className="text-xs text-[#8BA3C1] leading-relaxed mb-3">{uc.description}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${uc.tagColor}`}>
                      {uc.tag}
                    </span>
                  </div>
                  <div className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl border ${uc.roiColor}`}>
                    {uc.roi}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/use-cases"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#38B6FF] hover:text-[#F0F6FF] transition-colors">
              View all 80 use cases →
            </Link>
          </div>
        </section>

        {/* ── Proposed Engagement ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#14B8A6] to-[#0076CC]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#4D6B8A]">
              Proposed Engagement
            </h2>
          </div>

          {/* Sprint card */}
          <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-[#1E3A5F] bg-gradient-to-r from-[#0076CC]/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#F0F6FF]">4-Week Discover Sprint</h3>
                  <p className="text-sm font-semibold text-[#14B8A6] mt-0.5">Zero Risk, Full Clarity</p>
                </div>
                <span className="text-xs font-bold text-white bg-gradient-to-r from-[#0076CC] to-[#14B8A6] px-3 py-1.5 rounded-xl">
                  4 Weeks
                </span>
              </div>
              <p className="text-xs text-[#8BA3C1] mt-3 leading-relaxed max-w-2xl">
                We don&apos;t ask for a long-term commitment upfront. The Discover Sprint maps Ancol&apos;s data
                landscape, validates AI feasibility with real data samples, and produces a SENTINEL-grade
                architecture blueprint with quantified business impact — in 4 weeks.
              </p>
            </div>

            {/* Sprint phases */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E3A5F]">
              {SPRINT_PHASES.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="px-5 py-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: phase.color }}>
                      {phase.phase}
                    </div>
                    <span className="text-sm font-bold text-[#F0F6FF]">{phase.title}</span>
                    <span className="text-[10px] font-medium text-[#4D6B8A] ml-auto">{phase.duration}</span>
                  </div>
                  <p className="text-xs text-[#8BA3C1] leading-relaxed">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compliance badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COMPLIANCE_BADGES.map((badge, i) => (
              <motion.div
                key={badge.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-[#0C1830] border border-[#1E3A5F] rounded-xl p-4 hover:bg-[#112040] transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{badge.icon}</span>
                  <span className="text-xs font-bold text-[#F0F6FF]">{badge.title}</span>
                </div>
                <p className="text-[11px] text-[#4D6B8A] leading-snug">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[#1E3A5F] pt-8 pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#F0F6FF]">Erik Gunawan Supriatna</p>
              <p className="text-xs text-[#4D6B8A] mt-0.5">Executive &amp; CXO, Axiara AI Future Insights (Terralogiq)</p>
              <p className="text-xs text-[#4D6B8A]">erik@axiara.ai · linkedin.com/in/erikgunawan</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0076CC] to-[#C41E3A] flex items-center justify-center text-white text-[10px] font-black">
                Ax
              </div>
              <div>
                <p className="text-xs font-black tracking-widest text-[#F0F6FF] uppercase">Axiara.AI</p>
                <p className="text-[10px] text-[#4D6B8A] tracking-widest uppercase">AI · Real Results</p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
