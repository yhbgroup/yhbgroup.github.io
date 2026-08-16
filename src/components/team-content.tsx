/* eslint-disable @next/next/no-img-element */
"use client";

import { useLanguage } from "@/lib/i18n";
import { getLocalizedTeam, type SitePageContent } from "@/lib/site-content";
import { PageHero } from "@/components/page-hero";

export function TeamContent({ page }: { page: SitePageContent }) {
  const { language } = useLanguage();
  const { intro: teamIntro, members: teamMembers } = getLocalizedTeam(language);
  const isEnglish = language === "en";

  return (
    <div className="page-shell">
      <PageHero title={{ zh: page.title, en: "About Us" }} subtitle={page.subtitle} imageUrl={page.heroImageUrl} />
      <div className="page-content page-content--team">
        <section className="team-overview" aria-labelledby="team-overview-title">
          <div className="team-overview__content">
            <h2 id="team-overview-title">{teamIntro.title}</h2>
            {teamIntro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="team-overview__logo" aria-hidden="true"><img src="/logo.png" alt="" /></div>
        </section>
        <section className="team-section-heading" aria-labelledby="team-members-title">
          <h2 id="team-members-title">{isEnglish ? "Team Members" : "团队成员"}</h2>
        </section>
        <section className="team-list" aria-label={isEnglish ? "Team members" : "团队成员"}>
          {teamMembers.map((member) => (
            <article key={`${member.name}-${member.institution}`} className="team-member">
              <div className="team-member__photo">
                <img src={member.photoUrl} alt={isEnglish ? `Portrait of ${member.name}` : `${member.name}照片`} />
              </div>
              <div className="team-member__content">
                <div className="team-member__header">
                  <h3>{member.name}</h3>
                  <p>{[member.role, member.institution].filter(Boolean).join(isEnglish ? ", " : "，")}</p>
                </div>
                {member.description ? (
                  <div className="team-member__bio">
                    {(Array.isArray(member.description) ? member.description : [member.description]).map(
                      (paragraph) => <p key={paragraph}>{paragraph}</p>,
                    )}
                  </div>
                ) : null}
                {member.links?.length ? (
                  <div className="team-member__links">
                    {member.links.map((link) => (
                      <p key={link.href}>
                        <span>{link.label} </span>
                        <a href={link.href} target="_blank" rel="noreferrer">{link.text || link.href}</a>
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
