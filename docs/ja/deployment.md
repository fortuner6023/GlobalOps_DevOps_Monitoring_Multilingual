# デプロイガイド

## 前提条件

- Node.js 20以上
- Supabaseプロジェクト
- Lingo.dev APIキー
- Vercelアカウント（デプロイ用）
- GitHubアカウント（CI/CD用）

## ステップ1: Supabaseのセットアップ

1. [supabase.com](https://supabase.com)で新しいプロジェクトを作成
2. SQLエディタに移動
3. `lib/supabase.ts`のSQL（下部のコメントセクション）を実行
4. 設定 → APIからプロジェクトURLとキーをコピー

## ステップ2: 環境変数

実際の値を使用して`.env.local`を作成:

```env
LINGODOTDEV_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## ステップ3: ドキュメントの翻訳

Lingo CLIを実行して、すべてのドキュメントの翻訳を生成:

```bash
npm run translate:docs
```

これにより、`docs/es/`、`docs/fr/`、`docs/de/`、`docs/ja/`、`docs/zh/`に翻訳されたドキュメントが作成されます。

## ステップ4: Vercelへのデプロイ

1. コードをGitHubにプッシュ
2. [vercel.com](https://vercel.com)にアクセスし、リポジトリをインポート
3. Vercelダッシュボードですべての環境変数を追加
4. デプロイ

## ステップ5: GitHub Actions（CI/CD）

1. GitHubリポジトリ → 設定 → シークレットと変数 → アクションに移動
2. シークレットを追加: `LINGODOTDEV_API_KEY`
3. `.github/workflows/translate-docs.yml`のワークフローが、プッシュごとに自動的にドキュメントを翻訳します

## ステップ6: CursorでLingo MCPを設定

1. Cursor設定 → MCPタブを開く
2. 新しいMCPサーバーを追加:
   - 名前: `Lingo.dev`
   - コマンド: `npx`
   - 引数: `["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]`
3. Cursorを再起動
4. 緑色のステータスインジケーターを確認

## 本番環境チェックリスト

- [ ] RLSが有効なSupabaseテーブルが作成済み
- [ ] すべての環境変数がVercelに設定済み
- [ ] Lingo Compilerがデプロイ時に翻訳をビルド
- [ ] CLIを介してドキュメントが翻訳済み
- [ ] CI/CDワークフローがテスト済み
- [ ] 開発環境でMCPが設定済み
- [ ] ショーケース用のデモデータが生成済み
- [ ] 5つのLingo.devツールすべてが動作確認済み

## 監視

デプロイ後は、アプリケーションを監視してください。

- **Vercelダッシュボード** — デプロイログと分析
- **Supabaseダッシュボード** — データベース監視とログ
- **GitHub Actions** — CI/CDパイプラインのステータス
