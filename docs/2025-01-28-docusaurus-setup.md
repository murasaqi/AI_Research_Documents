---
title: Docusaurusで知識ベースを構築した記録
tags: [docusaurus, setup, windows, vibe-coding]
date: 2025-01-28
---

# Docusaurusで知識ベースを構築した記録

## 背景・モチベーション

### なぜ知識ベースが必要だったか

日々の開発作業やAI研究の中で、以下のような課題を感じていた：

- 開発中の気づきやAIに関する実験結果が散逸してしまう
- 後から「あの時どうやったっけ？」と思い出せない
- チームメンバーと知見を共有する手段が欲しい
- GitHubで履歴管理して、変更履歴を追跡したい

### 理想とする要件

- **気軽に書ける**: 思いついたらすぐメモできる
- **エディタの自由**: VSCodeでもVimでも好きなエディタで編集
- **整理は後回し**: まず書いて、整理は後から
- **AI活用**: AIによる自動ライティングや整理も活用したい
- **共有しやすい**: 必要に応じてチームに公開できる

## Claude Codeとの対話で方針を策定

### 1. 初期の提案と課題認識

> 💭 **私の要望**  
> 「カジュアルに開発中の記録やAIに関する備忘録をMarkdownで記録してGithub上に履歴を残したい。そのためのシンプルなシステムを考案して」

> 🤖 **Claude Codeの提案**  
> 構造化されたシステムを提案しますね。日次記録とトピック別整理を組み合わせた構成はいかがでしょうか：
> ```
> dev-notes/
> ├── README.md
> ├── daily/
> │   └── 2025/
> │       └── 01/
> │           └── 2025-01-28.md
> ├── topics/
> │   ├── ai/
> │   ├── development/
> │   └── learning/
> └── templates/
>     └── daily-template.md
> ```
> 日次記録フォーマットやコミットルール、週次振り返りなど、体系的な運用フローも含めて提案します。

---

> 💭 **私の追加要望**  
> 「Docusaurusでプレビュー可能な構成を考えて」

> 🤖 **Claude Codeの対応**  
> Docusaurus対応版にアップデートします：
> - `docs/daily/`（日次記録）
> - `docs/ai/`（AI関連トピック）  
> - `docs/development/`（開発トピック）
> - `blog/`（週次サマリー）
> 
> サイドバー自動生成、タグ機能、MDXサポートなど、Docusaurusの機能をフル活用できる構成です。

---

> 💭 **私の本音**  
> 「カテゴリごとにディレクトリを変えるのも良いが、細かく整理しながらアップデートするのは性に合わない。まずは書いて雑に放り込んで、自動もしくはあとから整理ができるような仕組みを考えて」

→ ここで重要な要件が明確に：**整理は苦手、まず書くことを優先したい** 🎯

### 2. 「書き捨て→自動整理」型システムの検討

> 🤖 **Claude Codeの理解と新提案**  
> なるほど！整理は後回しで、まず書くことに集中できる仕組みですね。こんなアプローチはどうでしょう：
> 
> ```
> my-notes/
> ├── docs/
> │   ├── inbox/           # 全ての新規投稿はここに
> │   │   ├── 2025-01-28-001.md
> │   │   ├── 2025-01-28-002.md
> │   │   └── 2025-01-29-001.md
> │   └── organized/       # AI/手動で整理されたもの
> └── scripts/
>     └── auto-organize.js
> ```
> 
> **自動整理の仕組み：**
> - 🤖 AIベースの自動タグ付け（内容を解析して提案）
> - 🔍 スマート検索ページ（タグクラウド、全文検索）
> - ⚡ クイック投稿（`note.sh "タイトル"`で即開始）
> - 📊 週次AIレビュー（整理提案、重複検出）
> - 🎯 ドラッグ&ドロップ整理UI

### 3. Obsidianとの比較検討

> 💭 **私の質問**  
> 「Obsidianとこのシステムを比較したときどちらが気軽に更新をしつづけられるでしょうか」

> 🤖 **Claude Codeの率直な分析**  
> 
> 正直に比較しますと...
> 
> **📊 記録の気軽さスコア**
> - Obsidian: ████████████ (12/12)
> - Docusaurus: ███████ (7/12)
> 
> **Obsidianが優れている点：**
> - ⚡ アプリ起動→すぐメモ（2秒）
> - 📱 モバイルアプリ完備
> - 🔗 [[リンク]]で自然につながる
> - 🕸️ グラフビューが美しい
> - 💾 オフライン完全対応
> - 🚫 Git/ビルド/デプロイ不要
> 
> **Docusaurusが優れている点：**
> - 🌐 URLで簡単共有
> - 🎨 美しいWebサイト
> - 🔧 プログラマブル
> - 👥 チーム共有に最適
> 
> **結論：気軽に更新し続けたいなら Obsidian をお勧めします。**
> ただし、チーム共有が必須ならDocusaurusですね。

### 4. エディタ要件の追加と方針転換

> 💭 **私の追加要件**  
> 「書くエディターはVSCodeやVIMで書いたり、適宜AIによる自動ライティングも活用したい」

> 🤖 **Claude Codeの新アプローチ**  
> エディタの自由度を重視した構成に切り替えましょう！
> 
> ```
> dev-notes/
> ├── notes/
> │   ├── 2025-01-28-001.md
> │   └── ...
> ├── scripts/
> │   ├── new.sh          # 新規ノート作成
> │   ├── ai-enhance.py   # AI拡張
> │   └── publish.sh      # 公開用に変換
> └── .github/
>     └── workflows/
>         └── build-site.yml
> ```
> 
> **エディタ連携：**
> - Vim: `:Note`で新規作成、`:AIComplete`でAI補完
> - VSCode: タスクとスニペット設定
> - AI補助: タグ生成、要約、関連コンテンツ追加
> - 公開: 11ty、Hugo、Jekyll、Quartzから選択可能

### 5. チーム共有を考慮した統合提案

> 💭 **私のまとめ要望**  
> 「以上のオーダーを踏まえて気軽にMarkdownドキュメントをストックして、チームで共有したりすることを気軽にできるようなフォルダ内の構成やシステムを考案して」

> 🤖 **Claude Codeの統合システム**  
> すべての要件を満たすシステムをまとめました：
> - 📝 ワンライナーで開始（`note "タイトル"`）
> - 🔧 エディタ自動検出
> - 🚀 GitHub Actions自動デプロイ
> - 📱 Issue経由でモバイル投稿も可能
> - 🔗 簡易共有（`./scripts/share`でURL生成）

### 6. 最小構成への収束

> 💭 **私の決断**  
> 「とりあえず書き始めたいので、最低限のセットアップだけしてほしい」
> 
> 「今後Docusaurus等を使っていきたいので、その前提を踏まえた書き始めるためのフォルダ構成だけ考えてください」
> 
> 「カテゴリだけ最小限にしてください。整理はあとからできるように考えて」

> 🤖 **Claude Codeの最終提案**  
> わかりました！超シンプルにいきましょう：
> 
> ```
> my-notes/
> ├── docs/              # 全てのメモをここに入れる
> │   └── intro.md       # 最初のページ
> ├── static/           
> │   └── img/          # 画像置き場
> └── README.md         
> ```
> 
> **この構成が最高な理由：**
> - 🎯 どこに置くか迷わない
> - ✅ Docusaurus互換
> - 📁 後から整理可能
> - 🔍 grepで十分検索できる
> 
> **まずは書くことから始めましょう！**

## 検討結果

### 採用した方針

1. **最小限から始める**: 3つのフォルダのみでスタート
2. **整理は後回し**: すべて`docs/`に放り込む
3. **Docusaurus採用**: 将来の拡張性を考慮
4. **ファイル名で工夫**: 日付やプレフィックスで検索性確保

### なぜこの構成が良いか

- **考えることが最小**: どこに置くか迷わない
- **すぐ書き始められる**: フォルダ作って即開始
- **Docusaurus対応**: 後から機能追加が容易
- **検索で十分**: 最初はgrepで探せばOK

### Vibe Codingから学んだこと

1. **完璧を求めない**: 動くものをまず作る
2. **対話で要件明確化**: 話しながら本当に必要なものが見えてくる
3. **段階的な複雑さ**: シンプルから始めて徐々に機能追加
4. **ユーザーの性格に合わせる**: 整理が苦手→整理不要な仕組み

## Docusaurusセットアップの備忘録

### セットアップ手順

#### 1. 基本構造の作成
```bash
mkdir -p my-notes/docs my-notes/static/img
```

#### 2. 初期ファイル作成
- `docs/intro.md`: トップページ
- `README.md`: プロジェクト説明

#### 3. Docusaurusインストール
```bash
cd my-notes
npm init -y
npm install --save @docusaurus/core @docusaurus/preset-classic
npm install react react-dom  # 明示的に必要
```

#### 4. 設定ファイル作成

**docusaurus.config.js**の主要設定:
- 日本語対応: `defaultLocale: 'ja'`
- Docsをルートに: `routeBasePath: '/'`
- ブログ無効化: `blog: false`
- 自動サイドバー生成

**sidebars.js**:
```javascript
{
  type: 'autogenerated',
  dirName: '.',  // すべてのファイルを自動収集
}
```

#### 5. npm scriptsの設定
```json
"scripts": {
  "start": "docusaurus start",
  "build": "docusaurus build"
}
```

### 遭遇した問題と解決

| 問題 | 原因 | 解決策 |
|------|------|--------|
| package.jsonが認識されない | Windowsのパス問題 | 絶対パスで再作成 |
| npm scriptsが動かない | package.jsonの更新が反映されない | ファイル削除して再作成 |
| Reactエラー | 依存関係の不足 | React 18.xを明示的にインストール |
| CSSファイルが見つからない | ファイル未作成 | src/css/custom.css作成 |

### 運用方法

#### 新規メモの作成
```bash
# 日付付き
code docs/2025-01-28-ai-tips.md

# プレフィックス付き
code docs/dev-api-optimization.md
```

#### フロントマター活用
```markdown
---
title: タイトル
tags: [ai, development]
date: 2025-01-28
---
```

#### 開発サーバー
```bash
npm start  # http://localhost:3000
```

### 今後の拡張可能性

1. **検索機能**: Algolia統合
2. **自動デプロイ**: GitHub Actions
3. **プラグイン追加**: 画像拡大、MDXサポート
4. **AI整理機能**: 定期的な自動分類

### まとめ

「とりあえず書く」を最優先に、最小限の構成でDocusaurusベースの知識管理システムを構築。整理は後から、まずは蓄積することに集中できる環境が完成した。