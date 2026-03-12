export type Domain =
  | "All"
  | "Recreation"
  | "Property"
  | "Hospitality"
  | "F&B"
  | "MICE"
  | "Marketing"
  | "Back Office"
  | "GRC"
  | "Ecosystem";

export interface UseCase {
  id: string;
  domain: Domain;
  title: string;
  description: string;
  product: string;
  businessImpact: string;
  isAgenticAI: boolean;
  phase: number;
}

export const DOMAINS: Domain[] = [
  "All",
  "Recreation",
  "Property",
  "Hospitality",
  "F&B",
  "MICE",
  "Marketing",
  "Back Office",
  "GRC",
  "Ecosystem",
];

export const DOMAIN_COLORS: Readonly<Record<string, string>> = {
  Recreation:   "bg-[#0076CC]/10  text-[#38B6FF]   border-[#0076CC]/25",
  Property:     "bg-[#14B8A6]/10  text-[#14B8A6]   border-[#14B8A6]/25",
  Hospitality:  "bg-[#F59E0B]/10  text-[#F59E0B]   border-[#F59E0B]/25",
  "F&B":        "bg-[#C41E3A]/10  text-[#E05470]   border-[#C41E3A]/25",
  MICE:         "bg-[#8B5CF6]/10  text-[#A78BFA]   border-[#8B5CF6]/25",
  Marketing:    "bg-[#EC4899]/10  text-[#F472B6]   border-[#EC4899]/25",
  "Back Office":"bg-[#4D6B8A]/10  text-[#8BA3C1]   border-[#4D6B8A]/25",
  GRC:          "bg-[#6366F1]/10  text-[#818CF8]   border-[#6366F1]/25",
  Ecosystem:    "bg-[#0D9488]/10  text-[#2DD4BF]   border-[#0D9488]/25",
};

export const useCases: UseCase[] = [
  // ─── DOMAIN 1: RECREATION & THEME PARKS (18 use cases) ───────────────────
  {
    id: "rec-1.1",
    domain: "Recreation",
    title: "AI Dynamic Pricing Engine",
    description:
      "Real-time ticket pricing that adjusts based on demand signals, weather forecasts, day of week, competitor pricing, historical patterns, and remaining capacity. Includes surge pricing for peak periods and promotional pricing for low-demand windows.",
    product: "LINTANG",
    businessImpact: "Revenue per visitor +12-18%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "rec-1.2",
    domain: "Recreation",
    title: "Predictive Queue Management",
    description:
      "AI agent that forecasts ride/attraction wait times 30–60 min ahead using real-time footfall data, historical patterns, and current crowd density. Pushes notifications to guest apps suggesting alternative attractions with shorter waits.",
    product: "LINTANG",
    businessImpact: "Guest satisfaction +20%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "rec-1.3",
    domain: "Recreation",
    title: "AI-Powered Crowd Flow Optimization",
    description:
      "Computer vision and IoT sensors analyze real-time crowd density across the 552-hectare complex. An agentic AI system dynamically adjusts digital signage, opens overflow pathways, and triggers capacity alerts for individual attractions.",
    product: "SENTINEL",
    businessImpact: "Throughput capacity +15%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "rec-1.4",
    domain: "Recreation",
    title: "Predictive Ride Maintenance",
    description:
      "IoT sensor data from rides and mechanical attractions fed into ML models that predict component failures 2–4 weeks before they occur. Automated work order generation and spare parts procurement triggered by the AI agent.",
    product: "LINTANG",
    businessImpact: "Ride downtime -40%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "rec-1.5",
    domain: "Recreation",
    title: "Weather-Responsive Experience Orchestration",
    description:
      "Agentic AI that monitors weather forecasts and automatically triggers operational playbooks: rerouting outdoor guests to indoor attractions, activating rain-day promotions, adjusting F&B inventory prep, and modifying staffing levels.",
    product: "LINTANG",
    businessImpact: "Rainy-day revenue recovery +25%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "rec-1.6",
    domain: "Recreation",
    title: "AI Virtual Queue Assistant",
    description:
      "Conversational AI agent accessible via WhatsApp/app that allows guests to join virtual queues, receive wait-time updates, and get personalized ride recommendations based on their group profile (age, thrill preference, time remaining).",
    product: "SUARA",
    businessImpact: "Guest NPS improvement +15pts",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "rec-1.7",
    domain: "Recreation",
    title: "Smart Parking & Arrival Orchestration",
    description:
      "License plate recognition and AI-guided parking allocation that directs vehicles to optimal zones based on destination within the complex. Integrates with ETA prediction to pre-position shuttle services.",
    product: "LINTANG",
    businessImpact: "Parking throughput +30%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "rec-1.8",
    domain: "Recreation",
    title: "AI-Generated Personalized Itineraries",
    description:
      "Upon gate entry, an agentic AI generates a customized day-plan for each guest group based on their purchase history, stated preferences, group composition, real-time crowd conditions, and weather. Updates dynamically throughout the day.",
    product: "SUARA",
    businessImpact: "Per-capita spending +10%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "rec-1.9",
    domain: "Recreation",
    title: "Computer Vision Safety Monitoring",
    description:
      "Real-time video analytics across rides, pools, and marine attractions to detect safety anomalies: unattended children near water, overcrowding in confined spaces, unauthorized area access, and rider safety compliance.",
    product: "SENTINEL",
    businessImpact: "Safety incident reduction -50%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "rec-1.10",
    domain: "Recreation",
    title: "Aquarium & Marine Life Health Monitoring",
    description:
      "AI-driven analysis of water quality sensors, animal behavior patterns (via computer vision), and feeding metrics at Sea World and Ocean Dream Samudra. Predicts health issues in marine animals before they become critical.",
    product: "LINTANG",
    businessImpact: "Animal welfare improvement",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "rec-1.11",
    domain: "Recreation",
    title: "AI-Powered Show Scheduling Optimization",
    description:
      "Analyzes historical attendance, guest flow, and real-time crowd data to optimize show/performance schedules at Ocean Dream Samudra and other venues. Ensures maximum audience without conflicting with peak ride demand.",
    product: "LINTANG",
    businessImpact: "Show attendance +20%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "rec-1.12",
    domain: "Recreation",
    title: "Sentiment Analysis from On-Site Feedback",
    description:
      "NLP-powered real-time analysis of guest reviews, social media posts with geo-tags, in-app feedback, and staff-reported incidents. Flags negative sentiment clusters by zone for immediate service recovery.",
    product: "SUARA",
    businessImpact: "Service recovery time -60%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "rec-1.13",
    domain: "Recreation",
    title: "AR/VR AI Experience Enhancement",
    description:
      "AI-generated augmented reality overlays for attractions (marine life identification at Sea World, historical narrative at Ecopark, gamified treasure hunts at Dufan) that adapt content based on guest profile and engagement history.",
    product: "LINTANG",
    businessImpact: "Dwell time per attraction +25%",
    isAgenticAI: false,
    phase: 5,
  },
  {
    id: "rec-1.14",
    domain: "Recreation",
    title: "Automated Accessibility Assistance",
    description:
      "AI agent that provides real-time accessibility routing, sign language interpretation via avatar, audio descriptions for visually impaired guests, and mobility-optimized itineraries for wheelchair users.",
    product: "SUARA",
    businessImpact: "Inclusive visitor segment +10%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "rec-1.15",
    domain: "Recreation",
    title: "Energy Consumption Optimization",
    description:
      "AI model that optimizes HVAC, lighting, water pumps, and ride power consumption across the complex based on occupancy forecasts, weather conditions, and time-of-use electricity pricing.",
    product: "LINTANG",
    businessImpact: "Energy costs -15-20%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "rec-1.16",
    domain: "Recreation",
    title: "AI Waste Management & Sustainability",
    description:
      "Smart waste bin monitoring with fill-level sensors, AI-optimized collection routes, waste categorization via computer vision, and predictive scheduling for waste management crews aligned to crowd patterns.",
    product: "LINTANG",
    businessImpact: "Waste management efficiency +30%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "rec-1.17",
    domain: "Recreation",
    title: "Lost & Found AI Agent",
    description:
      "Guest-facing chatbot that matches descriptions of lost items with items found by staff (logged via photos). Uses image recognition and NLP to match and auto-notify guests when their items are recovered.",
    product: "SUARA",
    businessImpact: "Lost item recovery rate +40%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "rec-1.18",
    domain: "Recreation",
    title: "AI-Driven Workforce Scheduling",
    description:
      "Demand-responsive staffing model that generates optimal shift schedules for 500+ employees and outsourced workers across all venues. Accounts for predicted crowd size, attraction operating hours, weather, and labor regulations.",
    product: "LINTANG",
    businessImpact: "Labor cost optimization -10%",
    isAgenticAI: false,
    phase: 4,
  },

  // ─── DOMAIN 2: PROPERTY DEVELOPMENT & SALES (8 use cases) ────────────────
  {
    id: "prop-2.1",
    domain: "Property",
    title: "Recreation-to-Property Lead Scoring",
    description:
      "AI model that identifies high-frequency Ancol recreation visitors with behavioral signals indicating real estate purchase propensity (visit frequency, spend patterns, demographics, loyalty tier). Generates qualified leads for the property sales team.",
    product: "LINTANG",
    businessImpact: "Qualified leads +200%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "prop-2.2",
    domain: "Property",
    title: "AI-Powered Property Valuation",
    description:
      "Machine learning model incorporating location data, market comparables, infrastructure development timelines (MRT Phase 2B, West Ancol TOD), and macroeconomic factors to generate dynamic property valuations for the entire portfolio.",
    product: "LINTANG",
    businessImpact: "Pricing accuracy +15%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "prop-2.3",
    domain: "Property",
    title: "Virtual Property Staging & Tours",
    description:
      "AI-generated interior design visualizations for off-plan units (Jaya Ancol Seafront, Northland Apartment). Personalized staging based on buyer profile preferences. Virtual tour AI agent that answers questions in real-time.",
    product: "SUARA",
    businessImpact: "Conversion rate +20%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "prop-2.4",
    domain: "Property",
    title: "Predictive Buyer Journey Nurturing",
    description:
      "Agentic AI that manages the end-to-end property buyer journey: automated follow-ups, personalized content delivery, showroom booking, mortgage pre-qualification routing, and handoff to human sales at optimal moments.",
    product: "JALUR",
    businessImpact: "Sales cycle time -30%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "prop-2.5",
    domain: "Property",
    title: "Smart Building Management AI",
    description:
      "Post-handover AI for Ancol residential properties: predictive maintenance for common facilities, energy optimization, automated resident service requests, parking management, and community engagement.",
    product: "LINTANG",
    businessImpact: "Property management cost -20%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "prop-2.6",
    domain: "Property",
    title: "Market Intelligence & Competitor Analysis",
    description:
      "AI agent that continuously monitors Jakarta property market data, competitor launches (PIK2, JIS area), regulatory changes, and interest rate movements. Generates weekly intelligence briefs for the property division.",
    product: "LINTANG",
    businessImpact: "Strategic decision speed +50%",
    isAgenticAI: true,
    phase: 2,
  },
  {
    id: "prop-2.7",
    domain: "Property",
    title: "Construction Progress Monitoring",
    description:
      "Computer vision analysis of construction site imagery (drone/CCTV) to track progress against project timeline. AI flags deviations, predicts completion dates, and generates stakeholder reports automatically.",
    product: "LINTANG",
    businessImpact: "Project delay detection +2 weeks early",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "prop-2.8",
    domain: "Property",
    title: "AI Land Use Optimization",
    description:
      "Scenario modeling AI that evaluates different development configurations for PJAA's remaining land bank (75+ hectares). Optimizes for revenue mix, IRR, community impact, and regulatory constraints.",
    product: "LINTANG",
    businessImpact: "Land value optimization +15%",
    isAgenticAI: false,
    phase: 5,
  },

  // ─── DOMAIN 3: HOSPITALITY & ACCOMMODATION (6 use cases) ─────────────────
  {
    id: "hosp-3.1",
    domain: "Hospitality",
    title: "AI Revenue Management System",
    description:
      "Dynamic room pricing for Putri Duyung Resort and the future Ancol Hotel based on demand forecasts, competitor rates, events calendar, OTA parity, and group booking patterns. Automated rate distribution across all channels.",
    product: "LINTANG",
    businessImpact: "RevPAR improvement +12%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "hosp-3.2",
    domain: "Hospitality",
    title: "AI Guest Experience Concierge",
    description:
      "Conversational AI agent (WhatsApp/in-room tablet) that handles pre-arrival preferences, in-stay requests (room service, activity booking, transport), and post-stay feedback. Learns preferences across repeat visits.",
    product: "SUARA",
    businessImpact: "Guest satisfaction +18%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "hosp-3.3",
    domain: "Hospitality",
    title: "Housekeeping Optimization Agent",
    description:
      "AI scheduling system that optimizes housekeeping routes based on checkout times, stay-over patterns, VIP priority, and inspection requirements to significantly reduce room turnaround time.",
    product: "JALUR",
    businessImpact: "Room turnaround -20 min",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "hosp-3.4",
    domain: "Hospitality",
    title: "Predictive Amenity Stocking",
    description:
      "ML model that predicts in-room amenity consumption by guest segment. Reduces waste from over-provisioning while ensuring VIP and family guests have appropriate extras pre-placed upon arrival.",
    product: "LINTANG",
    businessImpact: "Amenity waste -25%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "hosp-3.5",
    domain: "Hospitality",
    title: "AI-Powered Upsell Engine",
    description:
      "Contextual upsell recommendations triggered at optimal moments: room upgrade at check-in, spa booking after pool visit, dinner reservation during late afternoon, recreation bundle during stay.",
    product: "LINTANG",
    businessImpact: "Ancillary revenue per guest +15%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "hosp-3.6",
    domain: "Hospitality",
    title: "Review Response Automation",
    description:
      "AI agent that drafts personalized responses to guest reviews across Google, TripAdvisor, OTAs, and social media. Escalates negative reviews to human management with context summary and recommended remediation actions.",
    product: "SUARA",
    businessImpact: "Review response time <2 hours",
    isAgenticAI: true,
    phase: 3,
  },

  // ─── DOMAIN 4: FOOD & BEVERAGE OPERATIONS (6 use cases) ──────────────────
  {
    id: "fnb-4.1",
    domain: "F&B",
    title: "Demand Forecasting for F&B Outlets",
    description:
      "AI model predicting daily/hourly demand for each F&B outlet across the complex based on gate entry data, weather, day type, historical patterns, and event schedules. Drives prep quantities and staffing.",
    product: "LINTANG",
    businessImpact: "Food waste -30%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "fnb-4.2",
    domain: "F&B",
    title: "Dynamic Menu Pricing & Optimization",
    description:
      "AI analyzes ingredient costs, demand patterns, menu item popularity, and margin targets to recommend menu pricing, featured items, and seasonal rotations. A/B tests menu layouts digitally across kiosks.",
    product: "LINTANG",
    businessImpact: "F&B margin improvement +8%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "fnb-4.3",
    domain: "F&B",
    title: "AI Inventory & Supply Chain Agent",
    description:
      "Agentic AI that monitors ingredient inventory levels, predicts stockout risks, auto-generates purchase orders, compares supplier pricing, and handles end-to-end procurement workflow for central kitchen and distributed outlets.",
    product: "JALUR",
    businessImpact: "Stockout incidents -50%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "fnb-4.4",
    domain: "F&B",
    title: "Personalized F&B Recommendations",
    description:
      "Context-aware food suggestions pushed to guest app based on location within complex, time of day, dietary preferences (if stated), past purchases, and current weather conditions.",
    product: "SUARA",
    businessImpact: "F&B spend per visitor +12%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "fnb-4.5",
    domain: "F&B",
    title: "Kitchen Food Safety Monitoring",
    description:
      "Computer vision system monitoring food preparation hygiene compliance: handwashing adherence, temperature control, cross-contamination risks, and expiry date tracking. Automated alerts and compliance logging.",
    product: "PERISAI",
    businessImpact: "Food safety compliance 99.5%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "fnb-4.6",
    domain: "F&B",
    title: "AI-Driven Central Kitchen Optimization",
    description:
      "Scheduling and batch optimization for central kitchen operations serving multiple outlets. AI determines optimal cooking batches, delivery routes, and timing to minimize waste while meeting real-time demand signals.",
    product: "LINTANG",
    businessImpact: "Central kitchen efficiency +20%",
    isAgenticAI: false,
    phase: 4,
  },

  // ─── DOMAIN 5: MICE & EVENTS (5 use cases) ───────────────────────────────
  {
    id: "mice-5.1",
    domain: "MICE",
    title: "Intelligent Event Proposal Generator",
    description:
      "AI agent that generates customized event proposals for Ecovention Hall based on client requirements, available dates, package options, and historical pricing. Includes automated floor plan visualization and budget breakdown.",
    product: "SUARA",
    businessImpact: "Proposal turnaround -70%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "mice-5.2",
    domain: "MICE",
    title: "Event Demand Forecasting",
    description:
      "Predictive model for MICE booking demand by month, event type, and corporate segment. Enables proactive outreach to likely bookers during low-demand periods and premium pricing during peak windows.",
    product: "LINTANG",
    businessImpact: "MICE occupancy +15%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "mice-5.3",
    domain: "MICE",
    title: "AI Event Operations Coordinator",
    description:
      "Agentic AI managing event logistics end-to-end: vendor coordination, catering orders, AV equipment scheduling, parking allocation, guest registration, and real-time event support chatbot for organizers.",
    product: "JALUR",
    businessImpact: "Event operations cost -20%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "mice-5.4",
    domain: "MICE",
    title: "Post-Event Analytics & Reporting",
    description:
      "Automated event performance reports generated from attendee feedback, social media mentions, operational metrics, and financial reconciliation. Includes AI-generated improvement recommendations for repeat bookings.",
    product: "LINTANG",
    businessImpact: "Repeat booking rate +25%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "mice-5.5",
    domain: "MICE",
    title: "Smart Venue Environment Control",
    description:
      "AI-driven HVAC, lighting, and acoustics management for Ecovention Hall that adapts to event type, attendee count, and external weather conditions in real-time for optimal guest comfort and energy efficiency.",
    product: "LINTANG",
    businessImpact: "Event energy costs -15%",
    isAgenticAI: false,
    phase: 4,
  },

  // ─── DOMAIN 6: MARKETING, SALES & CUSTOMER INTELLIGENCE (10 use cases) ───
  {
    id: "mkt-6.1",
    domain: "Marketing",
    title: "Customer Data Platform (CDP) Foundation",
    description:
      "Unified customer identity resolution merging data from ticketing, app, loyalty, property inquiries, hotel stays, F&B, and MICE bookings into a single 360-degree guest profile. Foundation for all personalization, cross-sell, and analytics use cases.",
    product: "JARINGAN",
    businessImpact: "Single customer view for 10M+ visitors",
    isAgenticAI: false,
    phase: 1,
  },
  {
    id: "mkt-6.2",
    domain: "Marketing",
    title: "AI-Powered Audience Segmentation",
    description:
      "Dynamic micro-segmentation engine that identifies high-value visitor clusters based on behavioral patterns: weekend warriors, annual pass families, date-night couples, tourist groups, corporate outings.",
    product: "LINTANG",
    businessImpact: "Campaign ROI +35%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "mkt-6.3",
    domain: "Marketing",
    title: "Predictive Churn Prevention",
    description:
      "ML model identifying visitors at risk of not returning (declining visit frequency, negative feedback, competitive switching signals). Triggers automated re-engagement campaigns with personalized incentives at optimal timing.",
    product: "LINTANG",
    businessImpact: "Visitor retention +10%",
    isAgenticAI: true,
    phase: 2,
  },
  {
    id: "mkt-6.4",
    domain: "Marketing",
    title: "AI Content Generation Engine",
    description:
      "Automated creation of marketing content: social media posts, email campaigns, banner ads, and promotional copy. Adapts tone, language (Bahasa Indonesia/English), and imagery to the target segment profile.",
    product: "SUARA",
    businessImpact: "Content production cost -50%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "mkt-6.5",
    domain: "Marketing",
    title: "Marketing Attribution AI",
    description:
      "Multi-touch attribution model that quantifies the revenue impact of each marketing channel (social, SEM, OTA, billboard, influencer, email) on ticket sales and property inquiries across the full customer journey.",
    product: "LINTANG",
    businessImpact: "Marketing spend optimization +20%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "mkt-6.6",
    domain: "Marketing",
    title: "OTA Disintermediation Strategy",
    description:
      "AI system that identifies OTA-sourced guests and builds direct-channel re-engagement workflows. Personalized app experiences and loyalty incentives that OTAs cannot replicate, shifting booking mix toward direct channels.",
    product: "LINTANG",
    businessImpact: "Direct booking share +15%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "mkt-6.7",
    domain: "Marketing",
    title: "Social Listening & Trend Agent",
    description:
      "Agentic AI monitoring social media, news, and review platforms for brand mentions, sentiment shifts, competitor activities, and emerging trends relevant to Ancol. Generates daily intelligence summaries for the marketing team.",
    product: "SUARA",
    businessImpact: "Brand response time <1 hour",
    isAgenticAI: true,
    phase: 2,
  },
  {
    id: "mkt-6.8",
    domain: "Marketing",
    title: "Influencer ROI Prediction",
    description:
      "AI model that evaluates potential influencer partnerships by predicting engagement rates, audience overlap with target segments, and estimated conversion impact before committing any campaign budget.",
    product: "LINTANG",
    businessImpact: "Influencer marketing ROI +40%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "mkt-6.9",
    domain: "Marketing",
    title: "Loyalty Program Optimization",
    description:
      "AI-driven loyalty tier management that dynamically adjusts point values, redemption options, and tier thresholds based on customer lifetime value prediction, competitive benchmarking, and behavioral response modeling.",
    product: "LINTANG",
    businessImpact: "Loyalty member ARPU +18%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "mkt-6.10",
    domain: "Marketing",
    title: "Multilingual AI Customer Service",
    description:
      "24/7 conversational AI handling inquiries in Bahasa Indonesia, English, Mandarin, Japanese, and Korean across WhatsApp, web chat, social DMs, and phone (voice AI). Escalates complex issues to human agents with full context.",
    product: "SUARA",
    businessImpact: "Support cost -40%, availability 24/7",
    isAgenticAI: false,
    phase: 2,
  },

  // ─── DOMAIN 7: BACK OFFICE & CORPORATE OPERATIONS (12 use cases) ─────────
  {
    id: "bo-7.1",
    domain: "Back Office",
    title: "AI-Driven Financial Planning & Analysis",
    description:
      "Automated variance analysis, budget-vs-actual reporting, cash flow forecasting, and scenario modeling for the CFO. Generates board-ready financial narratives and executive summaries directly from raw ERP data.",
    product: "LINTANG",
    businessImpact: "FP&A cycle time -60%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "bo-7.2",
    domain: "Back Office",
    title: "Procurement Intelligence Agent",
    description:
      "Agentic AI that analyzes vendor performance, compares quotes, flags pricing anomalies, ensures BUMD procurement compliance, and auto-generates purchase orders within pre-set approval thresholds.",
    product: "JALUR",
    businessImpact: "Procurement savings +8-12%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "bo-7.3",
    domain: "Back Office",
    title: "AI Contract Review & Management",
    description:
      "NLP-powered contract analysis that extracts key terms, flags unfavorable clauses, tracks renewal dates, and ensures compliance with BUMD regulations and OJK requirements for publicly listed BUMD entities.",
    product: "SUARA",
    businessImpact: "Contract review time -70%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "bo-7.4",
    domain: "Back Office",
    title: "Intelligent Document Processing",
    description:
      "Automated extraction and classification of invoices, receipts, permits, correspondence, and regulatory filings using OCR plus NLP optimized for Bahasa Indonesia business documents.",
    product: "SUARA",
    businessImpact: "Manual data entry -80%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "bo-7.5",
    domain: "Back Office",
    title: "HR Talent Analytics & Workforce Planning",
    description:
      "AI models predicting attrition risk, identifying skill gaps, recommending training programs, and optimizing organizational structure. Includes automated candidate screening for recruitment pipelines.",
    product: "LINTANG",
    businessImpact: "Recruitment time -40%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "bo-7.6",
    domain: "Back Office",
    title: "Employee Performance Insight Engine",
    description:
      "AI analysis of employee KPIs, guest satisfaction scores by team, training completion, and peer feedback. Generates coaching recommendations for managers to improve team performance and retention.",
    product: "LINTANG",
    businessImpact: "Performance review quality +30%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "bo-7.7",
    domain: "Back Office",
    title: "AI-Powered Internal Knowledge Base",
    description:
      "Retrieval-augmented generation (RAG) system over all PJAA internal documents, SOPs, policies, and regulations. Employees ask questions in natural language and receive sourced, verifiable answers instantly.",
    product: "SUARA",
    businessImpact: "Knowledge retrieval time -75%",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "bo-7.8",
    domain: "Back Office",
    title: "Tax Compliance Automation",
    description:
      "AI agent managing corporate tax obligations: automated calculation, filing preparation, transfer pricing documentation, and real-time monitoring of regulatory changes affecting BUMD entities.",
    product: "JALUR",
    businessImpact: "Tax compliance accuracy 99.9%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "bo-7.9",
    domain: "Back Office",
    title: "Insurance Claims Processing AI",
    description:
      "Automated processing of visitor injury claims, property damage claims, and ride incident reports. AI triages severity, extracts relevant documentation, and routes to appropriate handlers for resolution.",
    product: "JALUR",
    businessImpact: "Claims processing time -50%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "bo-7.10",
    domain: "Back Office",
    title: "AI Meeting Summarizer & Action Tracker",
    description:
      "Automated transcription, summarization, and action item extraction from board meetings, management meetings, and cross-functional discussions. Tracks action completion and sends reminders to responsible parties.",
    product: "SUARA",
    businessImpact: "Meeting follow-through +40%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "bo-7.11",
    domain: "Back Office",
    title: "Vendor Performance Scoring",
    description:
      "Continuous AI assessment of vendor delivery timelines, quality metrics, pricing competitiveness, and compliance record. Auto-generates vendor scorecards and recommendations for procurement decisions.",
    product: "LINTANG",
    businessImpact: "Vendor quality issues -30%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "bo-7.12",
    domain: "Back Office",
    title: "AI-Powered Budget Optimization",
    description:
      "Multi-objective optimization model that allocates annual CAPEX and OPEX budgets across business units based on predicted ROI, strategic priorities, and constraint satisfaction including BUMD mandates.",
    product: "LINTANG",
    businessImpact: "Budget allocation efficiency +20%",
    isAgenticAI: false,
    phase: 5,
  },

  // ─── DOMAIN 8: GOVERNANCE, RISK & COMPLIANCE (10 use cases) ──────────────
  {
    id: "grc-8.1",
    domain: "GRC",
    title: "AI Governance Framework (SENTINEL)",
    description:
      "Comprehensive AI oversight platform monitoring all deployed AI models for bias, drift, accuracy degradation, and compliance with UU PDP, Perpres AI Ethics, and OJK regulations. Includes per-model kill-switch controls.",
    product: "SENTINEL",
    businessImpact: "Regulatory compliance 100%",
    isAgenticAI: false,
    phase: 1,
  },
  {
    id: "grc-8.2",
    domain: "GRC",
    title: "Personal Data Protection Compliance Agent",
    description:
      "Agentic AI continuously monitoring data flows across all systems for UU PDP compliance: consent management, data minimization, retention policies, breach detection, and automated DPIA generation.",
    product: "SENTINEL",
    businessImpact: "UU PDP fine risk elimination",
    isAgenticAI: true,
    phase: 1,
  },
  {
    id: "grc-8.3",
    domain: "GRC",
    title: "Anti-Fraud Detection System",
    description:
      "ML models detecting anomalies in ticketing (counterfeit tickets, unauthorized discounts), financial transactions (vendor invoice fraud), and procurement (bid rigging, phantom vendors) across all business units.",
    product: "PERISAI",
    businessImpact: "Fraud losses -70%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "grc-8.4",
    domain: "GRC",
    title: "ESG Reporting Automation",
    description:
      "AI agent that aggregates environmental, social, and governance data from across operations. Auto-generates sustainability reports compliant with GRI, OJK, and Jakarta BUMD reporting requirements.",
    product: "JALUR",
    businessImpact: "ESG report prep time -60%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "grc-8.5",
    domain: "GRC",
    title: "Board Reporting Intelligence",
    description:
      "Automated generation of board presentation materials from operational dashboards. AI synthesizes KPIs across all business segments into narrative-driven executive summaries with strategic recommendations.",
    product: "LINTANG",
    businessImpact: "Board prep time -50%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "grc-8.6",
    domain: "GRC",
    title: "Regulatory Change Monitoring",
    description:
      "AI agent tracking changes in Indonesian regulations affecting PJAA: OJK capital market rules, BUMD governance requirements, environmental regulations, labor laws, tax code changes, and tourism sector policies.",
    product: "SENTINEL",
    businessImpact: "Regulatory response time <48 hours",
    isAgenticAI: true,
    phase: 2,
  },
  {
    id: "grc-8.7",
    domain: "GRC",
    title: "Internal Audit AI Assistant",
    description:
      "AI-powered audit planning, sampling, testing, and finding documentation. Identifies high-risk areas for audit focus based on historical patterns, control weaknesses, and transaction anomaly signals.",
    product: "SENTINEL",
    businessImpact: "Audit coverage +40%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "grc-8.8",
    domain: "GRC",
    title: "Whistleblower Report Analysis",
    description:
      "NLP analysis of whistleblower reports to identify patterns, assess credibility, flag urgency levels, and route to appropriate investigation teams — while maintaining full reporter anonymity throughout.",
    product: "SENTINEL",
    businessImpact: "Report processing time -60%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "grc-8.9",
    domain: "GRC",
    title: "Cybersecurity Threat Intelligence",
    description:
      "AI-driven monitoring of PJAA's digital infrastructure: anomaly detection in network traffic, phishing attempt identification, vulnerability scanning, and automated incident response for rapid threat containment.",
    product: "PERISAI",
    businessImpact: "Cyber incident response time -70%",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "grc-8.10",
    domain: "GRC",
    title: "GRC Dashboard & Risk Scoring",
    description:
      "Integrated governance, risk, and compliance dashboard with AI-powered risk scoring across all business units. Predictive risk alerts for operational, financial, regulatory, and reputational threats.",
    product: "SENTINEL",
    businessImpact: "Risk identification +50%",
    isAgenticAI: false,
    phase: 5,
  },

  // ─── DOMAIN 9: ECOSYSTEM-WIDE & CROSS-SEGMENT INTELLIGENCE (12 use cases) ─
  {
    id: "eco-9.1",
    domain: "Ecosystem",
    title: "Unified Guest Identity Graph",
    description:
      "Cross-segment identity resolution creating a single guest profile spanning recreation visits, hotel stays, property inquiries, F&B transactions, event attendance, and loyalty program data — the foundational layer for all AI personalization.",
    product: "JARINGAN",
    businessImpact: "Cross-sell revenue +25%",
    isAgenticAI: false,
    phase: 1,
  },
  {
    id: "eco-9.2",
    domain: "Ecosystem",
    title: "Ecosystem Revenue Optimization Engine",
    description:
      "AI that identifies and acts on cross-segment revenue opportunities: recommending hotel stays to frequent day-visitors, property viewings to luxury spenders, and corporate events to visiting executives.",
    product: "LINTANG",
    businessImpact: "Ecosystem revenue per customer +20%",
    isAgenticAI: true,
    phase: 5,
  },
  {
    id: "eco-9.3",
    domain: "Ecosystem",
    title: "AI-Powered Contextual Notifications",
    description:
      "Location-aware, time-sensitive push notifications that guide guests through the ecosystem: restaurant suggestions at meal time, show reminders near venues, hotel offers for late-staying guests.",
    product: "SUARA",
    businessImpact: "Notification engagement rate 35%+",
    isAgenticAI: false,
    phase: 3,
  },
  {
    id: "eco-9.4",
    domain: "Ecosystem",
    title: "Digital Twin of Ancol Complex",
    description:
      "AI-powered digital twin of the entire 552-hectare complex for simulation and planning: crowd flow modeling, new attraction impact analysis, infrastructure stress testing, and disaster response scenario planning.",
    product: "LINTANG",
    businessImpact: "Planning scenario accuracy +40%",
    isAgenticAI: false,
    phase: 5,
  },
  {
    id: "eco-9.5",
    domain: "Ecosystem",
    title: "AI Transportation & Mobility Hub",
    description:
      "Integrated transportation AI managing internal shuttles, external ride-hail coordination, MRT Phase 2B integration, boat services, and bicycle rentals. Optimizes routes based on real-time demand patterns.",
    product: "LINTANG",
    businessImpact: "Guest mobility satisfaction +30%",
    isAgenticAI: true,
    phase: 4,
  },
  {
    id: "eco-9.6",
    domain: "Ecosystem",
    title: "Smart Ecosystem Pricing Bundle AI",
    description:
      "Dynamic bundling engine that creates personalized package offers combining recreation tickets, hotel stays, dining credits, and activity add-ons at optimized price points for each customer segment.",
    product: "LINTANG",
    businessImpact: "Bundle conversion rate +25%",
    isAgenticAI: false,
    phase: 5,
  },
  {
    id: "eco-9.7",
    domain: "Ecosystem",
    title: "AI Disaster & Emergency Response",
    description:
      "Integrated emergency management AI: tsunami/flood early warning response, mass evacuation route optimization, real-time headcount tracking, emergency communication system, and first responder coordination.",
    product: "SENTINEL",
    businessImpact: "Emergency response time -40%",
    isAgenticAI: true,
    phase: 3,
  },
  {
    id: "eco-9.8",
    domain: "Ecosystem",
    title: "Sustainability Impact Optimizer",
    description:
      "AI system that optimizes the entire complex's environmental footprint: carbon emission tracking, water usage optimization, renewable energy scheduling, and waste-to-energy routing across all 552 hectares.",
    product: "LINTANG",
    businessImpact: "Carbon footprint -20%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "eco-9.9",
    domain: "Ecosystem",
    title: "AI Partner Ecosystem Orchestration",
    description:
      "Agentic AI managing relationships with third-party partners: OTA commission optimization, co-marketing campaign coordination, vendor performance tracking, and partnership ROI measurement.",
    product: "JALUR",
    businessImpact: "Partner revenue contribution +15%",
    isAgenticAI: true,
    phase: 5,
  },
  {
    id: "eco-9.10",
    domain: "Ecosystem",
    title: "Predictive Infrastructure Maintenance",
    description:
      "AI system monitoring roads, bridges, seawalls, utilities, and shared infrastructure across the 552-hectare complex. Predicts maintenance needs and prioritizes interventions by criticality and cost-benefit.",
    product: "LINTANG",
    businessImpact: "Infrastructure maintenance cost -25%",
    isAgenticAI: false,
    phase: 4,
  },
  {
    id: "eco-9.11",
    domain: "Ecosystem",
    title: "AI-Powered Visitor Forecasting",
    description:
      "Ensemble forecasting model predicting daily visitor volumes 1–90 days ahead. Feeds into staffing, inventory, pricing, parking, and marketing decisions across all business units with 92%+ accuracy.",
    product: "LINTANG",
    businessImpact: "Forecast accuracy 92%+",
    isAgenticAI: false,
    phase: 2,
  },
  {
    id: "eco-9.12",
    domain: "Ecosystem",
    title: "Voice of Customer AI Platform",
    description:
      "Unified feedback analysis engine aggregating data from all touchpoints (app reviews, social media, surveys, call center, in-person feedback). Identifies systemic issues and improvement priorities across all nine business domains.",
    product: "SUARA",
    businessImpact: "Customer insight depth +300%",
    isAgenticAI: false,
    phase: 3,
  },
];
