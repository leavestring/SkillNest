<p align="center">
  <img src="https://img.shields.io/badge/SkillNest-%E6%8A%80%E8%83%BD%E5%B7%A2-6366f1?style=for-the-badge" alt="SkillNest">
</p>

<h1 align="center">SkillNest 🧩</h1>

<p align="center">
  <strong>工欲善其事，必先利其器</strong>
  <br>
  发现 · 分享 · 共建 Claude Code 技能生态
</p>

<p align="center">
  <a href="https://leavestring.github.io/SkillNest/"><strong>🔗 在线演示</strong></a>
</p>

<p align="center">
  <a href="#-什么是-skillnest">简介</a> ·
  <a href="#-如何使用">使用</a> ·
  <a href="#-提交技能">贡献</a> ·
  <a href="#-部署">部署</a> ·
  <a href="#-本地运行">本地运行</a>
</p>

---

## 🧩 什么是 SkillNest

SkillNest 是一个**社区驱动的 Claude Code 技能展示平台**，汇集了 GitHub 上最受欢迎的 Skills 仓库，并提供详细介绍、安装命令和直达链接。

### 收录的优质 Skills

| Skill | Stars | 简介 |
|-------|-------|------|
| [Superpowers](https://github.com/obra/superpowers) | 116K | 14 个核心技能的开发工作流包 |
| [Anthropic Skills](https://github.com/anthropics/skills) | 105K | Anthropic 官方出品 |
| [Karpathy Skills](https://github.com/forrestchang/andrej-karpathy-skills) | 61.6K | Karpathy 的 LLM 编程智慧 |
| [Antigravity](https://github.com/sickn33/antigravity-awesome-skills) | 14.7K | 1328+ 技能的最大技能库 |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) | 12.5K | 44+ AI 工具通用安装器 |
| [Awesome Claude Skills](https://github.com/BehiSecc/awesome-claude-skills) | 8.1K | 300+ 技能精选目录 |
| [OpenSkills](https://github.com/numman-ali/openskills) | 7.2K | 通用技能加载器 |
| [Obsidian Skills](https://github.com/kepano/obsidian-skills) | 6.6K | Claude Code × Obsidian 整合 |
| [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code) | 3.7K | 生态工具精选集 |
| [SuperSkills](https://github.com/ariadoss/superskills) | 2.4K | 全栈+营销+设计合集 |
| [Supabase Agent Skills](https://github.com/supabase/agent-skills) | 2K | PostgreSQL 最佳实践 |
| [Trail of Bits Skills](https://github.com/trailofbits/skills) | 1.8K | 专业安全审计 |

---

## 🚀 如何使用

1. 打开 SkillNest 网站
2. **搜索** — 输入关键词实时过滤技能
3. **筛选** — 按分类（开发 / 工具 / 安全 / 官方）浏览
4. **详情** — 点击卡片查看完整介绍、功能清单、安装命令
5. **直达** — 点击 GitHub 按钮跳转到对应仓库

---

## 📤 提交技能

我们欢迎每一位开发者分享好用的 Skills！

### 提交流程

1. 访问 **提交页面**，填写技能名称、简介、GitHub 链接等信息
2. 点击 **预览效果** 确认卡片样式
3. 点击 **提交到 GitHub Issue** → 自动打开仓库的 Issue 页面，标题和内容已预填好
4. 在 Issue 页面确认后点击 **Submit new issue**
5. 站长审核后，将技能收录到 `SKILLS_DATA` 中，部署后全站可见

> 提交同时会保存到浏览器本地存储，可立即在你的首页看到。

### 站长收录方式

收到 Issue 后，编辑 `js/skillhub.js` 中的 `SKILLS_DATA` 数组，追加新条目：

```javascript
{
  "id": "my-skill",
  "name": "My Skill",
  "tagline": "一句话描述",
  "description": "详细介绍...",
  "features": ["功能A：xxx", "功能B：xxx"],
  "install": "git clone https://github.com/user/repo .claude/skills/my-skill",
  "tags": ["标签1", "标签2"],
  "category": "工具",
  "github": "https://github.com/user/repo",
  "author": "作者名",
  "stars": 1280,
  "license": "MIT",
  "updated": "2026-04"
}
```

---

## 🌐 部署

### GitHub Pages（推荐）

1. Fork 本仓库
2. Settings → Pages → Source 选 `main` 分支 → Save
3. 一分钟生效，访问 `https://你的用户名.github.io/skillnest/`

**Issue 提交功能会自动适配**：`skillhub.js` 会根据 `用户名.github.io/仓库名` 自动检测你的仓库地址，无需手动配置。

部署前记得替换以下文件中的 `leavestring`（用于 SEO）：

- `index.html`（canonical、JSON-LD）
- `sitemap.xml`（所有 URL）
- `robots.txt`（Sitemap 路径）

> 如果使用自定义域名，在 `index.html` 的 `<script src="js/skillhub.js">` 加上 `data-github-repo="用户名/仓库名"` 即可。

### 其他平台

| 平台 | 说明 |
|------|------|
| Vercel | 导入仓库，自动部署 |
| Cloudflare Pages | 连接 GitHub，自动构建 |
| Netlify | 拖拽文件夹或连接仓库 |

---

## 💻 本地运行

```bash
git clone https://github.com/你的用户名/skillnest.git
cd skillnest
# 直接用浏览器打开 index.html
# Windows: start index.html
# macOS:   open index.html
# Linux:   xdg-open index.html
```

无需任何构建工具或依赖，纯静态 HTML/CSS/JS。

---

## 📂 项目结构

```
skillnest/
├── index.html              # 首页：搜索 + 筛选 + 卡片流
├── css/
│   └── skillhub.css        # 全站样式
├── js/
│   └── skillhub.js         # 数据 + 渲染 + Issue 提交逻辑
├── skills/
│   ├── detail.html         # 技能详情页
│   └── submit.html         # 社区投稿页
├── sitemap.xml             # 搜索引擎站点地图
├── robots.txt              # 爬虫规则
└── README.md
```

---

## 🤝 贡献指南

- 通过提交页面推荐好用的 Skill
- 提 PR 更新内置 Skills 列表
- 分享 SkillNest 给更多 Claude Code 用户
- 在 Issues 中交流使用心得

---

<p align="center">
  <sub>「积众人之智，成众人之事」</sub>
</p>
