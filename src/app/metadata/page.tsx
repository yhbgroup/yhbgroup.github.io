import Link from "next/link";

export default function MetadataPage() {
  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <h1>元数据说明</h1>
          <p>每个资源条目包含时间范围、空间范围、数据格式、主要维度和维护状态等元数据信息。</p>
          <Link href="/data" className="text-link">
            查看数据平台
          </Link>
        </article>
      </div>
    </div>
  );
}
