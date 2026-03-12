import { Metadata } from "next";
import VisitorsClient from "./VisitorsClient";

export const metadata: Metadata = {
  title: "Visitor Analytics | Ancol 360° CDP",
  description: "Detailed breakdown of visitor demographics, behavior patterns, and attendance trends across all Ancol properties.",
};

export default function VisitorsPage() {
  return <VisitorsClient />;
}
