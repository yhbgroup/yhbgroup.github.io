"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { getLocalizedNavGroups, platformName, type NavItem } from "@/lib/site-content";

function isNavGroupActive(pathname: string, href?: string, children: NavItem[] = []) {
  if (href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return children.some((item) => pathname.startsWith(item.href));
}

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const navGroups = getLocalizedNavGroups(language);
  const groupName =
    language === "zh" ? "大气环境政策研究团队" : "Atmospheric Environmental Policy Research Group";

  useEffect(() => {
    const routeTitles: Record<string, { zh: string; en: string }> = {
      "/": { zh: "团队介绍", en: "About Us" },
      "/team": { zh: "团队介绍", en: "About Us" },
      "/data": { zh: "数据平台", en: "Data Platform" },
      "/software": { zh: "软件平台", en: "Software Platform" },
      "/services/data-customization": { zh: "数据定制", en: "Data Customization" },
      "/services/contact": { zh: "联系我们", en: "Contact Us" },
      "/agreement": { zh: "数据与软件资源使用协议", en: "Resource Use Agreement" },
      "/citations": { zh: "来源文献", en: "References" },
      "/download": { zh: "资源申请", en: "Resource Applications" },
      "/licensing": { zh: "使用授权", en: "Licensing" },
      "/metadata": { zh: "元数据说明", en: "Metadata" },
      "/research": { zh: "研究服务", en: "Research Services" },
    };
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    const title = routeTitles[normalizedPath] || routeTitles["/"];
    document.title = `${title[language]} | ${platformName}`;
  }, [language, pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/team" className="site-header__brand">
          <Image
            src="/logo.png"
            alt={language === "zh" ? `${platformName} 标识` : `${platformName} logo`}
            width={38}
            height={38}
            className="site-header__brand-logo"
            priority
          />
          <span className="site-header__brand-text">
            <strong>{platformName}</strong>
            <small>{groupName}</small>
          </span>
        </Link>

        <div className="site-header__actions">
          <nav className="site-header__nav" aria-label={language === "zh" ? "主导航" : "Main navigation"}>
          {navGroups.map((group) => {
            const isActive = isNavGroupActive(pathname, group.href, group.children);

            if (group.children?.length) {
              return (
                <div key={group.label} className="site-header__dropdown">
                  <button
                    type="button"
                    className={`site-header__link is-button ${isActive ? "is-active" : ""}`}
                  >
                    {group.label}
                    <span aria-hidden="true">▾</span>
                  </button>
                  <div className="site-header__menu">
                    {group.children.map((item) => (
                      <Link key={item.href} href={item.href} className="site-header__menu-item">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (!group.href) {
              return null;
            }

            return (
              <Link
                key={group.href}
                href={group.href}
                className={`site-header__link ${isActive ? "is-active" : ""}`}
              >
                {group.label}
              </Link>
            );
          })}
          </nav>
          <div className="language-switcher">
            <button
              type="button"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
            >
              {language === "zh" ? "English" : "中文"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
