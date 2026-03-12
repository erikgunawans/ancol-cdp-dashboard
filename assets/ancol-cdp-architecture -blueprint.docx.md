  
**AXIARA.AI**

*End-to-End AI Transformation Partner*

**Customer Data Platform**

**Technical Architecture Blueprint**

PT Pembangunan Jaya Ancol Tbk (Taman Impian Jaya Ancol)

Version 1.0  |  March 2026  |  CONFIDENTIAL

Prepared jointly by Axiara.AI and PT Terralogiq Integrasi Solusi

# **Table of Contents**

# **1\. Executive Summary**

This document presents the technical architecture blueprint for the Ancol 360° Customer Data Platform (CDP), designed to transform PT Pembangunan Jaya Ancol Tbk from a collection of siloed entertainment venues into a data-connected, AI-powered integrated destination. The CDP will unify customer data from ticketing, loyalty, F\&B, hospitality, property, MICE, contact center, and on-site behavioral tracking into a single customer identity graph, enabling hyper-personalization, predictive intelligence, and omnichannel orchestration across Ancol's entire ecosystem.

The architecture is built on Google Cloud Platform (GCP) with BigQuery as the enterprise data warehouse, Vertex AI as the machine learning platform, and a custom-built CDP core engine that provides real-time identity resolution, behavioral segmentation, and event-driven activation. The system integrates with MoEngage (existing Customer Engagement Platform), Arsi (new omnichannel contact center), and Telkom movement data (third-party enrichment) while maintaining full compliance with Indonesia's UU PDP (Personal Data Protection Law) through Axiara.AI's SENTINEL governance framework.

| DESIGN PHILOSOPHY Identity-Resolution-First: Every architectural decision flows from the principle that no AI model, personalization engine, or analytics dashboard produces meaningful results until fragmented customer identities are resolved into a unified profile. The CDP is designed around the customer identity graph as the foundational layer, with all intelligence and activation capabilities building upward from it. |
| :---- |

## **1.1 Partner Responsibility Matrix**

The CDP implementation involves three technology partners, each with clearly defined domains of responsibility.

| Partner | Domain | Key Responsibilities | Key Technologies |
| :---- | :---- | :---- | :---- |
| **Axiara.AI** | AI/ML & Governance | All AI use cases, model training, SENTINEL governance, AI ethics, UU PDP compliance framework, system architecture lead | Vertex AI, SENTINEL, Cloud Functions |
| **Terralogiq** | GCP Infrastructure & CDP Core | Data ingestion pipelines, BigQuery warehouse, identity resolution engine, Looker dashboards, GCP infrastructure management | BigQuery, Dataflow, Cloud Run, Looker, Cloud DLP |
| **Arsi** | Omnichannel Contact Center | WhatsApp, voice, chat, email, social media contact center, campaign outreach, quality management, smart IVR | Arsi platform (SIP, WebRTC, chatbot, STT/TTS) |
| **MoEngage (existing)** | Customer Engagement | Web/app personalization, push notifications, email marketing, journey builder, in-app messaging | MoEngage SaaS platform |
| **Telkom (data partner)** | Location Enrichment | Anonymized mobile movement data for visitor flow analysis, catchment area intelligence, dwell-time enrichment | API/Pub/Sub integration |

# **2\. Current State Analysis**

## **2.1 Confirmed Pain Points (from Feb 9, 2026 Discovery Meeting)**

The discovery meeting between Terralogiq, Axiara.AI, and Ancol's VP Customer Experience & Data Analytics team confirmed the following critical pain points that the CDP architecture must address.

| \# | Pain Point | Business Impact | CDP Solution Layer |
| :---- | :---- | :---- | :---- |
| **1** | Data visibility ends at the gate — no insight into visitor activity after ticket purchase | Cannot personalize in-park experience, cannot understand visitor preferences, cannot optimize venue operations | Layer 4: On-Site Tracking (Wahana Checkpoint POS) \+ Identity Resolution |
| **2** | Ticket purchase data only captured from ancol.com — OTA and walk-in data disconnected | Incomplete customer view, cannot convert OTA buyers to direct/loyalty, lost cross-sell opportunities | Layer 1: Multi-source Ingestion (OTA API, Walk-in POS, ancol.com) |
| **3** | Restaurant, hotel, wahana, and other venue data not integrated | No cross-venue behavioral intelligence, cannot build ecosystem value bundles, no unified spend analysis | Layer 4: CDP Core Identity Resolution \+ Cross-venue Event Stitching |
| **4** | Difficulty collecting in-park purchase data — receipt scanning for lucky draws proved ineffective | Cannot compute customer lifetime value, cannot segment by actual spend behavior, promo ROI unknown | Layer 1: New Custom POS at Wahana Checkpoints \+ Gelang/QR-based tracking |
| **5** | Cannot determine effective promos and product bundles due to lack of purchase data | Static pricing, generic promotions, revenue per visitor not optimized | Layer 5: AI Pricing Intelligence \+ Segmentation-based Campaign Engine |
| **6** | Contact center not connected to CDP — agents lack customer context | Poor service recovery, repeated issue escalation, no sentiment-to-action workflow | Layer 6: Arsi Integration with Unified Customer Profile |
| **7** | MoEngage operates in isolation — not enriched by behavioral or transactional data | Generic web personalization, low conversion on campaigns, no behavioral triggers | Layer 6: MoEngage API Sync with CDP Segments \+ Real-time Signals |

## **2.2 Existing Technology Landscape**

Based on the discovery meeting and presentation materials, Ancol's current technology landscape includes the following confirmed systems. Note that a detailed system inventory and API assessment will be conducted during the Phase 1 Discover Sprint and after NDA execution.

| System | Status | Data Available | Integration Approach |
| :---- | :---- | :---- | :---- |
| **ancol.com (Ticketing)** | Active | Ticket purchases, customer registration, email | API / Database CDC |
| **Loyalty Program** | Active | Member profiles, points, tier status, transaction history | API / Database CDC |
| **MoEngage (CEP)** | Active | Web behavior, app events, campaign interactions, push/email engagement | MoEngage API (bidirectional) |
| **Contact Center (existing)** | Active, being replaced by Arsi | Call logs, ticket records, complaint history | Migration to Arsi, then Arsi API |
| **F\&B POS Systems** | Active (multiple, siloed) | Transaction records per outlet (limited) | POS API / Database CDC |
| **Hotel/Resort Booking** | Active (Putri Duyung) | Reservations, check-in/out, guest profiles | API / Database CDC |
| **OTA Partners** | Active (Traveloka, Tiket.com, etc.) | Booking records, customer partial data | OTA Partner APIs / File exports |
| **Wi-Fi Connect** | Under evaluation | Device MAC, session data, dwell time | Captive portal API |
| **New Wahana Checkpoint POS** | To be deployed | QR/gelang tap events, ride/venue check-ins | Real-time Pub/Sub events |

# **3\. Architecture Overview**

## **3.1 Eight-Layer Architecture**

The Ancol 360° CDP is organized into eight distinct layers, each with a clear responsibility boundary. The layers are designed to be independently deployable and scalable, enabling phased implementation without requiring a full system build-out before value delivery begins.

| Layer | Name | Primary Owner | Key Technology | Purpose |
| :---- | :---- | :---- | :---- | :---- |
| **L1** | Data Ingestion | Terralogiq | Pub/Sub, Dataflow, Cloud Run, CDC connectors | Capture data from all sources via batch and real-time pipelines |
| **L2** | Processing & Governance | Terralogiq \+ Axiara | Cloud DLP, Dataflow, SENTINEL | PII protection, data standardization, UU PDP compliance |
| **L3** | Data Storage | Terralogiq | BigQuery (3-zone), Memorystore (Redis) | Enterprise warehouse \+ real-time profile cache |
| **L4** | CDP Core Engine | Terralogiq \+ Axiara | BigQuery ML, Cloud Run, Dataform | Identity resolution, segmentation, event processing, Customer DNA |
| **L5** | AI/ML Intelligence | Axiara | Vertex AI, Vertex AI Pipelines | Predictive models, recommendations, pricing, forecasting |
| **L6** | Activation & Orchestration | Axiara \+ Arsi | MoEngage, Arsi, Cloud Functions | Marketing automation, contact center, omnichannel triggers |
| **L7** | Analytics & Visualization | Terralogiq | Looker, Looker Studio | Dashboards, reporting, VoC analytics, executive insights |
| **L8** | Governance & Security | Axiara | SENTINEL, IAM, Cloud Audit Logs | AI governance, compliance monitoring, access control, audit |

## **3.2 Dual-Speed Processing Architecture**

The Ancol CDP operates on a dual-speed processing model, running batch and real-time pipelines in parallel. This is a critical design decision driven by the Budi visitor journey requirement: when a visitor taps their gelang at a wahana checkpoint, the system must evaluate their behavioral context and trigger a personalized offer within 60 seconds. Batch processing alone cannot achieve this latency. Simultaneously, complex analytics like weekly segmentation refreshes, monthly churn scoring, and quarterly CLV recalculation require the computational power of batch processing on BigQuery.

| Dimension | Batch Path | Real-Time Path |
| :---- | :---- | :---- |
| **Latency** | Minutes to hours | Sub-60 seconds (target: \<30s) |
| **Processing** | Dataflow Batch \+ BigQuery Scheduled Queries | Pub/Sub → Dataflow Streaming → Cloud Run |
| **Storage** | BigQuery (all 3 zones) | Memorystore Redis (hot profile cache) |
| **Identity Resolution** | Full graph rebuild (nightly) | Incremental match (per-event, sub-second) |
| **Segmentation** | Full segment recomputation (hourly/daily) | Real-time segment membership check (per-event) |
| **AI Scoring** | Batch predictions written to BigQuery | Vertex AI Endpoint inference (per-event) |
| **Activation** | Scheduled campaigns via MoEngage | Triggered messages via Arsi \+ Cloud Functions |
| **Use Cases** | CLV calculation, churn scoring, monthly reports, historical analytics | In-park notifications, service recovery, real-time recommendations, dynamic pricing |

# **4\. Layer-by-Layer Detailed Design**

## **4.1 Layer 1: Data Ingestion**

The data ingestion layer captures data from every Ancol touchpoint and routes it into GCP through two parallel paths: batch ingestion for historical and periodic data, and real-time streaming for event-driven data. Every ingested event must carry at least one identity key (phone number, email, loyalty ID, gelang ID, or device ID) to enable downstream identity resolution.

### **4.1.1 Batch Ingestion Pipeline**

Batch ingestion handles existing databases and systems that do not support real-time event streaming. It uses Change Data Capture (CDC) to detect new and modified records in source databases and ingests them into BigQuery's raw zone on configurable schedules (hourly for high-priority sources, nightly for lower-priority sources).

| Source System | Ingestion Method | Frequency | Identity Key(s) | Data Volume Estimate |
| :---- | :---- | :---- | :---- | :---- |
| **ancol.com Ticketing DB** | CDC via Dataflow (JDBC connector) | Hourly | Email, phone, loyalty ID | \~30K transactions/day (peak season) |
| **Loyalty Program DB** | CDC via Dataflow | Hourly | Loyalty ID, email, phone | \~50K active members |
| **Hotel/Resort Booking System** | API polling or CDC | Hourly | Email, phone, booking ID | \~200 bookings/day |
| **F\&B POS Systems (existing)** | File export or API | Nightly | POS transaction ID (anonymous until linked) | \~10K transactions/day |
| **OTA Partner Data** | Partner API / SFTP file drops | Daily | Partial: name, email (depends on OTA) | \~5K bookings/day (varies) |
| **NPS/CSAT Survey Results** | API or file import | Daily | Email, phone, loyalty ID | \~500 responses/day |
| **Historical Data (backfill)** | One-time bulk load | Once | All available keys | 3–5 years of history |

### **4.1.2 Real-Time Streaming Pipeline**

Real-time streaming handles events that require sub-minute processing for in-park personalization and triggered actions. All real-time events are published to Google Cloud Pub/Sub topics, providing decoupled, scalable, and reliable event delivery.

| Event Source | Pub/Sub Topic | Event Type | Identity Key(s) | Expected Volume |
| :---- | :---- | :---- | :---- | :---- |
| **Wahana Checkpoint POS (new)** | ancol-wahana-events | QR/gelang tap at ride/venue entry | Gelang ID → linked to loyalty/phone | \~100K taps/day (peak) |
| **Arsi Contact Center** | ancol-contact-events | WhatsApp message, call, chat interaction | Phone number, email | \~2K interactions/day |
| **MoEngage Events** | ancol-engagement-events | App open, push click, web page view, campaign interaction | MoEngage user ID → linked to email | \~50K events/day |
| **Ancol Mobile App** | ancol-app-events | In-app actions, location signals, feature usage | App user ID, device ID | \~30K events/day |
| **Telkom Movement Data** | ancol-movement-events | Anonymized location pings within Ancol geofence | Anonymized device ID | \~200K pings/day |
| **Wi-Fi Connect (if enabled)** | ancol-wifi-events | Device connection, session start/end, dwell time | MAC address → linked via captive portal | \~50K sessions/day |

| DESIGN DECISION: Event Schema Standard All events across all sources conform to a unified event schema: { event\_id, event\_type, event\_timestamp, source\_system, identity\_keys: { primary\_key, secondary\_keys\[\] }, payload: { ... }, metadata: { ingestion\_timestamp, schema\_version } }. This standardization at the edge (before ingestion) dramatically simplifies downstream processing and ensures the identity resolution engine can operate consistently across all data sources. |
| :---- |

## **4.2 Layer 2: Processing & Governance**

Every data record passes through the Processing & Governance layer before reaching the warehouse. This layer enforces two critical functions: PII protection (for UU PDP compliance) and data standardization (for consistent downstream processing).

### **4.2.1 PII Protection with Cloud DLP**

Google Cloud Data Loss Prevention (DLP) scans every incoming record for personally identifiable information. The system maintains two parallel data representations: a de-identified version for analytics and ML training (where PII is tokenized or masked), and an operational version where PII is encrypted but accessible to authorized systems (like the activation layer that needs real phone numbers to send WhatsApp messages). This dual-representation model ensures that data scientists and AI models never touch raw PII, while operational systems can still reach the customer.

| PII Field | Analytics Layer Treatment | Operational Layer Treatment | UU PDP Basis |
| :---- | :---- | :---- | :---- |
| **Name (nama)** | Tokenized (hash) | Encrypted (AES-256) | Consent at registration |
| **Phone Number** | Tokenized (hash) | Encrypted, accessible by Arsi/MoEngage | Consent at registration |
| **Email Address** | Tokenized (hash) | Encrypted, accessible by MoEngage | Consent at registration |
| **NIK (ID Number)** | Removed entirely | Encrypted, restricted access | Explicit consent required |
| **Location Data (GPS)** | Aggregated to zone level | Retained for session duration only | Legitimate interest \+ consent |
| **Device Identifiers** | Pseudonymized | Pseudonymized | Legitimate interest |

### **4.2.2 Data Standardization Pipeline**

The standardization pipeline (implemented as Dataflow templates or Cloud Run services) normalizes data formats across all sources to enable consistent identity matching and analytics. Key transformations include phone number normalization to E.164 format (critical for identity resolution since the same person may appear as 08123456789, \+628123456789, or 628123456789 across different systems), date/time normalization to UTC with WIB conversion, and currency standardization to IDR.

## **4.3 Layer 3: Data Storage**

The storage layer uses BigQuery as the central data warehouse organized into three zones, supplemented by Memorystore (Redis) as a hot cache for real-time customer profile access.

### **4.3.1 BigQuery Three-Zone Architecture**

| Zone | BigQuery Dataset | Purpose | Retention | Access |
| :---- | :---- | :---- | :---- | :---- |
| **Raw Zone** | ancol\_raw\_\* | Exact copy of ingested data, schema-on-read. Serves as audit trail and reprocessing safety net. | 36 months minimum (UU PDP \+ audit) | Data engineering only |
| **Standardized Zone** | ancol\_std\_\* | Cleaned, normalized, schema-compliant data organized by source system. PII de-identified for analytics. | 24 months | Data engineering \+ Data science |
| **Curated Zone** | ancol\_curated\_\* | Modeled data: unified customer profile table, star schemas for analytics, pre-computed segments, aggregate metrics. | Indefinite (derived data) | All authorized users \+ Looker |

### **4.3.2 Key Curated Zone Tables**

The curated zone contains the gold-standard data models that feed all analytics, AI, and activation layers.

| Table | Description | Update Frequency | Key Fields |
| :---- | :---- | :---- | :---- |
| **dim\_customer** | Unified customer profile (golden record) with all resolved identities, demographics, and preference attributes | Real-time (incremental) \+ nightly (full rebuild) | ancol\_customer\_id, identity\_graph, first\_visit\_date, ltv\_score, current\_segment, customer\_dna\_profile |
| **fact\_visits** | Every gate entry, wahana tap, venue visit with timestamps and duration | Real-time via streaming | visit\_id, ancol\_customer\_id, venue\_id, entry\_time, exit\_time, visit\_type |
| **fact\_transactions** | All purchases across ticketing, F\&B, hotel, merchandise with line-item detail | Hourly (batch) \+ real-time (streaming POS) | transaction\_id, ancol\_customer\_id, venue\_id, items\[\], total\_amount, payment\_method |
| **fact\_interactions** | All contact center, chat, email, social interactions with sentiment scores | Real-time via Arsi integration | interaction\_id, ancol\_customer\_id, channel, sentiment\_score, resolution\_status |
| **agg\_customer\_metrics** | Pre-computed customer metrics: visit frequency, total spend, avg spend per visit, recency, NPS score | Nightly | ancol\_customer\_id, visit\_count\_30d/90d/365d, total\_spend\_30d/90d/365d, days\_since\_last\_visit, avg\_nps |
| **dim\_segments** | Segment definitions and current membership | Hourly (rule-based) \+ daily (ML-based) | segment\_id, segment\_name, segment\_type, member\_count, criteria |
| **bridge\_customer\_segments** | Many-to-many relationship between customers and segments | Hourly | ancol\_customer\_id, segment\_id, membership\_score, entry\_date |

### **4.3.3 Memorystore (Redis) Hot Cache**

The Redis hot cache stores the latest unified profile for all recently active visitors (those who have visited Ancol or interacted with any touchpoint in the last 30 days). This enables sub-millisecond profile lookups when the real-time event stream processor needs to evaluate triggers and generate recommendations. The cache is populated by a Cloud Function that listens to BigQuery change streams on the dim\_customer table and writes updated profiles to Redis. The cached profile includes the customer's current segment memberships, active propensity scores, last 10 events, and any pending triggered actions.

## **4.4 Layer 4: CDP Core Engine**

The CDP Core Engine is the brain of the system. It consists of four sub-engines that collectively transform raw data into actionable customer intelligence. This layer is custom-built on GCP rather than using a packaged CDP solution, for three reasons: Ancol's integrated entertainment-property-hospitality model is too unique for off-the-shelf CDPs, the GCP-native approach gives the implementation team full control, and it avoids per-profile licensing costs that would be prohibitive at 10 million annual visitors.

### **4.4.1 Identity Resolution Engine**

The Identity Resolution Engine is the most critical component of the entire CDP. It merges fragmented customer identities from multiple source systems into a single golden record (the dim\_customer table), assigning each unified profile a persistent ancol\_customer\_id that becomes the universal join key across all systems.

**Deterministic Matching (Phase 1):** Exact match on strong identifiers. If two records share the same email address, phone number, or loyalty ID, they are the same person. This resolves approximately 60-70% of identity matches.

**Probabilistic Matching (Phase 2):** Fuzzy match on weaker signals for records that could not be resolved deterministically. Uses combinations of partial name similarity \+ same visit date, device fingerprint \+ behavioral pattern similarity, and payment method patterns. This resolves an additional 15-20% of matches.

**Graph-Based Resolution (Phase 3):** Transitive closure on the identity graph. If Record A matches Record B (via email), and Record B matches Record C (via phone number), then A, B, and C are the same person. This catches indirect connections missed by direct matching.

| IMPLEMENTATION NOTE The identity resolution runs in two modes. Batch mode performs a full graph rebuild nightly using BigQuery SQL \+ Dataform transformations, processing the entire identity graph and resolving all new and modified records. Real-time mode runs as a Cloud Run microservice that performs incremental matching when a new event arrives: it looks up existing identities by the event's identity keys, and if a match is found, links the event to the existing profile. If no match is found, it creates a new tentative profile that will be resolved in the next batch run. |
| :---- |

### **4.4.2 Segmentation Engine**

The Segmentation Engine supports three types of segments, all stored in the dim\_segments and bridge\_customer\_segments tables and synced to MoEngage and the Redis hot cache for activation.

| Segment Type | Definition Method | Update Frequency | Example |
| :---- | :---- | :---- | :---- |
| **Rule-Based** | SQL conditions on customer attributes and metrics | Hourly (scheduled query) | "Dufan Loyalists": visited Dufan 3+ times in 90 days AND loyalty tier \= Gold |
| **ML-Driven** | Vertex AI model output clusters/scores | Daily (batch prediction) | "High Churn Risk": churn\_propensity\_score \> 0.7 AND days\_since\_last\_visit \> 60 |
| **Real-Time** | Event-triggered segment entry/exit evaluated per incoming event | Per event (streaming) | "Currently In Park": gate\_entry event received AND no gate\_exit event within session |
| **Behavioral (Customer DNA)** | Multi-dimensional lifestyle profiling from accumulated behavioral signals | Weekly | "Thrill-Seeking Family": high-thrill ride preference \+ group\_size \> 3 \+ weekend visitor pattern |

### **4.4.3 Event Stream Processor**

The Event Stream Processor is a Dataflow Streaming pipeline that evaluates incoming real-time events against a configurable set of trigger rules. When a trigger fires, it invokes the appropriate action: sending a personalized notification via Arsi/MoEngage, updating a customer score, or escalating to a human agent. This is the engine that powers the real-time Budi journey described in the sequence diagram.

| Trigger Rule | Condition | Action | Channel |
| :---- | :---- | :---- | :---- |
| **F\&B Recommendation** | Visitor in outdoor zone \> 2 hours AND no F\&B transaction AND temperature \> 30°C | Generate personalized restaurant recommendation with discount coupon | WhatsApp via Arsi |
| **Service Recovery** | NPS score \< 6 submitted OR negative sentiment detected in contact center | Create service recovery case, send apology \+ compensation offer | WhatsApp \+ Arsi agent escalation |
| **OTA-to-Direct Onboarding** | First visit detected AND ticket purchased via OTA (not ancol.com) | Send loyalty program invitation with first-visit bonus | Email via MoEngage |
| **Churn Re-engagement** | Days since last visit \> 90 AND customer\_dna \= high-value AND no active campaign | Trigger re-engagement journey with personalized offer | Push \+ Email via MoEngage |
| **Cross-Sell Property** | Visit count \> 10 in 12 months AND avg spend \> IDR 500K/visit AND age 30-50 | Add to property prospect list, trigger awareness content journey | Email \+ WhatsApp via MoEngage \+ Arsi |
| **Expiring Points Reminder** | Loyalty points expiring within 14 days AND balance \> 1000 points | Send reminder with redemption recommendations | Push \+ WhatsApp via MoEngage \+ Arsi |

### **4.4.4 Customer DNA Profiler**

The Customer DNA Profiler builds multi-dimensional lifestyle profiles for each customer based on accumulated behavioral signals. Unlike simple segments (which are binary: in or out), DNA profiles are continuous scores across multiple dimensions that capture the nuanced character of each customer. These profiles feed both the AI models (as feature inputs) and the activation layer (as personalization parameters).

| DNA Dimension | Signal Sources | Score Range | Example Interpretation |
| :---- | :---- | :---- | :---- |
| **Thrill Preference** | Ride selection patterns (roller coasters vs. gentle rides), wahana tap sequence | 0.0 (relaxation) to 1.0 (extreme thrill) | 0.85 \= strong preference for high-adrenaline rides |
| **Spending Propensity** | Total spend per visit, F\&B average order value, merchandise purchases, upgrade frequency | 0.0 (budget) to 1.0 (premium) | 0.72 \= willing to pay premium for enhanced experiences |
| **Group Orientation** | Group size, child ticket inclusion, family package purchases | 0.0 (solo/couple) to 1.0 (large family/group) | 0.90 \= almost always visits with family group |
| **Visit Cadence** | Days between visits, seasonal patterns, weekday vs. weekend | Encoded as pattern vector | "Weekend monthly" \= visits every 3-4 weekends |
| **Channel Preference** | Direct vs. OTA booking, app vs. web, WhatsApp vs. email response rates | Multi-label vector | \[direct: 0.8, app: 0.6, whatsapp: 0.9\] |
| **Property Interest** | Dwell time near property showrooms, property event attendance, income proxy signals | 0.0 (no interest) to 1.0 (high intent) | 0.45 \= moderate interest, worth nurturing |

## **4.5 Layer 5: AI/ML Intelligence (Axiara Domain)**

The AI/ML Intelligence layer is entirely within Axiara's domain and runs on Vertex AI. It consumes data from the curated BigQuery zone and the CDP Core Engine's unified profiles to produce predictions, recommendations, and intelligence that feed back into the activation layer. All models are governed by SENTINEL for bias monitoring, drift detection, and kill-switch controls.

| Model Family | Model | Input Features | Output | Serving Mode | Business Impact |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Visitor Intelligence** | Footfall Forecasting | Historical visits, weather, calendar, events, school holidays | Predicted daily visitor count (1-90 days ahead) | Batch (daily) | Staffing optimization, inventory planning |
| **Visitor Intelligence** | Return-Visit Propensity | Visit recency, frequency, satisfaction scores, DNA profile | Probability of return within 30/60/90 days | Batch (weekly) | Targeted re-engagement campaigns |
| **Visitor Intelligence** | Churn Prediction | Days since last visit, declining frequency, negative sentiment, competitive signals | Churn probability score (0-1) | Batch (weekly) | Proactive retention offers |
| **Revenue Intelligence** | Dynamic Pricing | Demand forecast, weather, day-of-week, capacity utilization, competitor pricing | Optimal ticket price per product per day | Batch (nightly) \+ Real-time adjustment | Revenue per visitor \+12-18% |
| **Revenue Intelligence** | Cross-Sell Propensity (Property) | Visit frequency, spend level, DNA profile, demographics, property interest score | Property purchase propensity score (0-1) | Batch (weekly) | Qualified property leads \+200% |
| **Experience Intelligence** | Real-Time Recommendation | Current location, time in park, weather, crowd density, past preferences, group composition | Top 3 recommended next actions (ride, restaurant, show) | Real-time (Vertex AI Endpoint) | Per-capita spending \+10% |
| **Experience Intelligence** | Sentiment Analysis | NPS/CSAT verbatims, contact center transcripts, social media mentions | Sentiment score (-1 to \+1), topic classification | Real-time (per interaction) | Service recovery time \-60% |
| **Operational Intelligence** | F\&B Demand Forecast | Visitor count forecast, weather, time-of-day, historical POS data | Predicted demand per F\&B outlet per hour | Batch (daily) | Food waste \-30% |

## **4.6 Layer 6: Activation & Orchestration**

The activation layer is where intelligence becomes action. It integrates three platforms, each handling a distinct communication domain, orchestrated by a custom coordination layer that prevents channel conflicts and ensures consistent customer experience.

### **4.6.1 Platform Roles and Boundaries**

| Platform | Role | Channels Owned | Data Input from CDP | Trigger Source |
| :---- | :---- | :---- | :---- | :---- |
| **MoEngage** | Planned marketing campaigns, journey orchestration, web/app personalization | Email, push notifications, in-app messages, web personalization, SMS | Segment membership sync, customer attributes, behavioral events, propensity scores | Scheduled campaigns \+ CDP segment entry events |
| **Arsi** | Reactive service interactions, real-time triggered communications, contact center operations | WhatsApp (outbound \+ inbound), voice calls, social media DMs, live chat | Unified customer profile, interaction history, sentiment scores, active cases | Real-time trigger rules from Event Stream Processor |
| **Custom Orchestrator (Cloud Functions)** | Channel conflict resolution, message prioritization, frequency capping, A/B test routing | None (routes to MoEngage or Arsi) | Customer communication history, channel preferences from DNA profile, active campaign list | Sits between CDP triggers and activation platforms |

### **4.6.2 MoEngage Integration Architecture**

MoEngage integration is bidirectional. Outbound: the CDP syncs customer segments, attributes, and propensity scores to MoEngage user profiles via the MoEngage Data API, enabling MoEngage campaigns to target using CDP-computed intelligence. Inbound: MoEngage sends engagement events (email opens, push clicks, web sessions, campaign interactions) back to the CDP via webhook to Pub/Sub, enriching the unified customer profile with engagement behavior. This bidirectional sync transforms MoEngage from an isolated tool into an intelligence-enriched activation channel.

### **4.6.3 Arsi Integration Architecture**

Arsi serves as both the inbound contact center (handling customer inquiries, complaints, and service requests) and the outbound communication engine (sending triggered WhatsApp messages, proactive outreach, and campaign messages). The CDP integration provides Arsi agents with a real-time customer context panel: when a customer calls or sends a WhatsApp message, the agent immediately sees the unified profile including visit history, loyalty tier, recent transactions, active complaints, sentiment trend, and recommended actions. For outbound, the CDP's Event Stream Processor triggers Arsi API calls to send WhatsApp messages with personalized content generated from the customer's profile and DNA dimensions.

## **4.7 Layer 7: Analytics & Visualization**

Looker connects directly to BigQuery's curated zone and serves three dashboard families that address the specific requirements confirmed in the Ancol discovery meeting.

| Dashboard | Primary Users | Key Metrics | Data Refresh |
| :---- | :---- | :---- | :---- |
| **Executive Command Center** | CEO, Directors, Board | Daily visitors, revenue by segment, YoY trends, loyalty program health, AI model ROI, property lead pipeline | Daily |
| **CX Operations Dashboard** | VP CX, Operations team | Real-time crowd density by zone, ride wait times, active service recovery cases, NPS/CSAT live scores, F\&B outlet demand | Real-time (5-min refresh) |
| **Voice of Customer (VoC)** | VP CX, Marketing, Quality | NPS trend, CSAT by touchpoint, sentiment analysis results, verbatim topic clusters, complaint resolution rates | Daily |
| **Marketing Performance** | Marketing team | Campaign ROI, segment performance, channel attribution, OTA vs. direct conversion, loyalty program metrics | Daily |
| **Visitor Intelligence** | Strategy, Planning | Footfall forecast accuracy, visitor segmentation heatmap, Customer DNA distribution, churn risk dashboard | Weekly |
| **Property Cross-Sell Pipeline** | Property division | Qualified lead count, lead score distribution, conversion funnel, property interest by customer segment | Weekly |

## **4.8 Layer 8: Governance, Security & Compliance**

The governance layer is not a bolt-on module; it is an architectural principle that permeates every other layer. Axiara's SENTINEL framework provides the governance infrastructure, while specific compliance controls are embedded at each layer as described below.

| Governance Domain | Regulation/Standard | Implementation | Monitoring |
| :---- | :---- | :---- | :---- |
| **Personal Data Protection** | UU PDP (No. 27/2022) | Cloud DLP for PII detection, consent management system, data retention automation, right-to-deletion workflow, breach notification procedure | SENTINEL continuous compliance monitoring |
| **AI Ethics & Governance** | Perpres AI (anticipated) | Model registry with bias audits, drift monitoring, explainability reports, kill-switch per model, human-in-the-loop for high-impact decisions | SENTINEL AI model monitoring dashboard |
| **Data Access Control** | OJK (public company), BUMD regulations | IAM with role-based access, column-level security in BigQuery, audit logging for all data access, VPC Service Controls | Cloud Audit Logs \+ SENTINEL access anomaly detection |
| **Information Security** | ISO 27001 principles | Encryption at rest (AES-256) and in transit (TLS 1.3), DDoS protection, network segmentation, vulnerability scanning | Cloud Security Command Center |
| **BUMD Procurement** | Jakarta Provincial Government regulations | Transparent vendor documentation, procurement-compliant contracting, audit-ready reporting | Administrative controls |

# **5\. End-to-End Data Flow: The Budi Journey**

This section walks through the complete data flow for the visitor journey described in the sequence diagram, demonstrating how all eight layers work together to deliver a personalized, real-time experience.

## **5.1 Phase 1: Pre-Visit & Ingestion**

**Step 1:** Budi asks about ticket prices via WhatsApp. Arsi captures the WhatsApp number and chat intent ("Interest: Dufan"). This event is published to the ancol-contact-events Pub/Sub topic.

**Step 2:** Budi buys a ticket online via ancol.com using email budi@mail.com. The ticketing system records the purchase with email as the identity key. CDC captures this and sends it to BigQuery raw zone.

**Step 3:** Cloud DLP processes both records, standardizing the phone number and email. The Identity Resolution Engine performs real-time incremental matching: it links the WhatsApp number from Step 1 with the email from Step 2, creating a unified profile (ancol\_customer\_id: BUDI-001) because the same person inquired and then purchased.

## **5.2 Phase 2: On-Site Tracking**

**Step 4:** Budi enters Ancol and receives a gelang (wristband) linked to his ticket purchase. Telkom movement data detects a device entering the Ancol geofence. The Wahana Checkpoint POS registers his QR/gelang tap at the Dufan gate (Checkpoint 1).

**Step 5:** Budi taps his gelang at Wahana Halilintar (Checkpoint 2). The event is published to ancol-wahana-events Pub/Sub topic with gelang\_id as the identity key. The real-time identity resolver links gelang\_id to BUDI-001. The Customer DNA Profiler updates Budi's thrill\_preference score (high-thrill ride selected).

## **5.3 Phase 3: Data Analytics & Action**

**Step 6:** The Event Stream Processor evaluates Budi's context: "3 hours in outdoor area, no F\&B transaction, temperature 33°C." This matches the F\&B Recommendation trigger rule.

**Step 7:** The Recommendation Engine (Vertex AI real-time endpoint) is called with Budi's profile. It returns: "Resto Bandar Djakarta (nearest, matches dining preference), 20% discount (within promotion budget)." The Custom Orchestrator checks: no active campaign message sent to Budi today, WhatsApp is his preferred channel (DNA profile). Action is routed to Arsi.

**Step 8:** Arsi sends WhatsApp: "Hey Budi\! Capek main? Klaim diskon 20% di Resto terdekat\!" with a deep link to the coupon. Budi clicks, redeems at the restaurant. The POS transaction is captured, published to Pub/Sub, and linked to BUDI-001.

## **5.4 Phase 4: Post-Visit**

**Step 9:** Next day, MoEngage sends Budi a post-visit email survey (triggered by gate\_exit event \+ 24 hours). Budi submits rating. The NPS score and verbatim text are ingested, linked to BUDI-001. Sentiment Analysis model scores the verbatim. The Lifetime Value model recalculates Budi's CLV with the new transaction data. If his churn propensity changes, he may enter or exit relevant segments.

| TOTAL ELAPSED TIME (Steps 6-8) From Budi's context triggering the F\&B recommendation to receiving the WhatsApp message: target latency is under 60 seconds. This is achieved by the hot-path architecture: Pub/Sub event → Dataflow Streaming (trigger evaluation, \<5s) → Redis profile lookup (\<1ms) → Vertex AI inference (\<2s) → Orchestrator routing (\<1s) → Arsi WhatsApp API (\<10s) → WhatsApp delivery (\<30s). |
| :---- |

# **6\. Implementation Roadmap**

The CDP implementation follows a phased approach, delivering incremental value at each stage. Each phase concludes with a Go/No-Go review before proceeding.

| Phase | Duration | Deliverables | Value Delivered | Prerequisites |
| :---- | :---- | :---- | :---- | :---- |
| **Phase 0: Discovery & NDA** | 2-3 weeks | NDA execution, detailed system inventory, API assessment, data quality audit, refined architecture | Risk reduction, scope clarity | NDA from Ancol (Action Item \#1 from MOM) |
| **Phase 1: Foundation** | 6-8 weeks | GCP project setup, BigQuery 3-zone structure, batch ingestion for ancol.com \+ loyalty DB, Cloud DLP pipeline, basic identity resolution (deterministic only) | First unified customer profiles in BigQuery, basic Looker dashboards showing merged data | Phase 0 complete, GCP billing approved |
| **Phase 2: Real-Time Core** | 6-8 weeks | Pub/Sub event bus, Dataflow streaming pipeline, Wahana Checkpoint POS integration, Redis hot cache, real-time identity resolution, MoEngage bidirectional sync | On-site visitor tracking, real-time segment updates, enriched MoEngage campaigns | Phase 1 in production, Wahana POS hardware deployed |
| **Phase 3: Intelligence** | 8-10 weeks | Vertex AI model deployment (footfall forecast, recommendation engine, sentiment analysis), Event Stream Processor with trigger rules, Arsi integration with customer context panel | Real-time personalized notifications (Budi journey), AI-powered dashboards, contact center with customer context | Phase 2 in production |
| **Phase 4: Advanced AI** | 8-10 weeks | Dynamic pricing model, churn prediction, property cross-sell scoring, Customer DNA profiler, advanced segmentation, full VoC dashboard | Dynamic pricing live, property lead pipeline, churn prevention campaigns, complete Customer 360 | Phase 3 in production, sufficient data history |
| **Phase 5: Optimization** | Ongoing | Model retraining, A/B testing framework, new trigger rules, additional data source integrations, SENTINEL governance hardening | Continuous improvement, expanding use case coverage from the 80-use-case catalog | Phase 4 in production |

| TOTAL ESTIMATED TIMELINE Phase 0 through Phase 4 production: approximately 32-39 weeks (8-10 months). First value delivery (Phase 1: unified customer profiles and basic dashboards): 8-11 weeks from project kickoff. Real-time personalization capability (Phase 3): approximately 20-27 weeks from kickoff. |
| :---- |

# **7\. Required for Acceptance**

The following information is required from Ancol and the partner teams to finalize this architecture into a production-ready design and quotation (as per MOM Action Item \#2).

| \# | Required Item | Source | Criticality | Status |
| :---- | :---- | :---- | :---- | :---- |
| **1** | Signed NDA (Ancol format) | Ibu Dewi (Ancol) | Blocker for Phase 0 | Pending (MOM Action Item \#1) |
| **2** | Complete inventory of existing databases, schemas, and API documentation | IT Managers (Encep, Ganna, Boby) | Required for Phase 1 scoping | Not yet started |
| **3** | ancol.com database schema and sample data (anonymized) | IT Managers | Required for identity resolution design | After NDA |
| **4** | Loyalty program database schema, member count, and tier structure | VP CX / Data Analytics | Required for Customer DNA design | After NDA |
| **5** | Current F\&B POS system details (vendor, API availability, data schema) | IT Managers | Required for transaction ingestion | After NDA |
| **6** | Hotel/Resort booking system details (Putri Duyung) | IT Managers | Required for hospitality data integration | After NDA |
| **7** | MoEngage account details, current implementation scope, and API access | VP CX / Data Analytics | Required for MoEngage integration design | After NDA |
| **8** | OTA partner data sharing agreements and available fields | VP CX / Business Development | Required for OTA ingestion pipeline | After NDA |
| **9** | Wahana Checkpoint POS hardware specification and deployment plan | IT Managers \+ Terralogiq | Required for real-time tracking pipeline | In progress |
| **10** | Telkom movement data contract details, API specification, data format | Terralogiq / Business | Required for location enrichment pipeline | In discussion |
| **11** | Contact center current vendor details and migration timeline to Arsi | IT Managers / VP CX | Required for Arsi integration planning | After NDA |
| **12** | GCP project ownership, billing setup, and security baseline | Terralogiq \+ Ancol IT | Required for Phase 1 infrastructure | In progress |
| **13** | Data retention policy and UU PDP compliance officer contact | Legal / Compliance | Required for Layer 8 governance design | After NDA |

# **8\. Conclusion**

The Ancol 360° Customer Data Platform represents a foundational investment that transforms Ancol from a collection of disconnected entertainment venues into an AI-powered, data-connected integrated destination. By resolving the identity problem first, the CDP enables every downstream capability: personalized visitor experiences that increase per-capita spend, predictive intelligence that optimizes operations and pricing, cross-segment revenue opportunities that bridge the gap between 10 million recreation visitors and the IDR 10+ trillion property pipeline, and governance infrastructure that ensures compliance with UU PDP and the evolving Indonesian AI regulatory landscape.

The architecture is designed for phased implementation, delivering measurable value within 8-11 weeks of kickoff while building toward the full-scale AI-powered destination vision over 8-10 months. The dual-speed processing architecture ensures that both real-time personalization (sub-60-second notifications) and deep analytical intelligence (weekly/monthly scoring models) operate simultaneously on the same unified data foundation.

The immediate next step is NDA execution (MOM Action Item \#1), followed by the detailed system discovery that will refine this architecture into a production-ready implementation plan and quotation.

AXIARA.AI  ×  TERRALOGIQ  |  Governed AI. Real Results.