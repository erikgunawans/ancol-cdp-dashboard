"use client";

import { motion } from "framer-motion";
import { animation } from "@/lib/design-tokens";
import type { KPI } from "@/data/kpis";

interface KPICardProps extends KPI {
  index?: number;
}

export default function KPICard({
  label,
  value,
  delta,
  deltaPositive,
  unit,
  index = 0,
}: KPICardProps) {
  return (
    <motion.div
      className="group p-6 bg-[#0C1830] border border-[#1E3A5F] rounded-2xl transition-all duration-300 hover:border-[#0076CC]/50 hover:bg-[#112040] hover:shadow-[0_0_24px_0px_rgba(0,118,204,0.2)] hover:-translate-y-0.5"
      initial={animation.fadeUp.initial}
      animate={animation.fadeUp.animate}
      transition={{
        ...animation.fadeUp.transition,
        delay: index * 0.08,
      }}
    >
      <p className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A] mb-3">
        {label}
      </p>
      <p className="text-4xl font-bold tracking-tight text-[#F0F6FF] mb-1">
        {value}
      </p>
      {unit && <p className="text-xs text-[#8BA3C1] mb-2">{unit}</p>}
      <span
        className={`inline-block text-sm font-semibold px-2 py-0.5 rounded-md border ${
          deltaPositive
            ? "text-[#34C759] bg-[#34C759]/10 border-[#34C759]/20"
            : "text-[#C41E3A] bg-[#C41E3A]/10 border-[#C41E3A]/20"
        }`}
      >
        {delta}
      </span>
    </motion.div>
  );
}
