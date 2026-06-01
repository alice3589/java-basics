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
  },

  /* ===== 応用 ===== */
  package: {
    title: "importを使ってリストを並べ替え",
    desc: "<code>java.util.Collections</code> を import して、リスト <code>{40, 10, 30, 20}</code> を<b>昇順に並べ替えて</b>出力し、続けて<b>最大値</b>を出力してください。",
    template:
`import java.util.ArrayList;
import java.util.List;
// TODO: java.util.Collections を import する

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>();
        Collections.addAll(nums, 40, 10, 30, 20);
        // TODO: nums を昇順に並べ替えて出力し、続けて最大値を出力する

    }
}`,
    tests: [{ stdin: "", expect: "[10, 20, 30, 40]\n40" }],
    solution:
`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>();
        Collections.addAll(nums, 40, 10, 30, 20);
        Collections.sort(nums);
        System.out.println(nums);
        System.out.println(Collections.max(nums));
    }
}`
  },

  javadoc: {
    title: "Javadocで見つけたメソッドを使う",
    desc: "<code>String</code> のJavadocにある <code>repeat</code> と <code>join</code> を使い、(1) <code>\"ab\"</code> を3回くり返した文字列、(2) <code>\"x\"</code>,<code>\"y\"</code>,<code>\"z\"</code> を <code>\",\"</code> で連結した文字列、をこの順に1行ずつ出力してください。",
    template:
`public class Main {
    public static void main(String[] args) {
        // TODO: "ab" を3回くり返して出力（ヒント: "ab".repeat(...)）

        // TODO: "x","y","z" を "," で連結して出力（ヒント: String.join(...)）

    }
}`,
    tests: [{ stdin: "", expect: "ababab\nx,y,z" }],
    solution:
`public class Main {
    public static void main(String[] args) {
        System.out.println("ab".repeat(3));
        System.out.println(String.join(",", "x", "y", "z"));
    }
}`
  },

  thread: {
    title: "スレッドで合計を計算して待つ",
    desc: "別スレッドで <code>1+2+…+100</code> を計算し、<code>join()</code> で終了を待ってから結果（<code>5050</code>）を出力してください。結果は <code>static</code> フィールド <code>result</code> に入れます。",
    template:
`public class Main {
    static long result = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            // TODO: 1から100までの合計を求めて result に代入する

        });
        t.start();
        // TODO: t の終了を待つ（join）

        System.out.println(result);
    }
}`,
    tests: [{ stdin: "", expect: "5050" }],
    solution:
`public class Main {
    static long result = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            long s = 0;
            for (int i = 1; i <= 100; i++) s += i;
            result = s;
        });
        t.start();
        t.join();
        System.out.println(result);
    }
}`
  },

  sync: {
    title: "synchronizedで数え落としを防ぐ",
    desc: "2つのスレッドがそれぞれ <code>increment()</code> を10万回呼びます。<code>increment()</code> に <code>synchronized</code> を付けて排他制御し、合計が必ず <code>200000</code> になるようにしてください。",
    template:
`public class Main {
    static int count = 0;
    // TODO: synchronized を付けて、一度に1スレッドだけ実行できるようにする
    static void increment() { count++; }

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> { for (int i = 0; i < 100000; i++) increment(); };
        Thread a = new Thread(task), b = new Thread(task);
        a.start(); b.start();
        a.join();  b.join();
        System.out.println(count);
    }
}`,
    tests: [{ stdin: "", expect: "200000" }],
    solution:
`public class Main {
    static int count = 0;
    static synchronized void increment() { count++; }

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> { for (int i = 0; i < 100000; i++) increment(); };
        Thread a = new Thread(task), b = new Thread(task);
        a.start(); b.start();
        a.join();  b.join();
        System.out.println(count);
    }
}`
  },

  /* ===== デザインパターン ===== */
  iterator: {
    title: "Iteratorを完成させる",
    desc: "<code>NumberBox</code> は <code>{1, 2, 3}</code> を持ちます。<code>hasNext()</code> と <code>next()</code> を実装し、for-each で <code>1</code>,<code>2</code>,<code>3</code> を1行ずつ出力できるようにしてください。",
    template:
`import java.util.Iterator;

class NumberBox implements Iterable<Integer> {
    private final int[] nums = {1, 2, 3};
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int i = 0;
            // TODO: hasNext() と next() を実装する

        };
    }
}

public class Main {
    public static void main(String[] args) {
        for (int n : new NumberBox()) {
            System.out.println(n);
        }
    }
}`,
    tests: [{ stdin: "", expect: "1\n2\n3" }],
    solution:
`import java.util.Iterator;

class NumberBox implements Iterable<Integer> {
    private final int[] nums = {1, 2, 3};
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int i = 0;
            public boolean hasNext() { return i < nums.length; }
            public Integer next()    { return nums[i++]; }
        };
    }
}

public class Main {
    public static void main(String[] args) {
        for (int n : new NumberBox()) {
            System.out.println(n);
        }
    }
}`
  },

  adapter: {
    title: "Adapterで摂氏を華氏に",
    desc: "<code>Adapter</code> は摂氏の <code>Celsius</code> を、華氏の <code>Fahrenheit</code> に適合させます。<code>getFahrenheit()</code> を実装してください（華氏 = 摂氏 × 9 / 5 + 32）。<code>Celsius(100)</code> なら <code>212.0</code> です。",
    template:
`class Celsius {
    private final double c;
    Celsius(double c) { this.c = c; }
    double getCelsius() { return c; }
}
interface Fahrenheit { double getFahrenheit(); }

class Adapter implements Fahrenheit {
    private final Celsius c;
    Adapter(Celsius c) { this.c = c; }
    // TODO: getFahrenheit() を実装（c.getCelsius() を変換して返す）

}

public class Main {
    public static void main(String[] args) {
        Fahrenheit f = new Adapter(new Celsius(100));
        System.out.println(f.getFahrenheit());
    }
}`,
    tests: [{ stdin: "", expect: "212.0" }],
    solution:
`class Celsius {
    private final double c;
    Celsius(double c) { this.c = c; }
    double getCelsius() { return c; }
}
interface Fahrenheit { double getFahrenheit(); }

class Adapter implements Fahrenheit {
    private final Celsius c;
    Adapter(Celsius c) { this.c = c; }
    public double getFahrenheit() { return c.getCelsius() * 9 / 5 + 32; }
}

public class Main {
    public static void main(String[] args) {
        Fahrenheit f = new Adapter(new Celsius(100));
        System.out.println(f.getFahrenheit());
    }
}`
  },

  template: {
    title: "Template Methodの本体を実装",
    desc: "<code>Greeting</code> の手順（<code>こんにちは</code> → 本体 → <code>さようなら</code>）は固定です。<code>Morning</code> の <code>body()</code> を実装し、本体で <code>朝の会です</code> と出力してください。",
    template:
`abstract class Greeting {
    final void run() {
        System.out.println("こんにちは");
        body();
        System.out.println("さようなら");
    }
    abstract void body();
}

class Morning extends Greeting {
    // TODO: body() を実装して「朝の会です」と出力する

}

public class Main {
    public static void main(String[] args) {
        new Morning().run();
    }
}`,
    tests: [{ stdin: "", expect: "こんにちは\n朝の会です\nさようなら" }],
    solution:
`abstract class Greeting {
    final void run() {
        System.out.println("こんにちは");
        body();
        System.out.println("さようなら");
    }
    abstract void body();
}

class Morning extends Greeting {
    void body() { System.out.println("朝の会です"); }
}

public class Main {
    public static void main(String[] args) {
        new Morning().run();
    }
}`
  },

  singleton: {
    title: "Singletonにする",
    desc: "<code>Counter</code> をシングルトンにします。コンストラクタを <code>private</code> にし、唯一の入口 <code>getInstance()</code> から同じ実体（<code>INSTANCE</code>）を返してください。<code>main</code> は <code>getInstance()</code> 経由で2回 <code>inc()</code> し、<code>get()</code>（=2）を出力します。",
    template:
`class Counter {
    private static final Counter INSTANCE = new Counter();
    private int n = 0;
    // TODO: コンストラクタを private にする / getInstance() で INSTANCE を返す

    void inc() { n++; }
    int get()  { return n; }
}

public class Main {
    public static void main(String[] args) {
        Counter.getInstance().inc();
        Counter.getInstance().inc();
        System.out.println(Counter.getInstance().get());
    }
}`,
    tests: [{ stdin: "", expect: "2" }],
    solution:
`class Counter {
    private static final Counter INSTANCE = new Counter();
    private int n = 0;
    private Counter() {}
    static Counter getInstance() { return INSTANCE; }
    void inc() { n++; }
    int get()  { return n; }
}

public class Main {
    public static void main(String[] args) {
        Counter.getInstance().inc();
        Counter.getInstance().inc();
        System.out.println(Counter.getInstance().get());
    }
}`
  },

  strategy: {
    title: "Strategyを差し替える",
    desc: "<code>HalfDiscount</code> の <code>apply()</code> を実装して価格を<b>半額</b>にしてください。<code>checkout(1000, new NoDiscount())</code> は <code>1000</code>、<code>checkout(1000, new HalfDiscount())</code> は <code>500</code> になります。",
    template:
`interface Discount { int apply(int price); }
class NoDiscount   implements Discount { public int apply(int p) { return p; } }
class HalfDiscount implements Discount {
    // TODO: apply() を実装して半額（p / 2）を返す

}

public class Main {
    static int checkout(int price, Discount d) { return d.apply(price); }
    public static void main(String[] args) {
        System.out.println(checkout(1000, new NoDiscount()));
        System.out.println(checkout(1000, new HalfDiscount()));
    }
}`,
    tests: [{ stdin: "", expect: "1000\n500" }],
    solution:
`interface Discount { int apply(int price); }
class NoDiscount   implements Discount { public int apply(int p) { return p; } }
class HalfDiscount implements Discount { public int apply(int p) { return p / 2; } }

public class Main {
    static int checkout(int price, Discount d) { return d.apply(price); }
    public static void main(String[] args) {
        System.out.println(checkout(1000, new NoDiscount()));
        System.out.println(checkout(1000, new HalfDiscount()));
    }
}`
  },

  composite: {
    title: "Compositeで再帰的に合計",
    desc: "<code>Folder.size()</code> を完成させ、<b>子要素のサイズを再帰的に合計</b>してください。<code>Item(10)</code>,<code>Item(20)</code> と、<code>Item(5)</code> を含む子フォルダを持つフォルダの合計は <code>35</code> です。",
    template:
`import java.util.ArrayList;
import java.util.List;

abstract class Node { abstract int size(); }
class Item extends Node {
    private final int size;
    Item(int s) { this.size = s; }
    int size() { return size; }
}
class Folder extends Node {
    private final List<Node> children = new ArrayList<>();
    void add(Node n) { children.add(n); }
    int size() {
        // TODO: children をループし、各 size() を合計して返す

    }
}

public class Main {
    public static void main(String[] args) {
        Folder f = new Folder();
        f.add(new Item(10));
        f.add(new Item(20));
        Folder inner = new Folder();
        inner.add(new Item(5));
        f.add(inner);
        System.out.println(f.size());
    }
}`,
    tests: [{ stdin: "", expect: "35" }],
    solution:
`import java.util.ArrayList;
import java.util.List;

abstract class Node { abstract int size(); }
class Item extends Node {
    private final int size;
    Item(int s) { this.size = s; }
    int size() { return size; }
}
class Folder extends Node {
    private final List<Node> children = new ArrayList<>();
    void add(Node n) { children.add(n); }
    int size() {
        int t = 0;
        for (Node n : children) t += n.size();
        return t;
    }
}

public class Main {
    public static void main(String[] args) {
        Folder f = new Folder();
        f.add(new Item(10));
        f.add(new Item(20));
        Folder inner = new Folder();
        inner.add(new Item(5));
        f.add(inner);
        System.out.println(f.size());
    }
}`
  },

  visitor: {
    title: "Visitorで種類を数える",
    desc: "<code>CountVisitor</code> の2つの <code>visit</code> を実装し、<code>Circle</code> と <code>Square</code> の個数をそれぞれ数えてください。<code>{Circle, Square, Circle}</code> なら 円=<code>2</code>、四角=<code>1</code> を1行ずつ出力します。",
    template:
`interface Visitor { void visit(Circle c); void visit(Square s); }
abstract class Shape { abstract void accept(Visitor v); }
class Circle extends Shape { void accept(Visitor v) { v.visit(this); } }
class Square extends Shape { void accept(Visitor v) { v.visit(this); } }

class CountVisitor implements Visitor {
    int circles = 0, squares = 0;
    // TODO: visit(Circle) で circles を、visit(Square) で squares を増やす

}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(), new Square(), new Circle() };
        CountVisitor v = new CountVisitor();
        for (Shape s : shapes) s.accept(v);
        System.out.println(v.circles);
        System.out.println(v.squares);
    }
}`,
    tests: [{ stdin: "", expect: "2\n1" }],
    solution:
`interface Visitor { void visit(Circle c); void visit(Square s); }
abstract class Shape { abstract void accept(Visitor v); }
class Circle extends Shape { void accept(Visitor v) { v.visit(this); } }
class Square extends Shape { void accept(Visitor v) { v.visit(this); } }

class CountVisitor implements Visitor {
    int circles = 0, squares = 0;
    public void visit(Circle c) { circles++; }
    public void visit(Square s) { squares++; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(), new Square(), new Circle() };
        CountVisitor v = new CountVisitor();
        for (Shape s : shapes) s.accept(v);
        System.out.println(v.circles);
        System.out.println(v.squares);
    }
}`
  },

  state: {
    title: "Stateで状態を切り替える",
    desc: "<code>Off</code> と <code>On</code> の <code>toggle()</code> を実装し、状態を切り替えてください。<code>Off</code> から始めて3回表示すると <code>OFF</code>,<code>ON</code>,<code>OFF</code> になります。",
    template:
`interface State { State toggle(); String label(); }
class Off implements State {
    public String label() { return "OFF"; }
    // TODO: toggle() で On を返す

}
class On implements State {
    public String label() { return "ON"; }
    // TODO: toggle() で Off を返す

}

public class Main {
    public static void main(String[] args) {
        State s = new Off();
        for (int i = 0; i < 3; i++) {
            System.out.println(s.label());
            s = s.toggle();
        }
    }
}`,
    tests: [{ stdin: "", expect: "OFF\nON\nOFF" }],
    solution:
`interface State { State toggle(); String label(); }
class Off implements State {
    public String label() { return "OFF"; }
    public State toggle() { return new On(); }
}
class On implements State {
    public String label() { return "ON"; }
    public State toggle() { return new Off(); }
}

public class Main {
    public static void main(String[] args) {
        State s = new Off();
        for (int i = 0; i < 3; i++) {
            System.out.println(s.label());
            s = s.toggle();
        }
    }
}`
  }
};
