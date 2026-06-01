// 各章の理解度クイズ。answer は正解の選択肢インデックス（0始まり）。
window.QUIZZES = {
  intro: [
    {
      q: "Javaのソースコードを実行可能な形にする作業を何という？",
      choices: ["コンパイル", "インストール", "デバッグ"],
      answer: 0,
      explain: "ソースコード(.java)を javac でコンパイルすると、バイトコード(.class)になります。"
    },
    {
      q: "バイトコードを実際に実行する土台は？",
      choices: ["エディタ", "JVM（Java仮想マシン）", "コンパイラ"],
      answer: 1,
      explain: "JVMが間に入るおかげで、どのOSでも同じコードが動きます。"
    }
  ],
  hello: [
    {
      q: "プログラムが最初に実行を始める場所は？",
      choices: ["クラスの先頭", "mainメソッド", "import文"],
      answer: 1,
      explain: "public static void main(String[] args) が入口です。"
    },
    {
      q: "文の終わりに必要なものは？",
      choices: ["コロン :", "セミコロン ;", "ピリオド ."],
      answer: 1,
      explain: "Javaでは文の終わりに必ずセミコロン ; を付けます。"
    },
    {
      q: "改行せずに表示するメソッドは？",
      choices: ["System.out.println", "System.out.print", "System.out.newline"],
      answer: 1,
      explain: "print は改行なし、println は改行ありです。"
    }
  ],
  variables: [
    {
      q: "整数を入れる型はどれ？",
      choices: ["double", "int", "String"],
      answer: 1,
      explain: "int が整数。double は小数、String は文字列です。"
    },
    {
      q: "変更できない定数を作るキーワードは？",
      choices: ["const", "static", "final"],
      answer: 2,
      explain: "Javaでは final を付けると再代入できない定数になります（const は予約語だが未使用）。"
    },
    {
      q: "double を int に変換するには？",
      choices: ["自動で変換される", "(int) を付けてキャストする", "変換できない"],
      answer: 1,
      explain: "情報が失われる方向（double→int）は明示的なキャスト (int) が必要。小数点以下は切り捨てです。"
    }
  ],
  operators: [
    {
      q: "7 / 2 の結果は？（どちらも int）",
      choices: ["3.5", "3", "4"],
      answer: 1,
      explain: "整数同士の割り算は小数を切り捨てるので 3 です。"
    },
    {
      q: "10 % 3 の結果は？",
      choices: ["1", "3", "0"],
      answer: 0,
      explain: "% は余り。10 を 3 で割った余りは 1 です。"
    },
    {
      q: "true && false の結果は？",
      choices: ["true", "false"],
      answer: 1,
      explain: "&&（AND）は両方 true のときだけ true。片方が false なので false です。"
    }
  ],
  io: [
    {
      q: "キーボードから入力を読むのに使うクラスは？",
      choices: ["Scanner", "Printer", "Reader"],
      answer: 0,
      explain: "java.util.Scanner を使います。"
    },
    {
      q: "整数を1つ読み取るメソッドは？",
      choices: ["nextLine()", "nextInt()", "readInt()"],
      answer: 1,
      explain: "nextInt() が整数、nextLine() は1行（文字列）を読みます。"
    }
  ],
  if: [
    {
      q: "(n % 2 == 0) ? \"偶数\" : \"奇数\" で n が 7 のとき結果は？",
      choices: ["偶数", "奇数"],
      answer: 1,
      explain: "7 を 2 で割った余りは 1（≠0）なので、条件は false → 「奇数」です。"
    },
    {
      q: "従来の switch 文で break を書き忘れると？",
      choices: ["コンパイルエラーになる", "次のcaseまで続けて実行される", "何も起きない"],
      answer: 1,
      explain: "break を忘れると下のcaseに流れ込みます（フォールスルー）。-> 形式なら起きません。"
    }
  ],
  loop: [
    {
      q: "for (int i = 1; i <= 5; i++) は何回繰り返す？",
      choices: ["4回", "5回", "6回"],
      answer: 1,
      explain: "i は 1,2,3,4,5 の5回です。"
    },
    {
      q: "ループを途中で完全に抜けるキーワードは？",
      choices: ["continue", "break", "return"],
      answer: 1,
      explain: "break はループを抜け、continue は次の繰り返しへスキップします。"
    },
    {
      q: "最低1回は必ず実行されるループは？",
      choices: ["while", "do-while", "for"],
      answer: 1,
      explain: "do-while は条件判定が後ろにあるため、最低1回は実行されます。"
    }
  ],
  array: [
    {
      q: "配列 arr の最初の要素のインデックスは？",
      choices: ["0", "1"],
      answer: 0,
      explain: "Javaの配列は0番目から始まります。"
    },
    {
      q: "要素数を得るには？",
      choices: ["arr.size()", "arr.length", "arr.count()"],
      answer: 1,
      explain: "配列は length（メソッドではなくフィールド、()不要）。ListはsizeなのでⅩ混同注意。"
    },
    {
      q: "長さ4の配列で arr[4] にアクセスすると？",
      choices: ["最後の要素が返る", "ArrayIndexOutOfBoundsException", "null が返る"],
      answer: 1,
      explain: "有効な番号は 0〜3。範囲外なので例外が発生します。"
    }
  ],
  method: [
    {
      q: "戻り値がないメソッドの戻り値の型は？",
      choices: ["void", "null", "empty"],
      answer: 0,
      explain: "戻り値がないときは void と書きます。"
    },
    {
      q: "同じ名前で引数の違うメソッドを複数定義することを何という？",
      choices: ["オーバーライド", "オーバーロード", "カプセル化"],
      answer: 1,
      explain: "オーバーロード（多重定義）。オーバーライドは継承での上書きで別物です。"
    }
  ],
  class: [
    {
      q: "クラスとオブジェクトの関係は？",
      choices: ["クラス＝実物、オブジェクト＝設計図", "クラス＝設計図、オブジェクト＝実物"],
      answer: 1,
      explain: "クラスが設計図、new で作った実物がオブジェクト（インスタンス）です。"
    },
    {
      q: "new したときに自動で呼ばれる初期化処理は？",
      choices: ["コンストラクタ", "main", "getter"],
      answer: 0,
      explain: "コンストラクタはオブジェクト生成時に呼ばれ、初期値の設定に使います。"
    },
    {
      q: "「自分自身のオブジェクト」を指すキーワードは？",
      choices: ["self", "this", "me"],
      answer: 1,
      explain: "Javaでは this を使います。"
    }
  ],
  encapsulation: [
    {
      q: "クラスの外から直接触れないようにする修飾子は？",
      choices: ["public", "private", "protected"],
      answer: 1,
      explain: "private はそのクラス内だけ。外から守りたいフィールドに使います。"
    },
    {
      q: "カプセル化の基本パターンは？",
      choices: ["フィールドはpublic、操作もpublic", "フィールドはprivate、操作はpublicメソッド"],
      answer: 1,
      explain: "データはprivateで隠し、公開メソッド経由で安全に操作させます。"
    }
  ],
  inheritance: [
    {
      q: "継承に使うキーワードは？",
      choices: ["implements", "extends", "inherits"],
      answer: 1,
      explain: "クラスの継承は extends。implements はインターフェースの実装です。"
    },
    {
      q: "親のメソッドを子で上書きすることを？",
      choices: ["オーバーロード", "オーバーライド"],
      answer: 1,
      explain: "オーバーライド。目印に @Override を付けます。"
    },
    {
      q: "親のコンストラクタを呼ぶには？",
      choices: ["this(...)", "super(...)", "parent(...)"],
      answer: 1,
      explain: "super(...) で親クラスのコンストラクタを呼びます。"
    }
  ],
  polymorphism: [
    {
      q: "中身が未定のメソッドを持ち、直接 new できないクラスは？",
      choices: ["抽象クラス（abstract）", "final クラス", "static クラス"],
      answer: 0,
      explain: "abstract クラスは継承前提で、abstractメソッドを子が実装します。"
    },
    {
      q: "同じ呼び出しが対象の型で違う動きをすることを？",
      choices: ["カプセル化", "ポリモーフィズム", "ジェネリクス"],
      answer: 1,
      explain: "ポリモーフィズム（多態性）です。"
    }
  ],
  interface: [
    {
      q: "インターフェースを実装するキーワードは？",
      choices: ["extends", "implements"],
      answer: 1,
      explain: "implements で実装します。複数同時に実装できます。"
    },
    {
      q: "1つのクラスが複数持てるのは？",
      choices: ["親クラス（extends）", "インターフェース（implements）"],
      answer: 1,
      explain: "継承する親クラスは1つだけですが、インターフェースは複数実装できます。"
    }
  ],
  enum: [
    {
      q: "決まった選択肢（赤・黄・青など）を表す型は？",
      choices: ["enum", "record", "interface"],
      answer: 0,
      explain: "enum（列挙型）で、限られた候補を安全に表せます。"
    },
    {
      q: "データを持つだけのクラスを短く書ける仕組みは？",
      choices: ["enum", "record", "abstract"],
      answer: 1,
      explain: "record はコンストラクタやgetter、toStringを自動生成します。"
    }
  ],
  generics: [
    {
      q: "List<String> の <String> が表すものは？",
      choices: ["リストの長さ", "中に入れる要素の型", "リストの名前"],
      answer: 1,
      explain: "ジェネリクスで「中身は文字列」と型を指定しています。"
    },
    {
      q: "ジェネリクスの利点は？",
      choices: ["型違いをコンパイル時に防げて安全", "実行が速くなる", "コードが自動生成される"],
      answer: 0,
      explain: "型が固定されるので、間違った型の混入を防ぎ、取り出し時のキャストも不要になります。"
    }
  ],
  exception: [
    {
      q: "例外が起きそうな処理を囲むブロックは？",
      choices: ["try", "catch", "finally"],
      answer: 0,
      explain: "try で囲み、catch で例外をつかまえ、finally で後片付けします。"
    },
    {
      q: "例外の有無に関わらず必ず実行されるブロックは？",
      choices: ["try", "catch", "finally"],
      answer: 2,
      explain: "finally は必ず実行されるので、後片付け（クローズ処理など）に使います。"
    },
    {
      q: "nullの変数に対して操作したときに起きる例外は？",
      choices: ["NullPointerException", "NumberFormatException", "IOException"],
      answer: 0,
      explain: "NullPointerException（NPE）。初心者が最もよく遭遇します。"
    }
  ],
  collection: [
    {
      q: "順番に並び、サイズが自由に変わるリストは？",
      choices: ["ArrayList", "HashMap", "HashSet"],
      answer: 0,
      explain: "ArrayList は可変長のリストです。"
    },
    {
      q: "キーと値のペアで管理するのは？",
      choices: ["List", "Map", "Set"],
      answer: 1,
      explain: "Map（HashMapなど）はキーと値のペアを扱います。"
    },
    {
      q: "重複を許さず、同じ値は1つしか持たないのは？",
      choices: ["List", "Set", "Map"],
      answer: 1,
      explain: "Set（HashSetなど）は重複を自動的に除きます。"
    }
  ],
  string: [
    {
      q: "文字列の中身が同じか比べる正しい方法は？",
      choices: ["a == b", "a.equals(b)"],
      answer: 1,
      explain: "== は参照の比較で当てになりません。中身の比較は .equals() を使います。"
    },
    {
      q: "\"Hello\".length() の結果は？",
      choices: ["4", "5", "6"],
      answer: 1,
      explain: "H,e,l,l,o の5文字です。"
    },
    {
      q: "文字列 \"123\" を整数に変換するには？",
      choices: ["Integer.parseInt(\"123\")", "(int)\"123\"", "String.toInt(\"123\")"],
      answer: 0,
      explain: "Integer.parseInt(...) を使います。"
    }
  ],
  fileio: [
    {
      q: "全行をListとして読み込むメソッドは？",
      choices: ["Files.readAllLines(path)", "Files.write(path)", "Path.of(path)"],
      answer: 0,
      explain: "Files.readAllLines がファイルの全行を List<String> で返します。"
    },
    {
      q: "ファイル操作で発生しうる例外は？",
      choices: ["IOException", "NullPointerException", "ArithmeticException"],
      answer: 0,
      explain: "入出力で問題が起きると IOException が発生する可能性があります。"
    }
  ],
  modern: [
    {
      q: "name -> System.out.println(name) のような短い関数を何という？",
      choices: ["ラムダ式", "コンストラクタ", "ジェネリクス"],
      answer: 0,
      explain: "ラムダ式です。引数 -> 処理 の形で書きます。"
    },
    {
      q: "Streamで「条件に合うものだけ残す」操作は？",
      choices: ["map", "filter", "collect"],
      answer: 1,
      explain: "filter が絞り込み、map が変換、collect/sum がまとめる操作です。"
    }
  ],
  exercise: [
    {
      q: "FizzBuzzで「3でも5でも割り切れる数」を先に判定すべき理由は？",
      choices: ["処理が速いから", "15の倍数の判定を先にしないと Fizz/Buzz だけが表示されてしまうから", "順番は関係ない"],
      answer: 1,
      explain: "3の倍数の判定を先に通すと15の倍数もそこで処理され「FizzBuzz」が出ません。最も限定的な条件から書きます。"
    }
  ],

  /* ===== 応用 ===== */
  package: [
    {
      q: "パッケージの主な役割は？",
      choices: ["クラスを整理し、名前の衝突を防ぐ", "実行を速くする", "メモリを節約する"],
      answer: 0,
      explain: "パッケージは名前空間。クラスを分類し、同じ名前のクラスどうしの衝突を防ぎます。"
    },
    {
      q: "import しなくても使えるパッケージは？",
      choices: ["java.util", "java.lang", "java.time"],
      answer: 1,
      explain: "java.lang（String・System・Math など）は自動的に使えます。"
    },
    {
      q: "import java.util.*; の意味は？",
      choices: ["java.util直下の全クラスを取り込む", "サブパッケージも全部取り込む", "1つだけ取り込む"],
      answer: 0,
      explain: "* はそのパッケージ直下の全クラス。サブパッケージは含みません。"
    }
  ],
  javadoc: [
    {
      q: "Javadoc（APIドキュメント）で特に確認したいのは？",
      choices: ["メソッドの引数と戻り値の型", "作者の名前", "ファイルサイズ"],
      answer: 0,
      explain: "引数と戻り値が分かれば使い方が分かります。Throws（発生しうる例外）も要確認。"
    },
    {
      q: "\"=\".repeat(5) の結果は？",
      choices: ["=====", "=", "5"],
      answer: 0,
      explain: "repeat(n) は文字列を n 回くり返します（=====）。"
    },
    {
      q: "知らないクラスの使い方を調べる一番の方法は？",
      choices: ["Javadocでメソッド一覧と説明を読む", "とりあえず全部試す", "使わずに諦める"],
      answer: 0,
      explain: "公式JavadocやIDEのポップアップで、メソッド一覧・引数・戻り値を確認します。"
    }
  ],
  gc: [
    {
      q: "ガベージコレクション（GC）の役割は？",
      choices: ["使われなくなったオブジェクトを自動回収する", "プログラムを高速化する", "バグを修正する"],
      answer: 0,
      explain: "どこからも参照されなくなったオブジェクトを自動で回収し、メモリを空けます。"
    },
    {
      q: "Javaでメモリを手動で解放する必要は？",
      choices: ["毎回 free を書く", "基本的に不要（GCが行う）", "delete で消す"],
      answer: 1,
      explain: "Javaに free / delete はありません。回収はGCが自動で行います。"
    },
    {
      q: "System.gc() の説明として正しいのは？",
      choices: ["呼ぶと即座に必ず回収される", "回収の「お願い」で、実行時期はJVM任せ", "メモリを倍に増やす"],
      answer: 1,
      explain: "あくまでヒント。いつ実行するかはJVMが決めるので、普段は書かなくてよいです。"
    }
  ],
  thread: [
    {
      q: "新しいスレッドで処理を始めるメソッドは？",
      choices: ["run()", "start()", "go()"],
      answer: 1,
      explain: "start() が新しいスレッドを起動します。run() を直接呼ぶと今のスレッドで実行され、並行になりません。"
    },
    {
      q: "join() の役割は？",
      choices: ["スレッドを強制終了する", "そのスレッドの終了を待つ", "スレッドを増やす"],
      answer: 1,
      explain: "join() は対象スレッドが終わるまで待ちます。結果を使う前の同期に便利です。"
    },
    {
      q: "Thread に渡す「実行したい処理」を表すのは？",
      choices: ["Runnable", "Iterable", "Comparable"],
      answer: 0,
      explain: "Runnable の run()（やラムダ）がスレッドで実行されます。"
    }
  ],
  sync: [
    {
      q: "複数スレッドが同じ変数を同時に書き換えて結果が壊れる現象は？",
      choices: ["競合状態（レースコンディション）", "オーバーフロー", "コンパイルエラー"],
      answer: 0,
      explain: "競合状態。count++ のような処理は途中で割り込まれると数え落とします。"
    },
    {
      q: "synchronized を付けると？",
      choices: ["一度に1スレッドだけが実行できる", "実行が必ず速くなる", "スレッドが増える"],
      answer: 0,
      explain: "相互排除。同時に入れるのは1スレッドだけになり、安全に共有データを更新できます。"
    },
    {
      q: "count++ が危険なのはなぜ？",
      choices: ["1つの命令で安全だから", "「読む→足す→書く」の複数ステップで割り込まれうるから", "数値が大きいから"],
      answer: 1,
      explain: "見た目は1つでも内部は複数ステップ。途中の割り込みで不整合が起きます。"
    }
  ],

  /* ===== デザインパターン ===== */
  "dp-intro": [
    {
      q: "デザインパターンとは？",
      choices: ["設計の定番の解き方に名前を付けたもの", "Javaの新しい文法", "エラーの一覧"],
      answer: 0,
      explain: "くり返し現れる設計問題の定石。名前があることで、意図を短い言葉で共有できます。"
    },
    {
      q: "多くのパターンに共通する考え方は？",
      choices: ["具体的なクラスに依存する", "インターフェース（抽象）に依存する", "グローバル変数を多用する"],
      answer: 1,
      explain: "「インターフェースにプログラミングする」ことで、変更や拡張に強くなります。"
    },
    {
      q: "Singleton・Adapter・Strategy の分類は順に？",
      choices: ["生成・構造・振る舞い", "構造・振る舞い・生成", "すべて同じ分類"],
      answer: 0,
      explain: "Singleton＝生成、Adapter＝構造、Strategy＝振る舞い、の代表例です。"
    }
  ],
  iterator: [
    {
      q: "Iteratorパターンが提供するのは？",
      choices: ["中身を1つずつ順に取り出す共通の方法", "並べ替え", "検索の高速化"],
      answer: 0,
      explain: "hasNext / next で、内部の構造を気にせず順番に走査できます。"
    },
    {
      q: "Javaでfor-each（拡張for文）を使えるようにするインターフェースは？",
      choices: ["Iterable", "Runnable", "Serializable"],
      answer: 0,
      explain: "Iterable を実装し iterator() を返すと、for-each が使えるようになります。"
    }
  ],
  adapter: [
    {
      q: "Adapterパターンの役割は？",
      choices: ["既存のクラスを別のインターフェースに合わせる", "新しいデータ構造を作る", "状態を管理する"],
      answer: 0,
      explain: "電源の変換アダプタのように、形（インターフェース）の合わないものを橋渡しします。"
    },
    {
      q: "Adapterを使う典型的な場面は？",
      choices: ["古い・外部のクラスを自分のコードの型に合わせる", "ループを速くする", "メモリを増やす"],
      answer: 0,
      explain: "中身は使いたいが形が合わない既存クラスを、期待する形に適合させます。"
    }
  ],
  template: [
    {
      q: "Template Methodパターンが親クラスで固定するのは？",
      choices: ["処理の手順（骨組み）", "変数の値", "スレッド数"],
      answer: 0,
      explain: "手順を親で固定し、変わる中身だけをサブクラスに任せます。"
    },
    {
      q: "サブクラスに任せるのはどこ？",
      choices: ["手順の全体", "具体的な一部の処理（抽象メソッド）", "mainメソッド"],
      answer: 1,
      explain: "abstract で空けた部分（printBody など）だけをサブクラスが実装します。"
    }
  ],
  singleton: [
    {
      q: "Singletonが保証するのは？",
      choices: ["インスタンスが全体で1つだけであること", "高速な実行", "インスタンスを複数作れること"],
      answer: 0,
      explain: "設定・ログなど「1つで十分／1つであるべき」ものに使います。"
    },
    {
      q: "Singletonの作り方のコツは？",
      choices: ["コンストラクタをpublicにする", "コンストラクタをprivateにし、getInstanceで同じ実体を返す", "mainを2つ作る"],
      answer: 1,
      explain: "外から new できないよう private にし、唯一の入口から同じ実体を返します。"
    }
  ],
  strategy: [
    {
      q: "Strategyパターンで差し替えるのは？",
      choices: ["アルゴリズム（やり方）", "クラス名", "パッケージ名"],
      answer: 0,
      explain: "処理のやり方をオブジェクトにして差し替えます。if 分岐の山を減らせます。"
    },
    {
      q: "新しいやり方を追加するには？",
      choices: ["既存コードを書き換える", "戦略インターフェースを実装した新クラスを足す", "mainを書き換える"],
      answer: 1,
      explain: "インターフェースを実装したクラスを追加するだけ。既存コードは変えずに拡張できます。"
    }
  ],
  composite: [
    {
      q: "Compositeパターンが「同一視」するのは？",
      choices: ["単体（葉）と容れ物（枝）", "int と String", "親スレッドと子スレッド"],
      answer: 0,
      explain: "File も Directory も同じ型として扱え、中身を気にせず同じ操作を呼べます。"
    },
    {
      q: "Compositeが得意とするデータ構造は？",
      choices: ["木構造（入れ子）", "ただの整数", "乱数"],
      answer: 0,
      explain: "フォルダの中にフォルダ…という木構造を、再帰的に同じ操作で処理できます。"
    }
  ],
  visitor: [
    {
      q: "Visitorパターンが分離するのは？",
      choices: ["データ構造と、それに対する処理", "画面と音声", "入力と出力"],
      answer: 0,
      explain: "要素のクラスを変えずに、新しい処理を「訪問者」として後から追加できます。"
    },
    {
      q: "要素が訪問者を受け入れるメソッドは？",
      choices: ["accept(visitor)", "visit()", "start()"],
      answer: 0,
      explain: "accept の中で v.visit(this) を呼び、自分の型に合った処理を実行します（ダブルディスパッチ）。"
    }
  ],
  state: [
    {
      q: "Stateパターンが整理してくれるのは？",
      choices: ["if / switch の山になりがちな状態遷移", "配列の並べ替え", "文字列の連結"],
      answer: 0,
      explain: "状態そのものをクラスにし、状態ごとのふるまいと遷移を持たせます。"
    },
    {
      q: "信号機の例で「次の状態」を知っているのは？",
      choices: ["呼び出し側の if 文", "各状態オブジェクト自身", "main メソッド"],
      answer: 1,
      explain: "各状態が自分の next() を知っているので、呼び出し側は next() を呼ぶだけで済みます。"
    }
  ]
};
