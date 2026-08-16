import { getResourceApplicationLink, type DownloadProduct } from "@/lib/site-content";
import { useLanguage } from "@/lib/i18n";

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
  const { language } = useLanguage();
  const selectedProduct = products.find((product) => product.id === productId) || products[0];
  const href = selectedProduct ? getResourceApplicationLink(selectedProduct.id, language) : "#";

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {language === "en" && buttonLabel === "数据下载"
        ? "Download Data"
        : language === "en" && buttonLabel === "软件下载"
          ? "Download Software"
          : buttonLabel}
    </a>
  );
}
