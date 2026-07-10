# 内容更新说明

网站的数据和软件清单集中维护在：

```text
src/content/products.json
```

团队成员信息集中维护在：

```text
src/content/team.json
```

数据和软件下载链接集中维护在：

```text
src/content/resource-links.json
```

网站页眉 logo 使用：

```text
public/logo.png
```

页面顶部栏图片使用：

```text
public/data.*
public/software.*
public/services.*
public/team.*
```

页面组件只负责展示，不需要为了新增或修改资源去改 `src/app` 或 `src/components` 里的页面代码。

## 更新流程

1. 打开 `src/content/products.json`。
2. 修改已有资源，或复制一个完整资源对象新增一条。
3. 保存后运行：

```powershell
npm install
npm run lint
npm run build
```

4. 构建通过后提交并推送。

## 数据和软件字段说明

- `id`：资源唯一标识，只用小写英文、数字和短横线。
- `category`：`data` 表示数据资源，`software` 表示软件资源。
- `title`：网页表格中的完整名称。
- `shortTitle`：左侧清单和紧凑位置使用的短名称。
- `description`：资源简短说明。
- `registrationNumber`：软件著作权编号；数据资源可不填。
- `updateNote`：资源申请说明。
- `filters`：资源筛选项，可用于记录数据年份、区域、情景、格式等信息。
- `tableMeta`：表格展示字段。
- `details`：点击“详细信息”后展示的字段。
- `references`：点击“来源文献”后展示的文献。

## 下载链接维护

`src/content/resource-links.json` 中的键是资源 `id`，值是对应问卷星链接。更换问卷星链接时只改这个文件。

```json
{
  "global-cmip6-pm25-calibrated": "https://v.wjx.cn/vm/PCGUAtN.aspx#"
}
```

如果新增资源，需要同时在 `products.json` 中新增资源条目，并在 `resource-links.json` 中增加同名 `id` 的链接。

## Logo 维护

页眉 logo 固定读取：

```text
public/logo.png
```

更换 logo 时，用新的图片覆盖这个文件即可，不需要改代码。建议使用正方形 PNG。

## 顶部栏图片维护

各页面顶部栏固定读取以下图片。更换图片时，直接覆盖对应文件即可，不需要改代码。

- `data.*`：数据平台
- `software.*`：软件平台
- `services.*`：数据定制、联系我们
- `team.*`：团队介绍

支持的图片后缀为 `.png`、`.jpg`、`.jpeg`、`.webp`、`.avif`。只要文件名相同即可自动读取，例如 `data.png`、`data.jpg`、`data.webp` 都可以作为数据平台顶部栏图片。
如果同名图片同时存在多个后缀，会按 `.png`、`.jpg`、`.jpeg`、`.webp`、`.avif` 的顺序优先读取。

顶部栏图片会按原比例放大并铺满顶部栏，不会被拉伸变形。建议使用横向图片，并尽量压缩到 1MB 以内，方便公网访问。

## 团队成员字段说明

- `name`：成员姓名。
- `institution`：所在单位。
- `role`：成员角色，可不填。
- `photoUrl`：照片路径。照片建议放在 `public/team/`，路径写成 `/team/文件名.jpg`。
- `description`：成员简介，可不填。

## 新增团队成员模板

```json
{
  "name": "成员姓名",
  "institution": "所在单位",
  "role": "成员角色",
  "photoUrl": "/team/member-photo.jpg",
  "description": "成员简介。"
}
```

## 新增资源模板

```json
{
  "id": "new-resource-id",
  "category": "data",
  "title": "资源完整名称",
  "shortTitle": "资源短名称",
  "description": "一句话说明资源用途。",
  "updateNote": "支持按条件填写问卷星申请表。",
  "filters": {
    "years": ["2020"],
    "provinces": ["全球"],
    "formats": ["CSV"]
  },
  "tableMeta": {
    "yearRange": "2020",
    "dataFormat": "CSV",
    "spatialResolution": "全球",
    "temporalResolution": "年",
    "dimensions": "主要维度",
    "releaseDate": "按申请提供",
    "developer": "负责人或开发者"
  },
  "details": [
    {
      "label": "时间范围",
      "value": "2020年"
    },
    {
      "label": "空间范围",
      "value": "全球"
    }
  ],
  "references": []
}
```
