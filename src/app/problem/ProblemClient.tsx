"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircleStackIcon,
  EyeSlashIcon,
  UserGroupIcon,
  BoltSlashIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { painPoints } from "@/data/pain-points";
import TabBar from "@/components/ui/TabBar";

const EASE = [0.32, 0.72, 0, 1] as const;

const ICON_MAP: Record<string, React.ElementType> = {
  CircleStackIcon,
  EyeSlashIcon,
  UserGroupIcon,
  BoltSlashIcon,
  StarIcon,
  ChartBarIcon,
};

const SYSTEM_NODES = [
  { id: "ticketing", label: "Ticketing", top: "2%",  left: "44%", svgX: 44, svgY: 4  },
  { id: "ota",      label: "OTA",       top: "22%", left: "74%", svgX: 74, svgY: 24 },
  { id: "fnb",      label: "F&B",       top: "62%", left: "74%", svgX: 74, svgY: 64 },
  { id: "hotel",    label: "Hotel",     top: "82%", left: "44%", svgX: 44, svgY: 84 },
  { id: "contact",  label: "Contact\nCenter", top: "62%", left: "14%", svgX: 14, svgY: 64 },
  { id: "loyalty",  label: "Loyalty",   top: "22%", left: "14%", svgX: 14, svgY: 24 },
];

const TABS = [
  { id: "challenge", label: "The Challenge" },
  { id: "painpoints", label: "Pain Points" },
  { id: "architecture", label: "Architecture" },
] as const;
type Tab = typeof TABS[number]["id"];

export default function ProblemClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const validTab = tabParam && TABS.some((t) => t.id === tabParam) ? tabParam : "challenge";
  const [activeTab, setActiveTab] = useState<Tab>(validTab);
  const [mode, setMode] = useState<"before" | "after">("before");

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id as Tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Tab bar ── */}
      <div className="shrink-0 px-6 pt-5 border-b border-[#1E3A5F]">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          layoutId="problemTabUnderline"
          accentColor="#C41E3A"
        />
      </div>

      {/* ── Panel area ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── CHALLENGE ── */}
          {activeTab === "challenge" && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="h-full px-6 py-8 max-w-4xl mx-auto"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-[#C41E3A] mb-3">
                The Challenge
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F0F6FF] mb-5">
                Ancol&apos;s data lives in silos.
                <br />
                Visitors disappear after the gate.
              </h1>
              <p className="text-base leading-relaxed text-[#8BA3C1] max-w-3xl mb-8">
                Ancol welcomes over 10 million visitors annually, yet has no visibility into
                what happens after a ticket is scanned. In-park behavior, F&amp;B spend,
                attraction preferences, and cross-visit patterns are invisible — leaving
                hundreds of billions in potential revenue untapped and every guest experience
                undifferentiated.
              </p>

              {/* Quote callout */}
              <div className="relative bg-[#0C1830]/60 border border-[#1E3A5F] rounded-2xl p-8">
                <span
                  className="absolute -top-5 left-6 text-7xl text-[#C41E3A]/30 font-serif leading-none select-none"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="relative text-xl font-medium leading-snug text-[#F0F6FF] mb-4">
                  The main pain point is that data is only recorded up to the gate entrance —
                  there is no insight into visitor activity or service usage after ticket purchase.
                </p>
                <p className="text-sm font-medium tracking-wide text-[#4D6B8A]">
                  — Discovery Meeting, February 9, 2026
                </p>
              </div>
            </motion.div>
          )}

          {/* ── PAIN POINTS ── */}
          {activeTab === "painpoints" && (
            <motion.div
              key="painpoints"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="px-6 py-6 max-w-7xl mx-auto"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A] mb-2">
                Six Core Pain Points
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] mb-5">
                Where the current architecture breaks down
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {painPoints.map((point, i) => {
                  const IconComponent = ICON_MAP[point.icon];
                  return (
                    <motion.div
                      key={point.id}
                      className="p-5 bg-[#0C1830] border border-[#1E3A5F] rounded-2xl flex flex-col gap-3 hover:border-[#0076CC]/40 hover:bg-[#112040] transition-all duration-300"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
                    >
                      <div className="w-7 h-7 text-[#C41E3A]">
                        {IconComponent && <IconComponent className="w-7 h-7" />}
                      </div>
                      <p className="text-base font-semibold text-[#F0F6FF]">{point.title}</p>
                      <p className="text-sm leading-relaxed text-[#8BA3C1]">
                        {point.description}
                      </p>
                      <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${point.tagClass}`}>
                        {point.cdpLayer}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── ARCHITECTURE ── */}
          {activeTab === "architecture" && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="px-6 py-6 max-w-4xl mx-auto"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A] mb-2 text-center">
                Data Architecture
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] mb-5 text-center">
                From silos to a unified data hub
              </h2>

              {/* Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex gap-1 p-1 bg-[#0C1830] border border-[#1E3A5F] rounded-xl">
                  {(["before", "after"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      aria-pressed={mode === m}
                      className={`px-6 py-2.5 min-h-[40px] rounded-lg text-sm font-semibold transition-all duration-300 ${
                        mode === m
                          ? "bg-[#0076CC] text-white shadow-sm"
                          : "text-[#8BA3C1] hover:text-[#F0F6FF]"
                      }`}
                    >
                      {m === "before" ? "Current State" : "With CDP"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas */}
              <div className="relative h-[300px] sm:h-[360px] max-w-lg mx-auto">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <AnimatePresence>
                    {mode === "after" &&
                      SYSTEM_NODES.map((node, index) => (
                        <motion.line
                          key={node.id}
                          x1={node.svgX}
                          y1={node.svgY}
                          x2="50"
                          y2="50"
                          stroke="#C41E3A"
                          strokeWidth="0.6"
                          strokeLinecap="round"
                          strokeOpacity="0.6"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          exit={{ pathLength: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
                        />
                      ))}
                  </AnimatePresence>
                </svg>

                {SYSTEM_NODES.map((node) => (
                  <div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    style={{ top: node.top, left: node.left }}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0C1830] border-2 border-[#1E3A5F] flex items-center justify-center shadow-sm">
                      <span className="text-xs font-semibold text-[#F0F6FF] text-center leading-tight px-1 whitespace-pre-line">
                        {node.label}
                      </span>
                    </div>
                  </div>
                ))}

                <AnimatePresence>
                  {mode === "after" && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#C41E3A] flex items-center justify-center shadow-lg z-10"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <span className="text-sm font-bold text-white text-center leading-tight">
                        CDP<br /><span className="text-xs font-normal opacity-80">Hub</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center text-sm text-[#8BA3C1] mt-4 max-w-md mx-auto">
                {mode === "before"
                  ? "Six disconnected systems. No shared identity. No unified view of the guest."
                  : "Ancol 360° CDP unifies all touchpoints into a single guest profile, enabling real-time personalization across every interaction."}
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
