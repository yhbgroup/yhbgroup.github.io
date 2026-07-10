import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product-grid";
import { getProducts, getSitePage } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "数据平台",
};

export default async function DataPlatformPage() {
  const [page, products] = await Promise.all([getSitePage("data"), getProducts("data")]);

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

        <ProductGrid products={products} title="共享数据清单" actionLabel="数据下载" />
      </div>
    </div>
  );
}
