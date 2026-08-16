"use client";

import { useLanguage } from "@/lib/i18n";

export function AgreementContent({ agreement }: { agreement: { title: string; version: string; content: string } }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <p className="agreement-panel__version">{agreement.version}</p>
          <h1>{isEnglish ? "Data and Software Resource Use Agreement" : agreement.title}</h1>
          <p>{isEnglish
            ? "Users must use the data, software, and related resources provided by this website only for the purpose stated in their application. When these resources are used in papers, reports, policy documents, or other outputs, the website and the corresponding source publications must be cited correctly. Resources may not be redistributed, resold, or used beyond the approved scope without permission. The platform may update resources as data versions and maintenance status change."
            : agreement.content}</p>
        </article>
      </div>
    </div>
  );
}
