import { Metadata } from "next";
import ArchitectureClient from "./ArchitectureClient";

export const metadata: Metadata = {
  title: "System Architecture | Ancol 360° CDP",
  description: "A technical deep-dive into the scalable infrastructure, cloud components, and AI layers powering the Ancol 360° ecosystem.",
};

export default function ArchitecturePage() {
  return <ArchitectureClient />;
}
