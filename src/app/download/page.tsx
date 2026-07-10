import Link from "next/link";

export default function DownloadPage() {
  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <h1>资源申请</h1>
          <p>数据和软件资源统一通过问卷星登记。请先选择数据平台或软件平台中的具体条目，再打开对应申请表。</p>
          <Link href="/data" className="text-link">
            前往数据平台
          </Link>
        </article>
      </div>
    </div>
  );
}
