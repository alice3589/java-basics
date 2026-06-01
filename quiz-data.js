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
  ]
};
