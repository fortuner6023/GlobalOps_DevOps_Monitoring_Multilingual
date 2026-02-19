# APIリファレンス

## ベースURL

http://localhost:3000/api
```

## エンドポイント

### ログ

#### POST /api/logs

新しいログエントリを作成します。

**リクエストボディ:**

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

**必須フィールド:** `level`、`service`、`message`

**レスポンス:** `201 Created`

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

オプションのフィルタを使用してログを取得します。

**クエリパラメータ:**
- `limit` (数値、デフォルト: 100) — 返す最大ログ数
- `level` (文字列) — ログレベルでフィルタ (ERROR、WARNING、INFO、DEBUG)
- `service` (文字列) — サービス名でフィルタ
- `language` (文字列、デフォルト: "en") — 翻訳のターゲット言語

**レスポンス:** `200 OK`

```json
{
  "logs": [...]
}
```

---

### アラート

#### POST /api/alerts

新しいアラートを作成します。

**リクエストボディ:**

```json
{
  "title": "High Error Rate",
  "description": "Error rate exceeded 5% threshold",
  "severity": "CRITICAL",
  "metadata": {}
}
```

**必須フィールド:** `title`、`description`、`severity`

#### GET /api/alerts

オプションのフィルタを使用してアラートを取得します。

**クエリパラメータ:**
- `status` (文字列) — ステータスでフィルタ (active、acknowledged、resolved)
- `language` (文字列、デフォルト: "en") — ターゲット言語

#### PATCH /api/alerts

アラートのステータスを更新します。

**リクエストボディ:**

```json
{
  "id": "alert-uuid",
  "status": "resolved"
}
```

---

### 統計

#### GET /api/stats

ダッシュボードの統計を取得します。

**レスポンス:** `200 OK`

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

### AIインサイト

#### POST /api/insights

ログからAIインサイトを生成します。

**リクエストボディ:**

```json
{
  "logIds": ["uuid-1", "uuid-2"],
  "language": "en"
}
```

#### GET /api/insights

最近のインサイトを取得します。

**クエリパラメータ:**
- `limit` (数値、デフォルト: 10) — 返却する最大インサイト数

## 認証

現在、APIはデモ目的でオープンになっています。本番環境では、AuthorizationヘッダーにJWTトークンを含むSupabase Authを使用してください。

## レート制限

開発環境ではレート制限はありません。本番環境ではVercelまたはリバースプロキシ経由で設定してください。
