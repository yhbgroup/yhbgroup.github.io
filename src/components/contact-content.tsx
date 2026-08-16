"use client";

import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/i18n";
import type { ContactInfo, SitePageContent } from "@/lib/site-content";

export function ContactContent({ page, contactInfo }: { page: SitePageContent; contactInfo: ContactInfo }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const fields = isEnglish
    ? ["Environmental policy and public-health effects", "Ecological and environmental risks of urbanization", "Territorial spatial planning"]
    : contactInfo.fields;

  return (
    <div className="page-shell">
      <PageHero title={{ zh: page.title, en: "Contact Us" }} subtitle={page.subtitle} imageUrl={page.heroImageUrl} />
      <div className="page-content page-content--service">
        <section className="contact-layout">
          <article className="contact-card">
            <h2>{isEnglish ? "Huanbi Yue" : contactInfo.name}</h2>
            <p className="contact-card__title">{isEnglish ? "Associate Professor, Department of Administration, Ocean University of China" : contactInfo.title}</p>
            <div className="contact-card__block">
              <strong>{isEnglish ? "Email" : "邮箱"}</strong>
              {contactInfo.emails.map((email) => <a key={email} href={`mailto:${email}`} className="text-link">{email}</a>)}
            </div>
            <div className="contact-card__block">
              <strong>{isEnglish ? "Research Areas" : "研究方向 / 研究领域"}</strong>
              <ul>{fields.map((field) => <li key={field}>{field}</li>)}</ul>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
