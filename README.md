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

## Vercel デプロイ

1. このリポジトリを GitHub にプッシュ
2. [Vercel](https://vercel.com) で「Import Project」→ リポジトリを選択
3. Framework Preset: **Next.js**（`vercel.json` がビルドを設定）
4. Deploy

`vercel.json` がビルド前に静的ファイルを `floset-app/public/` へ同期します。
