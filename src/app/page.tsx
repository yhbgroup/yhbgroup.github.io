import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { getSitePage } from "@/lib/static-data";

export const metadata: Metadata = { title: "首页 / Home" };

export default function HomePage() {
  return <HomeContent page={getSitePage("home")} />;
}
