import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  contactInfo,
  dataProducts,
  downloadProducts,
  softwareProducts,
  teamIntro,
  teamMembers,
  type ContactInfo,
  type SitePageContent,
  type TeamIntro,
  type TeamMember,
} from "@/lib/site-content";

const publicImageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif"] as const;

const pageHeroImageNames: Record<string, string> = {
  data: "data",
  software: "software",
  "data-customization": "services",
  contact: "services",
  team: "team",
};

function resolvePublicImagePath(imageName: string) {
  for (const extension of publicImageExtensions) {
    const publicPath = `/${imageName}${extension}`;
    const filePath = join(process.cwd(), "public", `${imageName}${extension}`);

    if (existsSync(filePath)) {
      return publicPath;
    }
  }

  return `/${imageName}.png`;
}

export const fallbackPages: Record<string, SitePageContent> = {
  data: {
    title: "数据平台",
    heroImageUrl: "/data",
  },
  software: {
    title: "软件平台",
    heroImageUrl: "/software",
  },
  "data-customization": {
    title: "数据定制",
    heroImageUrl: "/services",
  },
  contact: {
    title: "联系我们",
    heroImageUrl: "/services",
  },
  team: {
    title: "团队介绍",
    heroImageUrl: "/team",
  },
};

const fallbackAgreement = {
  title: "数据与软件资源使用协议",
  version: "v1.0",
  content:
    "用户应按照申请用途使用本网站提供的数据、软件和相关资源；在论文、报告、政策文件或其他成果中使用相关资源时，应正确引用本网站及对应来源文献；未经许可，不得将数据或软件用于超出申请范围的再分发、转售或其他不当用途；平台将根据数据版本和维护情况更新相关资源。",
};

export function getProducts(category?: "data" | "software") {
  if (category === "data") {
    return dataProducts;
  }

  if (category === "software") {
    return softwareProducts;
  }

  return downloadProducts;
}

export function getProduct(productId: string) {
  return downloadProducts.find((product) => product.id === productId);
}

export function getSitePage(pageKey: string): SitePageContent {
  const page = fallbackPages[pageKey] || fallbackPages.data;
  const imageName = pageHeroImageNames[pageKey] || pageHeroImageNames.data;

  return {
    ...page,
    heroImageUrl: resolvePublicImagePath(imageName),
  };
}

export function getContactInfo(): ContactInfo {
  return contactInfo;
}

export function getTeamIntro(): TeamIntro {
  return teamIntro;
}

export function getActiveAgreement() {
  return fallbackAgreement;
}

export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}
