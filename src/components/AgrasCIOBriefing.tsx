"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ═══════════════════════════════════════════════════════════
   AGRAS — Complete CIO Executive Briefing
   Converted from agras_cio_complete_briefieng.jsx → TSX
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#F4F7FB", surface: "#FFFFFF", card: "#EBF0F8",
  border: "rgba(30,58,95,0.13)", borderGlow: "rgba(15,118,110,0.2)",
  navy: "#D6E4F7", navyMid: "#EBF2FC",
  teal: "#0F766E", tealBright: "#0D9488",
  gold: "#A16207", red: "#DC2626", green: "#15803D",
  yellow: "#CA8A04", orange: "#C2410C",
  gemini: "#1A73E8", react: "#0284C7",
  text: "#0F172A", textMid: "#475569", textDim: "#94A3B8", white: "#FFF",
};

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: d },
});

const PIE = [
  { name: "Compliant", value: 35, color: C.green },
  { name: "Critical", value: 4, color: C.red },
  { name: "High", value: 7, color: C.orange },
  { name: "Medium", value: 5, color: C.yellow },
  { name: "Low", value: 3, color: C.teal },
];

// ── Shared UI ──
const GlowDot = ({ color, size = 8 }: { color: string; size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 ${size * 2}px ${color}60`, flexShrink: 0 }} />
);
const StageBadge = ({ num, color }: { num: string | number; color: string }) => (
  <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, ${color}CC)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: C.white, boxShadow: `0 2px 12px ${color}50`, flexShrink: 0 }}>{num}</div>
);
const Arrow = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 2px", flexShrink: 0 }}>
    <svg width="28" height="14" viewBox="0 0 28 14" fill="none"><path d="M0 7H22M22 7L17 2M22 7L17 12" stroke={C.tealBright} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" /></svg>
  </div>
);
const ArrowDown = ({ color = C.tealBright }: { color?: string }) => (
  <div style={{ display: "flex", justifyContent: "center", padding: "3px 0" }}>
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none"><path d="M7 0V18M7 18L2 13M7 18L12 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" /></svg>
  </div>
);
const SecLabel = ({ num, text, color }: { num: string | number; text: string; color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
    <StageBadge num={num} color={color} />
    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color }}>{text}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════
//  PAGE 1 — The Challenge & Solution
// ═══════════════════════════════════════════════════════════
const Page1 = ({ en }: { en: boolean }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <motion.div {...fade(0)} style={{ background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyMid} 50%, ${C.navy} 100%)`, borderRadius: "16px", padding: "28px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 80% 30%, ${C.teal}10 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "34px", fontWeight: 800, color: C.text, margin: 0, lineHeight: 1.15, fontFamily: "'Playfair Display', Georgia, serif" }}>AGRAS</h1>
          <p style={{ fontSize: "15px", color: C.tealBright, margin: "4px 0 0 0", fontWeight: 500 }}>Ancol Governance & Regulatory Audit System</p>
          <p style={{ fontSize: "12.5px", color: C.textMid, margin: "10px 0 0 0", maxWidth: "440px", lineHeight: 1.65 }}>
            {en ? "An AI system that automatically checks every Board decision against all regulations governing Ancol — from DKI Jakarta Governor Decrees to OJK capital market rules — in minutes, not days." : "Sistem AI yang secara otomatis memeriksa setiap keputusan Direksi terhadap seluruh peraturan yang berlaku bagi Ancol — dari Pergub DKI Jakarta hingga regulasi OJK — dalam hitungan menit, bukan hari."}
          </p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "11px", color: C.textMid }}>Prepared for</div>
          <div style={{ fontSize: "13px", color: C.text, fontWeight: 600, marginTop: "2px" }}>CIO Office</div>
          <div style={{ fontSize: "11px", color: C.textMid }}>PT Pembangunan Jaya Ancol Tbk</div>
          <div style={{ width: 1, height: 12, background: `${C.teal}40`, margin: "8px 0 8px auto" }} />
          <div style={{ fontSize: "10px", color: C.textDim }}>By Axiara.AI · {en ? "March" : "Maret"} 2026</div>
        </div>
      </div>
    </motion.div>

    <motion.div {...fade(0.1)}>
      <SecLabel num="1" text={en ? "The Challenge" : "Tantangan Saat Ini"} color={C.red} />
      <div style={{ background: C.card, borderRadius: "14px", padding: "18px 22px", border: `1px solid ${C.red}20` }}>
        <p style={{ fontSize: "13px", color: C.text, lineHeight: 1.7, margin: 0 }}>
          {en
            ? <span>Ancol is a <b style={{ color: C.gold }}>hybrid entity</b> — as a BUMD, it answers to DKI Jakarta regional regulations; as a publicly listed company (Tbk), it must comply with OJK and IDX capital market rules. Every Board decision must be checked against <b style={{ color: C.tealBright }}>hundreds of regulations</b> that often conflict with each other. This process currently takes the Legal team <b style={{ color: C.red }}>3–5 working days per meeting</b>, with the risk of missing violations that could result in fines or sanctions.</span>
            : <span>Ancol adalah <b style={{ color: C.gold }}>entitas hybrid</b> — sebagai BUMD, Ancol tunduk pada peraturan daerah DKI Jakarta; sebagai perusahaan Tbk, Ancol tunduk pada regulasi OJK dan BEI. Setiap keputusan rapat Direksi harus diperiksa terhadap <b style={{ color: C.tealBright }}>ratusan peraturan</b> yang seringkali saling bertentangan. Proses ini saat ini memakan waktu <b style={{ color: C.red }}>3–5 hari kerja per rapat</b>, dan berisiko terlewatnya pelanggaran yang berpotensi denda atau sanksi.</span>
          }
        </p>
      </div>
    </motion.div>

    <motion.div {...fade(0.2)}>
      <SecLabel num="2" text={en ? "How AGRAS Solves It — 4 Simple Steps" : "Cara Kerja AGRAS — 4 Langkah Sederhana"} color={C.teal} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
        {[
          { s: "01", t: en ? "Upload Meeting Minutes" : "Upload Risalah Rapat", d: en ? "CIO or Board Secretary uploads the MoM document (PDF/Word)." : "CIO atau Sekretaris Dewan mengunggah dokumen risalah rapat.", icon: "📄", c: C.tealBright },
          { s: "02", t: en ? "AI Reads & Analyzes" : "AI Membaca & Menganalisis", d: en ? "4 AI agents work in sequence: identify decisions, find regulations, evaluate compliance." : "4 agen AI bekerja berurutan: identifikasi keputusan, cari regulasi, evaluasi kepatuhan.", icon: "🤖", c: C.gold },
          { s: "03", t: en ? "Legal Officer Reviews" : "Review oleh Legal", d: en ? "Serious violations pause the system for human approval before proceeding." : "Pelanggaran serius membuat sistem berhenti untuk persetujuan Legal Officer.", icon: "⚖️", c: C.yellow },
          { s: "04", t: en ? "Reports Generated" : "Laporan Otomatis", d: en ? "Two automatic reports: Executive Summary (Board) + Legal Ledger (Legal team)." : "Dua laporan otomatis: Ringkasan Eksekutif (Dewan) + Detail Hukum (Legal).", icon: "📊", c: C.green },
        ].map((s, i) => (
          <div key={i} style={{ background: C.card, borderRadius: "12px", padding: "16px 14px", border: `1px solid ${s.c}18`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -6, right: -2, fontSize: "48px", opacity: 0.05, fontWeight: 900, color: s.c }}>{s.s}</div>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ fontSize: "9px", fontWeight: 800, color: s.c, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "5px" }}>{en ? "Step" : "Langkah"} {s.s}</div>
            <div style={{ fontSize: "12.5px", fontWeight: 700, color: C.text, marginBottom: "5px", lineHeight: 1.3 }}>{s.t}</div>
            <div style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.5 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div {...fade(0.3)}>
      <SecLabel num="3" text={en ? "The Priority System — \"Traffic Light\" Compliance" : "Sistem Prioritas — Kepatuhan \"Lampu Lalu Lintas\""} color={C.gold} />
      <div style={{ background: C.card, borderRadius: "14px", padding: "18px 22px" }}>
        <p style={{ fontSize: "11.5px", color: C.textMid, margin: "0 0 12px 0", lineHeight: 1.6 }}>
          {en ? <span>AGRAS evaluates every decision using the <b style={{ color: C.text }}>Hierarchy of Truth</b> — a clear, consistent legal priority order:</span> : <span>AGRAS mengevaluasi setiap keputusan menggunakan <b style={{ color: C.text }}>Hierarchy of Truth</b> — urutan prioritas hukum yang jelas dan konsisten:</span>}
        </p>
        {[
          { tier: en ? "Priority 1" : "Prioritas 1", label: en ? "Regional Regulations (BUMD)" : "Peraturan Daerah (BUMD)", ex: "Pergub DKI Jakarta, Perda, RTRW", flag: en ? "RED" : "MERAH", fc: C.red, bg: `${C.red}10` },
          { tier: en ? "Priority 2" : "Prioritas 2", label: en ? "National Corporate Law" : "Hukum Korporasi Nasional", ex: "UU No. 40/2007, KUHD", flag: en ? "RED" : "MERAH", fc: C.red, bg: `${C.red}08` },
          { tier: en ? "Priority 3" : "Prioritas 3", label: en ? "Capital Markets (Tbk)" : "Pasar Modal (Tbk)", ex: en ? "OJK Regulations, IDX Rules" : "Regulasi OJK, Aturan BEI", flag: en ? "YELLOW" : "KUNING", fc: C.yellow, bg: `${C.yellow}08` },
          { tier: en ? "Priority 4" : "Prioritas 4", label: en ? "Safety & Environment" : "Keselamatan & Lingkungan", ex: en ? "Tourism Law, AMDAL" : "UU Pariwisata, AMDAL", flag: en ? "YELLOW" : "KUNING", fc: C.yellow, bg: `${C.yellow}06` },
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: t.bg, borderRadius: "8px", borderLeft: `3px solid ${t.fc}`, marginBottom: "6px" }}>
            <div style={{ minWidth: "58px" }}><span style={{ fontSize: "9px", fontWeight: 800, color: C.teal, letterSpacing: "0.1em" }}>{t.tier}</span></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: "12px", fontWeight: 700, color: C.text }}>{t.label}</div><div style={{ fontSize: "10px", color: C.textMid }}>{t.ex}</div></div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><GlowDot color={t.fc} size={9} /><span style={{ fontSize: "9px", fontWeight: 800, color: t.fc, letterSpacing: "0.1em" }}>{t.flag}</span></div>
          </div>
        ))}
        <p style={{ fontSize: "11px", color: C.textDim, margin: "10px 0 0 0", fontStyle: "italic", lineHeight: 1.5 }}>
          {en ? "Core rule: if a decision benefits capital markets (Priority 3) but violates a Governor's Decree (Priority 1), AGRAS always flags it as a violation. Regional law always wins." : "Aturan utama: jika keputusan menguntungkan pasar modal (Prioritas 3) tetapi melanggar Pergub DKI (Prioritas 1), AGRAS selalu menandainya sebagai pelanggaran. Hukum daerah selalu menang."}
        </p>
      </div>
    </motion.div>

    <motion.div {...fade(0.4)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
      {[
        { v: en ? "< 5 min" : "< 5 mnt", l: en ? "Audit Time per Meeting" : "Waktu Audit per Rapat", a: C.tealBright },
        { v: en ? "4 Tiers" : "4 Tingkat", l: en ? "Legal Hierarchy Checked" : "Hierarki Hukum Dicek", a: C.gold },
        { v: "100%", l: en ? "Full Audit Trail" : "Jejak Audit Lengkap", a: C.green },
        { v: "AES-256", l: en ? "Bank-Grade Encryption" : "Enkripsi Tingkat Bank", a: C.teal },
      ].map((s, i) => (
        <div key={i} style={{ background: C.card, borderRadius: "12px", padding: "16px", textAlign: "center", border: `1px solid ${s.a}12` }}>
          <div style={{ fontSize: "28px", fontWeight: 800, color: s.a, lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.v}</div>
          <div style={{ fontSize: "10px", color: C.textMid, marginTop: "5px", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.l}</div>
        </div>
      ))}
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════
//  PAGE 2 — How the System Works (Architecture)
// ═══════════════════════════════════════════════════════════
const Page2 = ({ en }: { en: boolean }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <motion.div {...fade(0)}>
      <SecLabel num="1" text={en ? "Document Input" : "Input Dokumen"} color={C.teal} />
      <div style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
        {[
          { icon: "📄", t: en ? "Meeting Minutes" : "Risalah Rapat", s: "PDF / Word / Text", c: C.tealBright },
          { icon: "🏛️", t: en ? "Ancol Internal Docs" : "Dokumen Internal Ancol", s: en ? "From Dokmee DMS (auto-sync)" : "Dari Dokmee DMS (auto-sync)", c: C.gold },
          { icon: "📜", t: en ? "Government Regulations" : "Peraturan Pemerintah", s: "Pergub, UU, POJK, PP", c: C.orange },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: C.card, borderRadius: "10px", padding: "12px 14px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px" }}>{s.icon}</span>
            <div><div style={{ fontSize: "12px", fontWeight: 700, color: C.text }}>{s.t}</div><div style={{ fontSize: "10px", color: C.textMid }}>{s.s}</div></div>
          </div>
        ))}
      </div>
    </motion.div>
    <ArrowDown />

    <motion.div {...fade(0.15)}>
      <SecLabel num="2" text={en ? "AI Analysis Engine — Powered by Google Gemini" : "Mesin Analisis AI — Didukung Google Gemini"} color={C.gold} />
      <div style={{ background: `linear-gradient(135deg, ${C.surface}, ${C.card})`, borderRadius: "14px", padding: "16px", border: `1px solid ${C.borderGlow}`, boxShadow: `0 0 30px rgba(47,143,158,0.06)`, marginBottom: "4px" }}>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {[
            { icon: "📖", n: en ? "The Scribe" : "Sang Pencatat", r: en ? "Reads meeting minutes, identifies every Board decision" : "Membaca risalah rapat, identifikasi setiap keputusan Direksi", c: C.tealBright, t: "~30s" },
            null,
            { icon: "🔍", n: en ? "The Librarian" : "Sang Pustakawan", r: en ? "Searches hundreds of regulations for applicable laws" : "Mencari ratusan peraturan untuk hukum yang berlaku", c: C.gold, t: "~60s" },
            null,
            { icon: "⚖️", n: en ? "The Chief Justice" : "Sang Hakim Agung", r: en ? "Checks each decision against the 4-tier priority system" : "Memeriksa keputusan terhadap sistem prioritas 4 tingkat", c: C.orange, t: "~90s" },
            null,
            { icon: "📊", n: en ? "The Communicator" : "Sang Komunikator", r: en ? "Writes two reports: Board summary + Legal detail" : "Menulis dua laporan: ringkasan Dewan + detail Legal", c: C.green, t: "~30s" },
          ].map((a, i) => a === null ? <Arrow key={`ar${i}`} /> : (
            <div key={i} style={{ flex: 1, background: `${a.c}08`, borderRadius: "8px", padding: "12px 10px", border: `1px solid ${a.c}18`, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                <span style={{ fontSize: "16px" }}>{a.icon}</span>
                <span style={{ fontSize: "10px", fontWeight: 800, color: a.c }}>{a.n}</span>
              </div>
              <p style={{ fontSize: "10px", color: C.textMid, lineHeight: 1.5, margin: 0 }}>{a.r}</p>
              <div style={{ position: "absolute", bottom: 4, right: 6, fontSize: "8px", color: C.textDim, fontWeight: 600 }}>{a.t}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px", padding: "7px 10px", background: `${C.navy}80`, borderRadius: "6px", border: `1px solid ${C.border}` }}>
          <span style={{ fontSize: "13px" }}>🔄</span>
          <span style={{ fontSize: "10px", color: C.textMid, lineHeight: 1.4 }}>
            {en ? "Built-in self-check: if the AI is uncertain, it automatically re-analyzes with additional context (max 2 retries)" : "Self-check otomatis: jika AI tidak yakin, sistem menganalisis ulang dengan konteks tambahan (maks 2 pengulangan)"}
          </span>
        </div>
      </div>
    </motion.div>
    <ArrowDown />

    <motion.div {...fade(0.3)}>
      <SecLabel num="3" text={en ? "Human Review — Serious Violations Only" : "Review Manusia — Hanya Pelanggaran Serius"} color={C.red} />
      <div style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
        <div style={{ flex: 3, background: `${C.red}08`, borderRadius: "10px", padding: "14px 16px", border: `1px solid ${C.red}20`, borderLeft: `3px solid ${C.red}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}><GlowDot color={C.red} size={9} /><span style={{ fontSize: "11px", fontWeight: 700, color: C.red }}>{en ? "RED Flag — System Pauses" : "Bendera MERAH — Sistem Berhenti"}</span></div>
          <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.55, margin: 0 }}>
            {en ? "Governor's Decree or National Law violations pause the pipeline. Legal Officer must Accept, Override (with justification), or Escalate to CIO before the system continues." : "Pelanggaran Pergub atau Undang-Undang menghentikan pipeline. Legal Officer harus Menerima, Menolak (dengan justifikasi), atau Eskalasi ke CIO sebelum sistem melanjutkan."}
          </p>
        </div>
        <div style={{ flex: 2, background: `${C.yellow}06`, borderRadius: "10px", padding: "14px 16px", border: `1px solid ${C.yellow}15`, borderLeft: `3px solid ${C.yellow}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}><GlowDot color={C.yellow} size={9} /><span style={{ fontSize: "11px", fontWeight: 700, color: C.yellow }}>{en ? "YELLOW Flag — Auto-Reported" : "Bendera KUNING — Otomatis"}</span></div>
          <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.55, margin: 0 }}>
            {en ? "Lower-priority violations (OJK, environmental) are included in the report automatically." : "Pelanggaran prioritas rendah (OJK, lingkungan) otomatis masuk ke laporan."}
          </p>
        </div>
      </div>
    </motion.div>
    <ArrowDown color={C.green} />

    <motion.div {...fade(0.4)}>
      <SecLabel num="4" text={en ? "Compliance Reports — Three Views" : "Laporan Kepatuhan — Tiga Tampilan"} color={C.green} />
      <div style={{ display: "flex", gap: "10px" }}>
        {[
          { icon: "📋", t: en ? "Executive Summary" : "Ringkasan Eksekutif", s: en ? "For the Board" : "Untuk Dewan", c: C.green, items: en ? ["Risk level (color-coded)", "Top 5 key findings", "Recommended actions"] : ["Tingkat risiko (kode warna)", "5 temuan utama", "Rekomendasi tindakan"] },
          { icon: "📚", t: en ? "Legal Ledger" : "Buku Besar Hukum", s: en ? "For Legal Team" : "Untuk Tim Legal", c: C.teal, items: en ? ["Full reasoning chain", "Article & page citations", "HITL review outcomes"] : ["Rantai penalaran lengkap", "Kutipan pasal & halaman", "Hasil review HITL"] },
          { icon: "📈", t: en ? "CIO Dashboard" : "Dashboard CIO", s: en ? "Ongoing Monitoring" : "Pemantauan Berkelanjutan", c: C.gold, items: en ? ["Risk trends over time", "Flag distribution by tier", "Audit volume & speed"] : ["Tren risiko bulanan", "Distribusi temuan per tingkat", "Volume & kecepatan audit"] },
        ].map((o, i) => (
          <div key={i} style={{ flex: 1, background: C.card, borderRadius: "10px", padding: "14px", border: `1px solid ${o.c}18`, borderTop: `3px solid ${o.c}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontSize: "18px" }}>{o.icon}</span>
              <div><div style={{ fontSize: "12px", fontWeight: 700, color: C.text }}>{o.t}</div><div style={{ fontSize: "9px", color: C.textMid }}>{o.s}</div></div>
            </div>
            {o.items.map((item, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: o.c, flexShrink: 0 }} />
                <span style={{ fontSize: "10px", color: C.textMid, lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div {...fade(0.5)} style={{ marginTop: "6px", background: `${C.navy}CC`, borderRadius: "10px", padding: "10px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ fontSize: "13px" }}>☁️</span><span style={{ fontSize: "10px", fontWeight: 700, color: C.textMid }}>{en ? "RUNS ON" : "BERJALAN DI"}</span><span style={{ fontSize: "12px", fontWeight: 800, color: C.text }}>Google Cloud Platform</span></div>
      <div style={{ display: "flex", gap: "6px" }}>
        {["Gemini AI", "AES-256", "ISO 27001", en ? "Fully Managed" : "Terkelola Penuh"].map((b, i) => (
          <span key={i} style={{ fontSize: "8px", fontWeight: 700, color: [C.tealBright, C.green, C.gold, C.textMid][i], background: `${[C.tealBright, C.green, C.gold, C.textMid][i]}10`, padding: "2px 7px", borderRadius: "4px", border: `1px solid ${[C.tealBright, C.green, C.gold, C.textMid][i]}18` }}>{b}</span>
        ))}
      </div>
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════
//  PAGE 3 — Accelerated Timeline (Gantt)
// ═══════════════════════════════════════════════════════════
const Page3 = ({ en }: { en: boolean }) => {
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const wW = 58, lW = 130, bH = 24, rH = 48;
  const streams = [
    { id: "A", l: en ? "Engineering" : "Rekayasa", s: "Axiara.AI", c: C.tealBright,
      bars: [{ a: 0, b: 2, t: en ? "GCP + Deploy Agents" : "GCP + Deploy Agen", shade: C.teal }, { a: 2, b: 5, t: en ? "Fine-tune + Integration" : "Fine-tune + Integrasi", shade: C.tealBright }, { a: 5, b: 7, t: en ? "Frontend + HITL" : "Frontend + HITL", shade: C.gold }, { a: 7, b: 9, t: en ? "Pilot + Fix" : "Pilot + Fix", shade: C.green }, { a: 9, b: 10, t: "Go-Live", shade: C.green }] },
    { id: "B", l: en ? "Legal Team" : "Tim Legal", s: en ? "Ancol Legal" : "Legal Ancol", c: C.gold,
      bars: [{ a: 0, b: 3, t: en ? "Curate Tier 1+2 Regs (60-80 docs)" : "Kurasi Reg Tingkat 1+2 (60-80 dok)", shade: C.gold }, { a: 3, b: 5, t: en ? "Sample MoM (10-15)" : "Sampel Risalah (10-15)", shade: C.orange }, { a: 7, b: 9, t: en ? "Validate Pilot" : "Validasi Pilot", shade: C.gold }] },
    { id: "C", l: en ? "IT Division" : "Divisi IT", s: en ? "Ancol IT" : "IT Ancol", c: C.orange,
      bars: [{ a: 0, b: 1, t: en ? "GCP Billing + Dokmee" : "Billing GCP + Dokmee", shade: C.orange }, { a: 1, b: 2, t: "Sync Agent", shade: C.orange }] },
    { id: "D", l: en ? "Data Ingestion" : "Ingest Data", s: en ? "Automated" : "Otomatis", c: C.teal,
      bars: [{ a: 2, b: 4, t: en ? "Upload + Embed Docs" : "Upload + Embed Dok", shade: C.teal }, { a: 4, b: 6, t: en ? "OJK Scraper (BG)" : "Scraper OJK (BG)", shade: C.teal }, { a: 9, b: 11, t: en ? "Full Scrapers (Post)" : "Scraper Penuh (Pasca)", shade: C.textDim }] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <motion.div {...fade(0)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.text, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>{en ? "Accelerated Implementation" : "Implementasi Dipercepat"}</h2>
          <p style={{ fontSize: "11px", color: C.textMid, margin: "3px 0 0 0" }}>{en ? "Parallel workstreams reduce timeline from 16 to 10 weeks" : "Jalur kerja paralel mempersingkat dari 16 menjadi 10 minggu"}</p>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <div style={{ padding: "3px 8px", borderRadius: "5px", background: `${C.red}12`, border: `1px solid ${C.red}20` }}><span style={{ fontSize: "10px", color: C.red, fontWeight: 700, textDecoration: "line-through" }}>16 {en ? "wk" : "mg"}</span></div>
          <span style={{ fontSize: "12px", color: C.textDim }}>→</span>
          <div style={{ padding: "3px 10px", borderRadius: "5px", background: `${C.green}12`, border: `1px solid ${C.green}25` }}><span style={{ fontSize: "11px", color: C.green, fontWeight: 800 }}>10 {en ? "wk" : "mg"}</span></div>
        </div>
      </motion.div>

      <motion.div {...fade(0.1)} style={{ background: C.surface, borderRadius: "14px", padding: "16px", border: `1px solid ${C.border}`, overflowX: "auto" }}>
        <div style={{ minWidth: lW + wW * 12 + 10 }}>
          <div style={{ display: "flex", marginBottom: "4px" }}>
            <div style={{ width: lW, flexShrink: 0 }} />
            {weeks.map(w => (<div key={w} style={{ width: wW, textAlign: "center", fontSize: "9px", fontWeight: 600, color: w <= 10 ? C.textMid : C.textDim }}>{en ? `W${w}` : `M${w}`}</div>))}
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ width: lW, flexShrink: 0 }} />
            {[{ l: en ? "Month 1" : "Bulan 1", s: 4 }, { l: en ? "Month 2" : "Bulan 2", s: 4 }, { l: en ? "Month 3" : "Bulan 3", s: 4 }].map((m, i) => (
              <div key={i} style={{ width: wW * m.s, textAlign: "center", fontSize: "9px", fontWeight: 700, color: C.tealBright, borderBottom: `2px solid ${C.tealBright}25`, paddingBottom: "3px" }}>{m.l}</div>
            ))}
          </div>
          {streams.map((st, si) => (
            <div key={st.id} style={{ display: "flex", alignItems: "center", height: rH, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: lW, flexShrink: 0, paddingRight: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "2px", background: st.c, flexShrink: 0 }} />
                  <div><div style={{ fontSize: "10px", fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{st.l}</div><div style={{ fontSize: "8px", color: C.textDim }}>{st.s}</div></div>
                </div>
              </div>
              <div style={{ position: "relative", width: wW * 12, height: bH }}>
                {weeks.map(w => (<div key={w} style={{ position: "absolute", left: (w - 1) * wW + wW / 2, top: 0, bottom: 0, width: 1, background: C.border }} />))}
                <div style={{ position: "absolute", left: 9 * wW + wW / 2, top: -12, bottom: -12, width: 2, background: `${C.green}35`, zIndex: 0 }} />
                {st.bars.map((bar, bi) => {
                  const left = bar.a * wW, width = (bar.b - bar.a) * wW - 3;
                  const post = bar.a >= 9;
                  return (
                    <motion.div key={bi} initial={{ width: 0, opacity: 0 }} animate={{ width, opacity: post ? 0.45 : 1 }} transition={{ duration: 0.45, delay: 0.25 + si * 0.08 + bi * 0.06 }}
                      style={{ position: "absolute", left: left + 2, top: (bH - 20) / 2, height: 20, borderRadius: "5px", background: post ? `${bar.shade}35` : `linear-gradient(90deg, ${bar.shade}, ${bar.shade}CC)`, border: `1px solid ${bar.shade}${post ? "25" : "45"}`, display: "flex", alignItems: "center", paddingLeft: "6px", overflow: "hidden", whiteSpace: "nowrap", zIndex: 1 }}>
                      <span style={{ fontSize: "8px", fontWeight: 600, color: post ? C.textDim : C.white }}>{bar.t}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: "6px" }}>
            <div style={{ width: lW, flexShrink: 0 }} />
            <div style={{ position: "relative", width: wW * 12 }}>
              <div style={{ position: "absolute", left: 9 * wW + wW / 2 - 25, display: "flex", alignItems: "center", gap: "3px" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}60` }} />
                <span style={{ fontSize: "9px", fontWeight: 800, color: C.green, letterSpacing: "0.08em" }}>GO-LIVE</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "12px", padding: "8px 12px", background: `${C.navy}CC`, borderRadius: "6px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px" }}>⚡</span>
          <span style={{ fontSize: "10px", color: C.textMid, lineHeight: 1.4 }}>
            {en ? "Key: Legal curates regulations in parallel with engineering. IT provides Dokmee access in Week 1. This eliminates 6 weeks of sequential waiting." : "Kunci: Legal mengkurasi regulasi paralel dengan engineering. IT menyediakan akses Dokmee di Minggu 1. Ini menghilangkan 6 minggu waktu tunggu."}
          </span>
        </div>
      </motion.div>

      <motion.div {...fade(0.3)} style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, background: `${C.red}08`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${C.red}20` }}>
          <div style={{ fontSize: "10px", fontWeight: 800, color: C.red, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>❌ {en ? "Before — Manual" : "Sebelum — Manual"}</div>
          {(en ? ["3–5 working days per meeting", "Depends on individual diligence", "No consistent audit trail", "Risk of missing new regulations", "Cross-tier conflicts hard to detect"] : ["3–5 hari kerja per rapat", "Bergantung ketelitian individu", "Tidak ada jejak audit konsisten", "Risiko terlewatnya regulasi baru", "Konflik antar tingkat sulit dideteksi"]).map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}><span style={{ color: C.red, fontSize: "10px", marginTop: "2px" }}>○</span><span style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.45 }}>{t}</span></div>
          ))}
        </div>
        <div style={{ flex: 1, background: `${C.green}08`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${C.green}20` }}>
          <div style={{ fontSize: "10px", fontWeight: 800, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>✅ {en ? "After — With AGRAS" : "Sesudah — Dengan AGRAS"}</div>
          {(en ? ["Under 5 minutes per meeting", "Consistent, deterministic, no human error", "100% decisions logged with reasoning chain", "Regulatory database auto-updated weekly", "Cross-tier conflicts detected automatically"] : ["Kurang dari 5 menit per rapat", "Konsisten, deterministik, tanpa human error", "100% keputusan tercatat dengan rantai penalaran", "Database regulasi diperbarui otomatis mingguan", "Konflik antar tingkat terdeteksi otomatis"]).map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}><span style={{ color: C.green, fontSize: "10px", marginTop: "2px" }}>●</span><span style={{ fontSize: "11px", color: C.text, lineHeight: 1.45 }}>{t}</span></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  PAGE 4 — Two Options + Next Steps
// ═══════════════════════════════════════════════════════════
const Page4 = ({ en }: { en: boolean }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <motion.div {...fade(0)}>
      <SecLabel num="?" text={en ? "Frontend Decision — Two Options" : "Keputusan Frontend — Dua Opsi"} color={C.gold} />
      <p style={{ fontSize: "11.5px", color: C.textMid, margin: "0 0 12px 0", lineHeight: 1.5 }}>{en ? "Both options use the same AI engine, same agents, same compliance logic. The difference is the user interface." : "Kedua opsi menggunakan mesin AI sama, agen sama, logika kepatuhan sama. Perbedaannya pada tampilan antarmuka."}</p>
    </motion.div>

    <div style={{ display: "flex", gap: "12px" }}>
      <motion.div {...fade(0.1)} style={{ flex: 1, background: C.card, borderRadius: "14px", padding: "18px", border: `1px solid ${C.gemini}30` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "8px", background: `linear-gradient(135deg, ${C.gemini}, #1A73E8)`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "16px" }}>✨</span></div>
            <div><div style={{ fontSize: "13px", fontWeight: 800, color: C.text }}>{en ? "Option A" : "Opsi A"}</div><div style={{ fontSize: "10px", color: C.gemini, fontWeight: 600 }}>Gemini Enterprise</div></div>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: C.green, background: `${C.green}12`, padding: "3px 8px", borderRadius: "4px", border: `1px solid ${C.green}20` }}>{en ? "RECOMMENDED" : "DIREKOMENDASIKAN"}</span>
        </div>
        <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.55, margin: "0 0 12px 0" }}>
          {en ? "Google's built-in enterprise AI interface. Chat-based assistant that searches regulations, triggers audits, and shows results with citations." : "Antarmuka AI enterprise bawaan Google. Asisten berbasis chat yang mencari regulasi, jalankan audit, dan tampilkan hasil dengan kutipan."}
        </p>
        {(en ? [["10 weeks", "Implementation time", C.green], ["Zero", "Frontend code to maintain", C.tealBright], ["Built-in", "SSO, search, citations", C.gemini]] : [["10 minggu", "Waktu implementasi", C.green], ["Nol", "Kode frontend dipelihara", C.tealBright], ["Bawaan", "SSO, pencarian, kutipan", C.gemini]]).map(([v, l, c], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: c, minWidth: "72px" }}>{v}</span>
            <span style={{ fontSize: "10px", color: C.textMid }}>{l}</span>
          </div>
        ))}
        <div style={{ marginTop: "10px", padding: "8px 10px", background: `${C.gemini}06`, borderRadius: "6px", border: `1px solid ${C.gemini}12` }}>
          <span style={{ fontSize: "9px", fontWeight: 700, color: C.gemini }}>{en ? "TRADE-OFF: " : "KONSEKUENSI: "}</span>
          <span style={{ fontSize: "9.5px", color: C.textMid }}>{en ? "Standard Google UI — no custom dark theme or bespoke charts." : "UI standar Google — tanpa tema gelap kustom atau chart khusus."}</span>
        </div>
      </motion.div>

      <motion.div {...fade(0.2)} style={{ flex: 1, background: C.card, borderRadius: "14px", padding: "18px", border: `1px solid ${C.react}25` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "8px", background: `linear-gradient(135deg, #20232A, ${C.react})`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "14px", color: C.white, fontWeight: 900 }}>⚛</span></div>
            <div><div style={{ fontSize: "13px", fontWeight: 800, color: C.text }}>{en ? "Option B" : "Opsi B"}</div><div style={{ fontSize: "10px", color: C.react, fontWeight: 600 }}>Custom React Dashboard</div></div>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: C.teal, background: `${C.teal}12`, padding: "3px 8px", borderRadius: "4px", border: `1px solid ${C.teal}20` }}>PREMIUM</span>
        </div>
        <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.55, margin: "0 0 12px 0" }}>
          {en ? "Fully custom CIO Dashboard with Garuda AI dark theme, interactive charts, real-time agent animation, and complete HITL review in one interface." : "Dashboard CIO kustom dengan tema gelap Garuda AI, chart interaktif, animasi agen real-time, dan review HITL lengkap dalam satu antarmuka."}
        </p>
        {(en ? [["14 weeks", "Implementation (+4 wk)", C.yellow], ["Full control", "Custom UI & branding", C.react], ["All-in-one", "Dashboard + audit + review", C.tealBright]] : [["14 minggu", "Implementasi (+4 mg)", C.yellow], ["Kontrol penuh", "UI & branding kustom", C.react], ["Semua dalam satu", "Dashboard + audit + review", C.tealBright]]).map(([v, l, c], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: c, minWidth: "72px" }}>{v}</span>
            <span style={{ fontSize: "10px", color: C.textMid }}>{l}</span>
          </div>
        ))}
        <div style={{ marginTop: "10px", padding: "8px 10px", background: `${C.react}06`, borderRadius: "6px", border: `1px solid ${C.react}12` }}>
          <span style={{ fontSize: "9px", fontWeight: 700, color: C.react }}>{en ? "TRADE-OFF: " : "KONSEKUENSI: "}</span>
          <span style={{ fontSize: "9.5px", color: C.textMid }}>{en ? "+4 weeks dev time. Ongoing React maintenance." : "+4 minggu pengembangan. Pemeliharaan React berkelanjutan."}</span>
        </div>
      </motion.div>
    </div>

    <motion.div {...fade(0.3)} style={{ background: `${C.green}06`, borderRadius: "10px", padding: "12px 16px", border: `1px solid ${C.green}18`, display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "15px" }}>💡</span>
      <span style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.5 }}>
        {en ? "The core compliance AI engine is identical in both options. The choice is purely about the user interface layer — not about the quality or accuracy of the compliance audit." : "Mesin AI kepatuhan inti identik di kedua opsi. Pilihan ini murni tentang lapisan antarmuka pengguna — bukan tentang kualitas atau akurasi audit kepatuhan."}
      </span>
    </motion.div>

    <motion.div {...fade(0.4)} style={{ background: `linear-gradient(135deg, ${C.navyMid}, ${C.navy})`, borderRadius: "14px", padding: "22px 26px", border: `1px solid ${C.gold}25`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 90% 50%, ${C.gold}06 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "10px", fontWeight: 800, color: C.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px" }}>{en ? "Next Steps" : "Langkah Selanjutnya"}</div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.text, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>{en ? "Ready to Begin?" : "Siap Memulai?"}</h3>
          <p style={{ fontSize: "12px", color: C.textMid, margin: "8px 0 0 0", lineHeight: 1.6 }}>
            {en ? "With the CIO's approval, Axiara.AI can begin Month 1 (Foundation) next week. We will coordinate with Ancol IT for GCP setup and the Legal team for regulatory document collection." : "Dengan persetujuan Bapak, Axiara.AI dapat memulai Bulan 1 (Fondasi) minggu depan. Kami akan berkoordinasi dengan IT Ancol untuk setup GCP dan tim Legal untuk pengumpulan dokumen regulasi."}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", flexShrink: 0 }}>
          {(en ? [
            ["1", "CIO approval to begin project"],
            ["2", "IT provides GCP billing + Dokmee access"],
            ["3", "Legal prepares 50+ internal regulation docs"],
          ] : [
            ["1", "Persetujuan CIO untuk memulai proyek"],
            ["2", "IT menyediakan billing GCP + akses Dokmee"],
            ["3", "Legal menyiapkan 50+ dokumen regulasi internal"],
          ]).map(([n, t], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: `${C.gold}08`, padding: "7px 12px", borderRadius: "7px", border: `1px solid ${C.gold}12` }}>
              <div style={{ width: 20, height: 20, borderRadius: "5px", background: `${C.gold}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: C.gold, flexShrink: 0 }}>{n}</div>
              <span style={{ fontSize: "11px", color: C.text, fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    <motion.div {...fade(0.5)} style={{ background: C.card, borderRadius: "14px", padding: "16px 20px", border: `1px solid ${C.border}`, display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: C.teal, marginBottom: "6px", letterSpacing: "0.06em" }}>{en ? "Built on Google Cloud" : "Dibangun di Google Cloud"}</div>
        <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.65, margin: 0 }}>
          {en ? <span>AGRAS runs entirely on <b style={{ color: C.text }}>Google Cloud Platform</b> using <b style={{ color: C.text }}>Gemini AI</b> and <b style={{ color: C.text }}>Vertex AI Agent Engine</b>. No Ancol data leaves the encrypted Google Cloud environment.</span> : <span>AGRAS berjalan sepenuhnya di <b style={{ color: C.text }}>Google Cloud Platform</b> menggunakan <b style={{ color: C.text }}>Gemini AI</b> dan <b style={{ color: C.text }}>Vertex AI Agent Engine</b>. Tidak ada data Ancol yang keluar dari lingkungan Google Cloud yang terenkripsi.</span>}
        </p>
      </div>
      <div style={{ width: 1, background: `${C.teal}18` }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: C.teal, marginBottom: "6px", letterSpacing: "0.06em" }}>{en ? "Enterprise Security Standards" : "Standar Keamanan Enterprise"}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {["AES-256 Encryption", "VPC Service Controls", "IAM Role-Based Access", "ISO 27001 Aligned", "Customer-Managed Keys", "Full Audit Trail"].map((t, i) => (
            <span key={i} style={{ fontSize: "9px", fontWeight: 600, color: C.tealBright, background: `${C.teal}10`, padding: "3px 8px", borderRadius: "4px", border: `1px solid ${C.teal}18` }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT — exported for use in modal
// ═══════════════════════════════════════════════════════════
const PAGE_TITLES_EN = ["The Challenge & Solution", "How the System Works", "Accelerated Timeline", "Options & Next Steps"];
const PAGE_TITLES_ID = ["Tantangan & Solusi", "Cara Kerja Sistem", "Jadwal Dipercepat", "Opsi & Langkah Selanjutnya"];

export default function AgrasCIOBriefing() {
  const [page, setPage] = useState(0);
  const [lang, setLang] = useState<"en" | "id">("id");
  const en = lang === "en";
  const titles = en ? PAGE_TITLES_EN : PAGE_TITLES_ID;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Global Nav Bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", maxWidth: "880px", background: `${C.surface}EE`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 26, height: 26, borderRadius: "7px", background: `linear-gradient(135deg, ${C.teal}, ${C.navy})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 900, color: C.white }}>A</div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: C.text, letterSpacing: "0.06em" }}>AGRAS</span>
          <span style={{ fontSize: "10px", color: C.textDim }}>|</span>
          <span style={{ fontSize: "10px", color: C.textDim }}>{en ? "Executive Briefing" : "Ringkasan Eksekutif"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "3px" }}>
            {titles.map((t, i) => (
              <button key={i} onClick={() => setPage(i)}
                style={{ padding: "5px 10px", fontSize: "9.5px", fontWeight: page === i ? 700 : 500, borderRadius: "5px", border: "none", cursor: "pointer", transition: "all 0.2s", background: page === i ? C.teal : "transparent", color: page === i ? C.white : C.textDim }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", borderRadius: "5px", overflow: "hidden", border: `1px solid ${C.border}`, marginLeft: "4px" }}>
            {[{ c: "en" as const, l: "EN" }, { c: "id" as const, l: "ID" }].map(x => (
              <button key={x.c} onClick={() => setLang(x.c)}
                style={{ padding: "4px 10px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", background: lang === x.c ? C.teal : "transparent", color: lang === x.c ? C.white : C.textDim, border: "none", cursor: "pointer" }}>
                {x.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "880px", padding: "20px 20px 24px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={`${page}-${lang}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {page === 0 && <Page1 en={en} />}
            {page === 1 && <Page2 en={en} />}
            {page === 2 && <Page3 en={en} />}
            {page === 3 && <Page4 en={en} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page Navigation */}
      <div style={{ position: "sticky", bottom: 0, width: "100%", maxWidth: "880px", background: `${C.bg}EE`, backdropFilter: "blur(8px)", borderTop: `1px solid ${C.border}`, padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50 }}>
        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
          style={{ padding: "5px 14px", fontSize: "10px", fontWeight: 600, borderRadius: "6px", border: `1px solid ${C.border}`, background: "transparent", color: page === 0 ? C.textDim : C.textMid, cursor: page === 0 ? "default" : "pointer", opacity: page === 0 ? 0.4 : 1 }}>
          ← {en ? "Prev" : "Sebelumnya"}
        </button>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {[0, 1, 2, 3].map(i => (
            <button key={i} onClick={() => setPage(i)}
              style={{ width: page === i ? 28 : 8, height: 8, borderRadius: "4px", background: page === i ? C.teal : `${C.teal}30`, border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
          <span style={{ fontSize: "9px", color: C.textDim, marginLeft: "6px" }}>{page + 1} / 4</span>
        </div>
        <button onClick={() => setPage(Math.min(3, page + 1))} disabled={page === 3}
          style={{ padding: "5px 14px", fontSize: "10px", fontWeight: 600, borderRadius: "6px", border: page === 3 ? `1px solid ${C.border}` : "none", background: page === 3 ? "transparent" : `linear-gradient(135deg, ${C.teal}, ${C.navy})`, color: page === 3 ? C.textDim : C.white, cursor: page === 3 ? "default" : "pointer", opacity: page === 3 ? 0.4 : 1 }}>
          {en ? "Next" : "Selanjutnya"} →
        </button>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", maxWidth: "880px", padding: "8px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "9px", color: C.textDim }}>AGRAS by <b style={{ color: C.textMid }}>Axiara.AI</b></span>
        <span style={{ fontSize: "8px", color: C.textDim }}>PT Pembangunan Jaya Ancol Tbk — {en ? "Confidential" : "Rahasia"} — {en ? "March" : "Maret"} 2026</span>
      </div>
    </div>
  );
}
