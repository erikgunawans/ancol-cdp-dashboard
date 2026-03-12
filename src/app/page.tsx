import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Ancol 360° | AI-Powered Customer Data Platform",
  description: "Interactive dashboard for the Ancol 360° CDP — transforming 10M annual visitors into connected journeys through real-time data orchestration and AI.",
};

export default function HomePage() {
  return <HomeClient />;
}
