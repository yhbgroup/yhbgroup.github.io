import productsData from "@/content/products.json";
import resourceLinksData from "@/content/resource-links.json";
import teamData from "@/content/team.json";

export const platformName = "YHB Group";

export type NavItem = {
  href: string;
  label: string;
};

export type NavGroup = {
  href?: string;
  label: string;
  children?: NavItem[];
};

export const navGroups: NavGroup[] = [
  { href: "/data", label: "数据平台" },
  { href: "/software", label: "软件平台" },
  {
    label: "用户服务",
    children: [
      { href: "/services/data-customization", label: "数据定制" },
      { href: "/services/contact", label: "联系我们" },
    ],
  },
  { href: "/team", label: "团队介绍" },
];

export const externalWorkflowLinks = {
  customizationSurveyUrl: "https://v.wjx.cn/vm/PbUV4kG.aspx#",
};

export type DownloadProduct = {
  id: string;
  category: "data" | "software";
  title: string;
  shortTitle: string;
  description: string;
  registrationNumber?: string;
  updateNote: string;
  filters: {
    years?: string[];
    provinces?: string[];
    diseases?: string[];
    scenarios?: string[];
    models?: string[];
    formats?: string[];
  };
  tableMeta: {
    yearRange: string;
    dataFormat: string;
    spatialResolution: string;
    temporalResolution: string;
    dimensions: string;
    releaseDate: string;
    developer: string;
  };
  details: Array<{ label: string; value: string }>;
  references?: SourceReference[];
};

export type SourceReference = {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  journal?: string;
  doi?: string;
  url?: string;
  citationGb?: string;
  citationApa6?: string;
  risText?: string;
};

export const downloadProducts = productsData as DownloadProduct[];
export const resourceApplicationLinks = resourceLinksData as Record<string, string>;

export const dataProducts = downloadProducts.filter((product) => product.category === "data");
export const softwareProducts = downloadProducts.filter((product) => product.category === "software");

export const contactInfo = {
  name: "岳桓陛",
  title: "中国海洋大学行政管理系副教授",
  emails: ["yuehuanbi@ouc.edu.cn", "yuehuanbi@163.com"],
  fields: ["环境政策及其公共健康效应", "城市化的生态环境风险", "国土空间规划"],
};

export type ContactInfo = typeof contactInfo;

export type SitePageContent = {
  title: string;
  subtitle?: string;
  heroImageUrl: string;
  introTitle?: string;
  introBody?: string;
};

export type TeamMember = {
  name: string;
  institution: string;
  role?: string;
  photoUrl: string;
  description?: string;
};

export const teamMembers = teamData as TeamMember[];

export function getProductById(productId: string) {
  return downloadProducts.find((product) => product.id === productId);
}
