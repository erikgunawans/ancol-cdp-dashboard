"use client";

import React from "react";

const navy = "#0A1F3F", teal = "#1A7A8A", tealLight = "#E6F4F6", border = "#D4DDE6",
      bg = "#FAFBFD", text = "#1A2332", textMid = "#4A5568", textLight = "#718096",
      accent = "#C53030", greenBg = "#F0FFF4", greenBorder = "#38A169",
      yellowBg = "#FFFFF0", yellowBorder = "#D69E2E";

const T = {
  en: {
    headerTitle: "AGRAS — Infrastructure Requirements Brief",
    headerSub: "Ancol Governance & Regulatory Audit System",
    confidential: "Confidential",
    fromTo: "From: Axiara.AI  |  To: IT Division, PT Ancol Tbk",
    purposeLabel: "Purpose of this document:",
    purposeText: "AGRAS is a new compliance auditing system being deployed for the CIO Office. It requires access to internal regulation documents currently stored in Ancol's Dokmee DMS on the Synology NAS. This brief outlines the specific infrastructure information and access needed from the IT Division.",
    purposeBold: "No changes to the Dokmee system or Synology configuration are required.",
    s1Label: "1  What AGRAS Needs from On-Premise Infrastructure",
    s1Text: "AGRAS runs entirely on Google Cloud Platform. It does not require any software installation on the Dokmee server or Synology NAS, and it does not modify any existing documents. The system needs a one-way, read-only data flow: a small sync agent copies selected documents from the Dokmee file store to a secure Google Cloud Storage bucket, where they are processed by the AGRAS AI system. The sync agent runs on a scheduled basis (once daily) and only transfers new or recently modified documents. All data in transit is encrypted via TLS 1.3, and data at rest in Google Cloud is encrypted with AES-256 customer-managed keys.",
    securityLabel: "Security assurance:",
    securityText: "The sync agent only makes outbound HTTPS connections from inside Ancol's network to Google Cloud Storage (storage.googleapis.com). No inbound ports need to be opened. No VPN or tunnel is required. No external party gains access to the Ancol internal network.",
    s2Label: "2  Information Required from IT Division",
    s2Intro: "Please provide answers to the following five questions. If you are unsure about any item, please indicate this and we will schedule a brief 30-minute call to clarify together.",
    q1Title: "Q1. Outbound Internet Access",
    q1Desc: "Can any machine on Ancol's internal network (the Synology NAS itself, or a Windows/Linux workstation on the same LAN) make outbound HTTPS requests to *.googleapis.com? This is the only network requirement.",
    q1Opts: [
      "Yes — machines on the LAN have direct outbound internet access (HTTPS/443)",
      "Yes, but through a corporate proxy server (please provide proxy address below)",
      "No — outbound internet access is blocked or heavily restricted",
      "Not sure — I need to check the firewall rules"
    ],
    q1ProxyPlaceholder: "Proxy address (e.g., http://proxy.ancol.co.id:8080)",
    q2Title: "Q2. Dokmee File Storage Path",
    q2Desc: "What is the file system path (network share or local path on the Synology) where Dokmee On-Premise stores its document files? This is typically a shared folder on the Synology NAS. We need read-only access to this path from the machine where the sync agent will run.",
    q2Opts: [
      "Network share (e.g., \\\\SYNOLOGY\\Dokmee\\FileStore\\ or \\\\192.168.x.x\\DokmeeData\\)",
      "Local path on the Synology NAS (e.g., /volume1/Dokmee/)",
      "Mapped drive on Windows workstations (e.g., D:\\Dokmee\\ or Z:\\)",
      "Not sure — I need to check the Dokmee server configuration"
    ],
    q2PathPlaceholder: "Please provide the exact path if known",
    q3Title: "Q3. Sync Agent Host Machine",
    q3Desc: "The sync agent is a lightweight Python script (~300 lines) that runs as a scheduled task. It needs to be installed on a machine that can access both the Dokmee file store and the internet. Where would IT prefer to run it?",
    q3Opts: [
      "On the Synology NAS itself (via Docker or Synology's Python package)",
      "On a dedicated Windows workstation/server on the same LAN",
      "On a Linux VM or server on the same LAN",
      "IT will determine the best host — please provide the requirements"
    ],
    q4Title: "Q4. Dokmee API Availability",
    q4Desc: "Dokmee Enterprise edition includes a local REST API for document search and retrieval. If the API is enabled, the sync agent can extract documents with full metadata (tags, document type, custom fields) rather than scanning the file system directly. This produces better results for AGRAS.",
    q4Opts: [
      "Yes — Dokmee's API is enabled and accessible on the local network",
      "No — the API is not enabled (or we don't know how to enable it)",
      "Not sure — I need to check with the Dokmee administrator"
    ],
    q5Title: "Q5. Synology Cloud Sync Package",
    q5Desc: "Synology DSM includes a built-in \"Cloud Sync\" package that can sync folders directly to Google Cloud Storage with zero custom code. If available, it provides an alternative (or complementary) sync method.",
    q5Opts: [
      "Cloud Sync is already installed on the Synology NAS",
      "Not installed, but we can install it from Synology Package Center",
      "Package installation on the NAS is restricted by policy",
      "Not sure — I need to check the Synology DSM admin panel"
    ],
    s3Label: "3  Sync Agent Technical Specifications",
    s3Intro: "For IT's review and approval, the following are the technical specifications of the sync agent that will be installed.",
    specs: [
      ["Language", "Python 3.11+"],
      ["Size", "~300 lines, single file"],
      ["Dependencies", "google-cloud-storage (Google official SDK)"],
      ["Scheduling", "Cron job (Linux) or Task Scheduler (Windows)"],
      ["Run frequency", "Once daily at 02:00 WIB (configurable)"],
      ["Network usage", "Outbound HTTPS to storage.googleapis.com only"],
      ["Avg. bandwidth", "< 100 MB per sync (incremental, new docs only)"],
      ["CPU/RAM impact", "Minimal — single-threaded, runs for 2-5 minutes"],
      ["Authentication", "GCP Service Account key (JSON file, rotated quarterly)"],
      ["Logging", "Local log file + optional Cloud Logging integration"],
      ["File access", "Read-only access to Dokmee file store"],
      ["Data modified", "None — the agent never writes to Dokmee or Synology"],
    ] as [string, string][],
    notNeededTitle: "What IT does NOT need to do:",
    notNeededItems: [
      "No changes to Dokmee configuration or database",
      "No changes to Synology NAS settings (unless installing Cloud Sync)",
      "No inbound firewall ports opened",
      "No VPN or tunnel configured",
      "No software installed on end-user workstations",
      "No modification to Active Directory or network policies",
      "No ongoing maintenance beyond monitoring the sync agent log file",
    ],
    notesLabel: "Additional Notes or Questions from IT",
    notesPlaceholder: "Please add any questions, concerns, or additional context that would help us plan the integration...",
    contactLabel: "Contact for Questions",
    contactName: "Erik Gunawan S.",
    contactOrg: "Axiara.AI",
    contactRole: "Project Lead, AGRAS Implementation",
    contactEmail: "Email: erik@axiara.ai",
    timelineLabel: "Requested Response Timeline",
    timelineText: "We kindly request responses to Q1–Q5 within 5 business days. Partial answers are welcome — we can schedule a 30-minute call to clarify any remaining items together. This information is needed before the AGRAS integration phase can begin.",
    footer: "AGRAS Infrastructure Brief v1.0 — Axiara.AI for PT Pembangunan Jaya Ancol Tbk — March 2026",
  },
  id: {
    headerTitle: "AGRAS — Dokumen Kebutuhan Infrastruktur",
    headerSub: "Ancol Governance & Regulatory Audit System",
    confidential: "Rahasia",
    fromTo: "Dari: Axiara.AI  |  Kepada: Divisi IT, PT Ancol Tbk",
    purposeLabel: "Tujuan dokumen ini:",
    purposeText: "AGRAS adalah sistem audit kepatuhan baru yang sedang dibangun untuk Kantor CIO. Sistem ini memerlukan akses ke dokumen regulasi internal yang saat ini disimpan di Dokmee DMS pada Synology NAS milik Ancol. Dokumen ini menjelaskan informasi infrastruktur dan akses spesifik yang dibutuhkan dari Divisi IT.",
    purposeBold: "Tidak diperlukan perubahan apapun pada sistem Dokmee atau konfigurasi Synology.",
    s1Label: "1  Yang Dibutuhkan AGRAS dari Infrastruktur On-Premise",
    s1Text: "AGRAS berjalan sepenuhnya di Google Cloud Platform. Sistem ini tidak memerlukan instalasi software apapun di server Dokmee atau Synology NAS, dan tidak mengubah dokumen yang sudah ada. Yang dibutuhkan hanya aliran data satu arah dan read-only: sebuah sync agent kecil menyalin dokumen terpilih dari penyimpanan Dokmee ke bucket Google Cloud Storage yang aman, di mana dokumen tersebut diproses oleh sistem AI AGRAS. Sync agent berjalan secara terjadwal (sekali sehari) dan hanya mentransfer dokumen baru atau yang baru diubah. Semua data dalam perjalanan dienkripsi melalui TLS 1.3, dan data yang tersimpan di Google Cloud dienkripsi dengan AES-256 menggunakan kunci yang dikelola pelanggan.",
    securityLabel: "Jaminan keamanan:",
    securityText: "Sync agent hanya melakukan koneksi HTTPS keluar dari dalam jaringan Ancol ke Google Cloud Storage (storage.googleapis.com). Tidak perlu membuka port masuk. Tidak diperlukan VPN atau tunnel. Tidak ada pihak eksternal yang mendapat akses ke jaringan internal Ancol.",
    s2Label: "2  Informasi yang Dibutuhkan dari Divisi IT",
    s2Intro: "Mohon berikan jawaban untuk lima pertanyaan berikut. Jika Bapak/Ibu tidak yakin dengan salah satu item, silakan tandai dan kami akan menjadwalkan panggilan singkat 30 menit untuk mengklarifikasi bersama.",
    q1Title: "Q1. Akses Internet Keluar (Outbound)",
    q1Desc: "Apakah ada mesin di jaringan internal Ancol (Synology NAS sendiri, atau workstation Windows/Linux di LAN yang sama) yang dapat melakukan request HTTPS keluar ke *.googleapis.com? Ini satu-satunya kebutuhan jaringan.",
    q1Opts: [
      "Ya — mesin di LAN memiliki akses internet keluar langsung (HTTPS/443)",
      "Ya, tetapi melalui proxy server korporat (mohon berikan alamat proxy di bawah)",
      "Tidak — akses internet keluar diblokir atau sangat dibatasi",
      "Belum yakin — perlu memeriksa aturan firewall"
    ],
    q1ProxyPlaceholder: "Alamat proxy (contoh: http://proxy.ancol.co.id:8080)",
    q2Title: "Q2. Path Penyimpanan File Dokmee",
    q2Desc: "Di mana path file system (network share atau path lokal di Synology) tempat Dokmee On-Premise menyimpan file dokumennya? Biasanya ini adalah shared folder di Synology NAS. Kami memerlukan akses read-only ke path ini dari mesin tempat sync agent akan dijalankan.",
    q2Opts: [
      "Network share (contoh: \\\\SYNOLOGY\\Dokmee\\FileStore\\ atau \\\\192.168.x.x\\DokmeeData\\)",
      "Path lokal di Synology NAS (contoh: /volume1/Dokmee/)",
      "Mapped drive di workstation Windows (contoh: D:\\Dokmee\\ atau Z:\\)",
      "Belum yakin — perlu memeriksa konfigurasi server Dokmee"
    ],
    q2PathPlaceholder: "Mohon berikan path yang tepat jika diketahui",
    q3Title: "Q3. Mesin Host untuk Sync Agent",
    q3Desc: "Sync agent adalah script Python ringan (~300 baris) yang berjalan sebagai scheduled task. Perlu diinstal pada mesin yang dapat mengakses penyimpanan file Dokmee dan internet. Di mana IT lebih memilih untuk menjalankannya?",
    q3Opts: [
      "Di Synology NAS sendiri (melalui Docker atau paket Python Synology)",
      "Di workstation/server Windows khusus di LAN yang sama",
      "Di VM atau server Linux di LAN yang sama",
      "IT yang akan menentukan host terbaik — mohon berikan spesifikasinya"
    ],
    q4Title: "Q4. Ketersediaan API Dokmee",
    q4Desc: "Dokmee edisi Enterprise menyertakan REST API lokal untuk pencarian dan pengambilan dokumen. Jika API ini diaktifkan, sync agent dapat mengekstrak dokumen beserta metadata lengkap (tag, tipe dokumen, custom fields) alih-alih memindai file system secara langsung. Ini menghasilkan hasil yang lebih baik untuk AGRAS.",
    q4Opts: [
      "Ya — API Dokmee diaktifkan dan dapat diakses di jaringan lokal",
      "Tidak — API tidak diaktifkan (atau kami tidak tahu cara mengaktifkannya)",
      "Belum yakin — perlu bertanya ke administrator Dokmee"
    ],
    q5Title: "Q5. Paket Cloud Sync Synology",
    q5Desc: "Synology DSM menyertakan paket bawaan \"Cloud Sync\" yang dapat melakukan sync folder langsung ke Google Cloud Storage tanpa kode khusus. Jika tersedia, ini menyediakan metode sync alternatif (atau pelengkap).",
    q5Opts: [
      "Cloud Sync sudah terinstal di Synology NAS",
      "Belum terinstal, tetapi bisa diinstal dari Synology Package Center",
      "Instalasi paket di NAS dibatasi oleh kebijakan",
      "Belum yakin — perlu memeriksa panel admin Synology DSM"
    ],
    s3Label: "3  Spesifikasi Teknis Sync Agent",
    s3Intro: "Untuk review dan persetujuan IT, berikut adalah spesifikasi teknis sync agent yang akan diinstal.",
    specs: [
      ["Bahasa pemrograman", "Python 3.11+"],
      ["Ukuran", "~300 baris, satu file"],
      ["Dependensi", "google-cloud-storage (SDK resmi Google)"],
      ["Penjadwalan", "Cron job (Linux) atau Task Scheduler (Windows)"],
      ["Frekuensi", "Sekali sehari pukul 02:00 WIB (dapat dikonfigurasi)"],
      ["Penggunaan jaringan", "HTTPS keluar ke storage.googleapis.com saja"],
      ["Rata-rata bandwidth", "< 100 MB per sync (inkremental, dokumen baru saja)"],
      ["Dampak CPU/RAM", "Minimal — single-thread, berjalan 2-5 menit"],
      ["Autentikasi", "Kunci Service Account GCP (file JSON, dirotasi per kuartal)"],
      ["Logging", "File log lokal + opsional integrasi Cloud Logging"],
      ["Akses file", "Read-only ke penyimpanan file Dokmee"],
      ["Data diubah", "Tidak ada — agent tidak pernah menulis ke Dokmee atau Synology"],
    ] as [string, string][],
    notNeededTitle: "Yang TIDAK perlu dilakukan oleh IT:",
    notNeededItems: [
      "Tidak ada perubahan konfigurasi atau database Dokmee",
      "Tidak ada perubahan pengaturan Synology NAS (kecuali menginstal Cloud Sync)",
      "Tidak ada port firewall masuk yang dibuka",
      "Tidak ada VPN atau tunnel yang dikonfigurasi",
      "Tidak ada software yang diinstal di workstation pengguna",
      "Tidak ada modifikasi Active Directory atau kebijakan jaringan",
      "Tidak ada pemeliharaan rutin selain memantau file log sync agent",
    ],
    notesLabel: "Catatan Tambahan atau Pertanyaan dari IT",
    notesPlaceholder: "Silakan tambahkan pertanyaan, kekhawatiran, atau konteks tambahan yang dapat membantu kami merencanakan integrasi...",
    contactLabel: "Kontak untuk Pertanyaan",
    contactName: "Erik Gunawan S.",
    contactOrg: "Axiara.AI",
    contactRole: "Project Lead, Implementasi AGRAS",
    contactEmail: "Email: erik@axiara.ai",
    timelineLabel: "Batas Waktu Respons yang Diminta",
    timelineText: "Kami memohon respons untuk Q1–Q5 dalam waktu 5 hari kerja. Jawaban parsial juga diterima — kami dapat menjadwalkan panggilan 30 menit untuk mengklarifikasi item yang tersisa bersama. Informasi ini dibutuhkan sebelum fase integrasi AGRAS dapat dimulai.",
    footer: "AGRAS Dokumen Infrastruktur v1.0 — Axiara.AI untuk PT Pembangunan Jaya Ancol Tbk — Maret 2026",
  }
} as const;

type Lang = keyof typeof T;

export type AgrasState = {
  lang: Lang;
  responses: Record<string, string>;
  notes: string;
};

export function defaultAgrasState(): AgrasState {
  return { lang: "id", responses: {}, notes: "" };
}

interface AgrasITQuestionsProps {
  state: AgrasState;
  onChange: (s: AgrasState) => void;
}

export default function AgrasITQuestions({ state, onChange }: AgrasITQuestionsProps) {
  const { lang, responses, notes } = state;
  const t = T[lang];

  const setLang = (l: Lang) => onChange({ ...state, lang: l });
  const update = (key: string, val: string) =>
    onChange({ ...state, responses: { ...responses, [key]: val } });
  const clearAll = () => onChange({ lang: state.lang, responses: {}, notes: "" });

  const hasAnswers = Object.keys(responses).length > 0 || notes.length > 0;

  const Radio = ({ name, options }: { name: string; options: readonly string[] }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "6px" }}>
      {options.map((label, i) => (
        <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "12.5px", color: text, lineHeight: 1.5 }}>
          <input type="radio" name={name} checked={responses[name] === String(i)}
            onChange={() => update(name, String(i))}
            style={{ marginTop: "3px", accentColor: teal }} />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  const QuestionCard = ({ id, title, desc, options, extraInput }: {
    id: string; title: string; desc: string; options: readonly string[]; extraInput?: React.ReactNode;
  }) => (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: "8px", padding: "14px 18px", marginBottom: "12px" }}>
      <div style={{ fontSize: "13px", fontWeight: 700, color: navy, marginBottom: "6px" }}>{title}</div>
      <p style={{ fontSize: "12px", color: textMid, margin: "0 0 8px 0", lineHeight: 1.5 }}>{desc}</p>
      <Radio name={id} options={options} />
      {extraInput}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', 'SF Pro Text', -apple-system, sans-serif", background: "#fff", maxWidth: "820px", margin: "0 auto", color: text }}>

      {/* Header */}
      <div style={{ background: navy, padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 32, height: 32, borderRadius: "8px", background: teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 800, color: "#fff" }}>A</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>{t.headerTitle}</div>
            <div style={{ fontSize: "11px", color: "#8DA0BA", marginTop: "1px" }}>{t.headerSub}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={clearAll}
            style={{ padding: "5px 12px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
              background: hasAnswers ? "rgba(197,48,48,0.2)" : "rgba(255,255,255,0.06)",
              color: hasAnswers ? "#FEB2B2" : "#5A7A9A",
              border: `1px solid ${hasAnswers ? "rgba(197,48,48,0.4)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "6px", cursor: hasAnswers ? "pointer" : "default",
              transition: "all 0.2s" }}>
            Clear All
          </button>
          <div style={{ display: "flex", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            {([{ code: "en", label: "EN" }, { code: "id", label: "ID" }] as { code: Lang; label: string }[]).map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                style={{ padding: "5px 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                  background: lang === l.code ? teal : "transparent",
                  color: lang === l.code ? "#fff" : "#8DA0BA",
                  border: "none", cursor: "pointer", transition: "all 0.2s" }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", color: "#8DA0BA", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.confidential}</div>
            <div style={{ fontSize: "10px", color: "#7A90AA", marginTop: "1px" }}>{t.fromTo}</div>
          </div>
        </div>
      </div>

      {/* Purpose Bar */}
      <div style={{ background: tealLight, padding: "12px 32px", borderBottom: `1px solid ${border}` }}>
        <p style={{ fontSize: "12.5px", color: navy, margin: 0, lineHeight: 1.6 }}>
          <strong>{t.purposeLabel}</strong> {t.purposeText} <strong>{t.purposeBold}</strong>
        </p>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* Section 1 */}
        <div style={{ marginBottom: "22px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: teal, marginBottom: "8px" }}>{t.s1Label}</div>
          <p style={{ fontSize: "13px", color: text, lineHeight: 1.7, margin: "0 0 10px 0" }}>{t.s1Text}</p>
          <div style={{ background: greenBg, border: `1px solid ${greenBorder}40`, borderRadius: "8px", padding: "12px 16px", borderLeft: `4px solid ${greenBorder}` }}>
            <p style={{ fontSize: "12px", color: text, margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: greenBorder }}>{t.securityLabel}</strong> {t.securityText}
            </p>
          </div>
        </div>

        {/* Section 2 — Questions */}
        <div style={{ marginBottom: "22px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: teal, marginBottom: "8px" }}>{t.s2Label}</div>
          <p style={{ fontSize: "13px", color: text, lineHeight: 1.7, margin: "0 0 14px 0" }}>{t.s2Intro}</p>

          <QuestionCard id="q1" title={t.q1Title} desc={t.q1Desc} options={t.q1Opts}
            extraInput={responses.q1 === "1" && (
              <input type="text" placeholder={t.q1ProxyPlaceholder}
                style={{ marginTop: "8px", width: "100%", padding: "8px 10px", borderRadius: "6px", border: `1px solid ${border}`, fontSize: "12px", boxSizing: "border-box" }} />
            )} />

          <QuestionCard id="q2" title={t.q2Title} desc={t.q2Desc} options={t.q2Opts}
            extraInput={
              <input type="text" placeholder={t.q2PathPlaceholder}
                style={{ marginTop: "8px", width: "100%", padding: "8px 10px", borderRadius: "6px", border: `1px solid ${border}`, fontSize: "12px", boxSizing: "border-box" }} />
            } />

          <QuestionCard id="q3" title={t.q3Title} desc={t.q3Desc} options={t.q3Opts} />
          <QuestionCard id="q4" title={t.q4Title} desc={t.q4Desc} options={t.q4Opts} />
          <QuestionCard id="q5" title={t.q5Title} desc={t.q5Desc} options={t.q5Opts} />
        </div>

        {/* Section 3 — Specs */}
        <div style={{ marginBottom: "22px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: teal, marginBottom: "8px" }}>{t.s3Label}</div>
          <p style={{ fontSize: "13px", color: text, lineHeight: 1.7, margin: "0 0 12px 0" }}>{t.s3Intro}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {t.specs.map(([label, value], i) => (
              <div key={i} style={{ display: "flex", gap: "8px", padding: "7px 0", borderBottom: `1px solid ${border}30` }}>
                <span style={{ fontSize: "11.5px", fontWeight: 600, color: navy, minWidth: "130px" }}>{label}:</span>
                <span style={{ fontSize: "11.5px", color: textMid }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What IT does NOT need to do */}
        <div style={{ marginBottom: "22px" }}>
          <div style={{ background: yellowBg, border: `1px solid ${yellowBorder}40`, borderRadius: "8px", padding: "14px 18px", borderLeft: `4px solid ${yellowBorder}` }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: navy, marginBottom: "8px" }}>{t.notNeededTitle}</div>
            <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {t.notNeededItems.map((item, i) => (
                <li key={i} style={{ fontSize: "12px", color: textMid, lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: "22px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: teal, marginBottom: "8px" }}>{t.notesLabel}</div>
          <textarea placeholder={t.notesPlaceholder} value={notes} onChange={e => onChange({ ...state, notes: e.target.value })}
            style={{ width: "100%", minHeight: "70px", padding: "10px 12px", borderRadius: "8px", border: `1px solid ${border}`, fontSize: "12px", lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>

        {/* Contact & Timeline */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <div style={{ flex: 1, background: bg, border: `1px solid ${border}`, borderRadius: "8px", padding: "14px 18px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{t.contactLabel}</div>
            <div style={{ fontSize: "12.5px", color: text, lineHeight: 1.7 }}>
              <strong>{t.contactName}</strong> — {t.contactOrg}<br />
              {t.contactRole}<br />
              <span style={{ color: textLight }}>{t.contactEmail}</span>
            </div>
          </div>
          <div style={{ flex: 1, background: bg, border: `1px solid ${border}`, borderRadius: "8px", padding: "14px 18px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{t.timelineLabel}</div>
            <div style={{ fontSize: "12.5px", color: text, lineHeight: 1.7 }}>{t.timelineText}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: "12px", borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: textLight }}>{t.footer}</span>
          <span style={{ fontSize: "10px", color: accent, fontWeight: 600 }}>{t.confidential.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
