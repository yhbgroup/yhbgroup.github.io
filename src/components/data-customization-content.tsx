"use client";

import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/i18n";
import { getResourceApplicationLink, type SitePageContent } from "@/lib/site-content";

export function DataCustomizationContent({ page }: { page: SitePageContent }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div className="page-shell">
      <PageHero title={{ zh: page.title, en: "Data Customization" }} subtitle={page.subtitle} imageUrl={page.heroImageUrl} />
      <div className="page-content page-content--service">
        <section className="service-layout">
          <div className="service-copy">
            <p>{isEnglish
              ? "The group has long conducted research on air pollution and public-health effects, with findings published in journals including Nature Communications. Customized data are available for the following applications:"
              : "团队长期从事大气污染与公共健康效应研究，相关成果发表于 Nature Communications 等期刊。可针对以下场景提供定制数据："}</p>
            <ul className="process-list">
              <li>{isEnglish ? "Health impact assessment of air quality" : "空气质量健康影响评估"}</li>
              <li>{isEnglish ? "Multi-model comparison and uncertainty analysis" : "多模型对比与不确定性分析"}</li>
              <li>{isEnglish ? "Future-scenario simulation" : "未来情景模拟"}</li>
              <li>{isEnglish ? "Policy evaluation and quantification of environmental health effects" : "政策评估与环境健康效应量化"}</li>
            </ul>
            <p>
              {isEnglish ? "For other requests, contact us directly: " : "其他需求也欢迎直接沟通："}
              <a href="mailto:yuehuanbi@ouc.edu.cn" className="text-link">yuehuanbi@ouc.edu.cn</a>
            </p>
            <a className="primary-action primary-action--inline" href={getResourceApplicationLink("data-customization", language)} target="_blank" rel="noreferrer">
              {isEnglish ? "Submit a Data Customization Request" : "提交定制需求"}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
