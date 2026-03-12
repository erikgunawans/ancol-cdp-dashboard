"use client";

import { useEffect, useRef, useId, useState } from "react";
import mermaid from "mermaid";
import DOMPurify from "dompurify";

let initialized = false;
function ensureInit() {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
      darkMode: true,
      background: "#0C1830",
      primaryColor: "#0076CC",
      primaryTextColor: "#F0F6FF",
      primaryBorderColor: "#1E3A5F",
      lineColor: "#4D6B8A",
      secondaryColor: "#112040",
      tertiaryColor: "#1E3A5F",
      tertiaryTextColor: "#8BA3C1",
      clusterBkg: "#0C1830",
      clusterBorder: "#1E3A5F",
      titleColor: "#F0F6FF",
      edgeLabelBackground: "#112040",
      fontFamily: "Inter, ui-sans-serif, sans-serif",
      fontSize: "13px",
    },
  });
}

export default function MermaidDiagram({
  chart,
  className,
}: {
  chart: string;
  className?: string;
}) {
  const rawId = useId();
  const safeId = `mmd${rawId.replace(/[^a-zA-Z0-9]/g, "_")}`;
  const ref = useRef<HTMLDivElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureInit();
    if (!ref.current) return;
    setRenderError(null);
    setLoading(true);
    mermaid
      .render(safeId, chart)
      .then(({ svg }) => {
        if (!ref.current) return;
        const clean = DOMPurify.sanitize(svg, {
          USE_PROFILES: { svg: true, svgFilters: true },
        });
        ref.current.innerHTML = clean;
        const svgEl = ref.current.querySelector("svg");
        if (svgEl) {
          svgEl.style.width = "100%";
          svgEl.style.maxWidth = "100%";
          svgEl.style.height = "auto";
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[MermaidDiagram] Render failed:", message);
        setRenderError(message);
        setLoading(false);
      });
  }, [chart, safeId]);

  if (renderError) {
    return (
      <div
        role="alert"
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1E3A5F] bg-[#0C1830]/60 text-[#8BA3C1] text-sm ${className ?? ""}`}
      >
        <svg className="w-4 h-4 shrink-0 text-[#C41E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        Diagram unavailable
      </div>
    );
  }

  return (
    <div className={`w-full ${className ?? ""}`}>
      {loading && (
        <div aria-hidden className="w-full h-48 rounded-xl bg-[#0C1830]/60 border border-[#1E3A5F] animate-pulse" />
      )}
      <div
        ref={ref}
        className={`w-full overflow-x-auto ${loading ? "hidden" : ""}`}
      />
    </div>
  );
}
