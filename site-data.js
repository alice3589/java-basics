// サイト全体の構成定義（ナビ・検索・前後ページ・進捗の元データ）
// progress:true の章だけ「学習済み」進捗の対象にカウントする
window.SITE = {
  pages: [
    { file: "index.html", title: "ホーム", icon: "🏠" },
    {
      file: "intro.html", group: "入門", icon: "🌱",
      chapters: [
        { id: "intro",     title: "1. Javaとは / 環境構築", progress: true },
        { id: "hello",     title: "2. 最初のプログラム", progress: true, ex: true },
        { id: "variables", title: "3. 変数とデータ型", progress: true, ex: true },
        { id: "operators", title: "4. 演算子", progress: true, ex: true },
        { id: "io",        title: "5. 標準入出力", progress: true, ex: true }
      ]
    },
    {
      file: "control.html", group: "制御構文", icon: "🔀",
      chapters: [
        { id: "if",     title: "6. 条件分岐 (if / switch)", progress: true, ex: true },
        { id: "loop",   title: "7. 繰り返し (for / while)", progress: true, ex: true },
        { id: "array",  title: "8. 配列", progress: true, ex: true },
        { id: "method", title: "9. メソッド", progress: true, ex: true }
      ]
    },
    {
      file: "oop.html", group: "オブジェクト指向", icon: "🧩",
      chapters: [
        { id: "class",        title: "10. クラスとオブジェクト", progress: true, ex: true },
        { id: "encapsulation",title: "11. カプセル化", progress: true, ex: true },
        { id: "inheritance",  title: "12. 継承", progress: true, ex: true },
        { id: "polymorphism", title: "13. ポリモーフィズム", progress: true, ex: true },
        { id: "interface",    title: "14. インターフェース", progress: true, ex: true },
        { id: "enum",         title: "15. enum と record", progress: true, ex: true },
        { id: "generics",     title: "16. ジェネリクス", progress: true, ex: true }
      ]
    },
    {
      file: "practice.html", group: "実践", icon: "🚀",
      chapters: [
        { id: "exception", title: "17. 例外処理", progress: true, ex: true },
        { id: "collection",title: "18. コレクション", progress: true, ex: true },
        { id: "string",    title: "19. 文字列操作", progress: true, ex: true },
        { id: "fileio",    title: "20. ファイル入出力", progress: true, ex: true },
        { id: "modern",    title: "21. ラムダ式とStream", progress: true, ex: true }
      ]
    },
    {
      file: "reference.html", group: "資料", icon: "📚",
      chapters: [
        { id: "cheatsheet", title: "チートシート" },
        { id: "glossary",   title: "用語集" },
        { id: "playground", title: "プレイグラウンド" }
      ]
    }
  ]
};
