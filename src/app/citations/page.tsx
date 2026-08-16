import { LocalizedServicePage } from "@/components/localized-service-page";

export default function CitationsPage() {
  return <LocalizedServicePage
    title={{ zh: "来源文献", en: "References" }}
    body={{
      zh: "来源文献信息已整理在各数据和软件条目的详情中，可在清单操作区查看并导出 RIS。",
      en: "References are provided with each data and software entry. They can be viewed from the catalog and exported in RIS format.",
    }}
    link={{ href: "/data", label: { zh: "查看数据清单", en: "View the Data Catalog" } }}
  />;
}
