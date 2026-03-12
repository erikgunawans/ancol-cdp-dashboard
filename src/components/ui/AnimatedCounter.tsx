"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  value,
  label,
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let rafId: number;
    try {
      const startTime = performance.now();
      const tick = (now: number) => {
        try {
          const progress = Math.min((now - startTime) / duration, 1);
          setCount(Math.round(easeOutExpo(progress) * value));
          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          }
        } catch {
          setCount(value);
        }
      };
      rafId = requestAnimationFrame(tick);
    } catch {
      // rAF unavailable — show the static target value immediately
      setCount(value);
    }
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  return (
    <div ref={ref}>
      <p className="text-5xl md:text-6xl font-bold tracking-tight text-[#F0F6FF]">
        {count}
        <span>{suffix}</span>
      </p>
      <p className="mt-2 text-xs font-medium tracking-widest uppercase text-[#4D6B8A]">
        {label}
      </p>
    </div>
  );
}
