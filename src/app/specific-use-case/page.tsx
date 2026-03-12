import { Metadata } from "next";
import SpecificUseCaseClient from "./SpecificUseCaseClient";

export const metadata: Metadata = {
  title: "Specific Use Case | Ancol 360° CDP",
  description: "AGRAS — Ancol Governance & Regulatory Audit System.",
};

export default function SpecificUseCasePage() {
  return <SpecificUseCaseClient />;
}
