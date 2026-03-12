import { Metadata } from "next";
import UseCasesClient from "./UseCasesClient";

export const metadata: Metadata = {
  title: "80 AI Use Cases | Ancol 360° CDP",
  description: "Comprehensive library of 80 artificial intelligence applications designed to optimize operations and marketing for Ancol.",
};

export default function UseCasesPage() {
  return <UseCasesClient />;
}
