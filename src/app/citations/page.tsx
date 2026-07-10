import Link from "next/link";

export default function CitationsPage() {
  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <h1>来源文献</h1>
          <p>来源文献信息已整理在各数据和软件条目的详情中，可在清单操作区查看并导出 RIS。</p>
          <Link href="/data" className="text-link">
            查看数据清单
          </Link>
        </article>
      </div>
    </div>
  );
}
