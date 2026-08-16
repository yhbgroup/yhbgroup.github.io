import { LocalizedServicePage } from "@/components/localized-service-page";

export default function DownloadPage() {
  return <LocalizedServicePage
    title={{ zh: "资源申请", en: "Resource Applications" }}
    body={{
      zh: "数据和软件资源统一通过问卷星登记。请先选择数据平台或软件平台中的具体条目，再打开对应申请表。",
      en: "Applications for data and software resources are registered through Wenjuanxing. Select a specific item on the Data Platform or Software Platform page, and then open the corresponding application form.",
    }}
    link={{ href: "/data", label: { zh: "前往数据平台", en: "Go to the Data Platform" } }}
  />;
}
