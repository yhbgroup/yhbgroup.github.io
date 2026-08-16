import { LocalizedServicePage } from "@/components/localized-service-page";

export default function LicensingPage() {
  return <LocalizedServicePage
    title={{ zh: "使用授权", en: "Licensing" }}
    body={{
      zh: "数据、软件和相关资源应按照申请用途使用，并遵守网站数据使用协议。",
      en: "Data, software, and related resources must be used for the purpose stated in the application and in accordance with the website's Resource Use Agreement.",
    }}
    link={{ href: "/agreement", label: { zh: "查看数据使用协议", en: "View the Resource Use Agreement" } }}
  />;
}
