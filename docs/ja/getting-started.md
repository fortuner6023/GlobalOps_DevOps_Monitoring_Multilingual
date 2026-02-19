# GlobalOpsを始める

## 概要

GlobalOpsは、本番環境対応のリアルタイムDevOps監視ダッシュボードで、6つの言語を標準でサポートしています。Lingo.devの5つの翻訳ツールすべてを統合し、完全な多言語体験を提供します。

## 機能

- **リアルタイムログストリーミング** — すべてのサービスからリアルタイムでログを表示
- **多言語アラート** — あなたの言語に翻訳されたアラートを作成、管理、追跡
- **AI搭載インサイト** — 推奨事項を含むログのインテリジェント分析
- **自動翻訳ドキュメント** — すべてのドキュメントが6つの言語で利用可能
- **言語切り替え** — 英語、スペイン語、フランス語、ドイツ語、日本語、中国語を瞬時に切り替え

## クイックスタート

### 1. リポジトリをクローン

```bash
git clone https://github.com/your-username/globalops.git
cd globalops
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数を設定

環境変数のサンプルファイルをコピーし、キーを入力してください:

```bash
cp .env.local.example .env.local
```

必須の変数:
- `LINGODOTDEV_API_KEY` — [Lingo.devダッシュボード](https://lingo.dev/dashboard)から取得
- `NEXT_PUBLIC_SUPABASE_URL` — SupabaseプロジェクトのURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase匿名キー
- `SUPABASE_SERVICE_ROLE_KEY` — Supabaseサービスロールキー

### 4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開いてください。

### 5. デモデータを生成

```bash
npm run generate:logs
```

## API経由でログを送信

REST APIを使用してGlobalOpsにログを送信できます:

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

## 優先言語を設定

ダッシュボード右上の言語切り替えをクリックして、優先言語を変更してください。すべてのログ、アラート、インサイトが自動的に翻訳されます。

## 次のステップ

- [APIリファレンス](./api-reference.md) — 完全なAPIドキュメント
- [デプロイメントガイド](./deployment.md) — 本番環境へのデプロイ
