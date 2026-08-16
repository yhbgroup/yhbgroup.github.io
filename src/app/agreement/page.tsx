import type { Metadata } from "next";
import { AgreementContent } from "@/components/agreement-content";
import { getActiveAgreement } from "@/lib/static-data";

export const metadata: Metadata = { title: { absolute: "数据与软件资源使用协议 / Resource Use Agreement" } };

export default function AgreementPage() {
  return <AgreementContent agreement={getActiveAgreement()} />;
}
