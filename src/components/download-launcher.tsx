import { resourceApplicationLinks, type DownloadProduct } from "@/lib/site-content";

type DownloadLauncherProps = {
  products: DownloadProduct[];
  productId?: string;
  buttonLabel?: string;
  className?: string;
};

export function DownloadLauncher({
  products,
  productId,
  buttonLabel = "数据下载",
  className = "secondary-action",
}: DownloadLauncherProps) {
  const selectedProduct = products.find((product) => product.id === productId) || products[0];
  const href = selectedProduct ? resourceApplicationLinks[selectedProduct.id] || "#" : "#";

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {buttonLabel}
    </a>
  );
}
