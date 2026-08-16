"use client";

import Image from "next/image";
import { useLanguage, type LocalizedText } from "@/lib/i18n";

type PageHeroProps = {
  title: string | LocalizedText;
  subtitle?: string | LocalizedText;
  eyebrow?: string | LocalizedText;
  imageUrl?: string;
};

const defaultImage =
  "/data.png";

export function PageHero({ title, subtitle, eyebrow, imageUrl = defaultImage }: PageHeroProps) {
  const { language } = useLanguage();
  const resolve = (value?: string | LocalizedText) =>
    typeof value === "string" || !value ? value : value[language];

  return (
    <section className="page-hero">
      <Image
        className="page-hero__image"
        src={imageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="page-hero__content">
        {eyebrow ? <p className="page-hero__eyebrow">{resolve(eyebrow)}</p> : null}
        <h1>{resolve(title)}</h1>
        {subtitle ? <p className="page-hero__subtitle">{resolve(subtitle)}</p> : null}
      </div>
    </section>
  );
}
