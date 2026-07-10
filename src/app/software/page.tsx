import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product-grid";
import { getProducts, getSitePage } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "软件平台",
};

export default async function SoftwarePlatformPage() {
  const [page, products] = await Promise.all([getSitePage("software"), getProducts("software")]);

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

        <ProductGrid
          products={products}
          title="软件清单"
          actionLabel="软件下载"
          columnLabels={{
            name: "软件名称",
            yearRange: "版本号",
            spatialResolution: "适用范围",
            temporalResolution: "维护状态",
            dimensions: "主要功能",
            developer: "开发者",
          }}
        />
      </div>
    </div>
  );
}
