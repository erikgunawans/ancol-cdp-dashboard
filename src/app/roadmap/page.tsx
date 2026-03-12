import { Metadata } from "next";
import RoadmapClient from "./RoadmapClient";

export const metadata: Metadata = {
  title: "Implementation Roadmap | Ancol 360° CDP",
  description: "Strategic timeline for the deployment, scaling, and future feature releases of the Ancol 360° platform.",
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
