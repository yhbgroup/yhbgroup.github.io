/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getSitePage, getTeamMembers } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "团队介绍",
};

export default async function TeamPage() {
  const [page, teamMembers] = await Promise.all([getSitePage("team"), getTeamMembers()]);

  return (
    <div className="page-shell">
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        imageUrl={page.heroImageUrl}
      />

      <div className="page-content page-content--narrow">
        {page.introTitle || page.introBody ? (
          <section className="section-intro section-intro--wide">
            <div>
              {page.introTitle ? <h2>{page.introTitle}</h2> : null}
              {page.introBody ? <p>{page.introBody}</p> : null}
            </div>
          </section>
        ) : null}

        <section className="team-grid">
          {teamMembers.map((member) => (
            <article key={`${member.name}-${member.institution}`} className="team-card">
              <img src={member.photoUrl} alt={`${member.name}照片`} />
              <div>
                <h3>{member.name}</h3>
                <strong>{member.institution}</strong>
                {member.role ? <p className="team-card__role">{member.role}</p> : null}
                {member.description ? <p>{member.description}</p> : null}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
