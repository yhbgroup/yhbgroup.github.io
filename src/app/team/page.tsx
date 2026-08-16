import type { Metadata } from "next";
import { TeamContent } from "@/components/team-content";
import { getSitePage } from "@/lib/static-data";

export const metadata: Metadata = { title: "团队介绍 / About Us" };

export default function TeamPage() {
  return <TeamContent page={getSitePage("team")} />;
}
