export interface TimelinePhase {
  id: string;
  name: string;
  duration: string;
  deliverables: string[];
  valueDelivered: string;
  prerequisites: string;
  technologies: string[];
  goNoGoGate: string;
}

export const timelinePhases: TimelinePhase[] = [
  {
    id: "phase-0",
    name: "Phase 0: Discovery",
    duration: "3 weeks",
    deliverables: [
      "Current state data architecture mapping",
      "Compliance and PDP auditing",
      "Axiara platform provisioning",
      "Finalized use-case backlog"
    ],
    valueDelivered: "Clear, de-risked roadmap aligned with Ancol's Q3 revenue targets.",
    prerequisites: "Access to current GCP environments, stakeholder availability.",
    technologies: ["Google Cloud", "Axiara Console"],
    goNoGoGate: "Sign-off on Solution Architecture Document (SAD) and Data Processing Agreement (DPA)."
  },
  {
    id: "phase-1",
    name: "Phase 1: Foundations",
    duration: "6 weeks",
    deliverables: [
      "Batch data ingestion (CDC from ticking & F&B)",
      "Standardized data lakehouse environment (Raw & Std zones)",
      "Identity Resolution configuration (Phone/Email deduplication)",
      "LINTANG deployment (Descriptive BI dashboards)"
    ],
    valueDelivered: "A single, unified customer view (Golden ID) combining ticketing and web data.",
    prerequisites: "Phase 0 sign-off, firewall rules approved.",
    technologies: ["BigQuery", "Dataflow", "LINTANG"],
    goNoGoGate: "Demonstrable 95%+ success rate on daily batch ingestion and identity matching."
  },
  {
    id: "phase-2",
    name: "Phase 2: Insights",
    duration: "8 weeks",
    deliverables: [
      "Real-time event streaming pipeline (Pub/Sub)",
      "BIMA deployment (Machine Learning & Predictive models)",
      "Predictive Footfall and Customer Lifetime Value (CLV) models",
      "Curated dimensional modeling in BigQuery"
    ],
    valueDelivered: "Forecasting capabilities to optimize park operations and marketing spend.",
    prerequisites: "Phase 1 batch pipelines stable for 14 consecutive days.",
    technologies: ["Pub/Sub", "Vertex AI", "BIMA"],
    goNoGoGate: "Models achieve >85% accuracy in back-testing against historical attendance."
  },
  {
    id: "phase-3",
    name: "Phase 3: Automation",
    duration: "10 weeks",
    deliverables: [
      "ARSI implementation (Conversational AI & Workflow execution)",
      "Integration with Email and WhatsApp marketing tools",
      "Dynamic Pricing Engine beta launch",
      "Trigger-based behavioral journeys (e.g., Abandoned Cart, In-Park upsell)"
    ],
    valueDelivered: "Automated, personalized revenue generation independent of manual campaign execution.",
    prerequisites: "Phase 2 predictive models deployed to production schemas.",
    technologies: ["ARSI", "Redis", "Cloud Run"],
    goNoGoGate: "Pilot marketing campaign generates >15% lift in conversion compared to control group."
  },
  {
    id: "phase-4",
    name: "Phase 4: Agentic AI",
    duration: "12 weeks",
    deliverables: [
      "BAYU implementation (Autonomous Operations)",
      "Real-time Smart Facility Energy optimization",
      "Queue Virtualization Agent at peak rides",
      "Cross-entity data syndication for ecosystem partners"
    ],
    valueDelivered: "Self-optimizing park operations requiring minimal human intervention.",
    prerequisites: "Phase 3 automated workflows running with zero critical failures.",
    technologies: ["BAYU", "IoT Core", "Axiara Edge"],
    goNoGoGate: "Successful demonstration of autonomous intervention in a staging environment."
  }
];
