/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { ChemicalText } from "@/components/chemical-text";
import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/i18n";
import {
  getLocalizedTeam,
  publicationContent,
  representativePublications,
  type SitePageContent,
} from "@/lib/site-content";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function PublicationAuthors({ authors, highlightAuthors }: { authors: string; highlightAuthors: string[] }) {
  if (!highlightAuthors.length) {
    return authors;
  }

  const authorPattern = new RegExp(`(${highlightAuthors.map(escapeRegExp).join("|")})`, "g");

  return authors.split(authorPattern).map((part, index) =>
    highlightAuthors.includes(part)
      ? <strong key={`${part}-${index}`}>{part}</strong>
      : part,
  );
}

export function HomeContent({ page }: { page: SitePageContent }) {
  const { language } = useLanguage();
  const { intro } = getLocalizedTeam(language);
  const isEnglish = language === "en";
  const { headings, highlightAuthors } = publicationContent.settings;
  const featuredPublications = representativePublications
    .filter((publication) => publication.feature)
    .sort((first, second) => first.feature!.order - second.feature!.order);
  const publicationYears = [...new Set(representativePublications.map((publication) => publication.year))];

  return (
    <div className="page-shell">
      <PageHero
        title={{ zh: page.title, en: "Home" }}
        subtitle={page.subtitle}
        imageUrl={page.heroImageUrl}
      />
      <div className="page-content page-content--team">
        <section className="team-overview" aria-labelledby="team-overview-title">
          <div className="team-overview__content">
            <h2 id="team-overview-title">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="team-overview__logo" aria-hidden="true"><img src="/logo.png" alt="" /></div>
        </section>

        <section className="publication-section" aria-labelledby="publication-title">
          <div className="publication-section__heading">
            <h2 id="publication-title">{headings.featured[language]}</h2>
          </div>
          <div className="publication-features">
            {featuredPublications.map((publication) => {
              const feature = publication.feature!;
              const featureTitle = isEnglish ? feature.titleEn : feature.titleZh;
              const figureLabel = isEnglish ? feature.figureEn ?? feature.figure : feature.figure;
              const featureCaption = isEnglish ? feature.captionEn : feature.captionZh;
              const featureCaptionLink = isEnglish ? feature.captionLinkEn : feature.captionLinkZh;
              const featureCaptionSuffix = isEnglish ? feature.captionSuffixEn : feature.captionSuffixZh;

              return (
                <article key={publication.url} className="publication-feature">
                  <a href={feature.imageSourceUrl ?? publication.url} target="_blank" rel="noreferrer" className="publication-feature__image">
                    <Image
                      src={feature.image}
                      alt={`${featureTitle} (${figureLabel})`}
                      width={800}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                    />
                  </a>
                  <div className="publication-feature__copy">
                    <h4><a href={publication.url} target="_blank" rel="noreferrer"><ChemicalText text={featureTitle} /></a></h4>
                    {featureCaption && (
                      <p className="publication-feature__caption">
                        {featureCaption}
                        {feature.captionUrl && (
                          <>
                            {isEnglish ? " " : ""}
                            <a href={feature.captionUrl} target="_blank" rel="noreferrer">
                              {featureCaptionLink}
                            </a>
                            {featureCaptionSuffix}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="publication-bibliography">
            <h3 className="publication-subheading">
              {headings.journal[language]}
            </h3>
            {publicationYears.map((year) => (
              <section key={year} className="publication-year" aria-label={year}>
                <h4>{year}</h4>
                <ol className="publication-list">
                  {representativePublications.filter((publication) => publication.year === year).map((publication) => (
                    <li key={publication.url} className="publication-item">
                      <span className="publication-item__number" aria-hidden="true">
                        [{String(representativePublications.indexOf(publication) + 1).padStart(2, "0")}]
                      </span>
                      <p>
                        <span className="publication-item__authors">
                          <PublicationAuthors authors={publication.authors} highlightAuthors={highlightAuthors} />
                        </span> ({publication.year}). {" "}
                        <a href={publication.url} target="_blank" rel="noreferrer">
                          <ChemicalText text={publication.title} />
                        </a>
                        . <em>{publication.journal}</em>, {publication.volume}, {publication.article}. {" "}
                        {publication.doi && (
                          <a href={publication.url} target="_blank" rel="noreferrer" className="publication-item__doi">
                            {publication.doi}
                          </a>
                        )}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
