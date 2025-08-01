---
sidebar_position: 7
title: Claude Codeセッション自動記録システムの構築
tags: [claude-code, logging, automation, snap-happy, mcp]
date: 2025-07-29
---

# Claude Codeセッション自動記録システムの構築

## 概要
Claude Codeとのコーディングセッションを自動的に記録し、画面キャプチャも含めて即座に記事化できるシステムを構築した記録です。

## Claude Codeとの対話でセッション自動記録システムを構築

### 1. 要件定義と調査

> 💭 **私の要望**  
> 「開発の記録をMarkdownで記録をとっているが、Claude Codeとのコーディングセッション内容も含めて即座に記事にできるようにしたい。どのようなアプローチがよいか。また、記事はF:\works\AI_Research_Documents\my-notes\docsにポストされるようにしたい」

> 🤖 **Claude Codeの提案**  
> Claude Codeセッション記録の自動記事化システムを提案しました：
> 
> **提案したアプローチ：**
> 1. セッションログ収集システム（JSONLファイルの自動保存）
> 2. ログ変換スクリプト（AI対話記録フォーマットへ変換）
> 3. 記事生成機能（日付ごとに自動生成）
> 4. 各種スクリプトと設定ファイル
> 
> **ポイント：**
> - Claude Codeは既に`~/.claude/projects/`にJSONL形式でログを保存
> - リアルタイムで自動追記される
> - セッションID、タイムスタンプ、会話内容、ツール使用履歴を含む

---

### 2. 要件の絞り込み

> 💭 **私の追加要望**  
> 「まずはClaude codeとのセッションのログを自動でしっかりと記録をとる仕組みのみ考えて欲しい。記事にする仕組みは別途作ります」

> 🤖 **Claude Codeの理解と新提案**  
> セッション自動ログ記録に特化したシステムを再設計：
> 
> **既存の仕組み：**
> - 保存場所: `~/.claude/projects/[プロジェクト名]/[session-id].jsonl`
> - 形式: JSONL (各行が独立したJSONオブジェクト)
> - リアルタイム更新
> 
> **提案した追加システム：**
> 1. ログ監視・集約スクリプト
> 2. セッション解析ツール
> 3. 自動バックアップ設定
> 4. メタデータ管理

---

### 3. セッション終了の定義

> 💭 **私の質問**  
> 「セッション終了時とは具体的にどういったタイミングですか」

> 🤖 **Claude Codeの説明**  
> セッション終了タイミングを3つに分類しました：
> 
> **1. 明示的な終了**
> - `Ctrl+C` / `Ctrl+D` でClaude Code終了
> - `exit`コマンド実行
> - ターミナルウィンドウを閉じる
> 
> **2. 自動的な終了**
> - 10-15分の無操作タイムアウト
> - システムエラー
> - ネットワーク切断
> 
> **3. セッションの区切り**
> - `/clear`コマンド（コンテキストリセット）
> - プロジェクトディレクトリ変更
> - Claude Code再起動
> 
> **実装上の判定方法：**
> - ファイルの最終更新時刻を監視
> - 5-10分更新がない場合に終了と判断

---

### 4. Snap-Happy統合の提案

> 💭 **私の新たな要望**  
> 「@mariozechner/snap-happy を使って画面キャプチャも含めて自動で記録を取るシステムにしたい。どのようにすればよいか」

> 🤖 **Claude Codeの調査と実装**  
> Snap-Happyについて調査し、MCPサーバーとして統合する方法を提案・実装しました：
> 
> **Snap-Happy概要：**
> - クロスプラットフォーム対応のスクリーンショットツール
> - MCPサーバーとしてClaude Codeに統合可能
> - 3つのツール：GetLastScreenshot、TakeScreenshot、ListWindows
> 
> **実装内容：**
> 1. settings.jsonにMCPサーバー設定追加
> 2. 自動キャプチャスクリプト3種類作成
> 3. フック設定（UserPromptSubmit、PostToolUse）
> 4. バックグラウンド監視システム

---

### 5. 実装詳細

> 🤖 **Claude Codeの実装**  
> 以下のシステムを構築しました：
> 
> **作成したファイル：**
> ```
> F:\works\ClaudeCodeSessionLog\
> ├── auto-capture-session.ps1    # セッション開始時
> ├── capture-after-write.ps1     # ファイル編集後
> ├── capture-after-edit.ps1      # 複数編集後
> ├── session-monitor.ps1         # バックグラウンド監視
> └── README-snap-happy-integration.md
> ```
> 
> **settings.json更新内容：**
> - Snap-Happy MCPサーバー追加
> - UserPromptSubmitフック設定
> - PostToolUse (Write/MultiEdit)フック設定
> 
> **データ構造：**
> ```
> sessions\
> └── 2025-07-29\
>     └── [session-id]\
>         ├── session.jsonl
>         ├── metadata.json
>         └── screenshots\
> ```

---

### 6. 自動記録システムの活用

> 💭 **私の確認**  
> 「Claude codeでセッションを開始するさい、この自動記録は意識されずに実行されるようにしたいが、それは可能になっているか？」

> 🤖 **Claude Codeの回答**  
> はい、可能です。UserPromptSubmitフックにより完全に透過的に動作します：
> 
> **自動実行の仕組み：**
> - 最初の入力時に自動でフックが発動
> - バックグラウンドでログ監視プロセス開始
> - ユーザーは記録を意識する必要なし
> 
> **注意点：**
> - Claude Codeは既にログを自動保存している
> - 追加システムはログの補完・整理が目的
> - フックはセッション終了時の処理には非対応

---

## 学びと振り返り

> 💭 **私の学び**  
> 「Claude Codeの既存機能を活用しつつ、MCPサーバーとフックを組み合わせることで、透過的な自動記録システムを構築できることが分かった」

> 🤖 **Claude Codeの振り返り**  
> この実装から得られた重要な学びポイント：
> 
> **1. Claude Codeの既存機能活用 ✨**
> - JSONLログは既に自動保存されている
> - フック機能で任意のタイミングで処理を追加可能
> - MCPサーバーで外部ツール統合が容易
> 
> **2. PowerShellスクリプトの活用 🔧**
> - Windowsでのバックグラウンド処理
> - ファイル監視と自動バックアップ
> - JSONデータの解析と変換
> 
> **3. 段階的な実装アプローチ 🎯**
> - まずログ記録に集中
> - 記事生成は別システムとして分離
> - 将来の拡張性を考慮した設計

---

## 今後の改善提案

> 🤖 **Claude Codeの改善提案**  
> 将来的に検討可能な改善点：
> 
> 1. **自動スクリーンショット統合** 📸
>    - Claude APIでsnap-happyツールを自動実行
>    - エラー発生時の自動キャプチャ
> 
> 2. **記事生成パイプライン** 📝
>    - ログとスクリーンショットから自動記事生成
>    - AI対話記録フォーマットへの変換
>    - 重要な意思決定ポイントの自動抽出
> 
> 3. **分析ツール** 📊
>    - セッション統計の可視化
>    - 作業パターンの分析
>    - トークン使用量の追跡

---

## まとめ

この会話を通じて、Claude Codeセッションの完全な自動記録システムを構築しました。テキストログと画面キャプチャを組み合わせることで、開発過程を詳細に記録し、後から振り返りや記事化が容易になりました。

→ ここで重要な気づき：**既存の機能を最大限活用し、必要最小限の追加実装で目的を達成できる** 🎯