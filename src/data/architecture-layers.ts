export type ArchitectureOwner = 'Axiara' | 'Terralogiq' | 'Shared';

export interface ArchitectureComponent {
  name: string;
  description: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  owner: ArchitectureOwner;
  description: string;
  fullDescription: string;
  tags: string[];
  components: ArchitectureComponent[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "L1",
    name: "Data Ingestion",
    owner: "Terralogiq",
    description:
      "Captures data from every Ancol touchpoint — batch CDC from legacy systems and real-time Pub/Sub streaming from the new Wahana Checkpoint POS, mobile app, and Arsi contact center.",
    fullDescription:
      "The foundation layer ingests data from ten confirmed source systems via two parallel paths. Batch ingestion uses Dataflow CDC connectors to pull hourly snapshots from ancol.com ticketing, loyalty, hotel, F&B POS, OTA partners, and NPS surveys. Real-time streaming routes Pub/Sub events from the Wahana Checkpoint POS (QR/gelang taps), Arsi contact center, MoEngage engagement events, the Ancol mobile app, and Telkom movement data. Every ingested event must carry at least one identity key (phone, email, loyalty ID, gelang ID, or device ID) to enable downstream identity resolution. All events conform to a unified schema: { event_id, event_type, event_timestamp, source_system, identity_keys, payload, metadata }.",
    tags: ["Pub/Sub", "Dataflow", "Cloud Run", "CDC Connectors", "JDBC", "SFTP", "REST APIs"],
    components: [
      {
        name: "Batch Ingestion Pipeline",
        description:
          "Dataflow JDBC connectors poll ancol.com ticketing DB, loyalty DB, hotel booking system, and F&B POS on hourly schedules. OTA partner data ingested via SFTP file drops or partner APIs daily.",
      },
      {
        name: "Real-Time Streaming Pipeline",
        description:
          "Six Pub/Sub topics receive live events: ancol-wahana-events (~100K taps/day peak), ancol-contact-events (Arsi), ancol-engagement-events (MoEngage), ancol-app-events, ancol-movement-events (Telkom), ancol-wifi-events.",
      },
      {
        name: "Wahana Checkpoint POS",
        description:
          "New QR/gelang-based tap infrastructure deployed at ride and venue entry points. Each tap publishes a gelang_id → loyalty/phone linked event to Pub/Sub within milliseconds.",
      },
      {
        name: "Telkom Movement Data Integration",
        description:
          "Anonymized mobile location pings within the Ancol geofence (~200K pings/day) enriching dwell-time and catchment area intelligence via API/Pub/Sub.",
      },
    ],
  },
  {
    id: "L2",
    name: "Processing & Governance",
    owner: "Shared",
    description:
      "Every data record passes through PII protection (Cloud DLP) and format standardization before reaching the warehouse. Enforces UU PDP compliance at the pipeline level.",
    fullDescription:
      "This layer enforces two critical functions before any data touches the warehouse. PII Protection: Google Cloud DLP scans every record and maintains dual representations — a de-identified version (tokenized/masked PII) for analytics and ML training, and an operational version (AES-256 encrypted PII) accessible only to authorized activation systems like Arsi and MoEngage. Standardization: Dataflow transforms normalize phone numbers to E.164 format (resolving variants like 08123456789, +628123456789, 628123456789), dates to UTC with WIB conversion, and currencies to IDR. This standardization is critical for identity resolution — the same person can appear with different phone formats across ticketing, loyalty, and OTA systems. SENTINEL monitors compliance controls continuously and generates audit trails for UU PDP regulatory requirements.",
    tags: ["Cloud DLP", "Dataflow", "SENTINEL", "AES-256", "E.164 Normalization"],
    components: [
      {
        name: "PII Detection & Tokenization",
        description:
          "Cloud DLP scans all incoming records for name, phone, email, NIK, and location data. Tokenizes fields in the analytics stream; encrypts in the operational stream. NIK (national ID) removed from analytics entirely.",
      },
      {
        name: "Data Standardization Pipeline",
        description:
          "Dataflow templates normalize phone formats, date/time zones, currency, and encoding. Critical for phone number unification — the most common identity key across Ancol's disconnected systems.",
      },
      {
        name: "Consent & Retention Automation",
        description:
          "Tracks consent status per customer per data type. Automates data retention policies (36-month raw, 24-month standardized) and triggers right-to-deletion workflows per UU PDP Article 35.",
      },
      {
        name: "SENTINEL Compliance Monitor",
        description:
          "Real-time monitoring of all data pipeline controls. Flags unmasked PII, consent violations, and retention policy breaches. Generates audit reports for UU PDP regulatory submissions.",
      },
    ],
  },
  {
    id: "L3",
    name: "Data Storage",
    owner: "Terralogiq",
    description:
      "BigQuery three-zone architecture (Raw → Standardized → Curated) serves as the enterprise warehouse. Memorystore (Redis) provides sub-millisecond hot cache for real-time visitor profile lookups.",
    fullDescription:
      "The storage layer is built around two complementary systems. BigQuery organizes data into three zones: Raw Zone (exact ingested copies, schema-on-read, 36-month retention, audit trail), Standardized Zone (cleaned, normalized, PII de-identified, organized by source system, 24-month retention), and Curated Zone (gold-standard models: unified customer profiles, star schemas, pre-computed segments, aggregate metrics — indefinite retention). The curated zone contains the dim_customer golden record table, fact_visits, fact_transactions, fact_interactions, agg_customer_metrics, dim_segments, and bridge_customer_segments. Memorystore (Redis) caches the unified profile for all visitors active in the last 30 days, enabling sub-millisecond lookups when the real-time event processor needs to evaluate triggers. The cache stores current segment memberships, active propensity scores, last 10 events, and pending triggered actions per visitor.",
    tags: ["BigQuery", "Memorystore (Redis)", "Dataform", "BigQuery ML", "Cloud Storage"],
    components: [
      {
        name: "BigQuery Raw Zone (ancol_raw_*)",
        description:
          "Immutable exact copies of all ingested data. Schema-on-read for flexibility. Serves as the reprocessing safety net and regulatory audit trail. 36-month minimum retention per UU PDP.",
      },
      {
        name: "BigQuery Standardized Zone (ancol_std_*)",
        description:
          "Cleaned, schema-compliant data organized by source system. PII de-identified for analytics. Used by data scientists for exploration and model training without touching raw PII.",
      },
      {
        name: "BigQuery Curated Zone (ancol_curated_*)",
        description:
          "Gold-standard data models: dim_customer (unified golden record), fact_visits, fact_transactions, fact_interactions, agg_customer_metrics, dim_segments, bridge_customer_segments. Feeds all analytics and AI layers.",
      },
      {
        name: "Memorystore (Redis) Hot Cache",
        description:
          "Stores latest unified profiles for ~50K recently active visitors. Populated by Cloud Function listening to BigQuery change streams. Enables sub-millisecond profile lookups for real-time event processing and in-park personalization triggers.",
      },
    ],
  },
  {
    id: "L4",
    name: "CDP Core Engine",
    owner: "Shared",
    description:
      "Four sub-engines transform raw data into actionable customer intelligence: Identity Resolution, Segmentation, Event Stream Processor, and Customer DNA Profiler. Custom-built on GCP for Ancol's unique integrated ecosystem model.",
    fullDescription:
      "The brain of the CDP, custom-built rather than packaged, because Ancol's integrated entertainment-property-hospitality model is too unique for off-the-shelf solutions. Identity Resolution operates in two modes: batch (nightly full graph rebuild via BigQuery SQL + Dataform, processing the complete identity graph) and real-time (Cloud Run microservice doing incremental matching per incoming event). Three matching phases: deterministic (exact email/phone/loyalty ID match, resolves 60-70%), probabilistic (fuzzy matching on weaker signals, +15-20%), and graph-based (transitive closure — if A=B and B=C, then A=C). The Segmentation Engine produces four segment types: rule-based (SQL conditions, hourly), ML-driven (Vertex AI outputs, daily), real-time (event-triggered, per event), and Customer DNA behavioral profiles (weekly). The Event Stream Processor (Dataflow Streaming) evaluates trigger rules and fires actions: F&B recommendations, service recovery, OTA-to-direct onboarding, churn re-engagement, property cross-sell, and loyalty reminders. Target latency: <60 seconds from gelang tap to personalized WhatsApp message.",
    tags: ["BigQuery ML", "Cloud Run", "Dataform", "Dataflow Streaming", "Python", "dbt"],
    components: [
      {
        name: "Identity Resolution Engine",
        description:
          "Three-phase matching: deterministic (email/phone/loyalty ID exact match), probabilistic (fuzzy name + visit date + device fingerprint), and graph-based (transitive closure). Assigns persistent ancol_customer_id as universal join key across all systems.",
      },
      {
        name: "Segmentation Engine",
        description:
          "Produces rule-based segments (SQL, hourly), ML-driven clusters (Vertex AI, daily), real-time segments (per event, e.g. 'Currently In Park'), and Customer DNA behavioral profiles (weekly multi-dimensional lifestyle scores). Syncs to MoEngage and Redis.",
      },
      {
        name: "Event Stream Processor",
        description:
          "Dataflow Streaming pipeline evaluating six trigger rules per incoming event: F&B recommendation, service recovery, OTA-to-direct onboarding, churn re-engagement, property cross-sell, and expiring loyalty points. Target <60s from event to action.",
      },
      {
        name: "Customer DNA Profiler",
        description:
          "Builds continuous multi-dimensional lifestyle scores: Thrill Preference (0-1), Spending Propensity (0-1), Group Orientation (0-1), Visit Cadence (pattern vector), Channel Preference (multi-label), and Property Interest (0-1). Updated weekly from accumulated behavioral signals.",
      },
    ],
  },
  {
    id: "L5",
    name: "AI/ML Intelligence",
    owner: "Axiara",
    description:
      "Vertex AI-hosted model families for Visitor Intelligence, Revenue Intelligence, Experience Intelligence, and Operational Intelligence. All models governed by SENTINEL for bias monitoring, drift detection, and kill-switch control.",
    fullDescription:
      "Entirely within Axiara's domain, this layer runs on Vertex AI and consumes data from BigQuery's curated zone and CDP Core unified profiles. Eight production model families are deployed: Footfall Forecasting (1-90 day predictions for staffing and inventory), Return-Visit Propensity (30/60/90-day return probability), Churn Prediction (weekly batch, churn probability 0-1), Dynamic Pricing (nightly batch + real-time adjustment, target +12-18% revenue per visitor), Cross-Sell Propensity for Property (weekly batch, qualified leads +200%), Real-Time Recommendations (Vertex AI Endpoint, <1s latency, top 3 next actions per visitor), Sentiment Analysis (per interaction, -1 to +1 score with topic classification), and F&B Demand Forecast (hourly demand per outlet, food waste -30%). All models are registered in SENTINEL's model registry with bias audits, drift monitoring, explainability reports, and kill-switch controls per model. High-impact decisions (pricing, service recovery) maintain human-in-the-loop gates.",
    tags: ["Vertex AI", "Vertex AI Pipelines", "Vertex AI Endpoints", "Gemini", "scikit-learn", "TensorFlow"],
    components: [
      {
        name: "Visitor Intelligence Models",
        description:
          "Footfall Forecasting (1-90 days ahead, batch daily), Return-Visit Propensity (weekly batch), and Churn Prediction (weekly batch, churn_propensity_score 0-1). Feeds staffing optimization, inventory planning, and retention campaigns.",
      },
      {
        name: "Revenue Intelligence Models",
        description:
          "Dynamic Pricing model (nightly batch + real-time adjustment based on demand, weather, capacity, competitors) targeting +12-18% revenue per visitor. Cross-Sell Propensity for Property (weekly) generating qualified buyer leads from recreation visitor behavior.",
      },
      {
        name: "Real-Time Recommendation Engine",
        description:
          "Vertex AI Endpoint serving <1s inference: top 3 next-action recommendations (ride, restaurant, show) based on current location, weather, crowd density, past preferences, and group composition. Powers in-park personalization and contextual notifications.",
      },
      {
        name: "Operational Intelligence Models",
        description:
          "Sentiment Analysis per interaction (NPS verbatims, contact center transcripts, social mentions), F&B Demand Forecast per outlet per hour, and Ride Maintenance anomaly detection from IoT sensor streams. All predictions written to BigQuery for downstream activation.",
      },
    ],
  },
  {
    id: "L6",
    name: "Activation & Orchestration",
    owner: "Shared",
    description:
      "Three platforms — MoEngage (planned campaigns), Arsi (real-time triggered communications & contact center), and a Custom Orchestrator (channel conflict resolution) — convert CDP intelligence into customer actions.",
    fullDescription:
      "The activation layer is where intelligence becomes action. MoEngage handles planned marketing campaigns, journey orchestration, web/app personalization, and scheduled outreach (email, push, in-app, SMS). It receives bidirectional sync from the CDP: outbound segments/propensity scores enable intelligent targeting, while inbound engagement events (email opens, push clicks, web sessions) enrich the unified profile. Arsi serves as both the inbound contact center (WhatsApp, voice, chat, social) and the outbound real-time triggered communication engine. CDP integration provides Arsi agents with a real-time customer context panel showing visit history, loyalty tier, recent transactions, active complaints, sentiment trend, and recommended actions. A Custom Orchestrator (Cloud Functions) sits between CDP triggers and both platforms, enforcing channel conflict resolution (preventing simultaneous WhatsApp + push + email for the same trigger), message frequency capping, and A/B test routing. Target: gelang tap → personalized WhatsApp message in <60 seconds.",
    tags: ["MoEngage", "Arsi", "Cloud Functions", "MoEngage API", "Arsi API", "WebRTC", "WhatsApp Business API"],
    components: [
      {
        name: "MoEngage Integration (Bidirectional)",
        description:
          "Outbound: CDP syncs segments, attributes, and propensity scores to MoEngage user profiles via Data API. Inbound: MoEngage webhooks send engagement events back to Pub/Sub to enrich the unified profile. Transforms MoEngage from an isolated tool into intelligence-enriched activation.",
      },
      {
        name: "Arsi Contact Center Integration",
        description:
          "Real-time customer context panel for agents: unified profile with visit history, loyalty tier, sentiment trend, and recommended next actions displayed at call/chat initiation. Outbound: Event Stream Processor triggers Arsi API to send WhatsApp messages with personalized content from DNA profile.",
      },
      {
        name: "Custom Orchestrator (Cloud Functions)",
        description:
          "Channel conflict resolution, message prioritization, frequency capping, and A/B test routing. Prevents simultaneous multi-channel triggers for the same event. Routes to MoEngage (campaigns) or Arsi (real-time triggers) based on customer channel preferences from DNA profile.",
      },
      {
        name: "Reverse ETL & Audience Sync",
        description:
          "Pushes CDP-computed segments to Meta Custom Audiences, Google Ads Customer Match, and CRM platforms. Ensures consistent targeting across paid and owned channels with unified audience definitions from the CDP segmentation engine.",
      },
    ],
  },
  {
    id: "L7",
    name: "Analytics & Visualization",
    owner: "Terralogiq",
    description:
      "Looker connects to BigQuery's curated zone serving six dashboard families: Executive Command Center, CX Operations, Voice of Customer, Marketing Performance, Visitor Intelligence, and Property Cross-Sell Pipeline.",
    fullDescription:
      "Looker (connected directly to BigQuery's curated zone) serves as the analytics and reporting layer. Six dashboard families are scoped from the discovery meeting requirements: (1) Executive Command Center — daily visitors, revenue by segment, YoY trends, loyalty health, AI model ROI, property lead pipeline — daily refresh, for CEO/Directors/Board. (2) CX Operations Dashboard — real-time crowd density by zone, ride wait times, active service recovery cases, live NPS/CSAT, F&B outlet demand — 5-minute refresh, for VP CX/Operations. (3) Voice of Customer — NPS trend, CSAT by touchpoint, sentiment analysis results, verbatim topic clusters, complaint resolution rates — daily. (4) Marketing Performance — campaign ROI, segment performance, channel attribution, OTA vs. direct conversion, loyalty metrics — daily. (5) Visitor Intelligence — footfall forecast accuracy, segmentation heatmap, Customer DNA distribution, churn risk — weekly. (6) Property Cross-Sell Pipeline — qualified lead count, score distribution, conversion funnel, property interest by segment — weekly.",
    tags: ["Looker", "Looker Studio", "BigQuery BI Engine", "SQL", "LookML"],
    components: [
      {
        name: "Executive Command Center",
        description:
          "Board-level KPI dashboard: daily visitors, revenue by segment (recreation/property/hospitality/F&B/MICE), YoY trends, loyalty member health, AI model ROI metrics, property lead pipeline status. Daily refresh.",
      },
      {
        name: "CX Operations Dashboard",
        description:
          "Real-time operational visibility: crowd density heatmap by zone, live ride wait times, active service recovery cases, NPS/CSAT live scores, F&B outlet demand vs. capacity. 5-minute data refresh.",
      },
      {
        name: "Voice of Customer (VoC) Analytics",
        description:
          "Unified feedback analysis: NPS trend by touchpoint, sentiment score distribution, verbatim topic clusters from NLP analysis, complaint volume and resolution rates by category and venue. Daily refresh.",
      },
      {
        name: "Visitor Intelligence & Marketing Performance",
        description:
          "Footfall forecast accuracy tracking, Customer DNA segment distribution, churn risk heatmap. Campaign ROI by channel, multi-touch attribution results, OTA vs. direct booking share, loyalty program ARPU trend.",
      },
    ],
  },
  {
    id: "L8",
    name: "Governance, Security & Compliance",
    owner: "Axiara",
    description:
      "SENTINEL framework permeates every layer — not a bolt-on. Covers AI ethics, UU PDP compliance, role-based data access, model kill-switches, audit logging, and anti-fraud controls for BUMD and OJK requirements.",
    fullDescription:
      "Governance is an architectural principle embedded in every layer, not added at the end. Axiara's SENTINEL framework provides the governance infrastructure with four domains: (1) Personal Data Protection under UU PDP No. 27/2022 — Cloud DLP-enforced PII controls, consent management system, automated retention policies, right-to-deletion workflow, breach notification procedure. (2) AI Ethics & Governance under Perpres AI — model registry with bias audits, drift monitoring, explainability reports, kill-switch per model, human-in-the-loop gates for high-impact decisions (pricing, service recovery). (3) Data Access Control under OJK/BUMD regulations — IAM with role-based access, column-level BigQuery security, audit logging for all data access events, VPC Service Controls. (4) BUMD Compliance — procurement AI governance, financial model transparency, Board-ready audit trails, and real-time monitoring of regulatory changes (OJK, BUMD governance, environmental, labor, tax, tourism sector). SENTINEL operates a continuous compliance dashboard flagging violations across all eight layers in real-time.",
    tags: ["SENTINEL", "Cloud IAM", "Cloud Audit Logs", "VPC Service Controls", "Cloud DLP", "BigQuery Column Security"],
    components: [
      {
        name: "SENTINEL AI Governance Platform",
        description:
          "Monitors all deployed Vertex AI models for bias, accuracy drift, and performance degradation. Model registry with bias audit reports, explainability outputs, and per-model kill-switch controls. Human-in-the-loop gates for dynamic pricing and service recovery decisions.",
      },
      {
        name: "UU PDP Compliance Engine",
        description:
          "Automated consent management, data minimization enforcement, retention policy execution, right-to-deletion workflow, and breach detection. Generates UU PDP compliance reports. Monitors data flows across all 8 layers for unauthorized PII exposure.",
      },
      {
        name: "Data Access Control & Audit",
        description:
          "IAM role-based access with column-level security on BigQuery sensitive fields. VPC Service Controls preventing data exfiltration. Cloud Audit Logs capturing every data access event. SENTINEL anomaly detection flags unusual access patterns.",
      },
      {
        name: "Regulatory Monitoring Agent",
        description:
          "Continuous AI agent tracking regulatory changes: OJK capital market rules, BUMD governance requirements, UU PDP updates, environmental regulations, labor laws, and tourism sector policies. Alerts compliance team within 48 hours of material regulatory changes.",
      },
    ],
  },
];
