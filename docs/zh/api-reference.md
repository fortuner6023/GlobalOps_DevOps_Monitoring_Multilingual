# API 参考

## 基础 URL

```
http://localhost:3000/api
```

## 接口列表

### 日志

#### POST /api/logs

创建新的日志条目。

**请求体：**

```json
{
  "level": "ERROR",
  "service": "api-gateway",
  "message": "Connection timeout after 30000ms",
  "metadata": { "request_id": "req_abc123" },
  "stack_trace": "Error: Connection timeout\n    at handler...",
  "original_language": "en"
}
```

**必填字段：** `level`、`service`、`message`

**响应：** `201 Created`

```json
{
  "log": {
    "id": "uuid",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "level": "ERROR",
    "service": "api-gateway",
    "message": "Connection timeout after 30000ms",
    "metadata": { "request_id": "req_abc123" },
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/logs

带可选筛选条件获取日志。

**查询参数：**
- `limit`（数字，默认值：100）— 返回的最大日志数量
- `level`（字符串）— 按日志级别筛选（ERROR、WARNING、INFO、DEBUG）
- `service`（字符串）— 按服务名称筛选
- `language`（字符串，默认值："en"）— 翻译目标语言

**响应：** `200 OK`

```json
{
  "logs": [...]
}
```

---

### 告警

#### POST /api/alerts

创建新的告警。

**请求体：**

```json
{
  "title": "High Error Rate",
  "description": "Error rate exceeded 5% threshold",
  "severity": "CRITICAL",
  "metadata": {}
}
```

**必填字段：** `title`、`description`、`severity`

#### GET /api/alerts

带可选筛选条件获取告警。

**查询参数：**
- `status`（字符串）— 按状态筛选（active、acknowledged、resolved）
- `language`（字符串，默认值："en"）— 目标语言

#### PATCH /api/alerts

更新告警状态。

**请求体：**

```json
{
  "id": "alert-uuid",
  "status": "resolved"
}
```

---

### 统计

#### GET /api/stats

获取仪表盘统计信息。

**响应：** `200 OK`

```json
{
  "totalLogs": 1247,
  "errorCount": 23,
  "warningCount": 89,
  "activeAlerts": 5,
  "criticalAlerts": 2,
  "servicesMonitored": 6
}
```

---

### AI 洞察

#### POST /api/insights

从日志生成 AI 洞察。

**请求体：**

```json
{
  "logIds": ["uuid-1", "uuid-2"],
  "language": "en"
}
```

#### GET /api/insights

获取最新洞察。

**查询参数：**
- `limit`（数字，默认值：10）— 返回的最大洞察数量

## 认证

目前，API 处于开放状态，仅用于演示目的。在生产环境中，请在 Authorization 头中使用 Supabase Auth 搭配 JWT 令牌。

## 限流

开发环境下无速率限制。生产环境可通过 Vercel 或反向代理进行配置。
