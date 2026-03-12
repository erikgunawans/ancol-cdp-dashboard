"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MermaidDiagram from "@/components/ui/MermaidDiagram";
import { IMPLEMENTATION_GANTT } from "@/data/mermaid-diagrams";
import { timelinePhases } from "@/data/timeline-phases";

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<string, string> = {
  "phase-0": "#4D6B8A",
  "phase-1": "#0076CC",
  "phase-2": "#5B5BD6",
  "phase-3": "#8B5CF6",
  "phase-4": "#C41E3A",
};

const PHASE_DESCS: Record<string, string> = {
  "phase-0": "System inventory, data quality auditing, and technical architecture sign-off.",
  "phase-1": "GCP/BigQuery infrastructure, batch ingestion (ancol.com/loyalty), and DLP governance.",
  "phase-2": "Wahana POS integration, Pub/Sub event streaming, and bidirectional MoEngage sync.",
  "phase-3": "Vertex AI training, real-time recommendation engine, and Arsi chatbot integration.",
  "phase-4": "Dynamic pricing, churn prediction, Customer DNA profiling, and full SENTINEL deployment.",
};

const MILESTONES = [
  { gate: "Gate 0", date: "May 2026",  task: "Architecture Locked" },
  { gate: "Gate 1", date: "Jul 2026",  task: "First Dashboards Live" },
  { gate: "Gate 2", date: "Sep 2026",  task: "Real-Time Sync Verified" },
  { gate: "Gate 3", date: "Nov 2026",  task: "AI Recommendations Live" },
  { gate: "Gate 4", date: "Feb 2027",  task: "SENTINEL Full Deployment" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoadmapClient() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>("phase-1");
  const [zoom, setZoom] = useState(1);

  const selectedPhase = timelinePhases.find(p => p.id === selectedPhaseId) ?? timelinePhases[0] ?? null;

  if (!selectedPhase) return null;

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Compact header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-[#1E3A5F]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-xl font-bold tracking-tight text-[#F0F6FF] mb-1">
            From Blueprint to Production in 8–10 Months
          </h1>
          <p className="text-sm text-[#8BA3C1]">
            Five phases. Each with a Go/No-Go gate. You only scale what&apos;s proven.
          </p>
        </motion.div>
      </div>

      {/* ── Timeline stepper ── */}
      <div className="shrink-0 px-6 py-5 border-b border-[#1E3A5F] bg-[#0C1830]/30">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto scrollbar-hide pb-1">
            <div className="min-w-[520px] relative pt-6 pb-8">
              {/* Track */}
              <div className="relative h-2 bg-[#1E3A5F] rounded-full flex items-center justify-between">
                {/* Progress fill */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#C41E3A] rounded-full transition-all duration-500"
                  style={{
                    width: `${(timelinePhases.findIndex(p => p.id === selectedPhaseId) / (timelinePhases.length - 1)) * 100}%`
                  }}
                />

                {timelinePhases.map((phase, index) => {
                  const isSelected = selectedPhaseId === phase.id;
                  const isPast = timelinePhases.findIndex(p => p.id === selectedPhaseId) > index;

                  return (
                    <button
                      key={phase.id}
                      onClick={() => setSelectedPhaseId(phase.id)}
                      aria-pressed={isSelected}
                      aria-label={phase.name}
                      className="relative z-10 flex flex-col items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C41E3A] rounded-full min-w-[44px] min-h-[44px] justify-center"
                    >
                      {/* Duration tooltip */}
                      <div className={`absolute -top-8 whitespace-nowrap px-2 py-0.5 rounded text-xs font-bold tracking-wider transition-all ${
                        isSelected
                          ? "bg-[#112040] text-[#F0F6FF] opacity-100"
                          : "bg-[#0C1830] text-[#8BA3C1] border border-[#1E3A5F] opacity-0 group-hover:opacity-100"
                      }`}>
                        {phase.duration}
                      </div>

                      {/* Circle */}
                      <div className={`w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#C41E3A] border-[#FCE8EC] scale-125 shadow-lg"
                          : isPast
                            ? "bg-[#C41E3A] border-[#C41E3A]"
                            : "bg-[#0C1830] border-[#1E3A5F] group-hover:border-[#C41E3A]/50"
                      }`}>
                        {isPast && !isSelected && <div className="w-2 h-2 bg-[#F0F6FF] rounded-full" />}
                      </div>

                      {/* Name */}
                      <div className={`absolute top-9 whitespace-nowrap font-medium text-xs transition-colors ${
                        isSelected ? "text-[#F0F6FF]" : "text-[#8BA3C1] group-hover:text-[#F0F6FF]"
                      }`}>
                        {phase.name.split(":")[0] ?? phase.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-[#060D1A] to-transparent pointer-events-none lg:hidden" />
        </div>
      </div>

      {/* ── Detail card — scrollable ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-[#0C1830] rounded-2xl p-6 md:p-8 border border-[#1E3A5F] flex flex-col lg:flex-row gap-8"
            >
              {/* Left: Description */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#F0F6FF] mb-1">{selectedPhase.name}</h3>
                  <p className="text-xs font-semibold tracking-widest text-[#8BA3C1] uppercase">Duration: {selectedPhase.duration}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-widest text-[#F0F6FF] uppercase mb-3">Core Deliverables</h4>
                  <ul className="space-y-2">
                    {selectedPhase.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#8BA3C1] text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0076CC] mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#112040] p-5 rounded-xl border border-[#1E3A5F]">
                  <h4 className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F0F6FF] uppercase mb-2">
                    <span>🎯</span> Value Delivered
                  </h4>
                  <p className="text-[#8BA3C1] text-sm leading-relaxed">{selectedPhase.valueDelivered}</p>
                </div>
              </div>

              {/* Right: Tech + Gate */}
              <div className="w-full lg:w-72 shrink-0 space-y-6 flex flex-col">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-[#4D6B8A] uppercase mb-2">Prerequisites</h4>
                  <p className="text-[#8BA3C1] text-sm leading-relaxed">{selectedPhase.prerequisites}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-widest text-[#4D6B8A] uppercase mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhase.technologies.map(tech => (
                      <span key={tech} className="bg-[#0076CC]/10 text-[#38B6FF] border border-[#0076CC]/30 text-xs font-bold px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Go/No-Go Gate */}
                <div className="bg-[#060D1A] p-5 rounded-xl border border-[#1E3A5F] border-l-4 border-l-[#C41E3A] mt-auto">
                  <h4 className="text-xs font-bold tracking-widest text-[#F0F6FF] uppercase mb-2">🚦 Go / No-Go Gate</h4>
                  <p className="text-[#8BA3C1] text-sm leading-relaxed">{selectedPhase.goNoGoGate}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Gantt Chart ── */}
          <div className="mt-8 mb-4 space-y-4">

            {/* Phase legend */}
            <div className="flex flex-wrap gap-2">
              {timelinePhases.map((phase) => {
                const color = PHASE_COLORS[phase.id] ?? "#4D6B8A";
                const label = phase.name.split(":")[0] ?? phase.name;
                return (
                  <div
                    key={phase.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
                    style={{ borderColor: color + "40", backgroundColor: color + "12", color }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Header + zoom controls */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#0076CC]" />
              <h3 className="text-lg font-bold text-[#F0F6FF]">Implementation Timeline</h3>
              <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1">
                Apr 2026 — Phase 0 through Phase 4
              </span>
              <div className="ml-auto flex gap-1">
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={() => setZoom(prev => Math.max(0.5, parseFloat((prev - 0.1).toFixed(1))))}
                  className="p-2 rounded-xl text-[#8BA3C1] hover:text-[#F0F6FF] hover:bg-[#112040] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>
                  </svg>
                </button>
                <span className="flex items-center px-2 text-xs font-mono text-[#4D6B8A] min-w-[3rem] justify-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setZoom(prev => Math.min(2, parseFloat((prev + 0.1).toFixed(1))))}
                  className="p-2 rounded-xl text-[#8BA3C1] hover:text-[#F0F6FF] hover:bg-[#112040] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Gantt with zoom */}
            <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6 overflow-x-auto">
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", minWidth: "900px", transition: "transform 0.2s ease" }}>
                <MermaidDiagram chart={IMPLEMENTATION_GANTT} />
              </div>
            </div>

            {/* Phase Summary + Key Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

              {/* Phase Summary */}
              <div>
                <h4 className="text-sm font-bold text-[#F0F6FF] mb-4 tracking-tight">Phase Summary</h4>
                <ul className="space-y-4">
                  {timelinePhases.map((phase, i) => {
                    const color = PHASE_COLORS[phase.id] ?? "#4D6B8A";
                    const label = phase.name.includes(":") ? phase.name.split(":").slice(1).join(":").trim() : phase.name;
                    return (
                      <li key={phase.id} className="flex gap-3">
                        <div
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                          style={{ backgroundColor: color }}
                        >
                          {i}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#F0F6FF]">{phase.name.split(":")[0]} — {label}</p>
                          <p className="text-xs text-[#8BA3C1] leading-relaxed mt-0.5">{PHASE_DESCS[phase.id]}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Key Milestones */}
              <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6">
                <h4 className="text-sm font-bold text-[#F0F6FF] mb-4 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F59E0B]" aria-hidden>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Key Milestones
                </h4>
                <div className="space-y-3">
                  {MILESTONES.map((m) => (
                    <div key={m.gate} className="flex items-center justify-between border-b border-[#1E3A5F] pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#4D6B8A] block">{m.gate}</span>
                        <span className="text-sm font-semibold text-[#F0F6FF]">{m.task}</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-[#F59E0B]">{m.date}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-3 bg-[#112040] rounded-xl border border-[#1E3A5F]">
                  <p className="text-[11px] text-[#4D6B8A] leading-relaxed">
                    <span className="font-semibold text-[#8BA3C1] uppercase tracking-wider block mb-1">Note on Contingencies</span>
                    Timeline assumes standard review periods. Delays in system inventory or third-party API availability will shift all downstream activities.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
