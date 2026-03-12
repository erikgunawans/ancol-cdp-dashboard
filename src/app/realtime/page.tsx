import { Metadata } from "next";
import RealtimeClient from "./RealtimeClient";

export const metadata: Metadata = {
  title: "Real-time Operations | Ancol 360° CDP",
  description: "Live monitoring of current park activity, instant data triggers, and immediate AI response metrics.",
};

export default function RealtimePage() {
  return <RealtimeClient />;
}
