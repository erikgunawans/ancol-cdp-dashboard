import { Metadata } from "next";
import DataFlowClient from "./DataFlowClient";

export const metadata: Metadata = {
  title: "Data Flow | Ancol 360° CDP",
  description: "Visualization of real-time data ingestion, processing, and activation pipelines from offline touchpoints to digital profiles.",
};

export default function DataFlowPage() {
  return <DataFlowClient />;
}
