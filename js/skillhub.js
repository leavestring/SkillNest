/**
 * SkillNest - Premium Skills Directory
 * Data-driven card rendering, search, filtering, and detail pages.
 * Skills data is embedded to work with file:// protocol (no fetch CORS issues).
 */
(function () {
  'use strict';

  // Auto-detect GitHub repo from current URL
  // Works for GitHub Pages (USERNAME.github.io/REPO) and custom domains
  function detectGithubRepo() {
    var host = window.location.hostname;
    var path = window.location.pathname;
    // GitHub Pages: USERNAME.github.io/REPO
    if (host.indexOf('github.io') !== -1) {
      var username = host.split('.')[0];
      var repo = path.split('/')[1] || '';
      if (username && repo) return username + '/' + repo;
    }
    // Custom domain with path: domain.com/REPO
    var parts = path.split('/').filter(Boolean);
    if (parts.length >= 1) {
      // Can't guess username from custom domain, use first path segment as repo
      // User should set data-github-repo on the script tag as override
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var repoAttr = scripts[i].getAttribute('data-github-repo');
        if (repoAttr) return repoAttr;
      }
    }
    return 'leavestring/skillnest';
  }
  var GITHUB_REPO = detectGithubRepo();

  // ===== Skills Data (real GitHub repos, ranked by stars) =====
  var SKILLS_DATA = [
    {
      "id": "superpowers",
      "name": "Superpowers",
      "tagline": "社区公认最强的开发工作流技能包，14 个核心 Skill 覆盖完整软件周期",
      "description": "由 Jesse Vincent (obra) 维护的开源项目，将软件工程最佳实践编码为 AI Agent 的强制工作流。从头脑风暴到代码审查，每个环节都有对应的 Skill 把关，杜绝 Agent '拿到需求就写代码' 的坏习惯。支持 Claude Code、Cursor、Codex CLI、Gemini CLI 等 14+ AI 编程工具。",
      "features": [
        "systematic-debugging：四阶段系统化调试（根因→模式→假设→修复）",
        "test-driven-development：严格的 RED-GREEN-REFACTOR 循环",
        "brainstorming：苏格拉底式需求澄清，输出 2-3 种方案对比",
        "writing-plans + executing-plans：拆解为 2-5 分钟粒度的任务清单",
        "subagent-driven-development：每任务独立子 Agent + 两轮审查",
        "dispatching-parallel-agents：多独立任务并行派发子 Agent",
        "requesting-code-review / receiving-code-review：强制审查关卡",
        "using-git-worktrees：为每个特性创建隔离工作区"
      ],
      "install": "git clone https://github.com/obra/superpowers .claude/skills/superpowers",
      "tags": ["工作流", "TDD", "调试", "代码审查", "多Agent"],
      "category": "开发",
      "github": "https://github.com/obra/superpowers",
      "author": "obra (Jesse Vincent)",
      "stars": 116000,
      "license": "MIT",
      "updated": "2026-03"
    },
    {
      "id": "anthropics-skills",
      "name": "Anthropic Skills",
      "tagline": "Anthropic 官方出品，涵盖文档生成、前端设计、MCP 构建等核心场景",
      "description": "Claude Code 团队官方维护的技能仓库，是 Skills 生态的标杆和参照。每个 Skill 由 Anthropic 工程师编写，代码质量和文档规范都是最高水准。适合作为学习 Skill 编写的最佳范本，也是日常高频使用的实用工具集。",
      "features": [
        "pptx / xlsx / docx / pdf：一句话生成专业 Office 文档",
        "frontend-design：快速构建美观的前端页面原型",
        "mcp-builder：引导式构建 MCP (Model Context Protocol) Server",
        "web-artifacts-builder：创建可交互的 Web Artifacts 应用",
        "algorithmic-art：用代码生成算法艺术作品",
        "claude-api：Claude API 开发最佳实践与缓存策略"
      ],
      "install": "npx skills add anthropics/skills",
      "tags": ["官方", "文档生成", "前端", "MCP"],
      "category": "官方",
      "github": "https://github.com/anthropics/skills",
      "author": "Anthropic",
      "stars": 105000,
      "license": "Apache-2.0",
      "updated": "2026-04"
    },
    {
      "id": "karpathy-skills",
      "name": "Andrej Karpathy Skills",
      "tagline": "Karpathy 的 LLM 编程智慧精华，一个 CLAUDE.md 改变 AI 编程体验",
      "description": "从 Andrej Karpathy 在 X/Twitter 上长期分享的 LLM 编码观察中提炼而来。仅一个 CLAUDE.md 文件，包含四条核心原则，却为无数开发者带来了 AI 编程体验的质变。曾登顶 GitHub Trending #1，被誉为'AI 时代的程序员必读'。",
      "features": [
        "先问再猜：AI 在动手前必须向用户确认需求理解",
        "保持简洁：避免过度工程化，写最短能用的代码",
        "精准编辑：修改代码时精确定位，不触碰无关部分",
        "目标驱动：始终以完成任务为第一优先级"
      ],
      "install": "git clone https://github.com/forrestchang/andrej-karpathy-skills .claude/skills/karpathy",
      "tags": ["Karpathy", "编程哲学", "效率", "CLAUDE.md"],
      "category": "开发",
      "github": "https://github.com/forrestchang/andrej-karpathy-skills",
      "author": "forrestchang",
      "stars": 61600,
      "license": "MIT",
      "updated": "2025-12"
    },
    {
      "id": "antigravity-awesome-skills",
      "name": "Antigravity Awesome Skills",
      "tagline": "1328+ Skill 的巨无霸技能库，npx 一键安装，多平台兼容",
      "description": "目前全球规模最大的可安装 Skill 集合，覆盖从 DevOps 到 Marketing 的几乎所有领域。通过 npx 命令即可安装全部或按需选择子集。每周持续更新，生态活跃度极高。适合想要拥有最全面技能武装的高级用户。",
      "features": [
        "1328+ Skills 覆盖 DevOps、前端、后端、安全、营销等全领域",
        "一条 npx 命令安装全部，也可按类别选择性安装",
        "兼容 Claude Code、Cursor、Codex CLI、Gemini CLI、Windsurf 等",
        "社区驱动，周级更新，最新版新增 X/Twitter 提取和 MCP 评估"
      ],
      "install": "npx antigravity-awesome-skills",
      "tags": ["技能库", "多平台", "npx安装", "社区"],
      "category": "工具",
      "github": "https://github.com/sickn33/antigravity-awesome-skills",
      "author": "sickn33",
      "stars": 14700,
      "license": "MIT",
      "updated": "2026-03"
    },
    {
      "id": "vercel-agent-skills",
      "name": "Vercel Agent Skills",
      "tagline": "Vercel 官方出品，44+ AI 工具的通用技能安装与管理平台",
      "description": "Vercel 实验室推出的 Agent Skills 生态基础设施。不仅提供了 React 最佳实践、Web 设计指南、一键部署等核心技能，更打造了跨 44+ AI 编程工具的通用技能安装器。被视为 Skills 分发的行业标准方案。",
      "features": [
        "react-best-practices：React 19 / Next.js 15 最佳实践指南",
        "web-design-guidelines：现代 Web 设计系统与排版规范",
        "vercel-deploy：一键部署到 Vercel 的自动化工作流",
        "通用 CLI：npx skills add 安装任意 Git 仓库的 Skill",
        "与 Claude Code、Cursor、Copilot、Codex 等无缝集成"
      ],
      "install": "npx skills add vercel-labs/agent-skills",
      "tags": ["Vercel", "React", "跨平台", "部署"],
      "category": "工具",
      "github": "https://github.com/vercel-labs/agent-skills",
      "author": "Vercel Labs",
      "stars": 12500,
      "license": "MIT",
      "updated": "2026-04"
    },
    {
      "id": "awesome-claude-skills",
      "name": "Awesome Claude Skills",
      "tagline": "8.1K+ Star 社区精选目录，300+ Skill 按 8 大分类组织",
      "description": "社区公认的 Claude Skills 最佳导航页。300+ 条目按文档处理、开发工具、数据分析、科研、写作、安全测试、自动化、技能合集 8 大分类精心编排。每个条目有简介和直链，是发现新 Skill 的第一站。",
      "features": [
        "8 大分类系统化组织，快速定位所需领域",
        "300+ 条目，每条附简介 + GitHub 直达链接",
        "持续维护更新，追踪最新 Skill 发布",
        "附带 Skills 生态概览和安装教程"
      ],
      "install": "git clone https://github.com/BehiSecc/awesome-claude-skills .claude/skills/awesome-list",
      "tags": ["精选列表", "300+技能", "分类", "社区"],
      "category": "工具",
      "github": "https://github.com/BehiSecc/awesome-claude-skills",
      "author": "BehiSecc",
      "stars": 8100,
      "license": "CC0-1.0",
      "updated": "2026-04"
    },
    {
      "id": "openskills",
      "name": "OpenSkills",
      "tagline": "7.2K+ Star，像管理 npm 包一样管理 Claude Code Skills",
      "description": "Skill 生态的基础设施级项目，让 Skills 的安装、更新、卸载像 npm 一样标准化。支持自定义 Skill 源、版本锁定、冲突检测和批量管理。如果你需要管理多个项目的 Skills 配置，OpenSkills 是必备工具。",
      "features": [
        "npm i -g openskills：全局安装后即可使用",
        "支持自定义 Skill 源和私有仓库",
        "版本锁定与冲突检测机制",
        "批量安装、更新、卸载 Skills",
        "生成 Skill 清单文件，团队共享配置"
      ],
      "install": "npm i -g openskills",
      "tags": ["加载器", "npm", "通用", "管理"],
      "category": "工具",
      "github": "https://github.com/numman-ali/openskills",
      "author": "numman-ali",
      "stars": 7200,
      "license": "MIT",
      "updated": "2026-02"
    },
    {
      "id": "obsidian-skills",
      "name": "Obsidian Skills",
      "tagline": "Obsidian CEO 出品，Claude Code 深度整合你的知识库",
      "description": "由 Obsidian CEO kepano 亲自打造的 Skills 集合，将 Claude Code 与 Obsidian 笔记深度集成。AI 可以直接理解你的笔记结构、知识图谱和标签体系，在编程时引用你的个人知识库。发布仅 9 天即获 6.6K+ Stars。",
      "features": [
        "智能笔记管理：AI 理解 Obsidian Vault 结构",
        "知识图谱分析：利用笔记间的链接关系辅助思考",
        "自动摘要：对长笔记生成结构化摘要",
        "模板系统：AI 按你的 Obsidian 模板格式输出",
        "支持 Dataview、Tasks 等主流插件数据"
      ],
      "install": "npx skills add kepano/obsidian-skills",
      "tags": ["Obsidian", "笔记", "知识管理", "kepano"],
      "category": "工具",
      "github": "https://github.com/kepano/obsidian-skills",
      "author": "kepano (Steph Ango)",
      "stars": 6600,
      "license": "MIT",
      "updated": "2026-03"
    },
    {
      "id": "awesome-claude-code",
      "name": "Awesome Claude Code",
      "tagline": "Claude Code 生态全景图：Skills + Hooks + MCP + 插件一站式导航",
      "description": "涵盖 Claude Code 扩展生态的完整精选列表，从 Skills、Hooks、斜杠命令到 Agent 编排器、MCP Server、应用插件。社区持续维护，内容全面且更新及时。不论是找功能还是探索生态边界，这里都是最佳起点。",
      "features": [
        "Skills 精选：按类别收录社区最优质的 Skills",
        "Hooks 集合：自动化触发的工作流钩子",
        "MCP Server 大全：Model Context Protocol 服务列表",
        "Agent 编排器：多 Agent 协作框架",
        "IDE 插件：VSCode、JetBrains 等集成方案"
      ],
      "install": "git clone https://github.com/hesreallyhim/awesome-claude-code .claude/skills/awesome-list",
      "tags": ["精选列表", "生态", "MCP", "插件"],
      "category": "工具",
      "github": "https://github.com/hesreallyhim/awesome-claude-code",
      "author": "hesreallyhim",
      "stars": 3700,
      "license": "MIT",
      "updated": "2026-04"
    },
    {
      "id": "superskills",
      "name": "SuperSkills",
      "tagline": "全栈开发 + 173 个营销技能 + 35 个设计技能的超大合集",
      "description": "为 AI 编程助手精心策划的全领域技能集合，捆绑了 Garry Tan 的 gstack 虚拟工程团队。不仅仅是代码——覆盖 TDD、系统调试、安全扫描、规范工作流，以及丰富的营销和设计技能。适合创业者、全栈开发者和独立开发者。",
      "features": [
        "33 个核心开发技能：TDD、调试、安全、Spec 工作流",
        "173 个营销技能：SEO、内容、广告、渠道策略",
        "35 个设计技能：UX 研究、视觉设计、React/Swift 实现",
        "43 个 gstack 技能：Garry Tan 的虚拟工程团队配置"
      ],
      "install": "git clone https://github.com/ariadoss/superskills .claude/skills/superskills",
      "tags": ["全栈", "营销", "设计", "安全"],
      "category": "开发",
      "github": "https://github.com/ariadoss/superskills",
      "author": "ariadoss",
      "stars": 2400,
      "license": "MIT",
      "updated": "2026-03"
    },
    {
      "id": "supabase-agent-skills",
      "name": "Supabase Agent Skills",
      "tagline": "Supabase 官方出品，让 AI 写出生产级 PostgreSQL 代码",
      "description": "Supabase 团队出品，为 AI 编程助手注入 PostgreSQL 专业知识。涵盖查询性能优化、连接管理、Schema 设计、并发锁、行级安全 (RLS)、数据迁移等 8 大领域。AI 写 SQL 时会自动引用这些最佳实践，显著提升数据库代码质量。",
      "features": [
        "查询性能优化：索引策略、EXPLAIN 分析、查询改写",
        "连接管理：连接池配置、Session 管理、超时策略",
        "Schema 设计：范式化、类型选择、约束设计",
        "并发与锁：事务隔离级别、死锁预防、乐观锁",
        "RLS 安全：行级安全策略设计与性能考量",
        "数据迁移：零停机迁移策略与回滚方案"
      ],
      "install": "npx skills add supabase/agent-skills",
      "tags": ["PostgreSQL", "数据库", "性能优化", "RLS"],
      "category": "开发",
      "github": "https://github.com/supabase/agent-skills",
      "author": "Supabase",
      "stars": 2000,
      "license": "MIT",
      "updated": "2026-04"
    },
    {
      "id": "trailofbits-skills",
      "name": "Trail of Bits Skills",
      "tagline": "国际顶尖安全公司的审计经验，融入你的 AI 开发流程",
      "description": "由 Trail of Bits（审计过 Google、Apple、Microsoft 等顶级公司代码的安全公司）出品。将专业级安全审计能力注入 AI 编程助手，让每一次代码生成都经过安全视角的审视。适合金融、医疗、基础设施等对安全有严格要求的行业。",
      "features": [
        "漏洞检测：OWASP Top 10、CWE Top 25 自动扫描",
        "代码审计：数据流分析、污点追踪、权限边界检查",
        "加密安全：密钥管理、证书验证、随机数安全",
        "供应链安全：依赖审计、SBOM 生成、版本锁定",
        "合规检查：SOC2、HIPAA、PCI-DSS 基础合规项"
      ],
      "install": "git clone https://github.com/trailofbits/skills .claude/skills/trailofbits",
      "tags": ["安全", "审计", "漏洞检测", "专业"],
      "category": "安全",
      "github": "https://github.com/trailofbits/skills",
      "author": "Trail of Bits",
      "stars": 1800,
      "license": "Apache-2.0",
      "updated": "2026-02"
    }
  ];

  // ===== LocalStorage helpers for user-submitted skills =====
  var STORAGE_KEY = 'skillnest_user_skills';

  function getUserSkills() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveUserSkills(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function addUserSkill(s) {
    var list = getUserSkills();
    list.unshift(s);
    saveUserSkills(list);
  }

  function mergeSkills() {
    return SKILLS_DATA.concat(getUserSkills());
  }

  var skills = mergeSkills();
  var activeFilter = '全部';

  // Category accent colors
  var categoryColors = {
    '工具':    { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe', grad: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', iconBg: 'rgba(37,99,235,.1)' },
    '开发':    { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0', grad: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', iconBg: 'rgba(5,150,105,.1)' },
    '安全':    { bg: '#fef2f2', text: '#dc2626', border: '#fecaca', grad: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', iconBg: 'rgba(220,38,38,.1)' },
    '官方':    { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe', grad: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', iconBg: 'rgba(124,58,237,.1)' },
    '生活':    { bg: '#fffbeb', text: '#d97706', border: '#fde68a', grad: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', iconBg: 'rgba(217,119,6,.1)' },
    '配置':    { bg: '#fdf2f8', text: '#db2777', border: '#fbcfe8', grad: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)', iconBg: 'rgba(219,39,119,.1)' }
  };

  var categoryIcons = {
    '工具': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    '开发': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    '安全': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    '官方': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    '生活': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    '配置': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  // ===== DOM refs =====
  var cardGrid = document.getElementById('cardGrid');
  var searchInput = document.getElementById('searchInput');
  var searchClear = document.getElementById('searchClear');
  var filterBar = document.getElementById('filterBar');
  var resultCount = document.getElementById('resultCount');
  var heroStats = document.getElementById('heroStats');

  // ===== Init =====
  function init() {
    updateHeroStats();
    renderFilters();
    renderCards();

    if (searchInput) searchInput.addEventListener('input', debounce(handleSearch, 200));
    if (searchClear) searchClear.addEventListener('click', clearSearch);
  }

  // ===== Hero Stats =====
  function updateHeroStats() {
    if (!heroStats) return;
    var totalStars = skills.reduce(function (sum, s) { return sum + (s.stars || 0); }, 0);
    var categories = new Set(skills.map(function (s) { return s.category; })).size;
    heroStats.innerHTML =
      '<div class="hero-stat"><div class="hero-stat-num">' + skills.length + '</div><div class="hero-stat-label">收录技能</div></div>' +
      '<div class="hero-stat"><div class="hero-stat-num">' + categories + '</div><div class="hero-stat-label">分类</div></div>' +
      '<div class="hero-stat"><div class="hero-stat-num">' + formatStars(totalStars) + '</div><div class="hero-stat-label">社区 Stars</div></div>';
  }

  function formatStars(n) {
    if (n >= 100000) return (n / 1000).toFixed(0) + 'K';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  }

  // ===== Filters =====
  function renderFilters() {
    if (!filterBar) return;
    var categories = ['全部'];
    skills.forEach(function (s) {
      if (categories.indexOf(s.category) === -1) categories.push(s.category);
    });

    filterBar.innerHTML = categories.map(function (c) {
      return '<span class="filter-tag' + (c === '全部' ? ' active' : '') + '" data-filter="' + c + '">' + c + '</span>';
    }).join('');

    filterBar.querySelectorAll('.filter-tag').forEach(function (tag) {
      tag.addEventListener('click', function () {
        filterBar.querySelectorAll('.filter-tag').forEach(function (t) { t.classList.remove('active'); });
        tag.classList.add('active');
        activeFilter = tag.getAttribute('data-filter');
        renderCards();
      });
    });
  }

  // ===== Render Cards =====
  function renderCards() {
    if (!cardGrid) return;

    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    var filtered = skills.filter(function (s) {
      if (activeFilter !== '全部' && s.category !== activeFilter) return false;
      if (!query) return true;
      return (
        s.name.toLowerCase().indexOf(query) !== -1 ||
        s.tagline.toLowerCase().indexOf(query) !== -1 ||
        s.description.toLowerCase().indexOf(query) !== -1 ||
        s.tags.some(function (t) { return t.toLowerCase().indexOf(query) !== -1; }) ||
        s.author.toLowerCase().indexOf(query) !== -1
      );
    });

    if (!filtered.length) {
      cardGrid.innerHTML =
        '<div class="no-results" style="grid-column: 1/-1">' +
          '<div class="no-results-icon"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>' +
          '<div class="no-results-title">没有找到匹配的技能</div>' +
          '<p>试试其他关键词或清除筛选条件</p>' +
        '</div>';
    } else {
      filtered.sort(function (a, b) { return (b.stars || 0) - (a.stars || 0); });

      cardGrid.innerHTML = filtered.map(function (s, idx) {
        var colors = categoryColors[s.category] || categoryColors['工具'];
        var catIcon = categoryIcons[s.category] || categoryIcons['工具'];
        return (
          '<article class="card" style="animation: cardIn .5s ease forwards ' + (idx * 0.06) + 's">' +
            '<a href="skills/detail.html?id=' + s.id + '" class="card-top-link">' +
              '<div class="card-image" style="background:' + colors.grad + '">' +
                '<div class="card-icon-wrap" style="background:' + colors.bg + ';color:' + colors.text + '">' + catIcon + '</div>' +
                '<span class="card-category-badge" style="background:' + colors.text + '">' + s.category + '</span>' +
                '<span class="card-stars-badge">' +
                  '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
                  ' ' + formatStars(s.stars || 0) +
                '</span>' +
              '</div>' +
            '</a>' +
            '<div class="card-body">' +
              '<a href="skills/detail.html?id=' + s.id + '" class="card-title-link">' +
                '<h3 class="card-title">' + escHtml(s.name) + '</h3>' +
              '</a>' +
              '<span class="card-author">' + escHtml(s.author) + (s.isUserSubmitted ? ' <span class="badge-user">社区投稿</span>' : '') + '</span>' +
              '<p class="card-desc">' + escHtml(s.tagline) + '</p>' +
              '<div class="card-tags">' +
                s.tags.slice(0, 3).map(function (t) {
                  return '<span class="card-tag" style="background:' + colors.iconBg + ';color:' + colors.text + '">' + escHtml(t) + '</span>';
                }).join('') +
                (s.tags.length > 3 ? '<span class="card-tag card-tag-more">+' + (s.tags.length - 3) + '</span>' : '') +
              '</div>' +
              '<div class="card-footer">' +
                '<span class="card-meta-item">' +
                  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
                  ' ' + (s.updated || '') +
                '</span>' +
                '<a href="' + escHtml(s.github) + '" target="_blank" rel="noopener" class="btn-github">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>' +
                  ' GitHub' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }).join('');
    }
    if (resultCount) resultCount.textContent = '共 ' + filtered.length + ' 个技能';
  }

  // ===== Search =====
  function handleSearch() {
    if (searchClear) searchClear.classList.toggle('visible', searchInput.value.length > 0);
    renderCards();
  }

  function clearSearch() {
    if (searchInput) { searchInput.value = ''; searchClear.classList.remove('visible'); searchInput.focus(); }
    renderCards();
  }

  // ===== Detail Page =====
  function initDetailPage() {
    var container = document.getElementById('detailContainer');
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    var skillId = params.get('id');
    if (!skillId) { container.innerHTML = '<div class="no-results"><div class="no-results-title">Missing skill ID</div><p><a href="../index.html">Back</a></p></div>'; return; }
    var skill = skills.find(function (s) { return s.id === skillId; });

    if (!skill) {
      container.innerHTML = '<div class="no-results"><div class="no-results-title">Skill not found</div><p>ID: ' + escHtml(skillId) + '</p><p><a href="../index.html">Back to home</a></p></div>';
      return;
    }

    try {
      renderDetail(skill);
      updateDetailMeta(skill);
    } catch (e) {
      container.innerHTML = '<div class="no-results"><div class="no-results-title">Render error</div><p style="color:#ef4444">' + escHtml(e.message) + '</p><p><a href="../index.html">Back to home</a></p></div>';
    }
  }

  function renderDetail(skill) {
    var container = document.getElementById('detailContainer');
    var colors = categoryColors[skill.category] || categoryColors['工具'];
    var catIcon = categoryIcons[skill.category] || categoryIcons['工具'];

    // Parse features: can be array or newline-separated string
    var features = skill.features;
    if (typeof features === 'string' && features.trim()) {
      features = features.split('\n').filter(function (l) { return l.trim(); });
    }
    if (!Array.isArray(features) || !features.length) features = null;

    // Find related skills (same category, not self)
    var related = skills.filter(function (s) { return s.category === skill.category && s.id !== skill.id; });
    if (related.length > 3) related = related.slice(0, 3);

    container.innerHTML =
      // Hero banner
      '<div class="detail-hero" style="background:' + colors.grad + '">' +
        '<div class="detail-hero-inner">' +
          '<div class="detail-hero-icon" style="background:' + colors.bg + ';color:' + colors.text + '">' + catIcon + '</div>' +
          '<h1 class="detail-hero-title">' + escHtml(skill.name) + '</h1>' +
          '<p class="detail-hero-tagline">' + escHtml(skill.tagline) + '</p>' +
          '<div class="detail-hero-meta">' +
            '<span>' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
              ' ' + escHtml(skill.author) +
            '</span>' +
            '<span style="color:#f59e0b">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
              ' ' + formatStars(skill.stars || 0) + ' Stars' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Content area
      '<div class="detail-content">' +

        // Stats row
        '<div class="detail-stats-row">' +
          '<div class="detail-stat-card">' +
            '<div class="detail-stat-val">' + formatStars(skill.stars) + '</div>' +
            '<div class="detail-stat-lbl">GitHub Stars</div>' +
          '</div>' +
          '<div class="detail-stat-card">' +
            '<div class="detail-stat-val">' + eschtml(skill.license || 'N/A') + '</div>' +
            '<div class="detail-stat-lbl">开源协议</div>' +
          '</div>' +
          '<div class="detail-stat-card">' +
            '<div class="detail-stat-val">' + eschtml(skill.updated || '') + '</div>' +
            '<div class="detail-stat-lbl">最近更新</div>' +
          '</div>' +
          '<div class="detail-stat-card">' +
            '<div class="detail-stat-val">' + (features ? features.length : 0) + '</div>' +
            '<div class="detail-stat-lbl">核心功能</div>' +
          '</div>' +
        '</div>' +

        // Main grid
        '<div class="detail-grid">' +
          '<div class="detail-main">' +

            // Description section
            '<section class="detail-section">' +
              '<h2 class="detail-section-title">简介</h2>' +
              '<p class="detail-desc">' + escHtml(skill.description) + '</p>' +
              '<div class="detail-tags-wrap">' +
                skill.tags.map(function (t) {
                  return '<span class="detail-tag" style="background:' + colors.iconBg + ';color:' + colors.text + '">' + escHtml(t) + '</span>';
                }).join('') +
              '</div>' +
            '</section>' +

            // Features section
            (features ? (
              '<section class="detail-section">' +
                '<h2 class="detail-section-title">核心功能</h2>' +
                '<ul class="detail-features">' +
                  features.map(function (f) {
                    var parts = f.split('：');
                    if (parts.length === 1) parts = f.split(':');
                    return '<li><strong>' + escHtml(parts[0]) + '</strong>' + (parts[1] ? '：' + escHtml(parts[1]) : '') + '</li>';
                  }).join('') +
                '</ul>' +
              '</section>'
            ) : '') +

            // Install section
            '<section class="detail-section">' +
              '<h2 class="detail-section-title">安装方式</h2>' +
              '<div class="detail-install-block">' +
                '<pre class="detail-install-code"><code>' + escHtml(skill.install) + '</code></pre>' +
                '<button class="btn-copy" onclick="navigator.clipboard.writeText(\'' + skill.install.replace(/'/g, "\\'") + '\');this.textContent=\'已复制!\';var t=this;setTimeout(function(){t.textContent=\'复制\';},2000)">复制</button>' +
              '</div>' +
            '</section>' +

          '</div>' +

          // Sidebar
          '<aside class="detail-side">' +
            '<div class="detail-action-card">' +
              '<a href="' + escHtml(skill.github) + '" target="_blank" rel="noopener" class="btn-primary btn-block">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>' +
                ' 在 GitHub 查看' +
              '</a>' +
              '<a href="../index.html" class="btn-outline btn-block">← 返回首页</a>' +
            '</div>' +

            (related.length ? (
              '<div class="detail-related">' +
                '<h3 class="detail-related-title">同分类推荐</h3>' +
                related.map(function (r) {
                  return '<a href="detail.html?id=' + r.id + '" class="detail-related-item">' +
                    '<span class="detail-related-name">' + escHtml(r.name) + '</span>' +
                    '<span class="detail-related-stars">' + formatStars(r.stars) + '</span>' +
                  '</a>';
                }).join('') +
              '</div>'
            ) : '') +

          '</aside>' +
        '</div>' +
      '</div>';
  }

  function updateDetailMeta(skill) {
    document.title = skill.name + ' - SkillNest';
    setMeta('description', skill.tagline);
    setMeta('og:title', skill.name + ' - SkillNest');
    setMeta('og:description', skill.tagline);

    var jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': skill.name,
      'description': skill.tagline,
      'author': { '@type': 'Person', 'name': skill.author },
      'applicationCategory': 'DeveloperApplication',
      'url': skill.github,
      'dateModified': skill.updated
    };
    var scriptEl = document.getElementById('jsonld');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.id = 'jsonld';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd, null, 2);
  }

  function setMeta(name, content) {
    var meta = document.querySelector('meta[property="' + name + '"], meta[name="' + name + '"]');
    if (meta) meta.setAttribute('content', content);
  }

  // ===== Helpers =====
  function escHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function eschtml(str) { return escHtml(String(str)); }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  // ===== Submit Page =====
  function initSubmitPage() {
    var form = document.getElementById('submitForm');
    if (!form) return;

    var previewBtn = document.getElementById('previewBtn');
    var previewEl = document.getElementById('submitPreview');
    var previewCard = document.getElementById('previewCard');
    var successEl = document.getElementById('submitSuccess');
    var formError = document.getElementById('formError');

    // Preview
    previewBtn.addEventListener('click', function () {
      var s = readFormData();
      var errors = validateSkill(s);
      if (errors.length) {
        showFormError(errors[0]);
        return;
      }
      formError.textContent = '';
      previewEl.style.display = 'block';
      previewCard.innerHTML = renderPreviewCardHtml(s);
      previewEl.scrollIntoView({ behavior: 'smooth' });
    });

    // Submit → open GitHub Issue
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = readFormData();
      var errors = validateSkill(s);
      if (errors.length) { showFormError(errors[0]); return; }

      var tags = parseTags(s._tagsRaw);
      var featuresText = (s.features || '').trim();
      var starsNum = parseInt(s.stars, 10) || 0;

      // Build issue body in markdown
      var issueBody = [
        '## 技能信息',
        '',
        '| 字段 | 内容 |',
        '|------|------|',
        '| **名称** | ' + s.name.trim() + ' |',
        '| **简介** | ' + s.tagline.trim() + ' |',
        '| **GitHub** | ' + s.github.trim() + ' |',
        '| **作者** | ' + (s.author.trim() || '（未填写）') + ' |',
        '| **分类** | ' + s.category + ' |',
        '| **标签** | ' + (tags.length ? tags.join(', ') : '（未填写）') + ' |',
        '| **Stars** | ' + starsNum + ' |',
        '',
        '## 详细介绍',
        '',
        s.description.trim(),
        '',
        '## 核心功能',
        '',
        featuresText ? featuresText.split('\n').filter(function(l){return l.trim();}).map(function(l){return '- ' + l.trim();}).join('\n') : '（未填写）',
        '',
        '## 安装命令',
        '',
        '`' + (s.install.trim() || '（未填写）') + '`'
      ].join('\n');

      var title = encodeURIComponent('[技能提交] ' + s.name.trim());
      var body = encodeURIComponent(issueBody);

      // Open GitHub Issue in new tab
      var issueUrl = 'https://github.com/' + GITHUB_REPO + '/issues/new?title=' + title + '&body=' + body + '&labels=skill-submission';
      window.open(issueUrl, '_blank');

      // Save to localStorage as personal backup
      var saved = {
        id: 'user-' + Date.now(),
        name: s.name, tagline: s.tagline, category: s.category,
        github: s.github, author: s.author,
        description: s.description, features: s.features,
        install: s.install,
        tags: tags, stars: starsNum,
        image: '', license: 'N/A',
        updated: new Date().toISOString().slice(0, 7),
        isUserSubmitted: true
      };
      addUserSkill(saved);

      form.reset();
      form.style.display = 'none';
      previewEl.style.display = 'none';
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth' });
      formError.textContent = '';
    });
  }

  function readFormData() {
    return {
      name: (document.getElementById('skillName') || {}).value || '',
      tagline: (document.getElementById('skillTagline') || {}).value || '',
      category: (document.getElementById('skillCategory') || {}).value || '',
      github: (document.getElementById('skillGithub') || {}).value || '',
      author: (document.getElementById('skillAuthor') || {}).value || '',
      _tagsRaw: (document.getElementById('skillTags') || {}).value || '',
      description: (document.getElementById('skillDesc') || {}).value || '',
      features: (document.getElementById('skillFeatures') || {}).value || '',
      install: (document.getElementById('skillInstall') || {}).value || '',
      stars: (document.getElementById('skillStars') || {}).value || 0,
      license: ''
    };
  }

  function validateSkill(s) {
    var errs = [];
    if (!s.name.trim()) errs.push('请填写技能名称');
    if (!s.tagline.trim()) errs.push('请填写一句话简介');
    if (!s.category) errs.push('请选择分类');
    if (!s.github.trim()) errs.push('请填写 GitHub 链接');
    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(s.github.trim())) errs.push('GitHub 链接格式不正确，应为 https://github.com/用户/仓库');
    if (!s.description.trim()) errs.push('请填写详细介绍');
    return errs;
  }

  function parseTags(raw) {
    if (!raw || !raw.trim()) return [];
    return raw.split(/[,，]/).map(function (t) { return t.trim(); }).filter(Boolean).slice(0, 5);
  }

  function renderPreviewCardHtml(s) {
    var tags = parseTags(s._tagsRaw || '');
    var colors = categoryColors[s.category] || categoryColors['工具'];
    var catIcon = categoryIcons[s.category] || categoryIcons['工具'];
    return (
      '<article class="card" style="border:2px solid ' + colors.text + '">' +
        '<div class="card-image" style="background:' + colors.grad + '">' +
          '<div class="card-icon-wrap" style="background:' + colors.bg + ';color:' + colors.text + '">' + catIcon + '</div>' +
          '<span class="card-category-badge" style="background:' + colors.text + '">' + eschtml(s.category) + '</span>' +
          '<span class="card-stars-badge">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
            ' ' + (parseInt(s.stars, 10) || 0) +
          '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<h3 class="card-title">' + escHtml(s.name) + ' <span style="font-size:.7rem;background:#f59e0b;color:#fff;padding:2px 8px;border-radius:50px;margin-left:6px">预览</span></h3>' +
          '<span class="card-author">' + escHtml(s.author) + '</span>' +
          '<p class="card-desc">' + escHtml(s.tagline) + '</p>' +
          '<div class="card-tags">' +
            tags.map(function (t) { return '<span class="card-tag" style="background:' + colors.iconBg + ';color:' + colors.text + '">' + escHtml(t) + '</span>'; }).join('') +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function showFormError(msg) {
    var el = document.getElementById('formError');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  // ===== Bootstrap =====
  if (document.getElementById('cardGrid')) init();
  if (document.getElementById('detailContainer')) initDetailPage();
  if (document.getElementById('submitForm')) initSubmitPage();
})();
