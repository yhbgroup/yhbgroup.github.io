import Image from "next/image";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  imageUrl?: string;
};

const defaultImage =
  "/data.png";

export function PageHero({ title, subtitle, eyebrow, imageUrl = defaultImage }: PageHeroProps) {
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
        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {subtitle ? <p className="page-hero__subtitle">{subtitle}</p> : null}
      </div>
    </section>
  );
}
