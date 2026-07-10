import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { platformName } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: platformName,
    template: `%s | ${platformName}`,
  },
  description: "大气环境政策研究团队数据、软件工具、数据定制和团队信息平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body suppressHydrationWarning>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="site-footer__inner">
              <p>© {new Date().getFullYear()} {platformName}</p>
              <p>大气环境政策研究团队</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
