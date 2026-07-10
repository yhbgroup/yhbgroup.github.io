import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getContactInfo, getSitePage } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "联系我们",
};

export default async function ContactPage() {
  const [page, contactInfo] = await Promise.all([getSitePage("contact"), getContactInfo()]);

  return (
    <div className="page-shell">
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        imageUrl={page.heroImageUrl}
      />

      <div className="page-content page-content--service">
        <section className="contact-layout">
          <article className="contact-card">
            <h2>{contactInfo.name}</h2>
            <p className="contact-card__title">{contactInfo.title}</p>
            <div className="contact-card__block">
              <strong>邮箱</strong>
              {contactInfo.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="text-link">
                  {email}
                </a>
              ))}
            </div>
            <div className="contact-card__block">
              <strong>研究方向 / 研究领域</strong>
              <ul>
                {contactInfo.fields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
