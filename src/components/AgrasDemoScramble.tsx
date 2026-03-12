"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   AGRAS SYSTEM DEMO — With Scramble Button
   Converted from agras_demo_scramble.jsx → TSX
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#F4F7FB", surface: "#FFFFFF", card: "#EBF0F8",
  border: "rgba(30,58,95,0.13)",
  navy: "#D6E4F7", teal: "#0F766E", tealBright: "#0D9488", tealGlow: "rgba(15,118,110,0.15)",
  gold: "#A16207", red: "#DC2626", green: "#15803D",
  yellow: "#CA8A04", orange: "#C2410C",
  text: "#0F172A", textMid: "#475569", textDim: "#94A3B8", white: "#FFF",
};

// ── Types ──
interface Scribe { title: string; confidence: number; actions: string[]; responsible: string; }
interface Regulation { tier: number; reg: string; title: string; article: string; relevant: string; score: number; }
interface Flag {
  tier: number; severity: string; color: string; title: string; summary: string;
  regulation: string; reasoning: string[]; action: string; confidence: number; requiresHitl: boolean;
}
interface Agenda {
  tag: string; id: string; title: string; discussion: string;
  decision: string | null; type: string;
  scribe: Scribe | null; regulations: Regulation[]; flags: Flag[];
  displayId?: string;
}
interface Step { agent: string; icon: string; action: string; color: string; }
interface FlagWithMeta extends Flag { id: string; blockTitle: string; }

// ═══════════════════════════════════════════════════════════
//  AGENDA POOL — 15 Self-Contained Scenarios
// ═══════════════════════════════════════════════════════════
const AGENDA_POOL: Agenda[] = [
  // ── CUSTOMER DATA SCENARIOS ──
  {
    tag: "customer_data", id: "CD-1",
    title: "Monetisasi Data Pengunjung melalui Platform Customer Data (\"Ancol Data Insights\")",
    discussion: "Direktur Keuangan mempresentasikan proposal untuk memonetisasi data pengunjung Ancol melalui pembangunan Customer Data Platform (CDP). Saat ini Ancol memiliki data lebih dari 15 juta pengunjung per tahun yang tersebar di berbagai sistem: tiket masuk, wahana permainan, hotel, dan loyalty program. Proposal mencakup konsolidasi seluruh data ke platform terpadu, pembangunan profil pengunjung 360-derajat, dan penjualan data insight secara agregat kepada tenant dan mitra bisnis. Estimasi pendapatan tambahan Rp 45 miliar per tahun. Direktur Utama menanyakan aspek perlindungan data pribadi. Sekretaris Perusahaan menanggapi bahwa kajian UU PDP masih perlu dilengkapi. Data akan dibagikan kepada pihak ketiga termasuk PT Jaya Real Property dan beberapa perusahaan iklan digital.",
    decision: "DISEPAKATI: Menyetujui pelaksanaan proyek Ancol Data Insights dengan anggaran Rp 18 miliar. Ditugaskan kepada Direktur Keuangan untuk memulai pengadaan vendor CDP dan membangun tim data analytics dalam 90 hari. Data pengunjung akan dikonsolidasi dan profil agregat dapat dibagikan kepada mitra bisnis strategis.",
    type: "DECISION",
    scribe: { title: "Monetisasi Data Pengunjung — Ancol Data Insights", confidence: 0.95, actions: ["Pengadaan vendor CDP dalam 90 hari", "Pembentukan tim data analytics", "Data sharing ke PT Jaya Real Property"], responsible: "Direktur Keuangan" },
    regulations: [
      { tier: 1, reg: "Pergub DKI No. 12/2024", title: "Perlindungan Data Pribadi Penduduk DKI Jakarta", article: "Pasal 5, 9, 14", relevant: "Kewajiban consent eksplisit, larangan penjualan data tanpa izin", score: 0.94 },
      { tier: 2, reg: "UU No. 27/2022", title: "Perlindungan Data Pribadi (UU PDP)", article: "Pasal 16, 20, 34, 65", relevant: "Dasar pemrosesan data, pembatasan transfer ke pihak ketiga, sanksi pidana", score: 0.97 },
      { tier: 3, reg: "POJK No. 42/2020", title: "Transaksi Afiliasi dan Benturan Kepentingan", article: "Pasal 4-7", relevant: "Sharing data ke PT Jaya Real Property merupakan transaksi afiliasi wajib lapor", score: 0.91 },
    ],
    flags: [
      { tier: 1, severity: "CRITICAL", color: "RED", title: "Pelanggaran Perlindungan Data Pribadi Penduduk DKI", summary: "Rencana monetisasi data 15 juta pengunjung dan pembagian profil ke pihak ketiga melanggar Pergub DKI No. 12/2024 yang mewajibkan consent eksplisit.", regulation: "Pergub DKI No. 12/2024 Pasal 5, 9 & 14", reasoning: ["Keputusan menyetujui konsolidasi data 15 juta pengunjung dan pembagian ke mitra.", "Pergub DKI No. 12/2024 Pasal 5 mewajibkan consent eksplisit untuk pengumpulan data penduduk DKI.", "Pasal 9 melarang pembagian data tanpa izin tertulis dari pemilik data.", "Keputusan rapat tidak mencantumkan mekanisme consent.", "Pelanggaran Tingkat 1 (Regional Mandate) — wajib review Legal Officer."], action: "Tunda pelaksanaan data sharing sampai mekanisme consent dan DPIA selesai. Tunjuk Data Protection Officer.", confidence: 0.97, requiresHitl: true },
      { tier: 2, severity: "HIGH", color: "RED", title: "Pelanggaran UU Perlindungan Data Pribadi (UU PDP)", summary: "Pemrosesan dan transfer data pengunjung ke pihak ketiga tanpa dasar hukum melanggar UU No. 27/2022 tentang PDP. Sanksi pidana penjara 5 tahun dan/atau denda Rp 5 miliar.", regulation: "UU No. 27/2022 Pasal 16, 20, 34 & 65", reasoning: ["UU PDP Pasal 16 menetapkan 8 dasar pemrosesan data pribadi.", "Pasal 20 mensyaratkan persetujuan tertulis untuk pemrosesan spesifik.", "Pasal 34 membatasi transfer ke pihak ketiga tanpa perjanjian data processing.", "Pasal 65 menetapkan sanksi pidana penjara 5 tahun dan/atau denda Rp 5 miliar.", "Pelanggaran Tingkat 2 — wajib review Legal Officer."], action: "Susun DPIA, siapkan consent opt-in, dan buat Data Processing Agreement dengan pihak ketiga.", confidence: 0.96, requiresHitl: true },
      { tier: 3, severity: "MEDIUM", color: "YELLOW", title: "Transaksi Afiliasi — Data Sharing ke PT Jaya Real Property", summary: "Pembagian data ke PT Jaya Real Property merupakan transaksi afiliasi yang wajib dilaporkan ke OJK.", regulation: "POJK No. 42/2020 Pasal 4-7", reasoning: ["PT Jaya Real Property Tbk adalah entitas terafiliasi.", "Pembagian data customer termasuk transaksi afiliasi.", "POJK No. 42/2020 mewajibkan pelaporan ke OJK dan BEI dalam 2 hari kerja.", "Bunga 4% perlu dikaji apakah sesuai arm's length principle."], action: "Siapkan laporan transaksi afiliasi ke OJK dan BEI.", confidence: 0.91, requiresHitl: false },
    ],
  },
  {
    tag: "customer_data", id: "CD-2",
    title: "Implementasi Facial Recognition untuk Tiket Masuk Kawasan Ancol",
    discussion: "Direktur Operasional mempresentasikan rencana penerapan sistem facial recognition untuk menggantikan tiket fisik di seluruh gerbang masuk kawasan Ancol. Sistem ini akan memindai wajah pengunjung, mencocokkan dengan database keanggotaan loyalty program, dan secara otomatis memotong saldo atau memvalidasi tiket. Teknologi ini diharapkan mengurangi antrean hingga 70% dan menghilangkan biaya cetak tiket sebesar Rp 3 miliar per tahun. Data biometrik wajah akan disimpan di server lokal Ancol dan dikelola oleh vendor teknologi pihak ketiga asal Tiongkok.",
    decision: "DIPUTUSKAN: Menyetujui implementasi facial recognition di seluruh gerbang masuk Ancol dengan anggaran Rp 25 miliar. Ditugaskan kepada Direktur Operasional untuk menyelesaikan pengadaan vendor dan instalasi dalam 6 bulan.",
    type: "DECISION",
    scribe: { title: "Implementasi Facial Recognition Gerbang Masuk", confidence: 0.96, actions: ["Pengadaan vendor dalam 6 bulan", "Instalasi di seluruh gerbang masuk"], responsible: "Direktur Operasional" },
    regulations: [
      { tier: 2, reg: "UU No. 27/2022", title: "Perlindungan Data Pribadi (UU PDP)", article: "Pasal 4 ayat 2, Pasal 17, Pasal 34", relevant: "Data biometrik termasuk Data Pribadi Spesifik yang memerlukan perlindungan lebih ketat", score: 0.98 },
      { tier: 1, reg: "Pergub DKI No. 12/2024", title: "Perlindungan Data Pribadi Penduduk DKI Jakarta", article: "Pasal 7, 11", relevant: "Larangan pemrosesan data biometrik penduduk DKI tanpa consent terpisah", score: 0.93 },
      { tier: 2, reg: "PP No. 71/2019", title: "Penyelenggaraan Sistem dan Transaksi Elektronik", article: "Pasal 20-21", relevant: "Kewajiban penempatan data strategis di pusat data dalam negeri", score: 0.88 },
    ],
    flags: [
      { tier: 2, severity: "HIGH", color: "RED", title: "Data Biometrik = Data Pribadi Spesifik (UU PDP)", summary: "Data wajah termasuk Data Pribadi Spesifik menurut UU PDP Pasal 4 ayat 2, memerlukan consent eksplisit terpisah dan perlindungan ketat. Penyimpanan oleh vendor asing memerlukan kajian tambahan.", regulation: "UU No. 27/2022 Pasal 4(2), 17 & 34", reasoning: ["Facial data termasuk data biometrik = Data Pribadi Spesifik (Pasal 4 ayat 2).", "Pasal 17 mensyaratkan consent eksplisit terpisah untuk data spesifik.", "Pasal 34 membatasi transfer data ke pihak ketiga, terutama vendor asing.", "Rapat tidak menyebutkan mekanisme consent biometrik atau kajian vendor.", "Pelanggaran Tingkat 2 — wajib review Legal Officer."], action: "Lakukan Privacy Impact Assessment untuk data biometrik. Pastikan consent terpisah untuk facial recognition. Evaluasi risiko vendor asing.", confidence: 0.95, requiresHitl: true },
      { tier: 1, severity: "CRITICAL", color: "RED", title: "Pelanggaran Perlindungan Data Biometrik Penduduk DKI", summary: "Pergub DKI No. 12/2024 secara khusus melarang pemrosesan data biometrik penduduk DKI Jakarta tanpa consent terpisah dan kajian dampak.", regulation: "Pergub DKI No. 12/2024 Pasal 7 & 11", reasoning: ["Pergub DKI 12/2024 Pasal 7 melarang pemrosesan data biometrik tanpa consent terpisah.", "Pasal 11 mewajibkan kajian dampak sebelum implementasi.", "Keputusan rapat tidak mencantumkan mekanisme consent biometrik.", "Pelanggaran Tingkat 1 — wajib review Legal Officer."], action: "Tunda implementasi sampai kajian dampak biometrik dan mekanisme consent terpisah selesai.", confidence: 0.93, requiresHitl: true },
    ],
  },
  {
    tag: "customer_data", id: "CD-3",
    title: "Kerjasama Data Sharing dengan Platform E-Commerce untuk Targeted Marketing",
    discussion: "Direktur Keuangan mempresentasikan proposal kerjasama dengan tiga platform e-commerce besar (Tokopedia, Shopee, Traveloka) untuk pertukaran data pengunjung Ancol. Ancol akan membagikan data kunjungan, preferensi wahana, dan pola spending pengunjung kepada platform tersebut, dan sebagai imbalannya menerima data preferensi belanja online pengunjung untuk meningkatkan personalisasi layanan. Program ini diestimasi meningkatkan revenue tiket online sebesar 25% dalam 12 bulan.",
    decision: "DISEPAKATI: Menyetujui kerjasama data sharing dengan Tokopedia, Shopee, dan Traveloka. Anggaran integrasi API sebesar Rp 8 miliar. Ditugaskan kepada Direktur Keuangan untuk menandatangani MoU dalam 30 hari.",
    type: "DECISION",
    scribe: { title: "Data Sharing dengan E-Commerce (Tokopedia, Shopee, Traveloka)", confidence: 0.94, actions: ["MoU dengan 3 platform dalam 30 hari", "Integrasi API"], responsible: "Direktur Keuangan" },
    regulations: [
      { tier: 2, reg: "UU No. 27/2022", title: "Perlindungan Data Pribadi", article: "Pasal 16, 20, 34, 36", relevant: "Transfer data pribadi ke pihak ketiga wajib berdasarkan consent dan Data Processing Agreement", score: 0.97 },
      { tier: 3, reg: "POJK No. 22/2023", title: "Perlindungan Konsumen Sektor Jasa Keuangan", article: "Pasal 31-35", relevant: "Kewajiban transparansi penggunaan data konsumen untuk perusahaan Tbk", score: 0.86 },
    ],
    flags: [
      { tier: 2, severity: "HIGH", color: "RED", title: "Transfer Data Pribadi ke Pihak Ketiga Tanpa Dasar Hukum", summary: "Pertukaran data pengunjung dengan 3 platform e-commerce merupakan transfer data pribadi ke pihak ketiga yang memerlukan consent, Data Processing Agreement, dan notifikasi kepada subjek data.", regulation: "UU No. 27/2022 Pasal 16, 20, 34 & 36", reasoning: ["Data kunjungan dan pola spending = data pribadi.", "Transfer ke Tokopedia, Shopee, Traveloka = pihak ketiga.", "UU PDP Pasal 34 mensyaratkan Data Processing Agreement.", "Pasal 36 mewajibkan notifikasi transfer kepada subjek data.", "Rapat tidak membahas consent, DPA, atau notifikasi."], action: "Susun Data Processing Agreement dengan setiap platform. Implementasi consent opt-in sebelum data sharing dimulai.", confidence: 0.96, requiresHitl: true },
    ],
  },
  // ── COASTAL DEVELOPMENT ──
  {
    tag: "coastal", id: "CV-1",
    title: "Pembangunan Mixed-Use Development di Kawasan Pantai Utara (\"Ancol Waterfront City\")",
    discussion: "Direktur Pengembangan Bisnis menyampaikan rencana pembangunan kawasan mixed-use seluas 8.5 hektar di area reklamasi pantai utara Ancol. Proyek mencakup hotel bintang 5, pusat perbelanjaan premium, dan residensial apartemen. Estimasi investasi Rp 2.8 triliun.",
    decision: "DIPUTUSKAN: Menyetujui secara prinsip rencana pembangunan Ancol Waterfront City seluas 8.5 hektar dengan anggaran investasi fase pertama sebesar Rp 1.2 triliun. Ditugaskan kepada Direktur Pengembangan Bisnis untuk memulai proses perizinan dan tender dalam 60 hari.",
    type: "DECISION",
    scribe: { title: "Pembangunan Ancol Waterfront City 8.5 Ha", confidence: 0.97, actions: ["Proses perizinan dalam 60 hari", "Tender kontraktor"], responsible: "Direktur Pengembangan Bisnis" },
    regulations: [
      { tier: 1, reg: "Pergub DKI No. 31/2023", title: "Tata Ruang Kawasan Strategis Pantai Utara", article: "Pasal 15, 17, 22", relevant: "Zona buffer hijau 100m, RTH 30%, pembatasan ketinggian", score: 0.96 },
      { tier: 1, reg: "Perda DKI No. 1/2024", title: "Pengelolaan Reklamasi Pantai Utara", article: "Pasal 8-12", relevant: "Izin reklamasi Gubernur, kontribusi 15% fasilitas publik", score: 0.93 },
    ],
    flags: [
      { tier: 1, severity: "CRITICAL", color: "RED", title: "Pelanggaran Tata Ruang Pantai Utara", summary: "Pembangunan 8.5 Ha melanggar Pergub DKI No. 31/2023 — zona buffer hijau 100m dan RTH 30% tidak terakomodasi dalam masterplan.", regulation: "Pergub DKI No. 31/2023 Pasal 15 & 17", reasoning: ["Keputusan mengalokasikan 8.5 Ha untuk mixed-use di pantai utara.", "Pergub DKI 31/2023 Pasal 15 mewajibkan zona buffer 100m.", "Pasal 17 mengharuskan RTH minimum 30%.", "Masterplan tidak menyebutkan alokasi buffer atau RTH.", "Pelanggaran Tingkat 1 — wajib review Legal Officer."], action: "Revisi masterplan untuk mengakomodasi zona buffer 100m dan RTH 30%.", confidence: 0.95, requiresHitl: true },
    ],
  },
  {
    tag: "coastal", id: "CV-2",
    title: "Konversi Lahan Mangrove untuk Perluasan Area Parkir Kawasan",
    discussion: "Direktur Operasional mengusulkan konversi 2 hektar area mangrove di sisi timur kawasan untuk menjadi area parkir kendaraan guna mengatasi masalah kepadatan parkir pada musim liburan. Saat ini kapasitas parkir hanya 5,000 kendaraan sementara peak demand mencapai 12,000 kendaraan.",
    decision: "DIPUTUSKAN: Menyetujui konversi area mangrove seluas 2 hektar untuk perluasan parkir dengan anggaran Rp 45 miliar. Target selesai sebelum musim liburan Juni 2026.",
    type: "DECISION",
    scribe: { title: "Konversi Lahan Mangrove 2 Ha untuk Parkir", confidence: 0.96, actions: ["Konstruksi area parkir", "Selesai sebelum Juni 2026"], responsible: "Direktur Operasional" },
    regulations: [
      { tier: 1, reg: "Perda DKI No. 7/2010", title: "Perlindungan Kawasan Mangrove DKI Jakarta", article: "Pasal 4, 8, 15", relevant: "Larangan konversi kawasan mangrove, sanksi pidana", score: 0.97 },
      { tier: 4, reg: "UU No. 32/2009", title: "Perlindungan dan Pengelolaan Lingkungan Hidup", article: "Pasal 69, 98", relevant: "Larangan perusakan ekosistem, sanksi pidana lingkungan", score: 0.94 },
    ],
    flags: [
      { tier: 1, severity: "CRITICAL", color: "RED", title: "Larangan Konversi Kawasan Mangrove DKI", summary: "Perda DKI No. 7/2010 secara tegas melarang konversi kawasan mangrove di wilayah DKI Jakarta, termasuk untuk keperluan infrastruktur. Pelanggaran diancam sanksi pidana.", regulation: "Perda DKI No. 7/2010 Pasal 4, 8 & 15", reasoning: ["Keputusan menyetujui konversi 2 Ha mangrove.", "Perda DKI 7/2010 Pasal 4 melarang konversi kawasan mangrove.", "Pasal 8 mewajibkan pelestarian ekosistem mangrove.", "Pasal 15 menetapkan sanksi pidana untuk pelanggaran.", "Pelanggaran Tingkat 1 — wajib review Legal Officer."], action: "Batalkan rencana konversi mangrove. Cari alternatif lokasi parkir atau pertimbangkan parkir bertingkat (multi-storey).", confidence: 0.98, requiresHitl: true },
    ],
  },
  // ── CORPORATE FINANCE ──
  {
    tag: "finance", id: "FN-1",
    title: "Penambahan Modal melalui Rights Issue Rp 2 Triliun",
    discussion: "Direktur Keuangan menyampaikan kebutuhan pendanaan ekspansi tiga tahun. Total kebutuhan Rp 4.5 triliun melalui rights issue Rp 2 triliun dan pinjaman Rp 2.5 triliun. Rasio 1:3, harga Rp 850/saham.",
    decision: "DIPUTUSKAN: Menyetujui rencana rights issue Rp 2 triliun, rasio 1:3, harga Rp 850/saham. Target pelaksanaan Q2 2026.",
    type: "DECISION",
    scribe: { title: "Rights Issue Rp 2 Triliun (Rasio 1:3)", confidence: 0.96, actions: ["Koordinasi underwriter", "Siapkan prospektus"], responsible: "Direktur Keuangan" },
    regulations: [
      { tier: 2, reg: "UU No. 40/2007", title: "Perseroan Terbatas", article: "Pasal 41-43", relevant: "Rights issue wajib persetujuan RUPS-LB", score: 0.98 },
      { tier: 3, reg: "POJK No. 14/2019", title: "Hak Memesan Efek Terlebih Dahulu", article: "Pasal 2-5", relevant: "Prosedur rights issue emiten Tbk", score: 0.95 },
    ],
    flags: [
      { tier: 2, severity: "HIGH", color: "RED", title: "Rights Issue Tanpa Persetujuan RUPS-LB", summary: "Rights issue Rp 2 triliun memerlukan RUPS Luar Biasa sesuai UU No. 40/2007 Pasal 41. Persetujuan Direksi tidak cukup.", regulation: "UU No. 40/2007 Pasal 41-43", reasoning: ["Keputusan menyetujui rights issue di rapat Direksi.", "UU 40/2007 Pasal 41: penambahan modal wajib keputusan RUPS.", "Pasal 43: pengeluaran saham baru wajib persetujuan RUPS-LB.", "Rapat Direksi tidak berwenang menyetujui final.", "Pelanggaran Tingkat 2 — wajib review Legal Officer."], action: "Jadwalkan RUPS-LB. Persetujuan saat ini bersifat prinsip yang perlu diratifikasi.", confidence: 0.98, requiresHitl: true },
    ],
  },
  {
    tag: "finance", id: "FN-2",
    title: "Pembelian Kembali Saham (Buyback) sebesar 5% Total Saham",
    discussion: "Direktur Keuangan mengusulkan program buyback saham hingga 5% dari total saham yang beredar untuk menstabilkan harga saham yang turun 18% dalam 3 bulan terakhir. Estimasi dana yang dibutuhkan Rp 750 miliar dari kas internal.",
    decision: "DIPUTUSKAN: Menyetujui program buyback hingga 5% total saham beredar dengan anggaran maksimal Rp 750 miliar. Pelaksanaan segera dimulai minggu depan.",
    type: "DECISION",
    scribe: { title: "Buyback Saham 5% — Rp 750 Miliar", confidence: 0.95, actions: ["Pelaksanaan buyback minggu depan", "Anggaran maks Rp 750M"], responsible: "Direktur Keuangan" },
    regulations: [
      { tier: 2, reg: "UU No. 40/2007", title: "Perseroan Terbatas", article: "Pasal 37-39", relevant: "Buyback wajib keputusan RUPS kecuali kondisi tertentu", score: 0.95 },
      { tier: 3, reg: "POJK No. 30/2017", title: "Pembelian Kembali Saham Emiten", article: "Pasal 2, 4, 8", relevant: "Buyback wajib diumumkan ke publik dan dilaporkan ke OJK", score: 0.93 },
    ],
    flags: [
      { tier: 2, severity: "HIGH", color: "RED", title: "Buyback Saham Memerlukan Persetujuan RUPS", summary: "UU 40/2007 Pasal 37 mensyaratkan persetujuan RUPS untuk buyback, kecuali kondisi tertentu yang memerlukan persetujuan dari regulator pasar modal.", regulation: "UU No. 40/2007 Pasal 37-39", reasoning: ["Keputusan buyback 5% saham disetujui di rapat Direksi.", "UU 40/2007 Pasal 37 mewajibkan keputusan RUPS untuk buyback.", "Pengecualian hanya berlaku jika kondisi pasar memenuhi kriteria OJK.", "Perlu verifikasi apakah kondisi pengecualian terpenuhi.", "Pelanggaran Tingkat 2 — wajib review Legal Officer."], action: "Verifikasi apakah kondisi pengecualian Pasal 37(2) terpenuhi. Jika tidak, jadwalkan RUPS-LB.", confidence: 0.92, requiresHitl: true },
    ],
  },
  {
    tag: "finance", id: "FN-3",
    title: "Pemberian Pinjaman ke PT Taman Impian Jaya Ancol (Anak Perusahaan) Rp 500 Miliar",
    discussion: "Direktur Keuangan mengusulkan pemberian pinjaman kepada anak perusahaan PT Taman Impian Jaya Ancol sebesar Rp 500 miliar untuk renovasi wahana. Pinjaman dengan bunga 4% per tahun, tenor 5 tahun, tanpa jaminan aset.",
    decision: "DIPUTUSKAN: Menyetujui pemberian pinjaman Rp 500 miliar kepada PT TIJA dengan bunga 4%/tahun, tenor 5 tahun.",
    type: "DECISION",
    scribe: { title: "Pinjaman ke Anak Perusahaan PT TIJA Rp 500M", confidence: 0.95, actions: ["Perjanjian pinjaman", "Bunga 4%, tenor 5 tahun"], responsible: "Direktur Keuangan" },
    regulations: [
      { tier: 3, reg: "POJK No. 42/2020", title: "Transaksi Afiliasi dan Benturan Kepentingan", article: "Pasal 3, 5, 10", relevant: "Pinjaman ke anak perusahaan = transaksi afiliasi material, wajib lapor OJK", score: 0.96 },
      { tier: 2, reg: "UU No. 40/2007", title: "Perseroan Terbatas", article: "Pasal 102", relevant: "Transaksi material >50% total aset wajib persetujuan RUPS", score: 0.82 },
    ],
    flags: [
      { tier: 3, severity: "MEDIUM", color: "YELLOW", title: "Transaksi Afiliasi Material — Wajib Lapor OJK", summary: "Pinjaman Rp 500M ke PT TIJA merupakan transaksi afiliasi material yang wajib dilaporkan ke OJK dan diumumkan ke publik sesuai POJK No. 42/2020.", regulation: "POJK No. 42/2020 Pasal 3, 5 & 10", reasoning: ["PT TIJA adalah anak perusahaan = pihak afiliasi.", "Pinjaman Rp 500M termasuk transaksi material.", "POJK 42/2020 mewajibkan pelaporan ke OJK dan pengumuman publik.", "Bunga 4% perlu dikaji apakah sesuai arm's length principle."], action: "Laporkan transaksi afiliasi ke OJK dan BEI. Lakukan independent fairness opinion untuk suku bunga.", confidence: 0.93, requiresHitl: false },
    ],
  },
  // ── CONSTRUCTION & SAFETY ──
  {
    tag: "construction", id: "CT-1",
    title: "Pembangunan Wahana \"Garuda Sky Tower\" (Menara Observasi 150 Meter)",
    discussion: "Direktur Pengembangan Bisnis mempresentasikan konsep menara observasi setinggi 150 meter sebagai landmark Jakarta Utara. Investasi Rp 350 miliar, payback 7 tahun. Direktur Utama menanggapi bahwa dokumen AMDAL yang ada disiapkan tahun 2020.",
    decision: "MENYETUJUI: Pembangunan Garuda Sky Tower dengan anggaran Rp 350 miliar. Timeline penyelesaian 30 bulan.",
    type: "DECISION",
    scribe: { title: "Pembangunan Garuda Sky Tower 150m", confidence: 0.94, actions: ["Proses konstruksi", "Pengadaan kontraktor spesialis"], responsible: "Direktur Operasional" },
    regulations: [
      { tier: 4, reg: "PP No. 22/2021", title: "Perlindungan dan Pengelolaan Lingkungan Hidup", article: "Pasal 4-8", relevant: "Pembangunan 150m memerlukan AMDAL terbaru (2020 > 5 tahun)", score: 0.92 },
      { tier: 4, reg: "Permen PUPR No. 22/2018", title: "Pembangunan Bangunan Gedung", article: "Pasal 45, 67", relevant: "Bangunan >100m wajib kajian angin dan sertifikasi laik fungsi", score: 0.87 },
    ],
    flags: [
      { tier: 4, severity: "LOW", color: "YELLOW", title: "AMDAL Kedaluwarsa untuk Garuda Sky Tower", summary: "AMDAL 2020 sudah berusia 6 tahun. PP No. 22/2021 mensyaratkan AMDAL terbaru untuk proyek konstruksi signifikan.", regulation: "PP No. 22/2021 Pasal 4-8", reasoning: ["Rencana pembangunan menara 150m menggunakan AMDAL 2020.", "PP 22/2021 mensyaratkan AMDAL terbaru untuk konstruksi signifikan.", "AMDAL >5 tahun umumnya dianggap tidak relevan."], action: "Perbarui dokumen AMDAL sebelum memulai konstruksi.", confidence: 0.90, requiresHitl: false },
    ],
  },
  {
    tag: "construction", id: "CT-2",
    title: "Pengoperasian Wahana Roller Coaster Baru Tanpa Sertifikasi Keselamatan Final",
    discussion: "Direktur Operasional meminta persetujuan untuk membuka wahana roller coaster baru \"Tsunami Ride\" untuk pengunjung pada libur Lebaran, meskipun sertifikasi keselamatan final dari Kemenaker belum diterbitkan.",
    decision: "DIPUTUSKAN: Menyetujui pengoperasian Tsunami Ride mulai H-3 Lebaran dengan sertifikasi sementara. Sertifikasi final akan dilengkapi segera setelah Lebaran.",
    type: "DECISION",
    scribe: { title: "Buka Wahana Tsunami Ride Tanpa Sertifikasi Final", confidence: 0.97, actions: ["Operasikan H-3 Lebaran", "Lengkapi sertifikasi setelah Lebaran"], responsible: "Direktur Operasional" },
    regulations: [
      { tier: 4, reg: "UU No. 1/1970", title: "Keselamatan Kerja", article: "Pasal 3, 9", relevant: "Wajib sertifikasi keselamatan sebelum pengoperasian alat/mesin", score: 0.95 },
      { tier: 4, reg: "Permen Pariwisata No. 12/2019", title: "Standar Keselamatan Wahana Rekreasi", article: "Pasal 8-11", relevant: "Wahana wajib memiliki sertifikat laik operasi sebelum dibuka untuk publik", score: 0.97 },
    ],
    flags: [
      { tier: 4, severity: "LOW", color: "YELLOW", title: "Pengoperasian Wahana Tanpa Sertifikasi Final", summary: "Wahana rekreasi wajib memiliki sertifikat laik operasi sebelum dibuka untuk publik. Sertifikasi sementara tidak memenuhi ketentuan Permen Pariwisata No. 12/2019.", regulation: "Permen Pariwisata No. 12/2019 Pasal 8-11", reasoning: ["Keputusan membuka wahana sebelum sertifikasi final.", "Permen Pariwisata 12/2019 mewajibkan sertifikat laik operasi sebelum publik.", "Sertifikasi sementara tidak memenuhi ketentuan.", "Risiko keselamatan pengunjung dan tanggung jawab hukum."], action: "Tunda pembukaan Tsunami Ride sampai sertifikasi final diterbitkan Kemenaker.", confidence: 0.94, requiresHitl: false },
    ],
  },
  // ── GOVERNANCE ──
  {
    tag: "governance", id: "GV-1",
    title: "Penunjukan Direktur Baru Tanpa Melalui Fit & Proper Test",
    discussion: "Direktur Utama mengusulkan pengangkatan seorang kenalan pribadi sebagai Direktur Pengembangan Digital yang baru, tanpa melalui proses fit and proper test dan tanpa rekomendasi Komite Nominasi dan Remunerasi.",
    decision: "DIPUTUSKAN: Menyetujui pengangkatan Direktur Pengembangan Digital baru, efektif 1 April 2026. Fit and proper test akan dilakukan setelah pengangkatan.",
    type: "DECISION",
    scribe: { title: "Pengangkatan Direktur Baru Tanpa Fit & Proper", confidence: 0.93, actions: ["Pengangkatan efektif 1 April 2026", "Fit & proper test menyusul"], responsible: "Direktur Utama" },
    regulations: [
      { tier: 1, reg: "Perda DKI No. 3/2015", title: "Pengelolaan BUMD DKI Jakarta", article: "Pasal 28-32", relevant: "Pengangkatan Direksi BUMD wajib melalui proses seleksi terbuka dan fit & proper test", score: 0.95 },
      { tier: 3, reg: "POJK No. 33/2014", title: "Direksi dan Dewan Komisaris Emiten", article: "Pasal 20-25", relevant: "Emiten Tbk wajib mengikuti prosedur pengangkatan Direksi sesuai GCG", score: 0.91 },
    ],
    flags: [
      { tier: 1, severity: "CRITICAL", color: "RED", title: "Pelanggaran Prosedur Pengangkatan Direksi BUMD", summary: "Perda DKI No. 3/2015 mewajibkan seleksi terbuka dan fit & proper test untuk pengangkatan Direksi BUMD. Pengangkatan tanpa proses ini melanggar ketentuan regional.", regulation: "Perda DKI No. 3/2015 Pasal 28-32", reasoning: ["Keputusan mengangkat Direktur tanpa fit & proper test.", "Perda DKI 3/2015 mewajibkan seleksi terbuka untuk Direksi BUMD.", "Fit & proper test harus dilakukan sebelum, bukan sesudah pengangkatan.", "Calon tidak melalui rekomendasi Komite Nominasi.", "Pelanggaran Tingkat 1 — wajib review Legal Officer."], action: "Tunda pengangkatan. Laksanakan fit & proper test melalui Komite Nominasi dan Remunerasi terlebih dahulu.", confidence: 0.96, requiresHitl: true },
    ],
  },
  {
    tag: "governance", id: "GV-2",
    title: "Pemberian Bonus Direksi sebesar 15% dari Laba Bersih",
    discussion: "Direktur Keuangan mengusulkan pemberian bonus tahunan kepada seluruh anggota Direksi sebesar 15% dari laba bersih 2025 (estimasi Rp 67.5 miliar). Kebijakan ini belum pernah disetujui dalam RUPS tahunan.",
    decision: "DISEPAKATI: Menyetujui pemberian bonus Direksi sebesar 15% laba bersih 2025. Pembayaran dilaksanakan pada April 2026.",
    type: "DECISION",
    scribe: { title: "Bonus Direksi 15% Laba Bersih (Est. Rp 67.5M)", confidence: 0.96, actions: ["Pembayaran April 2026"], responsible: "Direktur Keuangan" },
    regulations: [
      { tier: 2, reg: "UU No. 40/2007", title: "Perseroan Terbatas", article: "Pasal 96, 113", relevant: "Remunerasi Direksi ditetapkan oleh RUPS, bukan oleh Direksi sendiri", score: 0.97 },
      { tier: 1, reg: "Pergub DKI No. 20/2018", title: "Remunerasi Direksi dan Komisaris BUMD DKI", article: "Pasal 8-12", relevant: "Bonus Direksi BUMD wajib persetujuan Gubernur dan RUPS", score: 0.94 },
    ],
    flags: [
      { tier: 1, severity: "CRITICAL", color: "RED", title: "Bonus Direksi BUMD Tanpa Persetujuan Gubernur", summary: "Pergub DKI No. 20/2018 mewajibkan persetujuan Gubernur dan RUPS untuk bonus Direksi BUMD. Direksi tidak dapat menetapkan bonus untuk dirinya sendiri.", regulation: "Pergub DKI No. 20/2018 Pasal 8-12", reasoning: ["Keputusan menyetujui bonus 15% laba bersih untuk Direksi.", "Pergub DKI 20/2018 mewajibkan persetujuan Gubernur untuk remunerasi BUMD.", "UU 40/2007 Pasal 96 menetapkan RUPS yang berwenang atas remunerasi Direksi.", "Direksi menyetujui bonus untuk dirinya sendiri = benturan kepentingan.", "Pelanggaran Tingkat 1 — wajib review Legal Officer."], action: "Batalkan keputusan. Ajukan usulan bonus ke RUPS dan minta persetujuan Gubernur DKI melalui mekanisme yang berlaku.", confidence: 0.97, requiresHitl: true },
    ],
  },
  // ── INFORMATIONAL ──
  {
    tag: "info", id: "IF-1",
    title: "Laporan Kinerja Wahana Ocean Dream Samudra Q4 2025",
    discussion: "Direktur Operasional memberikan penjelasan mengenai kinerja Ocean Dream Samudra Q4 2025. Total pengunjung 1.2 juta orang (+15% YoY). Revenue Rp 89 miliar (108% target). Tingkat kepuasan di atas 90%.",
    decision: null, type: "INFORMATIONAL", scribe: null, regulations: [], flags: [],
  },
  {
    tag: "info", id: "IF-2",
    title: "Laporan Progres Renovasi Hotel Mercure Ancol",
    discussion: "Direktur Pengembangan Bisnis melaporkan progres renovasi Hotel Mercure Ancol sudah mencapai 75%. Estimasi selesai on-schedule pada Mei 2026. Budget terealisasi Rp 120 miliar dari total Rp 160 miliar yang dianggarkan.",
    decision: null, type: "INFORMATIONAL", scribe: null, regulations: [], flags: [],
  },
  {
    tag: "info", id: "IF-3",
    title: "Update Program CSR \"Ancol untuk Jakarta\" Tahun 2025",
    discussion: "Sekretaris Perusahaan menyampaikan laporan realisasi program CSR tahun 2025. Total dana CSR yang disalurkan Rp 12.5 miliar (102% budget). Program mencakup beasiswa 500 siswa, rehabilitasi pantai, dan pemberdayaan UMKM nelayan di sekitar kawasan Ancol.",
    decision: null, type: "INFORMATIONAL", scribe: null, regulations: [], flags: [],
  },
];

// ═══════════════════════════════════════════════════════════
//  SCRAMBLE LOGIC
// ═══════════════════════════════════════════════════════════
function scrambleAgendas(): Agenda[] {
  const cdItems = AGENDA_POOL.filter(a => a.tag === "customer_data");
  const otherDecisions = AGENDA_POOL.filter(a => a.tag !== "customer_data" && a.tag !== "info");
  const infoItems = AGENDA_POOL.filter(a => a.tag === "info");

  const cd = cdItems[Math.floor(Math.random() * cdItems.length)];
  const shuffledOther = [...otherDecisions].sort(() => Math.random() - 0.5);
  const shuffledInfo = [...infoItems].sort(() => Math.random() - 0.5);

  const picked = [cd, shuffledOther[0], shuffledOther[1], shuffledOther[2], shuffledInfo[0]]
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);

  return picked.map((a, i) => ({ ...a, displayId: `AGN-${i + 1}` })) as Agenda[];
}

// ═══════════════════════════════════════════════════════════
//  GENERATE PROCESSING STEPS
// ═══════════════════════════════════════════════════════════
function generateSteps(agendas: Agenda[]) {
  const steps: Step[] = [];
  const decisions = agendas.filter(a => a.scribe);
  const infos = agendas.filter(a => !a.scribe);

  steps.push({ agent: "The Scribe", icon: "📖", action: "Membaca risalah rapat...", color: C.tealBright });
  steps.push({ agent: "The Scribe", icon: "📖", action: `Mengidentifikasi ${agendas.length} agenda, ${decisions.length} keputusan, ${infos.length} informasi.`, color: C.tealBright });
  decisions.forEach(a => steps.push({ agent: "The Scribe", icon: "📖", action: `${a.scribe!.title} ✓ (confidence: ${a.scribe!.confidence})`, color: C.tealBright }));
  infos.forEach(a => steps.push({ agent: "The Scribe", icon: "📖", action: `${a.displayId}: ${a.title.slice(0, 50)}... — dilewati (informational).`, color: C.tealBright }));

  decisions.forEach(a => {
    steps.push({ agent: "The Librarian", icon: "🔍", action: `Mencari regulasi untuk ${a.scribe!.title.slice(0, 40)}...`, color: C.gold });
    const regs = a.regulations.map(r => r.reg).join(", ");
    steps.push({ agent: "The Librarian", icon: "🔍", action: `Ditemukan: ${regs}`, color: C.gold });
  });

  decisions.forEach(a => {
    steps.push({ agent: "The Chief Justice", icon: "⚖️", action: `Mengevaluasi: ${a.scribe!.title.slice(0, 50)}...`, color: C.orange });
    a.flags.forEach(f => {
      const icon = f.color === "RED" ? "🔴" : "🟡";
      steps.push({ agent: "The Chief Justice", icon: "⚖️", action: `${icon} TINGKAT ${f.tier}: ${f.title}`, color: f.color === "RED" ? C.red : C.yellow });
    });
  });

  const allFlags = agendas.flatMap(a => a.flags);
  const redCount = allFlags.filter(f => f.color === "RED").length;
  const totalFlags = allFlags.length;

  if (redCount > 0) {
    steps.push({ agent: "HITL Gate", icon: "🛑", action: `${redCount} bendera MERAH terdeteksi. Menunggu review Legal Officer...`, color: C.red });
  }
  steps.push({ agent: "The Communicator", icon: "📊", action: "Menyusun Ringkasan Eksekutif...", color: C.green });
  steps.push({ agent: "The Communicator", icon: "📊", action: "Menyusun Buku Besar Kepatuhan Hukum...", color: C.green });

  const rawScore = totalFlags === 0 ? 0 : Math.min(
    allFlags.reduce((s, f) => s + ({ CRITICAL: 0.4, HIGH: 0.3, MEDIUM: 0.2, LOW: 0.1 }[f.severity] ?? 0), 0) / 1.2,
    1.0
  );
  const riskScore = parseFloat(rawScore.toFixed(2));
  const riskLevel = riskScore >= 0.7 ? "CRITICAL" : riskScore >= 0.4 ? "HIGH" : riskScore >= 0.2 ? "MEDIUM" : riskScore > 0 ? "LOW" : "NONE";

  steps.push({ agent: "AGRAS", icon: "✅", action: `Audit selesai. Risiko: ${riskLevel}. ${totalFlags} temuan dari ${decisions.length} keputusan.`, color: C.green });

  return { steps, riskScore, riskLevel, totalFlags, redCount, decisionCount: decisions.length };
}

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function AgrasDemoScramble() {
  const [agendas, setAgendas] = useState<Agenda[]>(() => scrambleAgendas());
  const [phase, setPhase] = useState<"document" | "processing" | "results">("document");
  const [step, setStep] = useState(0);
  const [resultTab, setResultTab] = useState("summary");
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const { steps: STEPS, riskScore, riskLevel, totalFlags, redCount, decisionCount } = generateSteps(agendas);
  const allFlags: FlagWithMeta[] = agendas.flatMap((a, ai) =>
    a.flags.map((f, fi) => ({ ...f, id: `FLG-${String(ai * 10 + fi + 1).padStart(3, "0")}`, blockTitle: a.scribe?.title ?? a.title }))
  );

  const handleScramble = useCallback(() => {
    setAgendas(scrambleAgendas());
    setPhase("document");
    setStep(0);
    setResultTab("summary");
    setExpandedFlag(null);
  }, []);

  useEffect(() => {
    if (phase === "processing" && step < STEPS.length) {
      const t = setTimeout(() => setStep(s => s + 1), 500 + Math.random() * 400);
      return () => clearTimeout(t);
    }
    if (phase === "processing" && step >= STEPS.length) {
      const t = setTimeout(() => setPhase("results"), 700);
      return () => clearTimeout(t);
    }
  }, [phase, step, STEPS.length]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [step]);

  const sevColor = (s: string) => ({ CRITICAL: C.red, HIGH: C.orange, MEDIUM: C.yellow, LOW: C.teal }[s] ?? C.textDim);
  const riskColor = riskLevel === "CRITICAL" || riskLevel === "HIGH" ? C.red : riskLevel === "MEDIUM" ? C.yellow : riskLevel === "LOW" ? C.teal : C.green;
  const phaseOrder = ["document", "processing", "results"];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100%", maxWidth: "960px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: `${C.surface}EE`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 30, height: 30, borderRadius: "8px", background: `linear-gradient(135deg, ${C.teal}, ${C.navy})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: C.white }}>A</div>
          <div><div style={{ fontSize: "14px", fontWeight: 800, color: C.text }}>AGRAS</div><div style={{ fontSize: "9px", color: C.textDim, letterSpacing: "0.1em" }}>INTERACTIVE DEMO</div></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {phaseOrder.map((p, i) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: phase === p ? C.teal : (phaseOrder.indexOf(phase) > i ? C.green : `${C.teal}20`), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: phase === p || phaseOrder.indexOf(phase) > i ? C.white : C.textDim, transition: "all 0.3s" }}>{i + 1}</div>
              {i < 2 && <span style={{ color: C.textDim, fontSize: "9px", margin: "0 2px" }}>→</span>}
            </div>
          ))}
          <div style={{ width: 1, height: 20, background: C.border, margin: "0 4px" }} />
          <button onClick={handleScramble}
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, color: C.white, border: "none", borderRadius: "8px", padding: "7px 14px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: `0 2px 10px ${C.gold}40`, transition: "transform 0.15s" }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.95)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            🎲 Scramble MoM
          </button>
        </div>
      </div>

      <div style={{ padding: "16px 24px", position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">

          {/* ═══ DOCUMENT PHASE ═══ */}
          {phase === "document" && (
            <motion.div key={`doc-${agendas.map(a => a.id).join()}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ background: C.surface, borderRadius: "14px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <div style={{ background: C.navy, padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: C.teal, letterSpacing: "0.12em", marginBottom: "3px" }}>DOKUMEN INPUT</div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: C.text }}>Risalah Rapat Direksi PT Pembangunan Jaya Ancol Tbk</div>
                    <div style={{ fontSize: "11px", color: C.textMid, marginTop: "2px" }}>No. 027/RD-PJAA/III/2026</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: C.text, fontWeight: 600 }}>Selasa, 4 Maret 2026</div>
                    <div style={{ fontSize: "10px", color: C.textDim }}>Ruang Rapat Direksi Lt. 5, Kantor Pusat Ancol</div>
                  </div>
                </div>

                <div style={{ padding: "10px 22px", borderBottom: `1px solid ${C.border}`, background: `${C.navy}40`, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "9px", fontWeight: 700, color: C.teal, letterSpacing: "0.08em" }}>HADIR:</span>
                  {["Direktur Utama (Pimpinan)", "Direktur Keuangan", "Dir. Pengembangan Bisnis", "Direktur Operasional", "Sekretaris Perusahaan"].map((r, i) => (
                    <span key={i} style={{ fontSize: "10px", color: C.textMid, background: C.card, padding: "3px 8px", borderRadius: "4px", border: `1px solid ${C.border}` }}>{r}</span>
                  ))}
                </div>

                <div style={{ padding: "14px 22px", maxHeight: "380px", overflowY: "auto" }}>
                  {agendas.map((ag, i) => (
                    <div key={ag.id} style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: i < agendas.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "9px", fontWeight: 800, color: C.teal, background: `${C.teal}12`, padding: "2px 7px", borderRadius: "4px" }}>{ag.displayId}</span>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: C.text }}>{ag.title}</span>
                        <span style={{ fontSize: "8px", fontWeight: 700, color: ag.type === "DECISION" ? C.gold : C.textDim, background: ag.type === "DECISION" ? `${C.gold}10` : `${C.textDim}12`, padding: "2px 5px", borderRadius: "3px" }}>{ag.type}</span>
                      </div>
                      <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.6, margin: "0 0 6px 0" }}>{ag.discussion}</p>
                      {ag.decision && (
                        <div style={{ background: `${C.gold}06`, borderRadius: "6px", padding: "8px 12px", borderLeft: `3px solid ${C.gold}` }}>
                          <p style={{ fontSize: "11px", color: C.text, lineHeight: 1.55, margin: 0, fontWeight: 500 }}>{ag.decision}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
                <button onClick={handleScramble}
                  style={{ background: "transparent", color: C.gold, border: `1px solid ${C.gold}30`, borderRadius: "10px", padding: "11px 24px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                  🎲 Scramble — Buat MoM Baru
                </button>
                <button onClick={() => { setPhase("processing"); setStep(0); }}
                  style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.navy})`, color: C.white, border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: `0 4px 18px ${C.tealGlow}` }}>
                  ⚡ Mulai Audit Kepatuhan
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══ PROCESSING PHASE ═══ */}
          {phase === "processing" && (
            <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: C.text }}>AGRAS Compliance Audit Pipeline</span>
                  <span style={{ fontSize: "10px", color: C.textMid }}>{Math.min(step, STEPS.length)}/{STEPS.length}</span>
                </div>
                <div style={{ background: C.card, borderRadius: "5px", height: "5px", overflow: "hidden" }}>
                  <motion.div animate={{ width: `${(step / STEPS.length) * 100}%` }} transition={{ duration: 0.3 }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.tealBright})`, borderRadius: "5px" }} />
                </div>
              </div>
              <div ref={logRef} style={{ background: C.surface, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "14px", maxHeight: "500px", overflowY: "auto" }}>
                {STEPS.slice(0, step).map((s, i) => {
                  const isLatest = i === step - 1;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "6px 8px", borderRadius: "6px", marginBottom: "2px", background: isLatest ? `${s.color}06` : "transparent" }}>
                      <span style={{ fontSize: "14px", flexShrink: 0 }}>{s.icon}</span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "9px", fontWeight: 800, color: s.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.agent}</span>
                        <p style={{ fontSize: "11.5px", color: isLatest ? C.text : C.textMid, margin: "1px 0 0 0", lineHeight: 1.4 }}>{s.action}</p>
                      </div>
                    </motion.div>
                  );
                })}
                {step < STEPS.length && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px" }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      style={{ width: 12, height: 12, border: `2px solid ${C.teal}`, borderTopColor: "transparent", borderRadius: "50%" }} />
                    <span style={{ fontSize: "10px", color: C.teal, fontWeight: 600 }}>Memproses...</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ═══ RESULTS PHASE ═══ */}
          {phase === "results" && (
            <motion.div key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                  style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg, ${riskColor}, ${riskLevel === "NONE" ? C.green : C.red}CC)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px ${riskColor}30` }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, color: C.white }}>{riskLevel}</span>
                </motion.div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: C.text }}>Audit Selesai — Risiko: <span style={{ color: riskColor }}>{riskLevel}</span></div>
                  <div style={{ fontSize: "11px", color: C.textMid }}>{totalFlags} temuan dari {decisionCount} keputusan | {redCount} wajib HITL | Skor: {riskScore}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "14px" }}>
                {[
                  { v: decisionCount, l: "Keputusan", c: C.tealBright },
                  { v: totalFlags, l: "Temuan", c: C.yellow },
                  { v: redCount, l: "MERAH", c: C.red },
                  { v: totalFlags - redCount, l: "KUNING", c: C.yellow },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.card, borderRadius: "8px", padding: "10px", textAlign: "center", border: `1px solid ${s.c}10` }}>
                    <div style={{ fontSize: "22px", fontWeight: 800, color: s.c, fontFamily: "'Playfair Display', serif" }}>{s.v}</div>
                    <div style={{ fontSize: "9px", color: C.textMid, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                {[{ id: "summary", l: "Ringkasan Eksekutif" }, { id: "flags", l: `Detail Temuan (${totalFlags})` }].map(t => (
                  <button key={t.id} onClick={() => setResultTab(t.id)}
                    style={{ padding: "7px 14px", fontSize: "10px", fontWeight: resultTab === t.id ? 700 : 500, borderRadius: "7px", border: "none", cursor: "pointer", background: resultTab === t.id ? C.teal : "transparent", color: resultTab === t.id ? C.white : C.textMid }}>
                    {t.l}
                  </button>
                ))}
              </div>

              {resultTab === "summary" && (
                <div style={{ background: C.surface, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "18px 22px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: C.teal, letterSpacing: "0.1em", marginBottom: "14px" }}>RINGKASAN EKSEKUTIF — UNTUK DEWAN DIREKSI</div>
                  {allFlags.filter(f => f.color === "RED").length > 0 && (
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: C.red, marginBottom: "8px" }}>⚠️ TEMUAN KRITIS</div>
                      {allFlags.filter(f => f.color === "RED").map((f, i) => (
                        <div key={i} style={{ display: "flex", gap: "7px", marginBottom: "6px", padding: "8px 10px", background: `${C.red}05`, borderRadius: "6px", borderLeft: `3px solid ${C.red}` }}>
                          <span style={{ color: C.red, fontWeight: 800, fontSize: "11px", flexShrink: 0 }}>{i + 1}.</span>
                          <p style={{ fontSize: "11px", color: C.text, lineHeight: 1.55, margin: 0 }}>{f.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: C.gold, marginBottom: "8px" }}>📋 REKOMENDASI</div>
                    {allFlags.map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: "7px", marginBottom: "5px" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "4px", background: `${C.gold}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 800, color: C.gold, flexShrink: 0 }}>{i + 1}</div>
                        <p style={{ fontSize: "11px", color: C.text, lineHeight: 1.45, margin: 0 }}>{f.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resultTab === "flags" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {allFlags.map(flag => {
                    const isOpen = expandedFlag === flag.id;
                    return (
                      <div key={flag.id} style={{ background: C.surface, borderRadius: "10px", border: `1px solid ${flag.color === "RED" ? `${C.red}20` : C.border}`, overflow: "hidden" }}>
                        <div onClick={() => setExpandedFlag(isOpen ? null : flag.id)}
                          style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: 9, height: 9, borderRadius: "50%", background: sevColor(flag.severity), boxShadow: `0 0 8px ${sevColor(flag.severity)}40`, flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap", marginBottom: "2px" }}>
                              <span style={{ fontSize: "10px", fontWeight: 700, fontFamily: "monospace", color: C.text }}>{flag.id}</span>
                              <span style={{ fontSize: "8px", fontWeight: 700, color: sevColor(flag.severity), background: `${sevColor(flag.severity)}10`, padding: "1px 5px", borderRadius: "3px" }}>{flag.severity}</span>
                              <span style={{ fontSize: "8px", fontWeight: 700, color: C.teal, background: `${C.teal}10`, padding: "1px 5px", borderRadius: "3px" }}>TIER {flag.tier}</span>
                            </div>
                            <div style={{ fontSize: "11.5px", fontWeight: 600, color: C.text }}>{flag.title}</div>
                          </div>
                          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: C.textDim, fontSize: "12px" }}>▾</motion.div>
                        </div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              style={{ overflow: "hidden", borderTop: `1px solid ${C.border}` }}>
                              <div style={{ padding: "14px 16px" }}>
                                <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.55, margin: "0 0 12px 0" }}>{flag.summary}</p>
                                <div style={{ marginBottom: "12px" }}>
                                  <div style={{ fontSize: "9px", fontWeight: 700, color: C.tealBright, letterSpacing: "0.08em", marginBottom: "6px" }}>CHAIN OF THOUGHT</div>
                                  {flag.reasoning.map((r, j) => (
                                    <div key={j} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                                      <div style={{ width: 16, height: 16, borderRadius: "4px", background: `${C.teal}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", fontWeight: 800, color: C.tealBright, flexShrink: 0 }}>{j + 1}</div>
                                      <p style={{ fontSize: "10.5px", color: C.text, margin: 0, lineHeight: 1.45 }}>{r}</p>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ background: `${C.navy}50`, borderRadius: "6px", padding: "7px 10px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                                  <span style={{ fontSize: "11px" }}>📜</span>
                                  <span style={{ fontSize: "10.5px", color: C.text }}>{flag.regulation}</span>
                                  <span style={{ fontSize: "9px", color: C.textDim, marginLeft: "auto" }}>Confidence: {(flag.confidence * 100).toFixed(0)}%</span>
                                </div>
                                <div style={{ background: `${C.gold}05`, borderRadius: "6px", padding: "8px 12px", borderLeft: `3px solid ${C.gold}` }}>
                                  <div style={{ fontSize: "8px", fontWeight: 700, color: C.gold, marginBottom: "2px" }}>REKOMENDASI</div>
                                  <p style={{ fontSize: "10.5px", color: C.text, margin: 0, lineHeight: 1.45 }}>{flag.action}</p>
                                </div>
                                {flag.requiresHitl && (
                                  <div style={{ marginTop: "8px", padding: "6px 10px", background: `${C.red}06`, borderRadius: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.red, boxShadow: `0 0 6px ${C.red}60` }} />
                                    <span style={{ fontSize: "9px", fontWeight: 700, color: C.red }}>WAJIB REVIEW LEGAL OFFICER</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "14px" }}>
                <button onClick={handleScramble}
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, color: C.white, border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: `0 2px 10px ${C.gold}40` }}>
                  🎲 Scramble — Coba MoM Lain
                </button>
                <button onClick={() => { setPhase("document"); setStep(0); setResultTab("summary"); setExpandedFlag(null); }}
                  style={{ background: "transparent", color: C.textMid, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "9px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                  ↺ Lihat Dokumen
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div style={{ padding: "10px 24px", display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}` }}>
        <span style={{ fontSize: "9px", color: C.textDim }}>AGRAS Demo by <b style={{ color: C.textMid }}>Axiara.AI</b></span>
        <span style={{ fontSize: "8px", color: C.textDim }}>Simulasi — data bersifat fiktif untuk keperluan demonstrasi</span>
      </div>
    </div>
  );
}
