"use client";

import { useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: readonly TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  layoutId?: string;
  accentColor?: string;
  className?: string;
}

export default function TabBar({
  tabs,
  activeTab,
  onTabChange,
  layoutId = "tabBarUnderline",
  accentColor = "#38B6FF",
  className = "",
}: TabBarProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % tabs.length;
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Page sections"
      className={`flex items-center gap-1 overflow-x-auto scrollbar-hide ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CC] rounded-t-md ${
              isActive ? "text-[#F0F6FF]" : "text-[#4D6B8A] hover:text-[#8BA3C1]"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
