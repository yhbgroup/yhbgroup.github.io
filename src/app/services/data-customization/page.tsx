import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { externalWorkflowLinks } from "@/lib/site-content";
import { getSitePage } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "数据定制",
};

export default async function DataCustomizationPage() {
  const page = await getSitePage("data-customization");

  return (
    <div className="page-shell">
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        imageUrl={page.heroImageUrl}
      />

      <div className="page-content page-content--service">
        <section className="service-layout">
          <div className="service-copy">
            <p>
              团队长期从事大气污染与公共健康效应研究，相关成果发表于 Nature Communications
              等期刊。基于暴露-响应模型体系，可针对以下场景提供定制数据：
            </p>
            <ul className="process-list">
              <li>空气质量健康影响评估</li>
              <li>多模型对比与不确定性分析</li>
              <li>未来情景模拟</li>
              <li>政策评估与环境健康效应量化</li>
            </ul>
            <p>
              其他需求也欢迎直接沟通：
              <a href="mailto:yuehuanbi@ouc.edu.cn" className="text-link">
                yuehuanbi@ouc.edu.cn
              </a>
            </p>
            <a
              className="primary-action primary-action--inline"
              href={externalWorkflowLinks.customizationSurveyUrl}
              target="_blank"
              rel="noreferrer"
            >
              提交定制需求
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
