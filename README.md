# ☕ Java基礎マスター

Javaの基礎をゼロから体系的に学べる学習用Webサイトです。**ブラウザ上でコードを書いて実行・自動採点**しながら学べます。入門からデザインパターンまで**全35章**、授業シラバス（全30週）に対応しています。自分の勉強用に作成しました。

## 📖 公開ページ

👉 **https://alice3589.github.io/java-basics/**

## ✨ 特徴

- 📂 **部門ごとのページ構成** — 入門 / 制御構文 / オブジェクト指向 / 実践 / 応用 / デザインパターン / 資料 に分割（全35章）
- 🎨 **デザインパターン編** — Iterator・Adapter・Template Method・Singleton・Strategy・Composite・Visitor・State をGoFの分類とともに実装しながら学べる
- 📋 **授業シラバス対応** — 全30週のテーマと各章の対応表を資料ページに掲載
- 🟢 **ブラウザ内でJavaを実行** — 各コード例を「▶ 実行」でコンパイル＆実行、書き換えも可能（[Wandbox](https://wandbox.org) JDK 22）
- ✏️ **自動採点の練習問題** — 各章でコードを書き、「✓ 判定する」でテストケースと照合して正誤判定。クリアするとその章が学習済みに
- ❓ **理解度クイズ** — 章ごとの選択式クイズ（即時採点・解説つき）
- 🎮 **プレイグラウンド** — 自由にコードを書けるエディタ（CodeMirror）
- 📊 **進捗トラッキング** — 学習済みの章・クリアした問題をlocalStorageに保存、進捗バーで可視化
- 🌗 **ライト / ダークテーマ切り替え** ／ 🔍 **全ページ横断の章検索** ／ 📱 レスポンシブ

## ページ構成（部門）

| ページ | 内容 |
|--------|------|
| `index.html` | ホーム（部門一覧・進捗・使い方） |
| `intro.html` | 入門：環境構築 / Hello World / 変数 / 演算子 / 標準入出力 |
| `control.html` | 制御構文：条件分岐 / 繰り返し / 配列 / メソッド |
| `oop.html` | オブジェクト指向：クラス / カプセル化 / 継承 / ポリモーフィズム / インターフェース / enum・record / ジェネリクス |
| `practice.html` | 実践：例外処理（独自例外・try-with-resources含む）/ コレクション / 文字列 / ファイルI/O / ラムダ・Stream |
| `advanced.html` | 応用：パッケージ / クラスの調べ方(Javadoc) / ガベージコレクション / スレッド / 相互排除と同期 |
| `patterns.html` | デザインパターン：Iterator / Adapter / Template Method / Singleton / Strategy / Composite / Visitor / State |
| `reference.html` | 資料：シラバス対応表 / チートシート / 用語集 / プレイグラウンド |

各章は「**説明 → 実行できるコード例 → 練習問題（自動採点）→ 理解度クイズ**」の流れです。

## ファイル構成

```
java-basics/
├── *.html         各部門ページ（共通の枠組み＋本文）
├── style.css      スタイル（ライト/ダーク両対応）
├── app.js         共通ロジック（ナビ描画・実行・採点・クイズ・進捗・検索・前後ページ）
├── site-data.js   サイト構成（部門・章・ページ定義 → ナビ/検索/前後ページの元データ）
├── exercises.js   各章の練習問題（テンプレート・テストケース・解答例）
├── quiz-data.js   各章の理解度クイズ
└── README.md
```

## 技術メモ

- コード実行・採点: Wandbox API（`openjdk-jdk-22+36`）。CORS開放済みでブラウザから直接呼び出し。
- 文字化け対策として、javacに `-encoding UTF-8`、実行時に `-Dstdout.encoding=UTF-8` / `-Dstderr.encoding=UTF-8` を渡している。
- Wandboxのメインファイルは `prog.java` のため、`public class` は `class` に変換して送信。
- 自動採点は、各テストケースの標準入力で実行し、標準出力を正規化（行末空白・前後の空行を無視）して期待値と比較する。
- サイドバー・前後ページ・検索は `site-data.js` から `app.js` が動的に生成（全ページ共通）。

---
Made with [Claude Code](https://claude.com/claude-code)
