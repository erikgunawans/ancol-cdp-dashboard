"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCases, DOMAINS, DOMAIN_COLORS, type Domain, type UseCase } from "@/data/use-cases";
import { useDiscussion } from "@/lib/discussion-context";

const EASE = [0.32, 0.72, 0, 1] as const;

const HERO_HOTSPOTS = [
  { domain: "Recreation"  as Domain, top: 11, left: 3,  width: 21, height: 25 },
  { domain: "Property"    as Domain, top: 0,  left: 32, width: 22, height: 22 },
  { domain: "Hospitality" as Domain, top: 11, left: 62, width: 21, height: 25 },
  { domain: "MICE"        as Domain, top: 40, left: 4,  width: 21, height: 24 },
  { domain: "Ecosystem"   as Domain, top: 36, left: 33, width: 21, height: 28 },
  { domain: "F&B"         as Domain, top: 39, left: 62, width: 21, height: 24 },
  { domain: "Marketing"   as Domain, top: 64, left: 2,  width: 21, height: 24 },
  { domain: "Back Office" as Domain, top: 64, left: 33, width: 21, height: 24 },
  { domain: "GRC"         as Domain, top: 62, left: 64, width: 21, height: 24 },
];

export default function UseCasesClient() {
  const { isSelected, toggle } = useDiscussion();
  const [view, setView]               = useState<"map" | "cards">("map");
  const [activeDomain, setActiveDomain] = useState<Domain>("All");
  const [heroDomain, setHeroDomain]   = useState<Domain | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const quickWinRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  const goToQuickWin = () => {
    setView("cards");
    setActiveDomain("All");
    setSearchQuery("");
    // Wait for cards view to render before scrolling
    setTimeout(() => {
      quickWinRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const heroUseCasesMap = useMemo(() => {
    const map: Record<string, UseCase[]> = {};
    for (const hs of HERO_HOTSPOTS) {
      map[hs.domain] = useCases.filter(uc => uc.domain === hs.domain);
    }
    return map;
  }, []);

  const heroDomainHotspot = heroDomain
    ? HERO_HOTSPOTS.find(h => h.domain === heroDomain) ?? null
    : null;
  const heroPreviewCases = heroDomain ? (heroUseCasesMap[heroDomain] ?? []) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCase(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredCases = useMemo(() => {
    return useCases.filter(uc => {
      const matchesDomain = activeDomain === "All" || uc.domain === activeDomain;
      const q = searchQuery.toLowerCase();
      return matchesDomain && (uc.title.toLowerCase().includes(q) || uc.description.toLowerCase().includes(q));
    });
  }, [activeDomain, searchQuery]);

  const handleHotspotClick = (domain: Domain) => {
    setActiveDomain(domain);
    setSearchQuery("");
    setView("cards");
  };

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-3 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Left: title + count */}
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-xl font-bold text-[#F0F6FF] shrink-0">80 AI Use Cases</h1>
            <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1 shrink-0">
              9 domains
            </span>
            {view === "cards" && filteredCases.length < useCases.length && (
              <span className="text-xs font-semibold text-[#38B6FF] bg-[#0076CC]/10 border border-[#0076CC]/30 rounded-full px-2.5 py-1 shrink-0">
                {filteredCases.length} shown
              </span>
            )}
            <button
              type="button"
              onClick={goToQuickWin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 hover:bg-[#F59E0B]/20 transition-all duration-200 shrink-0"
            >
              ⚡ Quick Wins
            </button>
          </div>

          {/* Right: view toggle + search */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#0C1830] border border-[#1E3A5F] rounded-xl">
              <button type="button" onClick={() => setView("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  view === "map" ? "bg-[#0076CC] text-white shadow-sm" : "text-[#8BA3C1] hover:text-[#F0F6FF]"
                }`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Domain Map
              </button>
              <button type="button" onClick={() => setView("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  view === "cards" ? "bg-[#0076CC] text-white shadow-sm" : "text-[#8BA3C1] hover:text-[#F0F6FF]"
                }`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Browse Cards
              </button>
            </div>

            {/* Search (cards view only) */}
            {view === "cards" && (
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4D6B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search use cases..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-48 bg-[#0C1830] border border-[#1E3A5F] rounded-xl text-sm text-[#F0F6FF] placeholder:text-[#4D6B8A] focus:outline-none focus:ring-2 focus:ring-[#0076CC] transition-all"
                />
              </div>
            )}
          </div>
        </div>

        {/* Domain chips (cards view) */}
        {view === "cards" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar"
          >
            {DOMAINS.map(domain => (
              <button key={domain} type="button"
                onClick={() => { setActiveDomain(domain); setSearchQuery(""); }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeDomain === domain
                    ? "bg-[#0076CC] text-white shadow-[0_0_12px_0px_rgba(0,118,204,0.5)]"
                    : "bg-[#0C1830] text-[#8BA3C1] border border-[#1E3A5F] hover:text-[#F0F6FF] hover:bg-[#112040]"
                }`}>
                {domain}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Content area ── */}
      <AnimatePresence mode="wait">

        {/* ── MAP VIEW ── */}
        {view === "map" && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-4 relative overflow-hidden"
            onMouseLeave={() => setHeroDomain(null)}
          >
            {/* Hint text */}
            <p className="shrink-0 text-xs text-[#4D6B8A] mb-3 text-center">
              Hover a domain to preview · Click to browse its use cases
            </p>

            {/* Image container — full width, centered, aspect-preserving */}
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-6xl">
                <Image
                  src="/assets/ancol-use-cases.svg"
                  alt="Ancol CDP — Nine Business Domains"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Hotspot overlays — use same % coords as image */}
                {HERO_HOTSPOTS.map(hs => (
                  <button
                    key={hs.domain}
                    type="button"
                    aria-label={`View ${hs.domain} use cases`}
                    className="absolute cursor-pointer rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CC]"
                    style={{
                      top: `${hs.top}%`, left: `${hs.left}%`,
                      width: `${hs.width}%`, height: `${hs.height}%`,
                      background: heroDomain === hs.domain ? "rgba(0,118,204,0.12)" : "transparent",
                      border: heroDomain === hs.domain ? "2px solid rgba(56,182,255,0.6)" : "2px solid transparent",
                    }}
                    onMouseEnter={() => setHeroDomain(hs.domain)}
                    onClick={() => handleHotspotClick(hs.domain)}
                  />
                ))}

                {/* Tooltip */}
                <AnimatePresence>
                  {heroDomain && heroDomainHotspot && (
                    <motion.div
                      key={heroDomain}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 w-52 bg-[#0C1830]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#1E3A5F] overflow-hidden pointer-events-none text-left"
                      style={{
                        ...(heroDomainHotspot.left + heroDomainHotspot.width / 2 < 52
                          ? { left: `${heroDomainHotspot.left + heroDomainHotspot.width + 1}%` }
                          : { right: `${100 - heroDomainHotspot.left + 1}%` }),
                        top: `${Math.min(heroDomainHotspot.top, 60)}%`,
                      }}
                    >
                      <div className="px-4 pt-3.5 pb-2.5 border-b border-[#1E3A5F]">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${DOMAIN_COLORS[heroDomain] ?? ""}`}>
                          {heroDomain}
                        </span>
                        <p className="text-sm font-bold text-[#F0F6FF] mt-1.5">
                          {heroPreviewCases.length} AI use cases
                        </p>
                      </div>
                      <div className="px-4 py-3 space-y-2">
                        {heroPreviewCases.slice(0, 3).map((uc, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#0076CC] mt-1.5 shrink-0" />
                            <p className="text-[11px] text-[#8BA3C1] line-clamp-2 leading-snug">{uc.title}</p>
                          </div>
                        ))}
                        {heroPreviewCases.length > 3 && (
                          <p className="text-[10px] text-[#4D6B8A] pl-3">+{heroPreviewCases.length - 3} more</p>
                        )}
                      </div>
                      <div className="px-4 pb-3.5">
                        <div className="py-1.5 bg-[#0076CC] text-white text-[10px] font-bold rounded-lg text-center tracking-wide">
                          Click to view all {heroPreviewCases.length} →
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CARDS VIEW ── */}
        {view === "cards" && (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto px-6 py-4"
          >
            <div className="max-w-7xl mx-auto">
              {filteredCases.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-[#8BA3C1] text-base mb-3">No use cases match your filters.</p>
                  <button type="button"
                    onClick={() => { setSearchQuery(""); setActiveDomain("All"); }}
                    className="text-[#38B6FF] text-sm font-medium hover:underline">
                    Clear filters
                  </button>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredCases.map(uc => (
                      <motion.button layout type="button" key={uc.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        aria-label={`View details for ${uc.title}`}
                        onClick={() => setSelectedCase(uc)}
                        className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col h-full text-left ${
                          isSelected(uc.id)
                            ? "bg-[#0C1830] border-[#C41E3A]/50 shadow-[0_0_12px_0px_rgba(196,30,58,0.15)]"
                            : "bg-[#0C1830] border-[#1E3A5F] hover:border-[#0076CC]/40 hover:bg-[#112040]"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${DOMAIN_COLORS[uc.domain]}`}>
                            {uc.domain}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#4D6B8A] bg-[#112040] px-2 py-0.5 rounded">{uc.product}</span>
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); toggle(uc.id); }}
                              aria-label={isSelected(uc.id) ? `Remove ${uc.title} from discussion` : `Add ${uc.title} to discussion`}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                                isSelected(uc.id)
                                  ? "bg-[#C41E3A] border-[#C41E3A] text-white"
                                  : "border-[#1E3A5F] hover:border-[#C41E3A]"
                              }`}
                            >
                              {isSelected(uc.id) && (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-[#F0F6FF] mb-2 leading-snug">{uc.title}</h3>
                        <p className="text-[#8BA3C1] text-xs flex-1 mb-4 line-clamp-3 leading-relaxed">{uc.description}</p>
                        <div className="mt-auto border-t border-[#1E3A5F] pt-3 flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-medium text-[#0076CC] bg-[#0076CC]/10 px-2.5 py-1 rounded-lg border border-[#0076CC]/20">
                            {uc.businessImpact}
                          </p>
                          {uc.isAgenticAI && (
                            <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#C41E3A] to-[#0076CC] px-2 py-0.5 rounded-md">
                              ⚡ Agentic
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ── Quick Win Use Cases ── */}
              <div ref={quickWinRef} className="mt-10 mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0076CC] to-[#38B6FF]" />
                  <h2 className="text-lg font-bold text-[#F0F6FF]">Quick Win Use Cases</h2>
                  <span className="text-xs font-semibold text-[#38B6FF] bg-[#0076CC]/10 border border-[#0076CC]/30 rounded-full px-2.5 py-1">
                    High Impact · Fast Deploy
                  </span>
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden border border-[#1E3A5F]">
                  <Image
                    src="/assets/quick-win.jpeg"
                    alt="Quick Win Use Cases"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div role="dialog" aria-modal="true" aria-labelledby="modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-[#0C1830] rounded-3xl p-8 max-w-2xl w-full shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-[#1E3A5F] overflow-y-auto max-h-[90vh]"
            >
              <button type="button" onClick={() => setSelectedCase(null)} aria-label="Close modal"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-[#112040] text-[#F0F6FF] rounded-full hover:bg-[#1E3A5F] transition-colors">
                ✕
              </button>
              <div className="flex flex-wrap items-center gap-2 mb-5 pr-10">
                <span className={`text-xs font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${DOMAIN_COLORS[selectedCase.domain]}`}>
                  {selectedCase.domain}
                </span>
                <span className="text-xs font-bold text-[#F0F6FF] bg-[#112040] border border-[#1E3A5F] px-2.5 py-1 rounded">
                  {selectedCase.product}
                </span>
                {selectedCase.isAgenticAI && (
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-[#C41E3A] to-[#0076CC] px-2.5 py-1 rounded">
                    ⚡ Agentic AI
                  </span>
                )}
              </div>
              <h2 id="modal-title" className="text-2xl font-bold text-[#F0F6FF] mb-4">{selectedCase.title}</h2>
              <p className="text-[#8BA3C1] mb-8 leading-relaxed">{selectedCase.description}</p>
              <div className="bg-[#112040] rounded-2xl p-5 border border-[#1E3A5F] space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0076CC]/10 flex items-center justify-center shrink-0 text-base">📈</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F0F6FF] uppercase tracking-wider mb-1">Projected Business Impact</h4>
                    <p className="text-[#0076CC] font-semibold">{selectedCase.businessImpact}</p>
                  </div>
                </div>
                <div className="h-px bg-[#1E3A5F]" />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0 text-base">⏱️</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F0F6FF] uppercase tracking-wider mb-1">Implementation Phase</h4>
                    <p className="text-[#F59E0B] font-semibold">Phase {selectedCase.phase}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
