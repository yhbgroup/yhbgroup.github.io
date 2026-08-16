"use client";

import { useState } from "react";
import { ChemicalText } from "@/components/chemical-text";
import { DownloadLauncher } from "@/components/download-launcher";
import { useLanguage } from "@/lib/i18n";
import { getLocalizedProducts, type DownloadProduct } from "@/lib/site-content";

type ProductGridProps = {
  products: DownloadProduct[];
  actionLabel?: string;
  title?: string;
  columnLabels?: {
    name: string;
    yearRange: string;
    dataFormat?: string;
    spatialResolution: string;
    temporalResolution: string;
    dimensions: string;
  };
};

const defaultColumnLabels = {
  name: "数据名称",
  yearRange: "年份",
  dataFormat: "数据格式",
  spatialResolution: "空间范围",
  temporalResolution: "时间分辨率",
  dimensions: "主要维度",
};

function formatYearRange(yearRange: string) {
  const items = yearRange.split(/、|,\s*/).map((item) => item.trim()).filter(Boolean);
  const isYearList = items.length > 2 && items.every((item) => /^\d{4}$/.test(item));

  if (!isYearList) {
    return yearRange;
  }

  const lines: string[] = [];
  for (let index = 0; index < items.length; index += 2) {
    lines.push(items.slice(index, index + 2).join(yearRange.includes("、") ? "、" : ", "));
  }

  return (
    <span className="catalog-table__year-list">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  );
}

export function ProductGrid({
  products,
  actionLabel = "数据下载",
  title = "共享清单",
  columnLabels = defaultColumnLabels,
}: ProductGridProps) {
  const { language } = useLanguage();
  const localizedProducts = getLocalizedProducts(language, products[0]?.category);
  const isEnglish = language === "en";
  const labels = isEnglish
    ? products[0]?.category === "software"
      ? {
          name: "Software",
          yearRange: "Version",
          spatialResolution: "Applications",
          temporalResolution: "Maintenance",
          dimensions: "Main Functions",
        }
      : {
          name: "Dataset",
          yearRange: "Years",
          dataFormat: "Format",
          spatialResolution: "Spatial Coverage",
          temporalResolution: "Temporal Resolution",
          dimensions: "Key Dimensions",
        }
    : columnLabels;
  const localizedTitle = isEnglish
    ? products[0]?.category === "software"
      ? "Software Catalog"
      : "Shared Data Catalog"
    : title;
  const localizedSidebarTitle = isEnglish
    ? products[0]?.category === "software"
      ? "Software List"
      : "Data List"
    : products[0]?.category === "software"
      ? "软件列表"
      : "数据列表";
  const localizedActionLabel = isEnglish
    ? products[0]?.category === "software"
      ? "Download Software"
      : "Download Data"
    : actionLabel;
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [referenceProductId, setReferenceProductId] = useState<string | null>(null);
  const selectedProduct = localizedProducts.find((product) => product.id === selectedProductId) || null;
  const referenceProduct = localizedProducts.find((product) => product.id === referenceProductId) || null;

  function downloadRis(product: DownloadProduct) {
    const risText = product.references
      ?.map(
        (reference) =>
          reference.risText ||
          [
            "TY  - GEN",
            `TI  - ${reference.title}`,
            reference.authors ? `AU  - ${reference.authors}` : "",
            reference.year ? `PY  - ${reference.year}` : "",
            reference.doi ? `DO  - ${reference.doi}` : "",
            reference.url ? `UR  - ${reference.url}` : "",
            "ER  -",
          ]
            .filter(Boolean)
            .join("\n"),
      )
      .join("\n\n");

    if (!risText) {
      return;
    }

    const blob = new Blob([risText], { type: "application/x-research-info-systems;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${product.id}.ris`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="catalog-layout" aria-label={isEnglish ? "Data and software catalog" : "数据软件清单"}>
        <aside className="catalog-sidebar" aria-label={localizedSidebarTitle}>
          <div className="catalog-sidebar__title">
            <strong>{localizedSidebarTitle}</strong>
            <span aria-hidden="true">▾</span>
          </div>
          <div className="catalog-sidebar__group">
            {localizedProducts.map((product, index) => (
              <a key={product.id} href={`#${product.id}`}>
                {index + 1}. <ChemicalText text={product.title} />
              </a>
            ))}
          </div>
        </aside>

        <div className="catalog-main">
          <h2>{localizedTitle}</h2>
          <div className="catalog-table-wrap">
            <table className={`catalog-table catalog-table--${products[0]?.category || "data"}`}>
              <thead>
                <tr>
                  <th>{labels.name}</th>
                  <th>{labels.yearRange}</th>
                  {labels.dataFormat ? <th>{labels.dataFormat}</th> : null}
                  <th>{labels.spatialResolution}</th>
                  <th>{labels.temporalResolution}</th>
                  <th className="catalog-table__dimensions-cell">{labels.dimensions}</th>
                  <th className="catalog-table__actions-cell">{isEnglish ? "Actions" : "操作"}</th>
                </tr>
              </thead>
              <tbody>
                {localizedProducts.map((product) => (
                  <tr id={product.id} key={product.id}>
                    <td className="catalog-table__name">
                      <strong>
                        <ChemicalText text={product.title} />
                      </strong>
                      {product.registrationNumber ? (
                        <small>
                          {isEnglish ? "Software Registration No.: " : "软著编号："}
                          {product.registrationNumber}
                        </small>
                      ) : null}
                    </td>
                    <td>{formatYearRange(product.tableMeta.yearRange)}</td>
                    {labels.dataFormat ? <td>{product.tableMeta.dataFormat}</td> : null}
                    <td>
                      <ChemicalText text={product.tableMeta.spatialResolution} />
                    </td>
                    <td>{product.tableMeta.temporalResolution}</td>
                    <td className="catalog-table__dimensions-cell">
                      <ChemicalText text={product.tableMeta.dimensions} />
                    </td>
                    <td className="catalog-table__actions-cell">
                      <div className="catalog-actions">
                        <button
                          type="button"
                          className="table-action"
                          onClick={() => setSelectedProductId(product.id)}
                        >
                          {isEnglish ? "Details" : "详细信息"}
                        </button>
                        <DownloadLauncher
                          products={localizedProducts}
                          productId={product.id}
                          buttonLabel={localizedActionLabel}
                          className="table-action"
                        />
                        <button
                          type="button"
                          className="table-action"
                          onClick={() => setReferenceProductId(product.id)}
                        >
                          {isEnglish ? "References" : "来源文献"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {selectedProduct ? (
        <div className="dialog-backdrop" role="presentation" onClick={() => setSelectedProductId(null)}>
          <section
            className="dialog-panel dialog-panel--detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dialog-panel__header">
              <div>
                <h3 id="product-detail-title">
                  <ChemicalText text={selectedProduct.title} />
                </h3>
              </div>
              <button
                type="button"
                className="dialog-panel__close"
                onClick={() => setSelectedProductId(null)}
                aria-label={isEnglish ? "Close" : "关闭"}
              >
                ×
              </button>
            </div>
            <div className="dialog-panel__body detail-grid">
              {selectedProduct.details
                .filter((detail) => detail.label !== "标题" && detail.label !== "Title")
                .map((detail) => (
                  <div key={detail.label} className="detail-row">
                    <strong>{detail.label}</strong>
                    <p>
                      <ChemicalText text={detail.value} />
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      ) : null}

      {referenceProduct ? (
        <div className="dialog-backdrop" role="presentation" onClick={() => setReferenceProductId(null)}>
          <section
            className="dialog-panel dialog-panel--detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-reference-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dialog-panel__header">
              <div>
                <h3 id="product-reference-title">{isEnglish ? "References" : "来源文献"}</h3>
                <p className="dialog-panel__subtext">
                  <ChemicalText text={referenceProduct.title} />
                </p>
              </div>
              <button
                type="button"
                className="dialog-panel__close"
                onClick={() => setReferenceProductId(null)}
                aria-label={isEnglish ? "Close" : "关闭"}
              >
                ×
              </button>
            </div>
            <div className="dialog-panel__body reference-list">
              {referenceProduct.references?.length ? (
                <>
                  {referenceProduct.references.map((reference) => (
                    <article key={reference.id} className="reference-item">
                      {reference.citationGb ? (
                        <div>
                          <strong>{isEnglish ? "GB/T 7714" : "国标 GB/T 7714"}</strong>
                          <p>
                            <ChemicalText text={reference.citationGb} />
                          </p>
                        </div>
                      ) : null}
                      {reference.citationApa6 ? (
                        <div>
                          <strong>APA 6th</strong>
                          <p>
                            <ChemicalText text={reference.citationApa6} />
                          </p>
                        </div>
                      ) : null}
                      {reference.note ? (
                        <p>
                          <ChemicalText text={reference.note} />
                        </p>
                      ) : null}
                      {reference.url ? (
                        <a className="text-link" href={reference.url} target="_blank" rel="noreferrer">
                          {isEnglish ? "View Publication" : "查看文献"}
                        </a>
                      ) : null}
                    </article>
                  ))}
                  <button
                    type="button"
                    className="primary-action primary-action--inline"
                    onClick={() => downloadRis(referenceProduct)}
                  >
                    {isEnglish ? "Export RIS" : "导出 RIS"}
                  </button>
                </>
              ) : (
                <p className="empty-note">
                  {isEnglish ? "No reference information is available." : "暂无来源文献信息。"}
                </p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
