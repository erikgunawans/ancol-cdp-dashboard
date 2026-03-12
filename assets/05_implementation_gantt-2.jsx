import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const chartRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);

  const mermaidChart = `
    gantt
      title Ancol 360 CDP Implementation Timeline
      dateFormat YYYY-MM-DD
      axisFormat %b %Y
      todayMarker off

      section Phase 0: Discovery
      NDA Execution and System Inventory     :p0a, 2026-04-01, 3w
      Data Quality Audit and API Assessment  :p0b, after p0a, 2w
      Architecture Refinement                :p0c, after p0a, 2w
      Go/No-Go Gate 0                        :milestone, after p0c, 0d

      section Phase 1: Foundation
      GCP Project and BigQuery Setup         :p1a, after p0c, 2w
      Batch Ingestion ancol.com and Loyalty  :p1b, after p1a, 3w
      Cloud DLP Pipeline                     :p1c, after p1a, 2w
      Basic Identity Resolution              :p1d, after p1b, 3w
      Basic Looker Dashboards                :p1e, after p1d, 2w
      Go/No-Go Gate 1                        :milestone, after p1e, 0d

      section Phase 2: Real-Time Core
      Pub/Sub Event Bus Setup                :p2a, after p1e, 2w
      Wahana POS Integration                 :p2b, after p2a, 3w
      Dataflow Streaming Pipeline            :p2c, after p2a, 3w
      Redis Hot Cache                        :p2d, after p2c, 2w
      MoEngage Bidirectional Sync            :p2e, after p2c, 2w
      Real-time Identity Resolution          :p2f, after p2d, 2w
      Go/No-Go Gate 2                        :milestone, after p2f, 0d

      section Phase 3: Intelligence
      Vertex AI Model Training               :p3a, after p2f, 4w
      Event Stream Processor                 :p3b, after p2f, 3w
      Arsi Integration                       :p3c, after p2f, 3w
      Custom Orchestrator                    :p3d, after p3b, 2w
      Recommendation Engine Real-time        :p3e, after p3a, 3w
      Sentiment Analysis Model               :p3f, after p3a, 2w
      Go/No-Go Gate 3                        :milestone, after p3e, 0d

      section Phase 4: Advanced AI
      Dynamic Pricing Model                  :p4a, after p3e, 3w
      Churn Prediction                       :p4b, after p3e, 2w
      Property Cross-Sell Scoring            :p4c, after p3e, 3w
      Customer DNA Profiler                  :p4d, after p4b, 3w
      VoC Dashboard                          :p4e, after p4d, 2w
      SENTINEL Full Deployment               :p4f, after p4d, 2w
      Go/No-Go Gate 4                        :milestone, after p4f, 0d
  `;

  useEffect(() => {
    // Load Mermaid via script tag to avoid "Dynamic require" ESM issues
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
        gantt: {
          useWidth: 1200,
          barHeight: 30,
          barGap: 8,
          topPadding: 50,
          sidePadding: 150,
          fontSize: 14,
          sectionFontSize: 16,
        }
      });
      setMermaidLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mermaidLoaded && chartRef.current && window.mermaid) {
      window.mermaid.render('mermaid-graph', mermaidChart).then(({ svg }) => {
        chartRef.current.innerHTML = svg;
      });
    }
  }, [mermaidLoaded, mermaidChart]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Ancol 360 CDP Implementation
              </h1>
              <p className="text-slate-500 mt-1">Gantt Visualization & Roadmap Review</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">FY 2026-2027</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">5 Phases</span>
            </div>
          </div>
        </header>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Phase 0', color: 'bg-slate-200', desc: 'Discovery' },
            { label: 'Phase 1', color: 'bg-blue-200', desc: 'Foundation' },
            { label: 'Phase 2', color: 'bg-indigo-200', desc: 'Real-Time' },
            { label: 'Phase 3', color: 'bg-purple-200', desc: 'Intelligence' },
            { label: 'Phase 4', color: 'bg-rose-200', desc: 'Advanced AI' },
          ].map((item) => (
            <div key={item.label} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className={`h-1.5 w-8 ${item.color} rounded mb-2`}></div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
              <p className="text-sm font-semibold">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Gantt Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden mb-10">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-slate-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
              Implementation Timeline
            </h2>
            <div className="flex gap-2">
               <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))} className="p-2 hover:bg-slate-200 rounded transition-colors" title="Zoom Out">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
               </button>
               <button onClick={() => setZoom(prev => Math.min(2, prev + 0.1))} className="p-2 hover:bg-slate-200 rounded transition-colors" title="Zoom In">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
               </button>
            </div>
          </div>
          <div className="overflow-x-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 min-h-[400px]">
            <div 
              ref={chartRef} 
              id="mermaid-target"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', minWidth: '1000px' }}
            >
              {/* Mermaid renders here */}
              <div className="flex justify-center items-center h-64 text-slate-400">
                {!mermaidLoaded ? "Loading dependencies..." : "Rendering timeline..."}
              </div>
            </div>
          </div>
        </div>

        {/* Phase Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 pb-12">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight underline decoration-blue-500 decoration-2 underline-offset-4">Phase Summary</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-xs font-bold">0</div>
                <div>
                  <h4 className="font-bold">Discovery (Apr 2026)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">System inventory, data quality auditing, and technical architecture sign-off.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <h4 className="font-bold">Foundation (May - Jul 2026)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">GCP/BigQuery infrastructure, batch ingestion (ancol.com/loyalty), and DLP governance.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-indigo-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <h4 className="font-bold">Real-Time Core (Jul - Sep 2026)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Wahana POS integration, Pub/Sub event streaming, and bidirectional MoEngage sync.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-purple-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <h4 className="font-bold">Intelligence (Sep - Nov 2026)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Vertex AI training, real-time recommendation engine, and Arsi chatbot integration.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-rose-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">4</div>
                <div>
                  <h4 className="font-bold">Advanced AI (Nov 2026 - Feb 2027)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Dynamic pricing, churn prediction, Customer DNA profiling, and full SENTINEL deployment.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m19.07 4.93-14.14 14.14"/></svg>
              Key Milestones
            </h3>
            <div className="space-y-4">
              {[
                { gate: "Gate 0", date: "May 2026", task: "Architecture Locked" },
                { gate: "Gate 1", date: "Jul 2026", task: "First Dashboards Live" },
                { gate: "Gate 2", date: "Sep 2026", task: "Real-time Sync Verified" },
                { gate: "Gate 3", date: "Nov 2026", task: "AI Recommendations Live" },
                { gate: "Gate 4", date: "Feb 2027", task: "SENTINEL Full Deployment" },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-widest">{m.gate}</span>
                    <span className="font-semibold text-slate-200">{m.task}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-mono text-sm">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-300 uppercase block mb-1 tracking-wider">Note on Contingencies</strong>
              The timeline assumes standard review periods. Delays in system inventory or third-party API availability (p0b) will shift all downstream &ldquo;after p0...&quot; activities.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;