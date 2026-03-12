"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { budiJourney } from "@/data/budi-journey";
import TabBar from "@/components/ui/TabBar";
import MermaidDiagram from "@/components/ui/MermaidDiagram";
import { BUDI_JOURNEY_SEQUENCE } from "@/data/mermaid-diagrams";

const EASE = [0.32, 0.72, 0, 1] as const;

const TABS = [
  { id: "full-journey", label: "The Budi's Journey" },
  { id: "intro",      label: "Meet Budi" },
  { id: "pre-visit",  label: "Pre-Visit" },
  { id: "in-park",    label: "In-Park" },
  { id: "magic",      label: "Magic Moment" },
  { id: "outcome",    label: "Outcome" },
  { id: "sequence",   label: "Sequence Diagram" },
] as const;
type Tab = typeof TABS[number]["id"];

export default function JourneyClient() {
  const [activeTab, setActiveTab] = useState<Tab>("full-journey");

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Tab bar ── */}
      <div className="shrink-0 px-6 pt-5 border-b border-[#1E3A5F]">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as Tab)}
          layoutId="journeyTabUnderline"
          accentColor="#C41E3A"
        />
      </div>

      {/* ── Panel area ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── THE BUDI'S JOURNEY ── */}
          {activeTab === "full-journey" && (
            <motion.div
              key="full-journey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex flex-col items-center justify-center min-h-full px-6 py-10"
            >
              <div className="w-full max-w-4xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F0F6FF] mb-1">
                    The Budi&apos;s Journey
                  </h2>
                  <p className="text-sm text-[#4D6B8A]">End-to-end customer experience — powered by CDP</p>
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden border border-[#1E3A5F] bg-[#0C1830] shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/MT7VPJ7uPsE?autoplay=1&mute=1"
                    title="The Budi's Journey"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── INTRO ── */}
          {activeTab === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex flex-col items-center justify-center min-h-full px-6 py-12 text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F0F6FF] mb-8">
                {budiJourney.intro.headline}
              </h1>
              <div className="bg-[#0C1830] p-8 rounded-3xl border border-[#1E3A5F] max-w-xl w-full text-left">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0076CC] to-[#C41E3A] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    B
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#F0F6FF] mb-1">{budiJourney.intro.description}</p>
                    <p className="text-sm text-[#8BA3C1]">{budiJourney.intro.details}</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-sm text-[#4D6B8A]">
                Follow Budi&apos;s journey through the tabs above →
              </p>
            </motion.div>
          )}

          {/* ── PRE-VISIT ── */}
          {activeTab === "pre-visit" && (
            <motion.div
              key="pre-visit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="px-6 py-6 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] border-b border-[#1E3A5F] pb-4 mb-6">
                {budiJourney.phase1.title}
              </h2>
              <div className="space-y-5">
                {budiJourney.phase1.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="grid md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE, delay: index * 0.1 }}
                  >
                    <div className="bg-[#0C1830] p-5 rounded-2xl border border-[#1E3A5F]">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#112040] flex items-center justify-center text-lg shrink-0">
                          {index === 0 ? "💬" : "🎟️"}
                        </div>
                        <p className="text-[#F0F6FF] text-sm leading-relaxed mt-1">{step.userAction}</p>
                      </div>
                    </div>
                    <div className="bg-[#0C1830] p-5 rounded-2xl border-l-4 border-l-[#14B8A6] border border-[#1E3A5F]">
                      <p className="text-[#F0F6FF] text-sm font-medium leading-relaxed">{step.systemReaction}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── IN-PARK ── */}
          {activeTab === "in-park" && (
            <motion.div
              key="in-park"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="px-6 py-6 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] border-b border-[#1E3A5F] pb-4 mb-6">
                {budiJourney.phase2.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {budiJourney.phase2.stops.map((stop, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-[#0C1830] p-5 rounded-2xl border border-[#1E3A5F] hover:border-[#0076CC]/40 hover:bg-[#112040] transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE, delay: idx * 0.07 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#C41E3A] mb-3" />
                    <p className="font-semibold text-[#F0F6FF] mb-1">{stop.location}</p>
                    <p className="text-sm text-[#0076CC] font-medium leading-snug">{stop.event}</p>
                  </motion.div>
                ))}
              </div>

              {/* Phase 4 events appended here */}
              <h2 className="text-xl font-semibold tracking-tight text-[#F0F6FF] border-b border-[#1E3A5F] pb-3 mb-5 mt-10">
                {budiJourney.phase4.title}
              </h2>
              <div className="grid gap-3">
                {budiJourney.phase4.events.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1, ease: EASE }}
                    className="bg-[#0C1830] border border-[#1E3A5F] rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0076CC] shrink-0" />
                    <p className="text-[#F0F6FF] text-sm">{event}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── MAGIC MOMENT ── */}
          {activeTab === "magic" && (
            <motion.div
              key="magic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="px-6 py-6 max-w-5xl mx-auto"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] border-b border-[#1E3A5F] pb-4 mb-6">
                {budiJourney.phase3.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-8">
                {/* System cascade */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      `⏱️ ${budiJourney.phase3.timer.duration}`,
                      `🍔 ${budiJourney.phase3.timer.status}`,
                      `🌡️ ${budiJourney.phase3.timer.temp}`,
                    ].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-[#112040] border border-[#1E3A5F] rounded-full text-[#F0F6FF] text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {budiJourney.phase3.systemSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08, ease: EASE }}
                        className="p-3 rounded-lg border-l-4 border-l-[#14B8A6] bg-[#112040] flex items-center justify-between border border-[#1E3A5F]"
                      >
                        <span className="font-mono text-xs text-[#F0F6FF]">{step}</span>
                        {idx === budiJourney.phase3.systemSteps.length - 1 && (
                          <span className="text-xs font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded ml-2 shrink-0">
                            &lt;60s
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Phone mockup */}
                <div className="w-full md:w-64 shrink-0">
                  <div className="bg-[#0C1830] border-4 border-[#1E3A5F] rounded-[32px] h-96 flex flex-col relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1E3A5F] rounded-b-xl z-20" />
                    <div className="bg-[#112040] pt-8 pb-3 px-4 flex items-center gap-2 border-b border-[#1E3A5F]">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <div>
                        <div className="text-[#F0F6FF] font-semibold text-xs">Ancol Official</div>
                        <div className="text-[#4D6B8A] text-xs">Verified Business</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-[#060D1A] p-3 flex flex-col justify-end">
                      <div className="bg-[#112040] rounded-2xl p-3 self-start max-w-[90%] rounded-tl-sm border border-[#1E3A5F]">
                        <p className="text-[#F0F6FF] text-xs leading-snug mb-2">{budiJourney.phase3.whatsappMessage}</p>
                        <div className="bg-gradient-to-r from-[#14B8A6] to-[#0076CC] text-white text-center text-xs font-semibold py-1.5 rounded-xl cursor-pointer">
                          Klaim Voucher 🍔
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── OUTCOME ── */}
          {activeTab === "outcome" && (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="px-6 py-6 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] border-b border-[#1E3A5F] pb-4 mb-8 text-center">
                The Big Picture
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="bg-[#0C1830] p-6 rounded-3xl border border-[#1E3A5F]"
                >
                  <h3 className="uppercase tracking-widest text-[#4D6B8A] text-xs font-bold mb-4">Without CDP</h3>
                  <p className="text-base text-[#8BA3C1] leading-relaxed">
                    {budiJourney.outcome.withoutCdp.replace("WITHOUT CDP: ", "")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                  className="bg-[#0C1830] p-6 rounded-3xl border-2 border-[#14B8A6] shadow-[0_0_24px_2px_rgba(20,184,166,0.2)]"
                >
                  <h3 className="uppercase tracking-widest text-[#14B8A6] text-xs font-bold mb-4">With CDP</h3>
                  <p className="text-base text-[#F0F6FF] leading-relaxed font-medium">
                    {budiJourney.outcome.withCdp.replace("WITH CDP: ", "")}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "sequence" && (
            <motion.div
              key="sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex-1 min-h-0 overflow-y-auto px-6 py-5"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#14B8A6] to-[#38B6FF]" />
                  <h3 className="text-lg font-bold text-[#F0F6FF]">Budi&apos;s Full Journey — System Sequence</h3>
                  <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1">
                    Pre-Visit → On-Site → Action → Post-Visit
                  </span>
                </div>
                <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6">
                  <MermaidDiagram chart={BUDI_JOURNEY_SEQUENCE} />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
