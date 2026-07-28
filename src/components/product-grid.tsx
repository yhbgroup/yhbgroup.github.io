"use client";

import { useState } from "react";
import { ChemicalText } from "@/components/chemical-text";
import { DownloadLauncher } from "@/components/download-launcher";
import type { DownloadProduct } from "@/lib/site-content";

type ProductGridProps = {
  products: DownloadProduct[];
  actionLabel?: string;
  title?: string;
  sidebarTitle?: string;
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
  name: "清单名称",
  yearRange: "年份",
  dataFormat: "数据格式",
  spatialResolution: "空间范围",
  temporalResolution: "时间分辨率",
  dimensions: "主要维度",
};

function formatYearRange(yearRange: string) {
  const items = yearRange.split("、").map((item) => item.trim()).filter(Boolean);
  const isYearList = items.length > 2 && items.every((item) => /^\d{4}$/.test(item));

  if (!isYearList) {
    return yearRange;
  }

  const lines: string[] = [];
  for (let index = 0; index < items.length; index += 2) {
    lines.push(items.slice(index, index + 2).join("、"));
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
  sidebarTitle = "清单列表",
  columnLabels = defaultColumnLabels,
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<DownloadProduct | null>(null);
  const [referenceProduct, setReferenceProduct] = useState<DownloadProduct | null>(null);

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
      <section className="catalog-layout" aria-label="数据软件清单">
        <aside className="catalog-sidebar" aria-label={sidebarTitle}>
          <div className="catalog-sidebar__title">
            <strong>{sidebarTitle}</strong>
            <span aria-hidden="true">▾</span>
          </div>
          <div className="catalog-sidebar__group">
            <p>{products[0]?.category === "software" ? "软件平台" : "数据平台"}</p>
            {products.map((product, index) => (
              <a key={product.id} href={`#${product.id}`}>
                {index + 1}. <ChemicalText text={product.title} />
              </a>
            ))}
          </div>
        </aside>

        <div className="catalog-main">
          <h2>{title}</h2>
          <div className="catalog-table-wrap">
            <table className="catalog-table">
              <thead>
                <tr>
                  <th>{columnLabels.name}</th>
                  <th>{columnLabels.yearRange}</th>
                  {columnLabels.dataFormat ? <th>{columnLabels.dataFormat}</th> : null}
                  <th>{columnLabels.spatialResolution}</th>
                  <th>{columnLabels.temporalResolution}</th>
                  <th className="catalog-table__dimensions-cell">{columnLabels.dimensions}</th>
                  <th className="catalog-table__actions-cell">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr id={product.id} key={product.id}>
                    <td className="catalog-table__name">
                      <strong>
                        <ChemicalText text={product.title} />
                      </strong>
                      {product.registrationNumber ? (
                        <small>软著编号：{product.registrationNumber}</small>
                      ) : null}
                    </td>
                    <td>{formatYearRange(product.tableMeta.yearRange)}</td>
                    {columnLabels.dataFormat ? <td>{product.tableMeta.dataFormat}</td> : null}
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
                          onClick={() => setSelectedProduct(product)}
                        >
                          详细信息
                        </button>
                        <DownloadLauncher
                          products={products}
                          productId={product.id}
                          buttonLabel={actionLabel}
                          className="table-action"
                        />
                        <button
                          type="button"
                          className="table-action"
                          onClick={() => setReferenceProduct(product)}
                        >
                          来源文献
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
        <div className="dialog-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
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
                onClick={() => setSelectedProduct(null)}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <div className="dialog-panel__body detail-grid">
              {selectedProduct.details
                .filter((detail) => detail.label !== "标题")
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
        <div className="dialog-backdrop" role="presentation" onClick={() => setReferenceProduct(null)}>
          <section
            className="dialog-panel dialog-panel--detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-reference-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dialog-panel__header">
              <div>
                <h3 id="product-reference-title">来源文献</h3>
                <p className="dialog-panel__subtext">
                  <ChemicalText text={referenceProduct.title} />
                </p>
              </div>
              <button
                type="button"
                className="dialog-panel__close"
                onClick={() => setReferenceProduct(null)}
                aria-label="关闭"
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
                          <strong>国标 GB/T 7714</strong>
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
                          查看文献
                        </a>
                      ) : null}
                    </article>
                  ))}
                  <button
                    type="button"
                    className="primary-action primary-action--inline"
                    onClick={() => downloadRis(referenceProduct)}
                  >
                    导出 RIS
                  </button>
                </>
              ) : (
                <p className="empty-note">暂无来源文献信息。</p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
