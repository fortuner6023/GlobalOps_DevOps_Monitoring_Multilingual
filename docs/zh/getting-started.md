# GlobalOps 入门指南

## 概述

GlobalOps 是一款可用于生产环境的实时 DevOps 监控仪表盘，开箱即支持 6 种语言。它集成了全部 5 款 Lingo.dev 翻译工具，带来完整的多语言体验。

## 功能亮点

- **实时日志流** — 实时查看所有服务的日志
- **多语言告警** — 创建、管理并跟踪已翻译为你语言的告警
- **AI 智能洞察** — 对日志进行智能分析并给出建议
- **文档自动翻译** — 所有文档均支持 6 种语言
- **语言切换** — 可在 English、Spanish、French、German、Japanese 和 Chinese 之间即时切换

## 快速开始

### 1. 克隆代码仓库

```bash
git clone https://github.com/your-username/globalops.git
cd globalops
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制示例环境文件并填写你的密钥：

```bash
cp .env.local.example .env.local
```

必填变量：
- `LINGODOTDEV_API_KEY` — 从 [Lingo.dev Dashboard](https://lingo.dev/dashboard) 获取
- `NEXT_PUBLIC_SUPABASE_URL` — 你的 Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase 匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase 服务角色密钥

### 4. 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 5. 生成演示数据

```bash
npm run generate:logs
```

## 通过 API 发送日志

你可以通过 REST API 向 GlobalOps 发送日志：

```bash
curl -X POST http://localhost:3000/api/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "ERROR",
    "service": "api-gateway",
    "message": "Connection timeout after 30000ms",
    "metadata": {
      "request_id": "req_abc123",
      "duration_ms": 30000
    }
  }'
```

## 设置首选语言

点击仪表盘右上角的语言切换器即可更改你的首选语言。所有日志、告警和洞察内容都会自动翻译。

## 下一步

- [API Reference](./api-reference.md) — 完整 API 文档
- [Deployment Guide](./deployment.md) — 部署到生产环境
