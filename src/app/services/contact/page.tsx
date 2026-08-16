import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";
import { getContactInfo, getSitePage } from "@/lib/static-data";

export const metadata: Metadata = { title: "联系我们 / Contact Us" };

export default function ContactPage() {
  return <ContactContent page={getSitePage("contact")} contactInfo={getContactInfo()} />;
}
