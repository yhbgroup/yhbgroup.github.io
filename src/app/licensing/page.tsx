import Link from "next/link";

export default function LicensingPage() {
  return (
    <div className="page-shell">
      <div className="page-content page-content--service">
        <article className="agreement-panel">
          <h1>使用授权</h1>
          <p>数据、软件和相关资源应按照申请用途使用，并遵守网站数据使用协议。</p>
          <Link href="/agreement" className="text-link">
            查看数据使用协议
          </Link>
        </article>
      </div>
    </div>
  );
}
