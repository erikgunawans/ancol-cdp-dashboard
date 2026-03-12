export type CDPLayer =
  | "Data Collection"
  | "Identity Resolution"
  | "Real-Time Processing"
  | "Analytics & Insights"
  | "Loyalty & Engagement"
  | "Predictive Intelligence";

export interface PainPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
  cdpLayer: CDPLayer;
  tagClass: string;
}

export const painPoints: PainPoint[] = [
  {
    id: "data-silos",
    icon: "CircleStackIcon",
    title: "Fragmented Data Silos",
    description:
      "Ticketing, F&B, loyalty, hotel, and OTA systems each store data in separate databases with no shared schema. A single visitor generates 4–6 records that are never joined.",
    cdpLayer: "Data Collection",
    tagClass: "bg-blue-50 text-blue-700",
  },
  {
    id: "post-gate-blindspot",
    icon: "EyeSlashIcon",
    title: "Zero Post-Gate Visibility",
    description:
      "Data capture ends at the turnstile. Once a visitor enters Dufan, Sea World, or Ancol Beach, their in-park activity — rides, F&B, dwell time — is completely untracked.",
    cdpLayer: "Data Collection",
    tagClass: "bg-blue-50 text-blue-700",
  },
  {
    id: "no-unified-identity",
    icon: "UserGroupIcon",
    title: "No Unified Guest Identity",
    description:
      "The same person who bought a ticket online, redeemed a loyalty voucher, and dined at a restaurant appears as three anonymous strangers. No golden record links cross-channel behavior.",
    cdpLayer: "Identity Resolution",
    tagClass: "bg-purple-50 text-purple-700",
  },
  {
    id: "no-realtime-data",
    icon: "BoltSlashIcon",
    title: "No Real-Time Intelligence",
    description:
      "All reporting is batch-processed — typically 24–48 hours delayed. Operators cannot respond to live crowd surges, abandoned carts, or in-moment upsell opportunities.",
    cdpLayer: "Real-Time Processing",
    tagClass: "bg-amber-50 text-amber-700",
  },
  {
    id: "fragmented-loyalty",
    icon: "StarIcon",
    title: "Disconnected Loyalty Program",
    description:
      "Loyalty points accrue through ticketing only. F&B, parking, and hotel stays earn nothing. Members have no incentive to deepen engagement beyond the gate, capping revenue per visit.",
    cdpLayer: "Loyalty & Engagement",
    tagClass: "bg-green-50 text-green-700",
  },
  {
    id: "no-predictive-analytics",
    icon: "ChartBarIcon",
    title: "No Predictive Capability",
    description:
      "Without historical behavioral data, Ancol cannot forecast churn, identify high-value segments, personalize offers, or predict peak demand by venue. Every campaign is one-size-fits-all.",
    cdpLayer: "Predictive Intelligence",
    tagClass: "bg-red-50 text-red-700",
  },
];
