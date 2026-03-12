import { Metadata } from "next";
import JourneyClient from "./JourneyClient";

export const metadata: Metadata = {
  title: "The Budi Journey | Ancol 360° CDP",
  description: "An end-to-end walkthrough of a personalized customer experience, from pre-arrival to post-visit loyalty.",
};

export default function JourneyPage() {
  return <JourneyClient />;
}
