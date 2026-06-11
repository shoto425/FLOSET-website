# FLOSET Website

FLOSET のランディングページと 3D ギャラリー・ニュース UI を含む Web サイトです。

## 構成

- ルート直下: 静的 LP（`index.html`、各種ポリシーページ、`assets/`）
- `floset-app/`: Next.js アプリ（`/gallery`、`/news` の iframe 用）

## ローカル開発

```bash
# 静的 LP を確認（iframe は別途 Next.js が必要）
python3 -m http.server 8080

# 3D ギャラリー / ニュース（iframe 用）
cd floset-app
npm install
npm run dev
```

本番と同じ構成で確認する場合:

```bash
cd floset-app
npm install
npm run build
npm run start
```

`http://localhost:3000` で LP・ギャラリー・ニュースが一体で動作します。

## GitHub へのプッシュ

```bash
# GitHub CLI でログイン（初回のみ）
gh auth login

# リポジトリ作成 & プッシュ
cd /path/to/FLOSET_website
gh repo create FLOSET-website --public --source=. --remote=origin --push
```

LP を更新したら、同期スクリプトを実行してからコミットしてください。

```bash
node scripts/sync-public.mjs
git add .
git commit -m "Update site"
git push
```

## Vercel デプロイ

**本番 URL:** https://floset-app.vercel.app

### CLI からデプロイ

```bash
cd floset-app
npx vercel --prod --scope shoto425oshiro-9402s-projects
```

### GitHub 連携（推奨）

1. GitHub にリポジトリをプッシュ
2. [Vercel Dashboard](https://vercel.com) → Import Project
3. **Root Directory** を `floset-app` に設定
4. Framework: Next.js（デフォルトのまま）
5. Deploy

以降は `main` ブランチへの push で自動デプロイされます。
