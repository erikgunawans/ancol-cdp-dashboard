import { Metadata } from "next";
import DiscussionClient from "./DiscussionClient";

export const metadata: Metadata = {
  title: "Discussion | Ancol 360° CDP",
  description: "Selected use cases for discussion.",
};

export default function DiscussionPage() {
  return <DiscussionClient />;
}
