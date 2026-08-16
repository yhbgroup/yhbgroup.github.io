import { LocalizedServicePage } from "@/components/localized-service-page";

export default function MetadataPage() {
  return <LocalizedServicePage
    title={{ zh: "元数据说明", en: "Metadata" }}
    body={{
      zh: "每个资源条目包含时间范围、空间范围、数据格式、主要维度和维护状态等元数据信息。",
      en: "Each resource entry includes metadata such as time range, spatial coverage, data format, key dimensions, and maintenance status.",
    }}
    link={{ href: "/data", label: { zh: "查看数据平台", en: "View the Data Platform" } }}
  />;
}
