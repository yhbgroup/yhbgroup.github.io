import type { Metadata } from "next";
import { getActiveAgreement } from "@/lib/static-data";

export const metadata: Metadata = {
  title: {
    absolute: "数据与软件资源使用协议",
  },
};

export default async function AgreementPage() {
  const agreement = await getActiveAgreement();

  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <p className="agreement-panel__version">{agreement.version}</p>
          <h1>{agreement.title}</h1>
          <p>{agreement.content}</p>
        </article>
      </div>
    </div>
  );
}
