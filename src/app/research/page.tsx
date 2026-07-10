import Link from "next/link";
import { ChemicalText } from "@/components/chemical-text";

export default function ResearchPage() {
  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <h1>研究服务</h1>
          <p>
            <ChemicalText text="平台围绕 PM2.5 污染健康风险、目标浓度设置和数据定制等方向提供数据与工具支持。" />
          </p>
          <Link href="/services/data-customization" className="text-link">
            提交定制需求
          </Link>
        </article>
      </div>
    </div>
  );
}
