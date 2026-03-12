"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { architectureLayers, type ArchitectureLayer, type ArchitectureOwner } from "@/data/architecture-layers";
import TabBar from "@/components/ui/TabBar";

// ─── Constants ───────────────────────────────────────────────────────────────

const LAYER_PHRASES: Record<string, string> = {
  L1: "10 source systems — batch CDC + real-time Pub/Sub",
  L2: "DLP, PII tokenization, E.164 normalization",
  L3: "BigQuery 3-zone warehouse + Redis hot cache",
  L4: "Identity resolution, segmentation, DNA profiler",
  L5: "8 Vertex AI model families across 4 intelligence domains",
  L6: "MoEngage + Arsi + Custom Orchestrator",
  L7: "6 Looker dashboard families on BigQuery curated zone",
  L8: "SENTINEL — UU PDP, AI ethics, OJK/BUMD compliance",
};

const DATA_SOURCES = [
  { name: "ancol.com Ticketing",   type: "batch"     },
  { name: "Loyalty Program DB",    type: "batch"     },
  { name: "Hotel/Resort Booking",  type: "batch"     },
  { name: "F&B POS Systems",       type: "batch"     },
  { name: "OTA Partners",          type: "batch"     },
  { name: "NPS Surveys",           type: "batch"     },
  { name: "Wahana Checkpoint POS", type: "realtime"  },
  { name: "Arsi Contact Center",   type: "realtime"  },
  { name: "Ancol Mobile App",      type: "realtime"  },
  { name: "Telkom Movement Data",  type: "realtime"  },
] as const;

const OWNERS: ArchitectureOwner[] = ["Axiara", "Terralogiq", "Shared"];

const OWNER_COLORS: Record<ArchitectureOwner, { bg: string; text: string; ring: string }> = {
  Axiara:     { bg: "bg-[#C41E3A]", text: "text-[#C41E3A]", ring: "ring-[#C41E3A]" },
  Terralogiq: { bg: "bg-[#0076CC]", text: "text-[#0076CC]", ring: "ring-[#0076CC]" },
  Shared:     { bg: "bg-[#F59E0B]", text: "text-[#F59E0B]", ring: "ring-[#F59E0B]" },
};

const TABS = [
  { id: "layers",   label: "Architecture Layers" },
  { id: "sources",  label: "Data Sources" },
  { id: "diagrams", label: "Diagrams" },
] as const;
type Tab = typeof TABS[number]["id"];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ArchitectureClient() {
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("layers");

  const toggleLayer = (id: string) => {
    setExpandedLayerId(expandedLayerId === id ? null : id);
  };

  const selectedLayer = architectureLayers.find(l => l.id === expandedLayerId) ?? null;

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-5 pb-4 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-[#C41E3A] mb-1">
              System Architecture
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-[#F0F6FF]">
              Eight Layers. One Unified Platform.
            </h1>
          </div>

          {/* Stats strip */}
          <div className="flex gap-6">
            {[
              { number: "10", label: "Data Sources" },
              { number: "4",  label: "CDP Engines" },
              { number: "8",  label: "AI Models" },
              { number: "3",  label: "Platforms" },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold tracking-tight text-[#F0F6FF]">{number}</div>
                <div className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-tabs + owner legend */}
        <div className="max-w-7xl mx-auto flex items-center mt-3">
          <TabBar
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as Tab)}
            layoutId="architectureTabUnderline"
            accentColor="#0076CC"
          />
          <div className="ml-auto flex items-center gap-4 shrink-0 pb-3">
            {OWNERS.map(owner => (
              <div key={owner} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${OWNER_COLORS[owner].bg}`} />
                <span className="text-xs font-medium text-[#8BA3C1]">{owner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === "layers" && (
          <motion.div
            key="layers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden"
          >
            {/* Left: Layer list */}
            <div className="md:w-80 shrink-0 overflow-y-auto border-r border-[#1E3A5F] px-4 py-4">
              <div className="flex flex-col gap-2">
                {architectureLayers.map((layer, index) => (
                  <LayerBar
                    key={layer.id}
                    layer={layer}
                    isSelected={expandedLayerId === layer.id}
                    index={index}
                    onClick={() => toggleLayer(layer.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Detail panel */}
            <div className="flex-1 min-w-0 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                {selectedLayer ? (
                  <motion.div
                    key={selectedLayer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6"
                  >
                    {/* Panel header */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="text-lg font-bold text-[#4D6B8A]">{selectedLayer.id}</span>
                      <h2 className="text-lg font-semibold text-[#F0F6FF]">{selectedLayer.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${OWNER_COLORS[selectedLayer.owner].bg}`}>
                        {selectedLayer.owner}
                      </span>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {selectedLayer.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-[#0076CC]/10 border border-[#0076CC]/30 rounded-full text-xs font-medium text-[#38B6FF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Components grid */}
                    <div>
                      <h4 className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A] mb-3">Key Components</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedLayer.components.map((comp, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-3 bg-[#112040] rounded-xl border border-[#1E3A5F]"
                          >
                            <div className={`w-2 h-2 rounded-full shrink-0 ${OWNER_COLORS[selectedLayer.owner].bg}`} />
                            <span className="text-sm font-medium text-[#F0F6FF] leading-tight">{comp.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center h-full text-center gap-3 py-20"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0C1830] border border-[#1E3A5F] flex items-center justify-center text-xl">
                      ←
                    </div>
                    <p className="text-sm text-[#4D6B8A]">Select a layer to explore its components</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeTab === "sources" && (
          <motion.div
            key="sources"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 overflow-y-auto px-6 py-5"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A] mb-1">Feeding into L1</p>
                  <h3 className="text-xl font-semibold tracking-tight text-[#F0F6FF]">10 Data Sources</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0076CC]" />
                    <span className="text-xs font-medium text-[#8BA3C1]">Batch (CDC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#C41E3A]" />
                    <span className="text-xs font-medium text-[#8BA3C1]">Real-Time (Pub/Sub)</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {DATA_SOURCES.map(src => (
                  <motion.div
                    key={src.name}
                    variants={{
                      hidden:  { opacity: 0, scale: 0.92 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 bg-[#0C1830] border rounded-full ${
                      src.type === "realtime" ? "border-[#C41E3A]/30" : "border-[#0076CC]/30"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${src.type === "realtime" ? "bg-[#C41E3A]" : "bg-[#0076CC]"}`} />
                    <span className="text-sm font-medium text-[#F0F6FF] whitespace-nowrap">{src.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === "diagrams" && (
          <motion.div
            key="diagrams"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 overflow-y-auto px-6 py-5"
          >
            <div className="max-w-7xl mx-auto space-y-10">

              {/* 8-Layer Overview */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0076CC] to-[#38B6FF]" />
                  <h3 className="text-lg font-bold text-[#F0F6FF]">8-Layer Architecture Overview</h3>
                  <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1">
                    Data Sources → Governance → Storage → CDP Core → AI/ML → Activation
                  </span>
                </div>
                <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6">
                  <ArchOverviewDiagram />
                </div>
              </div>

              {/* Identity Resolution */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#C41E3A] to-[#F59E0B]" />
                  <h3 className="text-lg font-bold text-[#F0F6FF]">Identity Resolution Flow</h3>
                  <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1">
                    Deterministic → Probabilistic → Graph Closure → Golden Record
                  </span>
                </div>
                <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6">
                  <IdentityFlowDiagram />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── LayerBar ─────────────────────────────────────────────────────────────────

function LayerBar({
  layer,
  isSelected,
  index,
  onClick,
}: {
  layer: ArchitectureLayer;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}) {
  const colors = OWNER_COLORS[layer.owner];
  return (
    <motion.button
      type="button"
      aria-expanded={isSelected}
      aria-label={`${layer.id} ${layer.name} layer`}
      data-testid="layer-card"
      className={`relative flex items-center gap-3 h-14 w-full bg-[#0C1830] border border-[#1E3A5F] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:bg-[#112040] hover:border-[#0076CC]/40 hover:shadow-[0_0_16px_0px_rgba(0,118,204,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CC] ${
        isSelected ? `ring-2 ${colors.ring}` : ""
      }`}
      onClick={onClick}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Owner color stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg}`} />

      {/* Layer ID badge */}
      <div className="ml-4 w-8 h-8 rounded-lg bg-[#112040] border border-[#1E3A5F] flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-[#4D6B8A] tracking-wide">{layer.id}</span>
      </div>

      {/* Name + owner */}
      <div className="flex-1 min-w-0 pr-2">
        <h3 className="text-xs font-semibold text-[#F0F6FF] truncate">{layer.name}</h3>
        <p className={`text-xs font-medium ${colors.text}`}>{layer.owner}</p>
      </div>
    </motion.button>
  );
}

// ─── ArchOverviewDiagram ──────────────────────────────────────────────────────

const STACK_LAYERS = [
  { id: "SRC", name: "Data Sources",              sub: "10 systems: ancol.com Ticketing • Loyalty • F&B POS • Hotel/Resort • Wahana Checkpoint • Arsi Contact Center • Ancol Mobile App • Telkom Movement • OTA Partners • NPS Surveys", color: "#4D6B8A", owner: null },
  { id: "L1",  name: "Data Ingestion",            sub: "Terralogiq / Pub/Sub + Dataflow — Batch CDC (hourly/nightly) + Real-Time Streaming (sub-minute)", color: "#0076CC", owner: "Terralogiq" },
  { id: "L2",  name: "Processing & Governance",   sub: "Cloud DLP + PII Tokenization + E.164 Normalization + SENTINEL Policy Enforcement", color: "#F59E0B", owner: "Shared" },
  { id: "L3",  name: "Data Storage",              sub: "BigQuery 3-Zone Warehouse (Raw → Standardized → Curated) + Memorystore Redis Hot Cache", color: "#0076CC", owner: "Terralogiq" },
  { id: "L4",  name: "CDP Core Engine",           sub: "Identity Resolution + Behavioral Segmentation Engine + Event Stream Processor + Customer DNA Profiler", color: "#F59E0B", owner: "Shared" },
  { id: "L5",  name: "AI / ML Intelligence",      sub: "8 Vertex AI Model Families — Visitor, Revenue, Experience & Operational Intelligence", color: "#C41E3A", owner: "Axiara" },
  { id: "L6",  name: "Activation & Orchestration","sub": "MoEngage (Email / Push / Web) + Arsi Contact Center (WhatsApp / Voice) + Custom Orchestrator", color: "#F59E0B", owner: "Shared" },
  { id: "L7",  name: "Analytics & Visualization", sub: "Looker — 6 Dashboard Families on BigQuery Curated Zone: Executive • CX Ops • VoC • Marketing • Property", color: "#0076CC", owner: "Terralogiq" },
] as const;

function FlowArrow() {
  return (
    <div className="flex justify-center py-0.5">
      <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden>
        <line x1="7" y1="0" x2="7" y2="11" stroke="#2A4A6B" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="1,9 13,9 7,16" fill="#2A4A6B" />
      </svg>
    </div>
  );
}

function ArchOverviewDiagram() {
  return (
    <div className="w-full space-y-1">
      {/* Governance banner */}
      <div className="mb-3 flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-[#C41E3A]/40 bg-[#C41E3A]/5">
        <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold text-[#C41E3A] bg-[#C41E3A]/15 border border-[#C41E3A]/30">
          L8
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#F0F6FF]">Governance &amp; Compliance</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C41E3A]/15 text-[#C41E3A]">Axiara SENTINEL</span>
          </div>
          <p className="text-xs text-[#8BA3C1] mt-0.5">UU PDP Compliance • AI Ethics &amp; Bias Monitoring • OJK/BUMD Regulatory • Audit Logs • Kill-Switch Controls</p>
        </div>
        <div className="shrink-0 hidden sm:flex items-center gap-1 text-[10px] text-[#C41E3A]/60 font-medium whitespace-nowrap">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><polygon points="0,10 10,10 5,0" fill="currentColor" /></svg>
          Governs all layers
        </div>
      </div>

      {/* Layer stack */}
      {STACK_LAYERS.map((layer, i) => (
        <div key={layer.id}>
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl border"
            style={{ borderColor: layer.color + "35", backgroundColor: layer.color + "08" }}
          >
            <div
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold mt-0.5"
              style={{ backgroundColor: layer.color + "20", color: layer.color, border: `1px solid ${layer.color}40` }}
            >
              {layer.id}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#F0F6FF]">{layer.name}</span>
                {layer.owner && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: layer.color + "15", color: layer.color }}
                  >
                    {layer.owner}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8BA3C1] mt-0.5 leading-relaxed">{layer.sub}</p>
            </div>
          </div>
          {i < STACK_LAYERS.length - 1 && <FlowArrow />}
        </div>
      ))}
    </div>
  );
}

// ─── IdentityFlowDiagram ──────────────────────────────────────────────────────

const IDENTITY_PHASES = [
  {
    label: "INPUT — 6 Fragmented Records",
    desc: "ancol.com (email) • WhatsApp/Arsi (phone) • Loyalty Program (loyalty_id) • Wahana POS (gelang_id) • Telkom Movement (device_id) • F&B POS (payment token)",
    color: "#4D6B8A",
    badge: null,
  },
  {
    label: "Phase 1 — Deterministic Matching",
    desc: "Exact-match on email, phone, loyalty_id, gelang_id — links records with 100% certainty",
    color: "#0076CC",
    badge: "~65% resolved",
  },
  {
    label: "Phase 2 — Probabilistic Matching",
    desc: "Fuzzy match combining: name similarity + same visit-day + payment fingerprint — links with statistical confidence",
    color: "#8B5CF6",
    badge: "~15% more",
  },
  {
    label: "Phase 3 — Graph Closure",
    desc: "Transitive resolution: if record A = record B and record B = record C, then A = B = C",
    color: "#F59E0B",
    badge: "~5% more",
  },
  {
    label: "GOLDEN RECORD — dim_customer",
    desc: "Single unified profile: ancol_customer_id, name, email, phone, loyalty_id, gelang_id, device_id, payment tokens, identity_confidence: 94%, sources_merged: 6",
    color: "#14B8A6",
    badge: "~85% resolved",
  },
] as const;

function IdentityFlowDiagram() {
  return (
    <div className="w-full space-y-1">
      {IDENTITY_PHASES.map((phase, i) => (
        <div key={phase.label}>
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl border"
            style={{ borderColor: phase.color + "40", backgroundColor: phase.color + "08" }}
          >
            <div
              className="shrink-0 w-2.5 h-2.5 rounded-full mt-1.5"
              style={{ backgroundColor: phase.color, boxShadow: `0 0 8px ${phase.color}60` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-semibold" style={{ color: phase.color }}>{phase.label}</span>
                {phase.badge && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: phase.color + "20", color: phase.color }}
                  >
                    {phase.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8BA3C1] leading-relaxed">{phase.desc}</p>
            </div>
          </div>
          {i < IDENTITY_PHASES.length - 1 && <FlowArrow />}
        </div>
      ))}

      {/* Unresolved note */}
      <div className="mt-4 flex items-start gap-2 px-4 py-3 rounded-xl border border-[#1E3A5F] bg-[#0C1830]">
        <div className="shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 bg-[#4D6B8A]" />
        <p className="text-xs text-[#4D6B8A] leading-relaxed">
          <span className="font-semibold text-[#8BA3C1]">Unresolved ~15%:</span> Anonymized records (e.g. Telkom device IDs) cannot be linked to individual profiles — used for aggregated footfall analytics only
        </p>
      </div>
    </div>
  );
}
