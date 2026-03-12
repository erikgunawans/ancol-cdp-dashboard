"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.32, 0.72, 0, 1] as const;

export default function HomeClient() {
  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden relative">

      {/* ── Cinematic background layers ── */}
      {/* Top-right sky glow — large blue sweep */}
      <div className="absolute -top-20 -right-20 w-[700px] h-[600px] bg-gradient-to-bl from-[#0076CC]/30 via-[#38B6FF]/12 to-transparent rounded-full blur-[120px] pointer-events-none" />
      {/* Top-left deep blue horizon */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-gradient-to-br from-[#0C2A50]/60 via-[#0076CC]/8 to-transparent blur-[80px] pointer-events-none" />
      {/* Center atmospheric haze */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-r from-transparent via-[#0076CC]/6 to-transparent blur-3xl pointer-events-none" />
      {/* Bottom water-reflection teal */}
      <div className="absolute -bottom-10 left-1/4 w-[500px] h-[250px] bg-[#14B8A6]/8 rounded-full blur-[80px] pointer-events-none" />
      {/* Subtle crimson accent lower-right */}
      <div className="absolute bottom-1/4 -right-10 w-[280px] h-[280px] bg-[#C41E3A]/8 rounded-full blur-3xl pointer-events-none" />
      {/* Edge vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#060D1A_100%)] pointer-events-none" />

      {/* ── Centered hero content ── */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 py-8 text-center relative z-10">

        {/* Brand badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-3 bg-[#0C1830]/80 backdrop-blur-xl border border-[#1E3A5F] rounded-2xl px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
            <Image src="/assets/fav_ancol.png" alt="Ancol" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <div className="text-left leading-none">
            <p className="text-[13px] font-bold text-[#F0F6FF]">Ancol 360°</p>
            <p className="text-[10px] text-[#4D6B8A] mt-0.5 font-medium">by Axiara.AI × PT PJA Tbk</p>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#F0F6FF] mb-5 max-w-3xl leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          CDP Transformation Hub
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg text-[#8BA3C1] max-w-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
        >
          Accelerating guest experience through intelligent agents,
          unified customer data, and AI-driven decision making.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
        >
          <Link
            href="/overview"
            className="group inline-flex items-center gap-2.5 bg-[#0076CC] hover:bg-[#0090EE] text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-[0_0_0px_0px_rgba(0,118,204,0)] hover:shadow-[0_0_36px_2px_rgba(0,118,204,0.55)] transition-all duration-300"
          >
            Enter Dashboard
            <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden>
              →
            </span>
          </Link>
        </motion.div>

        {/* Status badges */}
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-14 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-[#8BA3C1]">LIVE ANALYTICS</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[#4D6B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[11px] font-semibold tracking-widest text-[#8BA3C1]">80 ACTIVE AGENTS</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[#4D6B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] font-semibold tracking-widest text-[#8BA3C1]">ENTERPRISE SECURE</span>
          </div>
        </motion.div>

        {/* Powered by */}
        <motion.p
          className="mt-5 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#4D6B8A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.65 }}
        >
          POWERED BY AXIARA.AI
        </motion.p>
      </div>
    </main>
  );
}
