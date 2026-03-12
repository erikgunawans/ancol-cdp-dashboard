"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AgrasCIOBriefing from "@/components/AgrasCIOBriefing";
import AgrasDemoScramble from "@/components/AgrasDemoScramble";

const EASE = [0.32, 0.72, 0, 1] as const;

export default function SpecificUseCaseClient() {
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── AGRAS Briefing Modal ── */}
      <AnimatePresence>
        {briefingOpen && (
          <motion.div
            key="briefing-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "#06132A" }}
          >
            <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(47,140,160,0.2)", background: "rgba(11,29,56,0.95)", backdropFilter: "blur(12px)" }}>
              <span className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>AGRAS — CIO Executive Briefing</span>
              <button
                type="button"
                onClick={() => setBriefingOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#8DA0BA", background: "rgba(47,140,160,0.08)", border: "1px solid rgba(47,140,160,0.2)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AgrasCIOBriefing />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AGRAS Demo Modal ── */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            key="demo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "#050D1A" }}
          >
            <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(47,111,126,0.2)", background: "rgba(10,22,40,0.95)", backdropFilter: "blur(12px)" }}>
              <span className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>AGRAS — Interactive Demo</span>
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#7A8BA5", background: "rgba(47,111,126,0.08)", border: "1px solid rgba(47,111,126,0.2)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AgrasDemoScramble />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-5 border-b border-[#1E3A5F]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-[#F0F6FF]">Specific Use Case</h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <motion.button
            type="button"
            onClick={() => setBriefingOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="bg-[#0C1830] border border-[#1E3A5F] hover:border-[#C41E3A]/50 hover:shadow-[0_0_24px_0px_rgba(196,30,58,0.12)] transition-all duration-300 rounded-2xl p-8 max-w-md w-full flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-[#C41E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#F0F6FF] mb-2">
              AGRAS — Ancol Governance & Regulatory Audit System
            </h3>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#C41E3A] bg-[#C41E3A]/10 border border-[#C41E3A]/20 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-[#C41E3A]/20 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
              Open Briefing
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setDemoOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE, delay: 0.08 }}
            className="bg-[#0C1830] border border-[#1E3A5F] hover:border-[#0076CC]/50 hover:shadow-[0_0_24px_0px_rgba(0,118,204,0.12)] transition-all duration-300 rounded-2xl p-8 max-w-md w-full flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#0076CC]/10 border border-[#0076CC]/20 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-[#38B6FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#F0F6FF] mb-2">
              AGRAS Demo
            </h3>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#38B6FF] bg-[#0076CC]/10 border border-[#0076CC]/20 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-[#0076CC]/20 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
              Launch Demo
            </span>
          </motion.button>
        </div>
      </div>
    </main>
  );
}
