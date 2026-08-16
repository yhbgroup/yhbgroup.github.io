import { LocalizedServicePage } from "@/components/localized-service-page";

export default function ResearchPage() {
  return <LocalizedServicePage
    title={{ zh: "研究服务", en: "Research Services" }}
    body={{
      zh: "平台围绕 PM2.5 污染健康风险、目标浓度设置和数据定制等方向提供数据与工具支持。",
      en: "The platform provides data and tools for research on PM2.5 health risks, target-concentration setting, and customized data services.",
    }}
    link={{ href: "/services/data-customization", label: { zh: "提交定制需求", en: "Submit a Data Customization Request" } }}
    chemicalText
  />;
}
