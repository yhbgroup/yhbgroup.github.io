"use client";

import Link from "next/link";
import { ChemicalText } from "@/components/chemical-text";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

type LocalizedServicePageProps = {
  title: LocalizedText;
  body: LocalizedText;
  link?: {
    href: string;
    label: LocalizedText;
  };
  version?: string;
  chemicalText?: boolean;
};

export function LocalizedServicePage({ title, body, link, version, chemicalText }: LocalizedServicePageProps) {
  const { language } = useLanguage();

  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          {version ? <p className="agreement-panel__version">{version}</p> : null}
          <h1>{title[language]}</h1>
          <p>{chemicalText ? <ChemicalText text={body[language]} /> : body[language]}</p>
          {link ? <Link href={link.href} className="text-link">{link.label[language]}</Link> : null}
        </article>
      </div>
    </div>
  );
}
