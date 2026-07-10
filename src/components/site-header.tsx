"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, platformName, type NavItem } from "@/lib/site-content";

function isNavGroupActive(pathname: string, href?: string, children: NavItem[] = []) {
  if (href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return children.some((item) => pathname.startsWith(item.href));
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/data" className="site-header__brand">
          <Image
            src="/logo.png"
            alt={`${platformName} 标识`}
            width={38}
            height={38}
            className="site-header__brand-logo"
            priority
          />
          <span className="site-header__brand-text">
            <strong>{platformName}</strong>
            <small>大气环境政策研究团队</small>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="主导航">
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
      </div>
    </header>
  );
}
