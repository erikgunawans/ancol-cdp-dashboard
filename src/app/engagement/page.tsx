import { Metadata } from "next";
import EngagementClient from "./EngagementClient";

export const metadata: Metadata = {
  title: "Customer Engagement | Ancol 360° CDP",
  description: "Monitoring active participation, dwell times, and interaction rates across physical and digital touchpoints.",
};

export default function EngagementPage() {
  return <EngagementClient />;
}
