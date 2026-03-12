import { Metadata } from "next";
import OverviewClient from "./OverviewClient";

export const metadata: Metadata = {
  title: "Executive Overview | Ancol 360° CDP",
  description: "High-level summary of key performance indicators, total reach, and system health for the Ancol 360° platform.",
};

export default function OverviewPage() {
  return <OverviewClient />;
}
