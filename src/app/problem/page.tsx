import { Metadata } from "next";
import { Suspense } from "react";
import ProblemClient from "./ProblemClient";

export const metadata: Metadata = {
  title: "The Challenge | Ancol 360° CDP",
  description: "Exploring the data fragmentation and customer insight gaps in large-scale theme park operations and how Ancol 360° bridges them.",
};

export default function ProblemPage() {
  return (
    <Suspense>
      <ProblemClient />
    </Suspense>
  );
}
