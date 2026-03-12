"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDiscussion } from "@/lib/discussion-context";
import { useCases, DOMAIN_COLORS } from "@/data/use-cases";
import TabBar from "@/components/ui/TabBar";
import AgrasITQuestions, { AgrasState, defaultAgrasState } from "@/components/AgrasITQuestions";

const EASE = [0.32, 0.72, 0, 1] as const;

const MAIN_TABS = [
  { id: "chosen", label: "Chosen Use-Cases" },
  { id: "reference", label: "Reference Materials" },
  { id: "it", label: "IT Questions" },
] as const;
type MainTab = typeof MAIN_TABS[number]["id"];

const REFERENCE_DOC_URL = "https://drive.google.com/file/d/1TIENH7RjrsmX-QIZIS_qkrAXQeYj_d-a/view?usp=sharing";

export default function DiscussionClient() {
  const { isSelected, toggle, clear } = useDiscussion();
  const [mainTab, setMainTab] = useState<MainTab>("chosen");
  const [agrasState, setAgrasState] = useState<AgrasState>(() => {
    if (typeof window === "undefined") return defaultAgrasState();
    try {
      const saved = localStorage.getItem("agras-it-state");
      return saved ? JSON.parse(saved) : defaultAgrasState();
    } catch { return defaultAgrasState(); }
  });

  useEffect(() => {
    try { localStorage.setItem("agras-it-state", JSON.stringify(agrasState)); } catch {}
  }, [agrasState]);

  const selectedCases = useCases.filter(uc => isSelected(uc.id));

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 border-b border-[#1E3A5F]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[#F0F6FF]">Discussion</h1>
              {mainTab === "chosen" && (
                <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1">
                  {selectedCases.length} selected
                </span>
              )}
            </div>
            {mainTab === "chosen" && selectedCases.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-xs font-semibold text-[#E05470] hover:text-[#F0F6FF] transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <TabBar
            tabs={MAIN_TABS}
            activeTab={mainTab}
            onTabChange={(id) => setMainTab(id as MainTab)}
            layoutId="discussionTabUnderline"
            accentColor="#38B6FF"
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ── CHOSEN USE-CASES TAB ── */}
            {mainTab === "chosen" && (
              <motion.div
                key="chosen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <AnimatePresence mode="popLayout">
                  {selectedCases.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex flex-col items-center justify-center py-32 text-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#0C1830] border border-[#1E3A5F] flex items-center justify-center text-2xl mb-5">
                        💬
                      </div>
                      <p className="text-[#8BA3C1] text-base mb-2">No use cases selected yet</p>
                      <p className="text-[#4D6B8A] text-sm mb-6">
                        Go to{" "}
                        <Link href="/use-cases" className="text-[#38B6FF] hover:underline">
                          80 Use Cases
                        </Link>{" "}
                        and check the ones you want to discuss.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedCases.map((uc, idx) => (
                        <motion.div
                          key={uc.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: EASE, delay: idx * 0.04 }}
                          className="bg-[#0C1830] rounded-2xl p-5 border border-[#C41E3A]/40 shadow-[0_0_12px_0px_rgba(196,30,58,0.12)] flex flex-col group"
                        >
                          {/* Top row */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${DOMAIN_COLORS[uc.domain]}`}>
                                {uc.domain}
                              </span>
                              <span className="text-[10px] font-bold text-[#4D6B8A] bg-[#112040] px-2 py-0.5 rounded">
                                {uc.product}
                              </span>
                            </div>
                            {/* Remove */}
                            <button
                              type="button"
                              onClick={() => toggle(uc.id)}
                              aria-label={`Remove ${uc.title} from discussion`}
                              className="w-6 h-6 flex items-center justify-center rounded-lg text-[#4D6B8A] hover:text-[#E05470] hover:bg-[#112040] transition-all duration-200 opacity-0 group-hover:opacity-100 shrink-0 ml-2"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Title + description */}
                          <h3 className="text-base font-bold text-[#F0F6FF] mb-2 leading-snug">{uc.title}</h3>
                          <p className="text-[#8BA3C1] text-xs flex-1 mb-4 leading-relaxed">{uc.description}</p>

                          {/* Footer */}
                          <div className="border-t border-[#1E3A5F] pt-3 space-y-2">
                            <p className="text-xs font-medium text-[#0076CC] bg-[#0076CC]/10 px-2.5 py-1 rounded-lg border border-[#0076CC]/20">
                              📈 {uc.businessImpact}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2.5 py-1 rounded-lg">
                                Phase {uc.phase}
                              </span>
                              {uc.isAgenticAI && (
                                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#C41E3A] to-[#0076CC] px-2 py-0.5 rounded-md">
                                  ⚡ Agentic
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── REFERENCE MATERIALS TAB ── */}
            {mainTab === "reference" && (
              <motion.div
                key="reference"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex flex-col items-center justify-center py-20"
              >
                <a
                  href={REFERENCE_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#0C1830] border border-[#1E3A5F] hover:border-[#0076CC]/60 hover:shadow-[0_0_24px_0px_rgba(0,118,204,0.12)] transition-all duration-300 rounded-2xl p-8 max-w-md w-full flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0076CC]/10 border border-[#0076CC]/20 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-[#38B6FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#F0F6FF] mb-1">Gemini Enterprise Presentation</h3>
                  <p className="text-[11px] text-[#38B6FF] underline underline-offset-2 break-all mb-5 px-2">
                    {REFERENCE_DOC_URL}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#38B6FF] group-hover:text-[#F0F6FF] transition-colors">
                    Open in Google Drive
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                </a>
              </motion.div>
            )}

          </AnimatePresence>

          {/* ── IT QUESTIONS TAB — state lives in parent to persist across tab switches ── */}
          <div className={mainTab === "it" ? "bg-white rounded-2xl overflow-hidden shadow-lg" : "hidden"}>
            <AgrasITQuestions state={agrasState} onChange={setAgrasState} />
          </div>
        </div>

      </div>
    </main>
  );
}
