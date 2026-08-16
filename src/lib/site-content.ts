import productsData from "@/content/products.json";
import resourceLinksData from "@/content/resource-links.json";
import teamData from "@/content/team.json";
import { productTranslationsEn, teamContentEn } from "@/content/content-en";
import type { Language } from "@/lib/i18n";

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
  { href: "/team", label: "团队介绍" },
  { href: "/data", label: "数据平台" },
  { href: "/software", label: "软件平台" },
  {
    label: "用户服务",
    children: [
      { href: "/services/data-customization", label: "数据定制" },
      { href: "/services/contact", label: "联系我们" },
    ],
  },
];

export const navGroupsEn: NavGroup[] = [
  { href: "/team", label: "About Us" },
  { href: "/data", label: "Data Platform" },
  { href: "/software", label: "Software Platform" },
  {
    label: "Services",
    children: [
      { href: "/services/data-customization", label: "Data Customization" },
      { href: "/services/contact", label: "Contact Us" },
    ],
  },
];

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
  note?: string;
  citationGb?: string;
  citationApa6?: string;
  risText?: string;
};

export const downloadProducts = productsData as DownloadProduct[];

type LocalizedResourceLink = Record<Language, string>;

export const resourceApplicationLinks = resourceLinksData as Record<string, LocalizedResourceLink>;

export function getResourceApplicationLink(resourceId: string, language: Language) {
  const links = resourceApplicationLinks[resourceId];
  return links?.[language] || links?.zh || "#";
}

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
  description?: string | string[];
  links?: Array<{
    label: string;
    text?: string;
    href: string;
  }>;
};

export type TeamIntro = {
  title: string;
  paragraphs: string[];
};

export type TeamContent = {
  intro: TeamIntro;
  members: TeamMember[];
};

const defaultTeamIntro: TeamIntro = {
  title: "团队简介",
  paragraphs: [
    "大气环境政策研究团队聚焦城市大气环境政策目标设置、健康效益评估与环境风险管理，综合地理数据分析、政策评估和流行病学模型等方法，开展面向环境政策和公共健康的交叉研究。",
  ],
};

const normalizedTeamContent = Array.isArray(teamData)
  ? {
      intro: defaultTeamIntro,
      members: teamData as TeamMember[],
    }
  : (teamData as TeamContent);

export const teamIntro = normalizedTeamContent.intro;
export const teamMembers = normalizedTeamContent.members;

export function getLocalizedNavGroups(language: Language) {
  return language === "en" ? navGroupsEn : navGroups;
}

export function getLocalizedProducts(language: Language, category?: "data" | "software") {
  const source = category ? downloadProducts.filter((product) => product.category === category) : downloadProducts;

  if (language === "zh") {
    return source;
  }

  return source.map((product) => {
    const translation = productTranslationsEn[product.id];
    if (!translation) {
      return product;
    }

    return {
      ...product,
      ...translation,
      references: product.references?.map((reference) => ({
        ...reference,
        ...(translation.references?.[reference.id] || {}),
      })),
    } satisfies DownloadProduct;
  });
}

export function getLocalizedTeam(language: Language): TeamContent {
  if (language === "en") {
    return teamContentEn;
  }

  return {
    intro: teamIntro,
    members: teamMembers,
  };
}

export function getProductById(productId: string) {
  return downloadProducts.find((product) => product.id === productId);
}
