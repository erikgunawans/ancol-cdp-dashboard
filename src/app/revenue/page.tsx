import { Metadata } from "next";
import RevenueClient from "./RevenueClient";

export const metadata: Metadata = {
  title: "Revenue Insights | Ancol 360° CDP",
  description: "Financial tracking and monetization analysis driven by customer data, including ARPU and transaction correlations.",
};

export default function RevenuePage() {
  return <RevenueClient />;
}
