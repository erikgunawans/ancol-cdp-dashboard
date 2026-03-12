export interface JourneyAction {
  id: string;
  userAction: string;
  systemReaction: string;
}

export interface JourneyData {
  intro: {
    headline: string;
    description: string;
    details: string;
  };
  phase1: {
    title: string;
    steps: JourneyAction[];
  };
  phase2: {
    title: string;
    stops: {
      location: string;
      event: string;
    }[];
  };
  phase3: {
    title: string;
    timer: {
      duration: string;
      status: string;
      temp: string;
    };
    systemSteps: string[];
    whatsappMessage: string;
  };
  phase4: {
    title: string;
    events: string[];
  };
  outcome: {
    withoutCdp: string;
    withCdp: string;
  };
}

export const budiJourney: JourneyData = {
  intro: {
    headline: "Meet Budi",
    description: "Budi Santoso, 38, lives in Bekasi. Weekend family visitor.",
    details: "Loyalty member since 2023."
  },
  phase1: {
    title: "Phase 1: Pre-Visit",
    steps: [
      {
        id: "p1-s1",
        userAction: "Budi asks about Dufan ticket prices on WhatsApp.",
        systemReaction: "Arsi captures WhatsApp number + chat intent: Interest in Dufan."
      },
      {
        id: "p1-s2",
        userAction: "Budi buys a ticket on ancol.com using his email budi@mail.com.",
        systemReaction: "Identity Resolution links WhatsApp phone + email → Unified ID: BUDI-001."
      }
    ]
  },
  phase2: {
    title: "Phase 2: On-Site Tracking",
    stops: [
      { location: "Gate", event: "Gelang assigned, linked to ticket" },
      { location: "Dufan Area", event: "QR tap at gate → Check-in recorded" },
      { location: "Halilintar Ride", event: "QR tap → Behavioral update: High-Thrill Preference" }
    ]
  },
  phase3: {
    title: "Phase 3: The Magic Moment",
    timer: {
      duration: "3 hours in park",
      status: "No F&B purchase",
      temp: "Temperature: 33°C"
    },
    systemSteps: [
      "Event Stream Processor",
      "Redis Hot Cache",
      "Vertex AI",
      "Custom Orchestrator",
      "Arsi",
      "WhatsApp delivered"
    ],
    whatsappMessage: "Hey Budi! Capek main? Klaim diskon 20% di Resto terdekat!"
  },
  phase4: {
    title: "Phase 4: Post-Visit",
    events: [
      "Budi redeems the coupon at Bandar Djakarta restaurant.",
      "POS transaction captured and linked to BUDI-001.",
      "Next day: MoEngage sends NPS survey email.",
      "Sentiment analysis scores Budi's feedback.",
      "Customer Lifetime Value recalculated with new data."
    ]
  },
  outcome: {
    withoutCdp: "WITHOUT CDP: Budi is anonymous after the gate. No personalization. No follow-up.",
    withCdp: "WITH CDP: Every touchpoint connected. Real-time offers. Post-visit engagement. Growing lifetime value."
  }
};
