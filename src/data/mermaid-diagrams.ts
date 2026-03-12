// ── Mermaid diagram source strings ────────────────────────────────────────────

export const ARCH_OVERVIEW = `%%{init: {'theme': 'dark'}}%%
graph TB
    subgraph L8["LAYER 8: GOVERNANCE, SECURITY & COMPLIANCE — Axiara SENTINEL"]
        direction LR
        S1["UU PDP Compliance"]
        S2["AI Ethics & Bias Monitoring"]
        S3["Model Drift Detection"]
        S4["Kill-Switch Controls"]
        S5["Audit Logs & Access Control"]
        S6["Regulatory Change Monitor"]
    end

    subgraph L7["LAYER 7: ANALYTICS & VISUALIZATION — Terralogiq / Looker"]
        direction LR
        D1["Executive Command Center"]
        D2["CX Operations Dashboard"]
        D3["Voice of Customer VoC"]
        D4["Marketing Performance"]
        D5["Property Cross-Sell Pipeline"]
    end

    subgraph L6["LAYER 6: ACTIVATION & ORCHESTRATION"]
        direction LR
        A1["MoEngage\\nMarketing Campaigns\\nEmail / Push / Web"]
        A2["Custom Orchestrator\\nChannel Routing\\nFrequency Capping"]
        A3["Arsi Contact Center\\nWhatsApp / Voice\\nChat / Social"]
    end

    subgraph L5["LAYER 5: AI/ML INTELLIGENCE — Axiara / Vertex AI"]
        direction LR
        M1["Visitor Intelligence\\nFootfall Forecast\\nChurn Prediction"]
        M2["Revenue Intelligence\\nDynamic Pricing\\nCross-Sell Propensity"]
        M3["Experience Intelligence\\nRecommendations\\nSentiment Analysis"]
        M4["Operational Intelligence\\nF&B Demand Forecast\\nMaintenance Prediction"]
    end

    subgraph L4["LAYER 4: CDP CORE ENGINE — Terralogiq + Axiara"]
        direction LR
        C1["Identity Resolution Engine\\nDeterministic + Probabilistic"]
        C2["Segmentation Engine\\nRule + ML + Real-time"]
        C3["Event Stream Processor\\nTrigger Rules"]
        C4["Customer DNA Profiler\\nLifestyle Scoring"]
    end

    subgraph L3["LAYER 3: DATA STORAGE — Terralogiq / BigQuery + Redis"]
        direction LR
        BQ1["BigQuery Raw Zone"]
        BQ2["BigQuery Standardized Zone"]
        BQ3["BigQuery Curated Zone"]
        RD["Memorystore Redis Hot Cache"]
    end

    subgraph L2["LAYER 2: PROCESSING & GOVERNANCE"]
        direction LR
        P1["Cloud DLP\\nPII Detection\\nDe-identification"]
        P2["Standardization Pipeline\\nFormat Normalization"]
        P3["SENTINEL Data Policy Enforcement"]
    end

    subgraph L1["LAYER 1: DATA INGESTION — Terralogiq / Pub/Sub + Dataflow"]
        direction LR
        I1["Batch Path\\nCDC / Dataflow\\nHourly / Nightly"]
        I2["Real-Time Path\\nPub/Sub / Streaming\\nSub-minute"]
    end

    subgraph Sources["DATA SOURCES"]
        direction LR
        DS1["ancol.com Ticketing"]
        DS2["Loyalty Program"]
        DS3["F&B POS Systems"]
        DS4["Hotel/Resort Booking"]
        DS5["Wahana Checkpoint POS"]
        DS6["Arsi Contact Center"]
        DS7["MoEngage Events"]
        DS8["Telkom Movement Data"]
        DS9["Ancol Mobile App"]
        DS10["OTA Partners"]
    end

    Sources --> L1
    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5
    L5 --> L6
    L4 --> L6
    L3 --> L7
    L5 --> L7`;

export const IDENTITY_RESOLUTION = `%%{init: {'theme': 'dark'}}%%
flowchart TB
    subgraph INPUT["Fragmented Identity Records from Multiple Sources"]
        R1["ancol.com\\nemail: budi@mail.com\\nname: Budi Santoso"]
        R2["WhatsApp via Arsi\\nphone: +6281234567890\\nchat: asking Dufan prices"]
        R3["Loyalty Program\\nloyalty_id: ANC-50123\\nemail: budi@mail.com"]
        R4["Wahana POS\\ngelang_id: GEL-99887\\nlinked to ticket TKT-445"]
        R5["Telkom Movement\\ndevice_id: DEV-XYZ\\nlocation: Ancol geofence"]
        R6["F&B POS\\npayment: Visa *4589\\nno identity key"]
    end

    subgraph PHASE1["Phase 1: Deterministic Matching — resolves approx 65%"]
        DM["Exact Match Engine\\nMatch on: email, phone,\\nloyalty_id, gelang_id"]
        LINK1["R1 matched R3\\nSame email:\\nbudi@mail.com"]
        LINK2["R4 linked via\\nticket purchase to R1\\nTKT-445 = budi@mail.com"]
    end

    subgraph PHASE2["Phase 2: Probabilistic Matching — resolves approx 15% more"]
        PM["Fuzzy Match Engine\\nName similarity +\\nsame visit date +\\npayment pattern"]
        LINK3["R6 linked to R1\\nSame Visa *4589 used\\non ancol.com checkout\\nConfidence: 87%"]
    end

    subgraph PHASE3["Phase 3: Graph-Based Resolution — resolves approx 5% more"]
        GM["Transitive Closure\\nIf A=B and B=C\\nthen A=B=C"]
        LINK4["R2 linked to R1 to R3\\nPhone from WhatsApp\\nlinked via OTP verification\\non ancol.com account"]
    end

    subgraph OUTPUT["Unified Golden Record in dim_customer"]
        GOLDEN["ancol_customer_id: BUDI-001\\n\\nname: Budi Santoso\\nemail: budi@mail.com\\nphone: +6281234567890\\nloyalty_id: ANC-50123\\ngelang_id: GEL-99887\\ndevice_id: DEV-XYZ\\npayment_tokens: Visa *4589\\n\\nidentity_confidence: 94%\\nsources_merged: 6\\nlast_resolved: 2026-03-08"]
    end

    UNRESOLVED["R5 Telkom\\nCannot resolve:\\nanonymized device_id\\nUsed for aggregated\\nanalytics only"]

    INPUT --> PHASE1
    PHASE1 --> PHASE2
    PHASE2 --> PHASE3
    PHASE3 --> OUTPUT
    R5 --> UNRESOLVED`;

export const DATA_FLOW_PIPELINE = `%%{init: {'theme': 'dark'}}%%
flowchart LR
    subgraph SOURCES["Data Sources"]
        S_BATCH["Batch Sources\n- ancol.com DB\n- Loyalty DB\n- Hotel Booking\n- F&B POS\n- OTA Partners"]
        S_RT["Real-Time Sources\n- Wahana Checkpoint POS\n- Arsi WhatsApp/Voice\n- MoEngage Events\n- Ancol App Events\n- Telkom Movement"]
    end

    subgraph INGEST["Ingestion Layer"]
        BATCH_PIPE["Dataflow Batch\nCDC Connectors\nHourly / Nightly"]
        PUBSUB["Cloud Pub/Sub\nEvent Bus\nReal-Time Topics"]
        STREAM_PIPE["Dataflow Streaming\nEvent Processing\nSub-minute"]
    end

    subgraph GOVERN["Processing & Governance"]
        DLP["Cloud DLP\nPII Detection\nDe-identification"]
        STANDARD["Standardization Pipeline\nPhone to E.164 / Dates to UTC"]
        SENTINEL_G["SENTINEL Policy Engine\nConsent Check / Retention Rules"]
    end

    subgraph STORAGE["BigQuery Data Warehouse"]
        RAW["Raw Zone\nancol_raw_*\n36-month retention"]
        STD["Standardized Zone\nancol_std_*\nCleaned & normalized"]
        CURATED["Curated Zone\nancol_curated_*\ndim_customer / fact_visits"]
    end

    REDIS["Redis Hot Cache\nActive profiles\nSub-ms reads"]

    subgraph CDP_CORE["CDP Core Engine"]
        ID_RES["Identity Resolution\nDeterministic + Probabilistic"]
        SEG["Segmentation Engine\nRule-based / ML / Real-time"]
        ESP["Event Stream Processor\nTrigger Rules / Enrichment"]
        DNA["Customer DNA Profiler\nThrill / Spend / Channel"]
    end

    subgraph AI_ML["Vertex AI"]
        AI1["Predictive Models\nFootfall / Churn Prediction"]
        AI2["Revenue Models\nDynamic Pricing / Cross-Sell"]
        AI3["Experience Models\nRecommendations / Next-Best-Action"]
    end

    subgraph ACTIVATE["Activation Layer"]
        ORCH["Custom Orchestrator\nChannel Selection / Freq Capping"]
        MOE["MoEngage\nEmail / Push / Web / In-App"]
        ARSI["Arsi Contact Center\nWhatsApp / Voice / Live Chat"]
    end

    LOOKER["Looker Dashboards\nExecutive / CX Ops / Marketing"]

    S_BATCH --> BATCH_PIPE
    S_RT --> PUBSUB
    PUBSUB --> STREAM_PIPE
    BATCH_PIPE --> DLP
    STREAM_PIPE --> DLP
    DLP --> STANDARD
    STANDARD --> SENTINEL_G
    SENTINEL_G --> RAW
    RAW --> STD
    STD --> CURATED
    CURATED --> ID_RES
    CURATED --> SEG
    CURATED --> DNA
    CURATED --> AI_ML
    CURATED --> LOOKER
    PUBSUB -.->|Real-time events| ESP
    REDIS -->|Profile read| ESP
    ESP -->|Profile write| REDIS
    CURATED -->|Cache sync| REDIS
    ID_RES --> SEG
    ID_RES --> DNA
    SEG --> ESP
    DNA --> AI_ML
    AI_ML --> ESP
    AI_ML --> CURATED
    ESP --> ORCH
    ORCH --> MOE
    ORCH --> ARSI
    MOE -.->|Engagement events| PUBSUB
    ARSI -.->|Interaction events| PUBSUB
    SEG -->|Segment sync| MOE`;

export const BUDI_JOURNEY_SEQUENCE = `%%{init: {'theme': 'dark'}}%%
sequenceDiagram
    actor Budi as Budi (Ancol Visitor)
    participant WC as Wahana Checkpoint POS
    participant PS as Cloud Pub/Sub
    participant ESP as Event Stream Processor
    participant Redis as Redis Hot Cache
    participant VAI as Vertex AI Recommendation
    participant ORCH as Custom Orchestrator
    participant ARSI as Arsi WhatsApp

    rect rgb(10, 30, 60)
        Note over Budi,ARSI: PHASE 1: PRE-VISIT & INGESTION
        Budi->>ARSI: Asks ticket price via WhatsApp
        ARSI->>PS: Ingest: WA number + chat intent (Interest: Dufan)
        Budi->>WC: Buys ticket online (email: budi@mail.com)
        WC->>PS: Ingest: Email + identity (PII via DLP)
        PS->>Redis: Identity Resolution: Link WA + Email = Unique ID: BUDI-001
    end

    rect rgb(10, 40, 30)
        Note over Budi,ARSI: PHASE 2: ON-SITE TRACKING
        Budi->>WC: Taps QR/Gelang at Dufan Gate (Checkpoint 1)
        WC->>PS: Publish: wahana_tap {gelang_id, venue: dufan_gate}
        PS->>Redis: Movement data: User entered Dufan area
        Budi->>WC: Taps at Wahana Halilintar (Checkpoint 2)
        WC->>PS: Publish: wahana_tap {gelang_id, venue: halilintar}
        PS->>Redis: Behavioral Update: High-Thrill Preference
    end

    rect rgb(40, 25, 10)
        Note over Budi,ARSI: PHASE 3: DATA ANALYTICS & ACTION (Target under 60s)
        PS->>ESP: Stream event to processor
        ESP->>Redis: Lookup: BUDI-001 profile (sub-ms)
        Redis-->>ESP: Context: 3hrs in park, no F&B, temp 33C
        Note over ESP: TRIGGER MATCH: outdoor >2hrs AND no F&B AND temp >30C = FIRE F&B Recommendation
        ESP->>VAI: Request recommendation for BUDI-001
        VAI-->>ESP: Bandar Djakarta, 20% discount, nearest
        ESP->>ORCH: Trigger: send F&B offer to Budi
        Note over ORCH: Channel check: No msg sent today = OK, WhatsApp preferred = OK
        ORCH->>ARSI: Send WhatsApp message with coupon
        ARSI->>Budi: Hey Budi! Capek main? Klaim diskon 20% di Resto terdekat!
    end

    rect rgb(10, 40, 25)
        Note over Budi,ARSI: PHASE 4: POST-VISIT
        Budi->>WC: Clicks coupon and eats at Resto
        WC->>PS: Publish: transaction {BUDI-001, resto, IDR 150K, coupon_redeemed}
        PS->>ESP: Process transaction event
        ESP->>Redis: Update profile: +1 F&B txn, coupon_responsive = true
        Note over Budi: Next day: MoEngage sends post-visit survey email
        Budi->>PS: Submits NPS rating via email survey
        PS->>ESP: Sentiment Analysis + Lifetime Value Update
    end`;

export const IMPLEMENTATION_GANTT = `%%{init: {'theme': 'dark'}}%%
gantt
    title Ancol 360° CDP Implementation Timeline
    dateFormat YYYY-MM-DD
    axisFormat %b %Y

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
    Go/No-Go Gate 4                        :milestone, after p4f, 0d`;
