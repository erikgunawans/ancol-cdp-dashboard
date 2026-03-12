"use client";

import { motion } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const SPARKLINE = [38, 52, 44, 68, 60, 76, 72];

export default function OverviewClient() {
  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Page header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-[#1E3A5F]">
        <motion.div
          className="max-w-7xl mx-auto flex items-center justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-0.5">
              Ancol CDP · Overview
            </p>
            <h1 className="text-xl font-bold tracking-tight text-[#F0F6FF]">
              Executive Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
            <p className="text-xs text-[#4D6B8A]">Live · daily sync</p>
          </div>
        </motion.div>
      </div>

      {/* ── Bento grid ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-3 h-full">

          {/* HERO — Total Visitors (col 8, row 2) */}
          <motion.div
            className="col-span-12 md:col-span-8 md:row-span-2 p-5 bg-[#0C1830] border border-[#1E3A5F] rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:border-[#0076CC]/40 hover:shadow-[0_0_40px_0px_rgba(0,118,204,0.12)]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-3">
                Total Visitors YTD
              </p>
              <p className="text-5xl md:text-6xl font-bold tracking-tight text-[#F0F6FF] mb-1">
                4.2M
              </p>
              <p className="text-sm text-[#8BA3C1]">guests</p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="inline-flex items-center gap-1.5 text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-3 py-1 rounded-full text-sm font-semibold">
                +12.4% YoY
              </span>
              {/* Mini sparkline */}
              <div className="flex items-end gap-1.5 h-10">
                {SPARKLINE.map((h, i) => (
                  <div
                    key={i}
                    className="w-2.5 rounded-sm bg-[#0076CC]/30 group-hover:bg-[#0076CC]/60 transition-colors duration-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Revenue (col 4) */}
          <motion.div
            className="col-span-12 md:col-span-4 p-5 bg-[#0C1830] border border-[#1E3A5F] rounded-2xl transition-all duration-300 hover:border-[#F59E0B]/40 hover:bg-[#112040]"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.07, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-3">
              Revenue YTD
            </p>
            <p className="text-3xl font-bold tracking-tight text-[#F59E0B] mb-2">
              Rp 892B
            </p>
            <span className="text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2.5 py-0.5 rounded-full text-sm font-semibold">
              +8.7%
            </span>
          </motion.div>

          {/* Avg Spend (col 4) */}
          <motion.div
            className="col-span-12 md:col-span-4 p-5 bg-[#0C1830] border border-[#1E3A5F] rounded-2xl transition-all duration-300 hover:border-[#38B6FF]/40 hover:bg-[#112040]"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-3">
              Avg. Spend / Visit
            </p>
            <p className="text-3xl font-bold tracking-tight text-[#38B6FF] mb-2">
              Rp 212K
            </p>
            <span className="text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2.5 py-0.5 rounded-full text-sm font-semibold">
              +3.1%
            </span>
          </motion.div>

          {/* NPS Score (col 6) */}
          <motion.div
            className="col-span-12 md:col-span-6 p-5 bg-[#0C1830] border border-[#1E3A5F] rounded-2xl transition-all duration-300 hover:border-[#14B8A6]/40 hover:bg-[#112040]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.21, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-3">
              NPS Score
            </p>
            <div className="flex items-end gap-3 mb-2">
              <p className="text-4xl font-bold text-[#14B8A6]">72</p>
              <div className="pb-1">
                <div className="w-24 h-2 bg-[#1E3A5F] rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-[#14B8A6] to-[#38B6FF] rounded-full"
                    style={{ width: "72%" }}
                  />
                </div>
                <p className="text-xs text-[#4D6B8A]">out of 100</p>
              </div>
            </div>
            <span className="text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2.5 py-0.5 rounded-full text-sm font-semibold">
              +5 pts
            </span>
          </motion.div>

          {/* Loyalty Members (col 6) */}
          <motion.div
            className="col-span-12 md:col-span-6 p-5 bg-gradient-to-br from-[#0076CC]/10 to-[#0C1830] border border-[#0076CC]/25 rounded-2xl transition-all duration-300 hover:border-[#0076CC]/50"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-3">
              Loyalty Members
            </p>
            <p className="text-4xl font-bold text-[#F0F6FF] mb-2">1.8M</p>
            <span className="text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2.5 py-0.5 rounded-full text-sm font-semibold">
              +22%
            </span>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-[#0076CC] animate-pulse" />
              <p className="text-xs text-[#8BA3C1]">Active loyalty growing fast</p>
            </div>
          </motion.div>

          {/* Churn Rate — full width */}
          <motion.div
            className="col-span-12 p-5 bg-[#C41E3A]/5 border border-[#C41E3A]/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#4D6B8A] mb-1">
                Churn Rate
              </p>
              <p className="text-2xl font-bold text-[#F0F6FF]">6.3%</p>
              <p className="text-xs text-[#8BA3C1]">loyalty members · 30-day rolling</p>
            </div>
            <span className="text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
              −1.2% YoY improvement
            </span>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
