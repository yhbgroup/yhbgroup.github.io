import type { Metadata } from "next";
import { DataCustomizationContent } from "@/components/data-customization-content";
import { getSitePage } from "@/lib/static-data";

export const metadata: Metadata = { title: "数据定制 / Data Customization" };

export default function DataCustomizationPage() {
  return <DataCustomizationContent page={getSitePage("data-customization")} />;
}
