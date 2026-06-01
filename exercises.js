// 各章の「実際にコードを書いて正誤判定する」練習問題。
// tests[].stdin を標準入力として実行し、標準出力を期待値(expect)と比較する（前後の空白・末尾改行は無視）。
window.EXERCISES = {

  /* ===== 入門 ===== */
  hello: {
    title: "Hello, Java! を出力しよう",
    desc: "コンソールに <code>Hello, Java!</code> と表示するプログラムを完成させてください。",
    template:
`public class Main {
    public static void main(String[] args) {
        // TODO: Hello, Java! と出力する

    }
}`,
    tests: [{ stdin: "", expect: "Hello, Java!" }],
    solution:
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`
  },

  variables: {
    title: "変数を使って自己紹介",
    desc: "変数 <code>name</code> に <code>\"太郎\"</code>、<code>age</code> に <code>15</code> を入れ、<code>太郎は15歳です</code> と出力してください。",
    template:
`public class Main {
    public static void main(String[] args) {
        // TODO: name と age を宣言して出力する

    }
}`,
    tests: [{ stdin: "", expect: "太郎は15歳です" }],
    solution:
`public class Main {
    public static void main(String[] args) {
        String name = "太郎";
        int age = 15;
        System.out.println(name + "は" + age + "歳です");
    }
}`
  },

  operators: {
    title: "四則演算と余り",
    desc: "<code>a = 13</code>, <code>b = 5</code> のとき、<b>和・差・積・商・余り</b>をこの順に1行ずつ出力してください（5行）。",
    template:
`public class Main {
    public static void main(String[] args) {
        int a = 13, b = 5;
        // TODO: a+b, a-b, a*b, a/b, a%b をそれぞれ1行ずつ出力

    }
}`,
    tests: [{ stdin: "", expect: "18\n8\n65\n2\n3" }],
    solution:
`public class Main {
    public static void main(String[] args) {
        int a = 13, b = 5;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
}`
  },

  io: {
    title: "入力を受け取って挨拶",
    desc: "標準入力から<b>1行目に名前、2行目に年齢</b>が与えられます。<code>〇〇さんは△歳です</code> と出力してください（プロンプト文字は表示しないこと）。",
    template:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // TODO: 名前(nextLine)と年齢(nextInt)を読み、結果を出力

    }
}`,
    tests: [
      { stdin: "佐藤\n20", expect: "佐藤さんは20歳です" },
      { stdin: "花子\n8",  expect: "花子さんは8歳です" }
    ],
    solution:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();
        System.out.println(name + "さんは" + age + "歳です");
    }
}`
  },

  /* ===== 制御構文 ===== */
  if: {
    title: "正・ゼロ・負の判定",
    desc: "標準入力で整数が1つ与えられます。<b>正なら「正」、0なら「ゼロ」、負なら「負」</b>と出力してください。",
    template:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        // TODO: n の符号に応じて 正 / ゼロ / 負 を出力

    }
}`,
    tests: [
      { stdin: "5",  expect: "正" },
      { stdin: "0",  expect: "ゼロ" },
      { stdin: "-3", expect: "負" }
    ],
    solution:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        if (n > 0) System.out.println("正");
        else if (n == 0) System.out.println("ゼロ");
        else System.out.println("負");
    }
}`
  },

  loop: {
    title: "1からNまでの合計",
    desc: "標準入力で整数 <code>N</code> が与えられます。<code>1 + 2 + … + N</code> の合計を出力してください。",
    template:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        // TODO: 1からnまでの合計を計算して出力

    }
}`,
    tests: [
      { stdin: "10",  expect: "55" },
      { stdin: "100", expect: "5050" },
      { stdin: "1",   expect: "1" }
    ],
    solution:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += i;
        System.out.println(sum);
    }
}`
  },

  array: {
    title: "配列の合計と最大値",
    desc: "配列 <code>{3, 1, 4, 1, 5, 9, 2, 6}</code> の<b>合計</b>と<b>最大値</b>をこの順に1行ずつ出力してください。",
    template:
`public class Main {
    public static void main(String[] args) {
        int[] a = {3, 1, 4, 1, 5, 9, 2, 6};
        // TODO: 合計と最大値を求めて1行ずつ出力

    }
}`,
    tests: [{ stdin: "", expect: "31\n9" }],
    solution:
`public class Main {
    public static void main(String[] args) {
        int[] a = {3, 1, 4, 1, 5, 9, 2, 6};
        int sum = 0, max = a[0];
        for (int x : a) {
            sum += x;
            if (x > max) max = x;
        }
        System.out.println(sum);
        System.out.println(max);
    }
}`
  },

  method: {
    title: "addメソッドを作る",
    desc: "2つの整数を受け取って合計を返す <code>add</code> メソッドを作ってください。<code>main</code> はすでに書かれています。",
    template:
`public class Main {
    // TODO: int を2つ受け取り、合計を返す add メソッドを作る

    public static void main(String[] args) {
        System.out.println(add(3, 4));
        System.out.println(add(100, 200));
    }
}`,
    tests: [{ stdin: "", expect: "7\n300" }],
    solution:
`public class Main {
    static int add(int a, int b) {
        return a + b;
    }
    public static void main(String[] args) {
        System.out.println(add(3, 4));
        System.out.println(add(100, 200));
    }
}`
  },

  /* ===== オブジェクト指向 ===== */
  class: {
    title: "Personクラスを作る",
    desc: "名前と年齢を持つ <code>Person</code> クラスを作り、<code>greet()</code> で <code>田中(30歳)</code> のように出力してください。<code>main</code> は用意済みです。",
    template:
`class Person {
    // TODO: フィールド(name, age)・コンストラクタ・greet() を作る

}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("田中", 30);
        p.greet();
    }
}`,
    tests: [{ stdin: "", expect: "田中(30歳)" }],
    solution:
`class Person {
    String name; int age;
    Person(String name, int age) { this.name = name; this.age = age; }
    void greet() { System.out.println(name + "(" + age + "歳)"); }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("田中", 30);
        p.greet();
    }
}`
  },

  encapsulation: {
    title: "カウンターを作る",
    desc: "<code>private int count;</code> を持ち、<code>increment()</code> で1増やし、<code>getCount()</code> で値を返す <code>Counter</code> クラスを作ってください。<code>main</code> は3回incrementして値を出力します。",
    template:
`class Counter {
    // TODO: private count, increment(), getCount() を作る

}

public class Main {
    public static void main(String[] args) {
        Counter c = new Counter();
        c.increment();
        c.increment();
        c.increment();
        System.out.println(c.getCount());
    }
}`,
    tests: [{ stdin: "", expect: "3" }],
    solution:
`class Counter {
    private int count = 0;
    public void increment() { count++; }
    public int getCount() { return count; }
}

public class Main {
    public static void main(String[] args) {
        Counter c = new Counter();
        c.increment(); c.increment(); c.increment();
        System.out.println(c.getCount());
    }
}`
  },

  inheritance: {
    title: "メソッドをオーバーライド",
    desc: "<code>Animal</code> の <code>speak()</code> を、<code>Dog</code> で <code>ワン</code> と出力するようにオーバーライドしてください。",
    template:
`class Animal {
    void speak() { System.out.println("..."); }
}

class Dog extends Animal {
    // TODO: speak() をオーバーライドして「ワン」と出力

}

public class Main {
    public static void main(String[] args) {
        new Dog().speak();
    }
}`,
    tests: [{ stdin: "", expect: "ワン" }],
    solution:
`class Animal {
    void speak() { System.out.println("..."); }
}

class Dog extends Animal {
    @Override
    void speak() { System.out.println("ワン"); }
}

public class Main {
    public static void main(String[] args) {
        new Dog().speak();
    }
}`
  },

  polymorphism: {
    title: "抽象メソッドを実装",
    desc: "抽象クラス <code>Shape</code> の <code>area()</code> を、正方形 <code>Square</code>（1辺 side）で実装してください。<code>main</code> は <code>Square(5)</code> の面積を出力します。",
    template:
`abstract class Shape {
    abstract int area();
}

class Square extends Shape {
    int side;
    Square(int side) { this.side = side; }
    // TODO: area() を実装（1辺 × 1辺）

}

public class Main {
    public static void main(String[] args) {
        Shape s = new Square(5);
        System.out.println(s.area());
    }
}`,
    tests: [{ stdin: "", expect: "25" }],
    solution:
`abstract class Shape {
    abstract int area();
}

class Square extends Shape {
    int side;
    Square(int side) { this.side = side; }
    @Override
    int area() { return side * side; }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Square(5);
        System.out.println(s.area());
    }
}`
  },

  interface: {
    title: "インターフェースを実装",
    desc: "<code>Greeter</code> インターフェースの <code>greet()</code> を実装する <code>Japanese</code> クラスを作り、<code>こんにちは</code> と出力してください。",
    template:
`interface Greeter {
    void greet();
}

// TODO: Greeter を実装する Japanese クラスを作り「こんにちは」と出力

public class Main {
    public static void main(String[] args) {
        Greeter g = new Japanese();
        g.greet();
    }
}`,
    tests: [{ stdin: "", expect: "こんにちは" }],
    solution:
`interface Greeter {
    void greet();
}

class Japanese implements Greeter {
    @Override
    public void greet() { System.out.println("こんにちは"); }
}

public class Main {
    public static void main(String[] args) {
        Greeter g = new Japanese();
        g.greet();
    }
}`
  },

  enum: {
    title: "enumの全要素を表示",
    desc: "<code>enum Color { RED, GREEN, BLUE }</code> の全要素を、<code>values()</code> を使って1行ずつ出力してください。",
    template:
`enum Color { RED, GREEN, BLUE }

public class Main {
    public static void main(String[] args) {
        // TODO: Color.values() を使って全要素を1行ずつ出力

    }
}`,
    tests: [{ stdin: "", expect: "RED\nGREEN\nBLUE" }],
    solution:
`enum Color { RED, GREEN, BLUE }

public class Main {
    public static void main(String[] args) {
        for (Color c : Color.values()) {
            System.out.println(c);
        }
    }
}`
  },

  generics: {
    title: "ジェネリックなBox",
    desc: "型パラメータ <code>T</code> を持つ <code>Box&lt;T&gt;</code> を作り、<code>set</code> / <code>get</code> を実装してください。<code>main</code> は文字列と整数の箱を使います。",
    template:
`class Box<T> {
    // TODO: T型のvalueと、set / get を作る

}

public class Main {
    public static void main(String[] args) {
        Box<String> a = new Box<>();
        a.set("hi");
        System.out.println(a.get());

        Box<Integer> b = new Box<>();
        b.set(5);
        System.out.println(b.get());
    }
}`,
    tests: [{ stdin: "", expect: "hi\n5" }],
    solution:
`class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

public class Main {
    public static void main(String[] args) {
        Box<String> a = new Box<>();
        a.set("hi");
        System.out.println(a.get());
        Box<Integer> b = new Box<>();
        b.set(5);
        System.out.println(b.get());
    }
}`
  },

  /* ===== 実践 ===== */
  exception: {
    title: "0除算を防ぐ",
    desc: "標準入力で2つの整数 <code>a</code>, <code>b</code> が与えられます。<code>a / b</code> を出力してください。ただし <code>b</code> が0のときは <code>0で割れません</code> と出力（try-catchを使う）。",
    template:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        // TODO: a / b を出力。b が0なら ArithmeticException を catch して「0で割れません」

    }
}`,
    tests: [
      { stdin: "10\n2", expect: "5" },
      { stdin: "7\n0",  expect: "0で割れません" }
    ],
    solution:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        try {
            System.out.println(a / b);
        } catch (ArithmeticException e) {
            System.out.println("0で割れません");
        }
    }
}`
  },

  collection: {
    title: "ArrayListを操作",
    desc: "リストに <code>\"a\"</code>, <code>\"b\"</code>, <code>\"c\"</code> を追加し、<b>要素数</b>と<b>2番目の要素（インデックス1）</b>をこの順に1行ずつ出力してください。",
    template:
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        // TODO: a, b, c を追加し、size() と get(1) を出力

    }
}`,
    tests: [{ stdin: "", expect: "3\nb" }],
    solution:
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("a"); list.add("b"); list.add("c");
        System.out.println(list.size());
        System.out.println(list.get(1));
    }
}`
  },

  string: {
    title: "文字列を逆順に",
    desc: "標準入力で文字列が1行与えられます。<b>逆順</b>にして出力してください。（例：<code>hello</code> → <code>olleh</code>）",
    template:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).nextLine();
        // TODO: s を逆順にして出力

    }
}`,
    tests: [
      { stdin: "hello", expect: "olleh" },
      { stdin: "Java",  expect: "avaJ" }
    ],
    solution:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).nextLine();
        System.out.println(new StringBuilder(s).reverse());
    }
}`
  },

  fileio: {
    title: "ファイルに書いて読む",
    desc: "<code>data.txt</code> に <code>line1</code>、<code>line2</code> の2行を書き込み、読み戻して各行を出力してください。",
    template:
`import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        Path path = Path.of("data.txt");
        // TODO: line1, line2 を書き込み、読み戻して各行を出力

    }
}`,
    tests: [{ stdin: "", expect: "line1\nline2" }],
    solution:
`import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        Path path = Path.of("data.txt");
        Files.write(path, List.of("line1", "line2"));
        for (String line : Files.readAllLines(path)) {
            System.out.println(line);
        }
    }
}`
  },

  modern: {
    title: "Streamで偶数の合計",
    desc: "<code>1〜10</code> の整数のうち、<b>偶数だけの合計</b>を Stream を使って求めて出力してください（答えは30）。",
    template:
`import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        // TODO: 1..10 の偶数の合計を Stream で求めて出力
        // ヒント: IntStream.rangeClosed(1, 10)

    }
}`,
    tests: [{ stdin: "", expect: "30" }],
    solution:
`import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        int sum = IntStream.rangeClosed(1, 10)
                           .filter(n -> n % 2 == 0)
                           .sum();
        System.out.println(sum);
    }
}`
  }
};
