"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabBar from "@/components/ui/TabBar";
import MermaidDiagram from "@/components/ui/MermaidDiagram";
import { DATA_FLOW_PIPELINE } from "@/data/mermaid-diagrams";

const PIPELINE_NODES = [
  "Sources", "Ingestion", "Processing", "Storage", "CDP Core", "AI/ML", "Activation"
];

const SCHEMA_ZONES = [
  {
    id: "raw",
    name: "Raw Zone",
    description: "Immutable storage of exact source system payloads. Data is minimally processed, serving as the raw event ledger and recovery baseline.",
    tables: [
      { name: "raw_ga4_events", desc: "Unprocessed JSON payloads from Google Analytics 4." },
      { name: "raw_pos_transactions", desc: "Daily batch extracts from Point-of-Sale ticketing systems." },
      { name: "raw_crm_profiles", desc: "Nightly snapshots of CRM identity records." }
    ]
  },
  {
    id: "standardized",
    name: "Standardized Zone",
    description: "Cleansed, typed, and normalized data. Formats are standard, PII is hashed where necessary, and timestamps are unified.",
    tables: [
      { name: "stg_events", desc: "Normalized event stream with standard timestamps and session IDs." },
      { name: "stg_users", desc: "De-duplicated user records pending identity resolution." },
      { name: "stg_transactions", desc: "Cleaned purchase events linked to source IDs." }
    ]
  },
  {
    id: "curated",
    name: "Curated Zone",
    description: "The business-ready dimensional models. Data here is heavily aggregated, stitched, and optimized for BI reporting and activation.",
    tables: [
      { name: "dim_customer", desc: "The Golden ID profile containing stitched identities and calculated traits." },
      { name: "fct_visits", desc: "Aggregated park visitation facts." },
      { name: "dim_segment", desc: "Current audience segment memberships." }
    ],
    dimFields: [
      "ancol_customer_id", "identity_graph", "first_visit_date",
      "ltv_score", "current_segment", "customer_dna_profile"
    ]
  }
];

const MAIN_TABS = [
  { id: "pipeline", label: "Pipeline Visualization" },
  { id: "schema",   label: "Schema Explorer" },
  { id: "diagram",  label: "Flow Diagram" },
] as const;
type MainTab = typeof MAIN_TABS[number]["id"];

export default function DataFlowClient() {
  const [mainTab, setMainTab] = useState<MainTab>("pipeline");
  const [isBatch, setIsBatch] = useState(true);
  const [activeZone, setActiveZone] = useState("raw");

  const connectorColorClass = isBatch ? "bg-[#0076CC]" : "bg-[#C41E3A]";
  const highlightBorderClass = isBatch ? "border-[#0076CC]" : "border-[#C41E3A]";
  const highlightTextClass = isBatch ? "text-[#38B6FF]" : "text-[#C41E3A]";

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">

      {/* ── Top tab bar ── */}
      <div className="shrink-0 px-6 pt-5 border-b border-[#1E3A5F]">
        <TabBar
          tabs={MAIN_TABS}
          activeTab={mainTab}
          onTabChange={(id) => setMainTab(id as MainTab)}
          layoutId="dataflowTabUnderline"
          accentColor="#38B6FF"
        />
      </div>

      {/* ── Panel area ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── PIPELINE TAB ── */}
          {mainTab === "pipeline" && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-6 py-6 max-w-5xl mx-auto"
            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] mb-2">
                  Two Speeds. One Unified Pipeline.
                </h2>
                <p className="text-sm text-[#8BA3C1] max-w-xl mx-auto">
                  High-throughput batch loads for historical modeling and low-latency streaming for real-time activation.
                </p>
              </div>

              {/* Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-[#0C1830] border border-[#1E3A5F] p-1 rounded-full inline-flex relative">
                  <motion.div
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#112040] rounded-full shadow-sm z-0"
                    initial={false}
                    animate={{ x: isBatch ? 4 : "100%", left: isBatch ? 0 : 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <button
                    onClick={() => setIsBatch(true)}
                    className={`relative z-10 px-4 sm:px-8 py-2.5 text-sm font-medium rounded-full transition-colors ${
                      isBatch ? "text-[#F0F6FF]" : "text-[#8BA3C1] hover:text-[#F0F6FF]"
                    }`}
                  >
                    Batch Processing
                  </button>
                  <button
                    onClick={() => setIsBatch(false)}
                    className={`relative z-10 px-4 sm:px-8 py-2.5 text-sm font-medium rounded-full transition-colors ${
                      !isBatch ? "text-[#F0F6FF]" : "text-[#8BA3C1] hover:text-[#F0F6FF]"
                    }`}
                  >
                    Real-Time Processing
                  </button>
                </div>
              </div>

              {/* Pipeline + labels */}
              <div className="relative max-w-4xl mx-auto">
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                  <div className="mb-6 flex justify-between items-end h-10 min-w-[700px]">
                    {["CDC / Pub/Sub", "Dataflow", "Hourly / Sub-60s"].map((label) => (
                      <div key={label} className="flex-1 text-center">
                        <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${highlightTextClass}`}>
                          {label.split(" / ")[isBatch ? 0 : 1] ?? label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between min-w-[700px]">
                    {PIPELINE_NODES.map((node, index) => {
                      const isLast = index === PIPELINE_NODES.length - 1;
                      return (
                        <div key={node} className="flex items-center flex-1">
                          <div className={`relative z-10 bg-[#0C1830] border-2 rounded-xl py-2.5 px-3 w-28 flex justify-center text-center transition-colors duration-500 ${highlightBorderClass}`}>
                            <span className="text-xs font-semibold text-[#F0F6FF]">{node}</span>
                          </div>
                          {!isLast && (
                            <div className="flex-1 h-[2px] bg-[#1E3A5F] relative z-0 mx-1.5 overflow-hidden min-w-[30px]">
                              <div className={`data-dot ${connectorColorClass}`} style={{ animationDelay: `${index * 0.4}s` }} />
                              <div className={`data-dot ${connectorColorClass}`} style={{ animationDelay: `${(index * 0.4) + 1}s` }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#060D1A] to-transparent pointer-events-none xl:hidden" />
              </div>
            </motion.div>
          )}

          {/* ── SCHEMA TAB ── */}
          {mainTab === "schema" && (
            <motion.div
              key="schema"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-6 py-6 max-w-4xl mx-auto"
            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-[#F0F6FF] mb-2">
                  BigQuery Schema Explorer
                </h2>
                <p className="text-sm text-[#8BA3C1]">
                  Tri-zone data lakehouse architecture powering the analytics engine.
                </p>
              </div>

              {/* Zone tabs */}
              <div className="mb-6 border-b border-[#1E3A5F]">
                <TabBar
                  tabs={SCHEMA_ZONES.map(z => ({ id: z.id, label: z.name }))}
                  activeTab={activeZone}
                  onTabChange={setActiveZone}
                  layoutId="activeSchemaZone"
                  accentColor="#38B6FF"
                />
              </div>

              <AnimatePresence mode="wait">
                {SCHEMA_ZONES.map((zone) => {
                  if (zone.id !== activeZone) return null;
                  return (
                    <motion.div
                      key={zone.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6"
                    >
                      <h3 className="text-xl font-semibold text-[#F0F6FF] mb-3">{zone.name}</h3>
                      <p className="text-[#8BA3C1] mb-6 text-sm leading-relaxed">{zone.description}</p>

                      <div className="space-y-4">
                        <h4 className="text-xs font-medium tracking-wide uppercase text-[#4D6B8A]">Key Tables</h4>
                        <div className="grid gap-3">
                          {zone.tables.map((table) => (
                            <div key={table.name} className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-3 border-b border-[#1E3A5F] last:border-0">
                              <div className="font-mono text-sm text-[#0076CC] sm:w-1/3 shrink-0">{table.name}</div>
                              <div className="text-sm text-[#8BA3C1]">{table.desc}</div>
                            </div>
                          ))}
                        </div>

                        {zone.dimFields && (
                          <div className="mt-5 pt-5 border-t border-[#1E3A5F]">
                            <h4 className="text-xs font-medium tracking-wide uppercase text-[#4D6B8A] mb-3">
                              dim_customer Schema Profile
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {zone.dimFields.map((field) => (
                                <span key={field} className="px-3 py-1.5 bg-[#112040] rounded-md font-mono text-xs text-[#F0F6FF]">
                                  {field}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {mainTab === "diagram" && (
            <motion.div
              key="diagram"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-5"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0076CC] to-[#14B8A6]" />
                  <h3 className="text-lg font-bold text-[#F0F6FF]">End-to-End Data Flow Pipeline</h3>
                  <span className="text-xs font-semibold text-[#4D6B8A] border border-[#1E3A5F] rounded-full px-2.5 py-1">
                    Sources → Ingest → Govern → Store → CDP → AI → Activate
                  </span>
                </div>
                <div className="bg-[#0C1830] border border-[#1E3A5F] rounded-2xl p-6">
                  <MermaidDiagram chart={DATA_FLOW_PIPELINE} />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
