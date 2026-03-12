import { Metadata } from "next";
import SegmentsClient from "./SegmentsClient";

export const metadata: Metadata = {
  title: "Audience Segmentation | Ancol 360° CDP",
  description: "AI-driven customer clustering and persona development based on 10M+ annual visitor behavior data.",
};

export default function SegmentsPage() {
  return <SegmentsClient />;
}
