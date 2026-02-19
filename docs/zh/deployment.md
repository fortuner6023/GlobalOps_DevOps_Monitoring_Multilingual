# 部署指南

## 前置条件

- Node.js 20 及以上版本
- 一个 Supabase 项目
- 一个 Lingo.dev API 密钥
- 一个 Vercel 账号（用于部署）
- 一个 GitHub 账号（用于 CI/CD）

## 步骤 1：Supabase 设置

1. 在 [supabase.com](https://supabase.com) 创建新项目
2. 进入 SQL 编辑器
3. 运行 `lib/supabase.ts` 文件底部注释部分的 SQL 语句
4. 在设置 → API 中复制你的项目 URL 和密钥

## 步骤 2：环境变量

创建 `.env.local` 文件，并填写你的实际值：

```env
LINGODOTDEV_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 步骤 3：文档翻译

运行 Lingo CLI，为所有文档生成翻译：

```bash
npm run translate:docs
```

这将在 `docs/es/`、`docs/fr/`、`docs/de/`、`docs/ja/` 和 `docs/zh/` 目录下生成翻译后的文档。

## 步骤 4：部署到 Vercel

1. 将代码推送到 GitHub
2. 前往 [vercel.com](https://vercel.com) 并导入你的代码仓库
3. 在 Vercel 控制台添加所有环境变量
4. 部署

## 步骤 5：GitHub Actions（CI/CD）

1. 进入你的 GitHub 仓库 → 设置 → Secrets and variables → Actions
2. 添加密钥：`LINGODOTDEV_API_KEY`
3. `.github/workflows/translate-docs.yml` 中的工作流会在每次推送时自动翻译文档

## 步骤 6：在 Cursor 中配置 Lingo MCP

1. 打开 Cursor 设置 → MCP 选项卡
2. 添加新的 MCP 服务器：
   - 名称：`Lingo.dev`
   - 命令：`npx`
   - 参数：`["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]`
3. 重启 Cursor
4. 确认绿色状态指示灯

## 生产环境检查清单

- [ ] 已创建启用 RLS 的 Supabase 表
- [ ] 所有环境变量已在 Vercel 设置
- [ ] Lingo Compiler 在部署时构建翻译
- [ ] 文档已通过 CLI 翻译
- [ ] CI/CD 工作流已测试
- [ ] MCP 已在开发环境中配置
- [ ] 已生成演示数据用于展示
- [ ] 已验证全部 5 个 Lingo.dev 工具可用

## 监控

部署完成后，请监控您的应用程序：

- **Vercel Dashboard** — 部署日志和分析
- **Supabase Dashboard** — 数据库监控和日志
- **GitHub Actions** — CI/CD 流水线状态
