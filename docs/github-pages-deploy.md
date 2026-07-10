# GitHub Pages 部署说明

目标访问地址：

```text
https://yhbgroup.github.io/
```

## 仓库要求

- GitHub 用户名或组织名：`yhbgroup`
- 仓库名：`yhbgroup.github.io`
- 发布分支：`main`
- Pages 发布源：GitHub Actions

这是 GitHub Pages 用户站点的固定命名规则。仓库如果命名为其他名称，访问地址会变成子路径，不是 `https://yhbgroup.github.io/`。

## 构建方式

项目使用 Next.js 静态导出：

```ts
output: "export"
trailingSlash: true
```

构建后生成 `out/`，GitHub Actions 会上传并发布该目录。

## 外部表单

用户填写内容由问卷星收集。数据和软件下载按钮会直接跳转到对应资源的问卷星链接，链接集中维护在：

```text
src/content/resource-links.json
```

数据定制需求表链接仍维护在：

```text
src/lib/site-content.ts
```

资源下载链接建议放在问卷星提交完成页中。

## 中国访问注意事项

本站代码层面已减少外部依赖：

- 页面主体为静态 HTML/CSS/JS。
- 图片和头像资源放在 `public/` 目录随站点发布。
- 不使用 Google Fonts、外部 CDN、远程脚本或第三方统计。

`github.io` 在中国大陆的网络可达性仍取决于实际网络环境，代码无法完全保证，但静态化和本地资源可以降低失败概率。
