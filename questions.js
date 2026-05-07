const CHAPTERS = [
  {
    id: 1,
    title: "第1章 食欲をそそってみようか",
    description: "Pythonの特徴と概要",
    rate: 2.5,
    questions: [
      {
        id: "1-1",
        text: "Pythonについての説明として正しいものはどれですか？",
        options: [
          "コンパイル型言語であり、実行前にすべてのコードをコンパイルする必要がある",
          "インタープリタ型言語であり、コードを逐次実行できる",
          "変数を使う前に型宣言が必須である",
          "主にWebブラウザ内で動作するスクリプト言語である"
        ],
        answer: 1,
        explanation: "Pythonはインタープリタ型言語です。コードを1行ずつ解釈・実行するため、コンパイルなしにすぐ動作確認できます。また動的型付け言語なので型宣言も不要です。"
      },
      {
        id: "1-2",
        text: "Pythonのインデント（字下げ）について正しい説明はどれですか？",
        options: [
          "インデントは任意であり、コードの見やすさのためだけに使われる",
          "インデントはブロック構造を表すために文法的に必須である",
          "インデントには必ずタブ文字を使わなければならない",
          "インデントは2スペースでなければならない"
        ],
        answer: 1,
        explanation: "Pythonではインデントがブロック構造（ifブロック、forブロック、関数本体など）を表すために文法的に必須です。他の言語のように波括弧{}は使いません。スペース数はPEP8では4スペースが推奨されています。"
      },
      {
        id: "1-3",
        text: "Pythonが広く使われている分野として正しいものはどれですか？",
        options: [
          "Webブラウザの拡張機能開発専用の言語である",
          "科学計算・データ分析・機械学習・Web開発など幅広い分野で使われる",
          "組み込みシステムのファームウェア開発のみに使われる",
          "モバイルアプリの開発専用の言語である"
        ],
        answer: 1,
        explanation: "Pythonは汎用プログラミング言語であり、科学計算（NumPy/SciPy）・データ分析（pandas）・機械学習（TensorFlow/scikit-learn）・Web開発（Django/Flask）・自動化スクリプトなど非常に幅広い分野で活用されています。"
      },
      {
        id: "1-4",
        text: "Pythonの動的型付けについて正しい説明はどれですか？",
        options: [
          "変数の型はプログラム実行中に変えることができない",
          "変数の型は実行時に決まり、同じ変数に異なる型の値を代入できる",
          "変数を使う前に必ず型を宣言する必要がある",
          "すべての変数は整数型として扱われる"
        ],
        answer: 1,
        explanation: "Pythonは動的型付け言語です。変数の型は宣言時ではなく代入時に決まり、同じ変数に後から異なる型の値を代入することも可能です（例: x = 1 → x = \"hello\"）。"
      },
      {
        id: "1-5",
        text: "Pythonの特徴として正しいものはどれですか？",
        options: [
          "オブジェクト指向プログラミングには対応していない",
          "オープンソースであり、無料で使用できる",
          "Windowsでのみ動作する",
          "コードの行末にはセミコロン(;)が必須である"
        ],
        answer: 1,
        explanation: "Pythonはオープンソースで無料のプログラミング言語です。オブジェクト指向・手続き型・関数型など複数のパラダイムをサポートし、Windows・Mac・Linuxなど多くのOSで動作します。行末のセミコロンは不要です。"
      }
    ]
  },
  {
    id: 2,
    title: "第2章 Pythonインタープリタの使い方",
    description: "インタープリタの起動と対話モード",
    rate: 2.5,
    questions: [
      {
        id: "2-1",
        text: "Pythonの対話モード（インタラクティブシェル）で表示される一次プロンプトはどれですか？",
        options: [
          "$",
          ">",
          ">>>",
          "#"
        ],
        answer: 2,
        explanation: "Pythonの対話モードでは「>>>」が一次プロンプトとして表示されます。複数行入力が続く場合は「...」（三点リーダ）が二次プロンプトとして表示されます。"
      },
      {
        id: "2-2",
        text: "Pythonの対話モードで、複数行にわたる文を入力しているときに表示される二次プロンプトはどれですか？",
        options: [
          ">>>",
          "...",
          ">>",
          ".."
        ],
        answer: 1,
        explanation: "対話モードで複数行入力（ifブロックや関数定義など）を行うとき、続く行には「...」（三点リーダ）が表示されます。入力を確定するには空行を入力します。"
      },
      {
        id: "2-3",
        text: "Pythonの対話モードを終了するためのコマンドはどれですか？",
        options: [
          "exit() または quit()",
          "stop()",
          "end()",
          "close()"
        ],
        answer: 0,
        explanation: "対話モードを終了するには exit() または quit() を使います。また、WindowsではCtrl+Z、Unix/MacではCtrl+Dでも終了できます。"
      },
      {
        id: "2-4",
        text: "Pythonスクリプトファイル「hello.py」をコマンドラインから実行するコマンドはどれですか？",
        options: [
          "python run hello.py",
          "python hello.py",
          "run hello.py",
          "execute hello.py"
        ],
        answer: 1,
        explanation: "Pythonスクリプトは「python ファイル名」または「python3 ファイル名」で実行します。環境によってpythonコマンドがPython 3を指さない場合はpython3を使います。"
      },
      {
        id: "2-5",
        text: "Pythonインタープリタで「python -c 'print(1+1)'」を実行したときの動作として正しいものはどれですか？",
        options: [
          "エラーが発生する",
          "コマンドラインから直接Pythonコードを実行して 2 を出力する",
          "対話モードが起動する",
          "\"1+1\" という文字列を出力する"
        ],
        answer: 1,
        explanation: "-cオプションを使うと、コマンドライン引数として渡したPythonコードを直接実行できます。小さなコードを素早く試したいときに便利です。"
      }
    ]
  },
  {
    id: 3,
    title: "第3章 気楽な入門編",
    description: "数値・文字列・リストの基礎",
    rate: 15.0,
    questions: [
      {
        id: "3-1",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nprint(10 // 3)",
        options: [
          "3.33",
          "3",
          "4",
          "3.0"
        ],
        answer: 1,
        explanation: "「//」は切り捨て除算（整数除算）演算子です。10 ÷ 3 = 3.33... を切り捨てると 3 になります。通常の除算「/」では 3.3333... が返ります。"
      },
      {
        id: "3-2",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nprint(10 % 3)",
        options: [
          "3",
          "0",
          "1",
          "3.3"
        ],
        answer: 2,
        explanation: "「%」は剰余（余り）演算子です。10 ÷ 3 の余りは 1 です。"
      },
      {
        id: "3-3",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ns = \"Python\"\nprint(s[2])",
        options: [
          "P",
          "y",
          "t",
          "h"
        ],
        answer: 2,
        explanation: "Pythonの文字列のインデックスは0始まりです。s[0]='P', s[1]='y', s[2]='t' となります。"
      },
      {
        id: "3-4",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ns = \"Hello\"\nprint(s * 2)",
        options: [
          "HelloHello",
          "Hello2",
          "10",
          "エラーが発生する"
        ],
        answer: 0,
        explanation: "文字列に整数を掛けると、その文字列を指定回数繰り返した文字列が返ります。\"Hello\" * 2 は \"HelloHello\" になります。"
      },
      {
        id: "3-5",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ns = \"Python\"\nprint(s[1:4])",
        options: [
          "Pyt",
          "yth",
          "ytho",
          "ython"
        ],
        answer: 1,
        explanation: "スライス s[1:4] はインデックス1から3（4は含まない）までの文字を返します。s[1]='y', s[2]='t', s[3]='h' なので \"yth\" になります。"
      },
      {
        id: "3-6",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nx = 2 ** 10\nprint(x)",
        options: [
          "20",
          "100",
          "512",
          "1024"
        ],
        answer: 3,
        explanation: "「**」はべき乗演算子です。2 ** 10 は 2の10乗 = 1024 です。"
      },
      {
        id: "3-7",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ns = \"Python\"\nprint(len(s))",
        options: [
          "5",
          "6",
          "7",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "len() は文字列の長さ（文字数）を返します。\"Python\" は P-y-t-h-o-n の6文字なので 6 が返ります。"
      },
      {
        id: "3-8",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ns = \"Python\"\nprint(s[-1])",
        options: [
          "P",
          "n",
          "o",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "負のインデックスは末尾からのアクセスを意味します。s[-1] は最後の文字 'n' を返します。s[-2] は 'o'、s[-6] は 'P' です。"
      },
      {
        id: "3-9",
        text: "Pythonの文字列はイミュータブル（変更不可）です。次のコードを実行するとどうなりますか？\n\ns = \"Python\"\ns[0] = \"J\"",
        options: [
          "s が \"Jython\" になる",
          "何も変化しない",
          "TypeError が発生する",
          "ValueError が発生する"
        ],
        answer: 2,
        explanation: "Pythonの文字列はイミュータブルなので、インデックスによる個々の文字への代入はできません。TypeError が発生します。文字列を変更したい場合は新しい文字列を作成します。"
      },
      {
        id: "3-10",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nprint(\"Hello\" + \" \" + \"World\")",
        options: [
          "HelloWorld",
          "Hello World",
          "Hello + World",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "「+」演算子で文字列を連結できます。\"Hello\" + \" \" + \"World\" は \"Hello World\" になります。"
      },
      {
        id: "3-11",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [1, 2, 3]\nprint(lst[1])",
        options: [
          "1",
          "2",
          "3",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "リストのインデックスも0始まりです。lst[0]=1, lst[1]=2, lst[2]=3 となります。"
      },
      {
        id: "3-12",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [1, 2, 3, 4, 5]\nprint(lst[1:3])",
        options: [
          "[1, 2]",
          "[2, 3]",
          "[2, 3, 4]",
          "[1, 2, 3]"
        ],
        answer: 1,
        explanation: "リストのスライス lst[1:3] はインデックス1から2（3は含まない）の要素を返します。lst[1]=2, lst[2]=3 なので [2, 3] になります。"
      },
      {
        id: "3-13",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nx, y, z = 1, 2, 3\nprint(y)",
        options: [
          "1",
          "2",
          "3",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "Pythonではカンマ区切りで複数の変数に同時に代入できます（アンパック代入）。x=1, y=2, z=3 となるので y は 2 です。"
      },
      {
        id: "3-14",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [1, 2, 3]\nlst.append(4)\nprint(lst)",
        options: [
          "[1, 2, 3]",
          "[4, 1, 2, 3]",
          "[1, 2, 3, 4]",
          "エラーが発生する"
        ],
        answer: 2,
        explanation: "リストはミュータブル（変更可能）です。append() はリストの末尾に要素を追加します。lst に 4 が追加されて [1, 2, 3, 4] になります。"
      },
      {
        id: "3-15",
        text: "次のコードで type(x) の実行結果として正しいものはどれですか？\n\nx = 3.14",
        options: [
          "<class 'int'>",
          "<class 'float'>",
          "<class 'str'>",
          "<class 'double'>"
        ],
        answer: 1,
        explanation: "3.14 は小数点を含む数値なので浮動小数点型（float）です。type() 関数はオブジェクトの型を返します。Pythonに double 型はなく、float が倍精度浮動小数点数を表します。"
      }
    ]
  },
  {
    id: 4,
    title: "第4章 制御構造ツール",
    description: "if・for・while・関数・lambda",
    rate: 22.5,
    questions: [
      {
        id: "4-1",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nfor i in range(3):\n    print(i)",
        options: [
          "1\n2\n3",
          "0\n1\n2",
          "0\n1\n2\n3",
          "1\n2\n3\n4"
        ],
        answer: 1,
        explanation: "range(3) は 0, 1, 2 の3つの値を生成します。range(n) は 0 から n-1 までの整数を返します。"
      },
      {
        id: "4-2",
        text: "次のコードを実行後の変数 i の値として正しいものはどれですか？\n\ni = 0\nwhile i < 3:\n    i += 1\nprint(i)",
        options: [
          "0",
          "2",
          "3",
          "4"
        ],
        answer: 2,
        explanation: "ループは i が 3 未満の間繰り返されます。i が 3 になるとループを抜けるため、print(i) では 3 が出力されます。"
      },
      {
        id: "4-3",
        text: "break文の説明として正しいものはどれですか？",
        options: [
          "現在のイテレーションをスキップして次のイテレーションに進む",
          "最も内側のループを抜ける",
          "プログラム全体を終了させる",
          "関数から値を返す"
        ],
        answer: 1,
        explanation: "break文は最も内側のループ（forまたはwhile）を即座に終了させます。外側のループは継続されます。"
      },
      {
        id: "4-4",
        text: "continue文の説明として正しいものはどれですか？",
        options: [
          "ループを完全に終了する",
          "プログラムを一時停止する",
          "現在のイテレーションをスキップして次のイテレーションに進む",
          "例外を発生させる"
        ],
        answer: 2,
        explanation: "continue文は現在のループのイテレーションの残りの処理をスキップし、次のイテレーションを開始します。ループ自体は継続されます。"
      },
      {
        id: "4-5",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ndef greet(name=\"World\"):\n    print(f\"Hello, {name}!\")\n\ngreet()",
        options: [
          "Hello, !",
          "Hello, name!",
          "Hello, World!",
          "エラーが発生する"
        ],
        answer: 2,
        explanation: "引数 name にはデフォルト値 \"World\" が設定されています。引数なしで greet() を呼び出すと、デフォルト値が使用されて \"Hello, World!\" が出力されます。"
      },
      {
        id: "4-6",
        text: "*args を使った関数定義について正しい説明はどれですか？",
        options: [
          "任意の数のキーワード引数を辞書として受け取る",
          "任意の数の位置引数をタプルとして受け取る",
          "任意の数の位置引数をリストとして受け取る",
          "引数にデフォルト値を設定する"
        ],
        answer: 1,
        explanation: "*args を使うと、任意の数の位置引数をタプルとして受け取ることができます。任意の数のキーワード引数を受け取るには **kwargs を使います。"
      },
      {
        id: "4-7",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nx = 10\nif x > 5:\n    print(\"A\")\nelif x > 8:\n    print(\"B\")\nelse:\n    print(\"C\")",
        options: [
          "A",
          "B",
          "A\nB",
          "C"
        ],
        answer: 0,
        explanation: "if文は上から順に条件を評価します。x = 10 は x > 5 を満たすため \"A\" が出力され、その後の elif と else は評価されません。"
      },
      {
        id: "4-8",
        text: "pass文の説明として正しいものはどれですか？",
        options: [
          "関数の実行を終了させ、呼び出し元に制御を返す",
          "ループを終了させる",
          "何もしない文で、文法上必要な場所に使う",
          "例外を無視する"
        ],
        answer: 2,
        explanation: "pass文は何も実行しない文です。文法的に文が必要だが処理が不要な場合（空のクラス定義・関数定義など）に使います。"
      },
      {
        id: "4-9",
        text: "lambda（ラムダ）関数の説明として正しいものはどれですか？",
        options: [
          "複数の式を含めることができる",
          "defと同様に名前を付けることができる",
          "単一の式を評価して返す無名関数である",
          "defキーワードと併用して定義する"
        ],
        answer: 2,
        explanation: "lambda式は単一の式を評価して返す無名関数です。「lambda 引数: 式」の形で書きます。複数の文は書けず、式のみです。"
      },
      {
        id: "4-10",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nresult = list(range(1, 10, 2))\nprint(result)",
        options: [
          "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
          "[1, 3, 5, 7, 9]",
          "[2, 4, 6, 8]",
          "[1, 3, 5, 7]"
        ],
        answer: 1,
        explanation: "range(start, stop, step) は start から stop未満まで step 刻みで値を生成します。range(1, 10, 2) は 1, 3, 5, 7, 9 を生成します。"
      },
      {
        id: "4-11",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)",
        options: [
          "0\n1\n2\n3",
          "0\n1\n2",
          "3\n4",
          "0\n1\n2\n3\n4"
        ],
        answer: 1,
        explanation: "i が 0, 1, 2 のとき print(i) が実行されます。i が 3 になると break でループを抜けるため、3 は出力されません。"
      },
      {
        id: "4-12",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i)",
        options: [
          "0\n1\n2\n3\n4",
          "0\n1\n2\n4",
          "3",
          "0\n1\n2"
        ],
        answer: 1,
        explanation: "continue はそのイテレーションをスキップします。i が 3 のときだけ print(i) がスキップされるため、0, 1, 2, 4 が出力されます。"
      },
      {
        id: "4-13",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ndef add(a, b):\n    return a + b\n\nresult = add(3, 4)\nprint(result)",
        options: [
          "a + b",
          "7",
          "34",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "関数 add は引数 a と b を受け取り、その合計を返します。add(3, 4) は 3 + 4 = 7 を返し、result に代入されます。"
      },
      {
        id: "4-14",
        text: "**kwargs を使った関数定義について正しい説明はどれですか？",
        options: [
          "任意の数の位置引数をタプルとして受け取る",
          "任意の数のキーワード引数を辞書として受け取る",
          "引数の数を固定する",
          "デフォルト引数を設定する"
        ],
        answer: 1,
        explanation: "**kwargs を使うと、任意の数のキーワード引数を辞書として受け取れます。例えば func(a=1, b=2) と呼ぶと kwargs は {'a': 1, 'b': 2} になります。"
      },
      {
        id: "4-15",
        text: "次のlambda式の実行結果として正しいものはどれですか？\n\nsquare = lambda x: x ** 2\nprint(square(5))",
        options: [
          "25",
          "10",
          "lambda",
          "エラーが発生する"
        ],
        answer: 0,
        explanation: "lambda x: x ** 2 は引数 x を受け取り x の2乗を返す無名関数です。square(5) は 5 ** 2 = 25 を返します。"
      },
      {
        id: "4-16",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ndef count_up(n):\n    for i in range(n):\n        if i % 2 == 0:\n            pass\n        else:\n            print(i)\n\ncount_up(5)",
        options: [
          "0\n2\n4",
          "1\n3",
          "0\n1\n2\n3\n4",
          "何も出力されない"
        ],
        answer: 1,
        explanation: "i % 2 == 0（偶数）のとき pass（何もしない）、それ以外（奇数）のとき print(i) します。range(5) = 0,1,2,3,4 のうち奇数は 1 と 3 です。"
      },
      {
        id: "4-17",
        text: "for文に else節を付けた場合の動作として正しい説明はどれですか？",
        options: [
          "ループが1回も実行されなかった場合にelse節が実行される",
          "ループがbreakで終了した場合にelse節が実行される",
          "ループがbreakなく正常に終了した場合にelse節が実行される",
          "else節はfor文では使用できない"
        ],
        answer: 2,
        explanation: "for文（およびwhile文）のelse節は、ループがbreakによって中断されることなく正常に終了した場合に実行されます。breakで終了した場合はelse節はスキップされます。"
      },
      {
        id: "4-18",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ndef func(a, b=10):\n    return a + b\n\nprint(func(5))",
        options: [
          "5",
          "10",
          "15",
          "エラーが発生する"
        ],
        answer: 2,
        explanation: "b にはデフォルト値 10 が設定されています。func(5) は a=5, b=10（デフォルト）で呼ばれるため 5 + 10 = 15 が返ります。"
      },
      {
        id: "4-19",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ndef func(*args):\n    return sum(args)\n\nprint(func(1, 2, 3, 4))",
        options: [
          "(1, 2, 3, 4)",
          "10",
          "[1, 2, 3, 4]",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "*args でキャプチャされた引数はタプルになります。sum((1, 2, 3, 4)) = 10 が返ります。"
      },
      {
        id: "4-20",
        text: "Pythonのグローバル変数を関数内で変更するために必要なキーワードはどれですか？",
        options: [
          "static",
          "global",
          "extern",
          "var"
        ],
        answer: 1,
        explanation: "関数内でグローバル変数に代入するには global キーワードで宣言する必要があります。宣言なしで代入すると新しいローカル変数が作成されます。"
      }
    ]
  },
  {
    id: 5,
    title: "第5章 データ構造",
    description: "リスト・タプル・辞書・集合・内包表記",
    rate: 17.5,
    questions: [
      {
        id: "5-1",
        text: "リストの末尾に要素を1つ追加するメソッドはどれですか？",
        options: [
          "add()",
          "insert()",
          "append()",
          "push()"
        ],
        answer: 2,
        explanation: "append() はリストの末尾に要素を1つ追加します。insert(i, x) は位置を指定して挿入、extend() はリストを結合します。"
      },
      {
        id: "5-2",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [3, 1, 4, 1, 5]\nlst.sort()\nprint(lst)",
        options: [
          "[3, 1, 4, 1, 5]",
          "[1, 1, 3, 4, 5]",
          "[5, 4, 3, 1, 1]",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "sort() メソッドはリストを昇順に並び替えます（元のリストを変更します）。降順にするには lst.sort(reverse=True) を使います。"
      },
      {
        id: "5-3",
        text: "タプル（tuple）とリスト（list）の違いとして正しいものはどれですか？",
        options: [
          "タプルはリストより多くの要素を格納できる",
          "タプルはイミュータブル（変更不可）である",
          "タプルは数値のみを格納できる",
          "タプルは辞書のキーとして使えない"
        ],
        answer: 1,
        explanation: "タプルはイミュータブル（変更不可）なシーケンス型です。一方リストはミュータブル（変更可能）です。タプルはイミュータブルなので辞書のキーとして使用できます。"
      },
      {
        id: "5-4",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nd = {\"a\": 1, \"b\": 2}\nprint(d[\"b\"])",
        options: [
          "\"b\"",
          "1",
          "2",
          "{\"b\": 2}"
        ],
        answer: 2,
        explanation: "辞書はキーを使って値にアクセスします。d[\"b\"] はキー \"b\" に対応する値 2 を返します。"
      },
      {
        id: "5-5",
        text: "次のリスト内包表記の実行結果として正しいものはどれですか？\n\nresult = [x ** 2 for x in range(4)]\nprint(result)",
        options: [
          "[0, 1, 2, 3]",
          "[1, 4, 9, 16]",
          "[0, 1, 4, 9]",
          "[0, 2, 4, 6]"
        ],
        answer: 2,
        explanation: "range(4) は 0, 1, 2, 3 を生成します。各要素を2乗すると 0**2=0, 1**2=1, 2**2=4, 3**2=9 となり、[0, 1, 4, 9] になります。"
      },
      {
        id: "5-6",
        text: "集合（set）について正しい説明はどれですか？",
        options: [
          "重複する要素を持つことができる",
          "順序を保持し、インデックスでアクセスできる",
          "重複する要素を持たず、順序は保証されない",
          "キーと値のペアを格納する"
        ],
        answer: 2,
        explanation: "集合（set）は重複のない要素の集まりです。順序は保証されないためインデックスアクセスはできません。和集合(|)・積集合(&)などの集合演算が使えます。"
      },
      {
        id: "5-7",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [1, 2, 3, 4, 5]\ndel lst[1:3]\nprint(lst)",
        options: [
          "[1, 4, 5]",
          "[2, 3]",
          "[1, 2, 4, 5]",
          "[1, 2, 3]"
        ],
        answer: 0,
        explanation: "del lst[1:3] はインデックス1から2（3は含まない）の要素、つまり 2 と 3 を削除します。結果は [1, 4, 5] になります。"
      },
      {
        id: "5-8",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [1, 2, 3]\nlst.extend([4, 5])\nprint(lst)",
        options: [
          "[1, 2, 3, [4, 5]]",
          "[1, 2, 3, 4, 5]",
          "[[1, 2, 3], [4, 5]]",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "extend() は引数のイテラブルの各要素をリストに追加します。append([4, 5]) だと [1, 2, 3, [4, 5]] になりますが、extend([4, 5]) は [1, 2, 3, 4, 5] になります。"
      },
      {
        id: "5-9",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [3, 1, 4, 1, 5, 9]\nprint(lst.count(1))",
        options: [
          "1",
          "2",
          "3",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "count() はリスト内の指定した値の出現回数を返します。[3, 1, 4, 1, 5, 9] の中に 1 は2回あるので 2 が返ります。"
      },
      {
        id: "5-10",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nlst = [1, 2, 3, 4, 5]\nprint(lst.pop())",
        options: [
          "1",
          "5",
          "[1, 2, 3, 4]",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "pop() は引数なしの場合、リストの末尾の要素を削除してその値を返します。lst.pop() は 5 を返し、リストは [1, 2, 3, 4] になります。"
      },
      {
        id: "5-11",
        text: "辞書のすべてのキーを取得するメソッドはどれですか？",
        options: [
          "d.keys()",
          "d.key()",
          "d.getkeys()",
          "d.allkeys()"
        ],
        answer: 0,
        explanation: "辞書のキー一覧は keys() で取得します。values() で値一覧、items() でキーと値のペア（タプル）一覧が取得できます。"
      },
      {
        id: "5-12",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nresult = [x for x in range(10) if x % 2 == 0]\nprint(result)",
        options: [
          "[1, 3, 5, 7, 9]",
          "[0, 2, 4, 6, 8]",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
          "[2, 4, 6, 8, 10]"
        ],
        answer: 1,
        explanation: "リスト内包表記に条件を付けると、条件を満たす要素だけでリストを作れます。x % 2 == 0 は偶数の条件なので、0〜9の偶数 [0, 2, 4, 6, 8] になります。"
      },
      {
        id: "5-13",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ns = {1, 2, 3} | {3, 4, 5}\nprint(s)",
        options: [
          "{1, 2, 3, 4, 5}",
          "{3}",
          "{1, 2, 4, 5}",
          "エラーが発生する"
        ],
        answer: 0,
        explanation: "集合の「|」は和集合演算子です。{1, 2, 3} と {3, 4, 5} の和集合は {1, 2, 3, 4, 5} です（重複する 3 は1つにまとめられます）。"
      },
      {
        id: "5-14",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nfor i, v in enumerate([\"a\", \"b\", \"c\"]):\n    print(i, v)",
        options: [
          "a b c",
          "0 a\n1 b\n2 c",
          "1 a\n2 b\n3 c",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "enumerate() はイテラブルに対してインデックスと値のペアを返します。デフォルトはインデックス0始まりで、(0, 'a'), (1, 'b'), (2, 'c') の順に返します。"
      },
      {
        id: "5-15",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nd = {\"x\": 10}\nprint(d.get(\"y\", 0))",
        options: [
          "10",
          "\"y\"",
          "0",
          "KeyErrorが発生する"
        ],
        answer: 2,
        explanation: "dict.get(key, default) はキーが存在すればその値を、存在しなければデフォルト値を返します。\"y\" キーは存在しないのでデフォルトの 0 が返ります。"
      }
    ]
  },
  {
    id: 6,
    title: "第6章 モジュール",
    description: "import文とモジュールの使い方",
    rate: 5.0,
    questions: [
      {
        id: "6-1",
        text: "「import math」した後、16の平方根を計算する正しい書き方はどれですか？",
        options: [
          "math(sqrt(16))",
          "sqrt(16)",
          "math.sqrt(16)",
          "import.math.sqrt(16)"
        ],
        answer: 2,
        explanation: "import文でモジュールをインポートした場合、「モジュール名.関数名()」の形でアクセスします。math.sqrt(16) で 4.0 が返ります。"
      },
      {
        id: "6-2",
        text: "「from os import path」を実行した後、パスを結合する正しい書き方はどれですか？",
        options: [
          "os.path.join(\"a\", \"b\")",
          "path.join(\"a\", \"b\")",
          "join(\"a\", \"b\")",
          "from.path.join(\"a\", \"b\")"
        ],
        answer: 1,
        explanation: "「from モジュール名 import 名前」の形でインポートすると、モジュール名なしで直接使えます。「from os import path」の場合、path.join() と書けます。"
      },
      {
        id: "6-3",
        text: "モジュールを別名（エイリアス）でインポートする正しい書き方はどれですか？",
        options: [
          "import numpy alias np",
          "import numpy as np",
          "from numpy import as np",
          "numpy import np"
        ],
        answer: 1,
        explanation: "「import モジュール名 as 別名」でモジュールに別名をつけてインポートできます。慣例として numpy は np、pandas は pd などが使われます。"
      },
      {
        id: "6-4",
        text: "スクリプトファイルを直接実行した場合、__name__ の値はどれになりますか？",
        options: [
          "__module__",
          "None",
          "__main__",
          "ファイル名（拡張子なし）"
        ],
        answer: 2,
        explanation: "スクリプトを直接実行すると __name__ は \"__main__\" になります。他のスクリプトからインポートされた場合はモジュール名（ファイル名）になります。「if __name__ == '__main__':」はよく使われるパターンです。"
      },
      {
        id: "6-5",
        text: "モジュール内で定義された名前（変数・関数・クラス等）の一覧を調べる組み込み関数はどれですか？",
        options: [
          "list()",
          "dir()",
          "help()",
          "vars()"
        ],
        answer: 1,
        explanation: "dir() はオブジェクトや現在のスコープ内の名前一覧を返します。dir(math) で math モジュールが提供する名前をリストで確認できます。"
      },
      {
        id: "6-6",
        text: "次のコードの「from math import *」について正しい説明はどれですか？",
        options: [
          "mathモジュールのうち、名前がアンダースコアで始まるものだけをインポートする",
          "mathモジュールのすべての公開名を現在の名前空間にインポートする",
          "mathモジュールを上書き（再定義）する",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "「from モジュール名 import *」でモジュールの全公開名（__all__ で定義、なければアンダースコア始まり以外）が現在の名前空間にインポートされます。名前衝突の危険があるため推奨されません。"
      },
      {
        id: "6-7",
        text: "Pythonでパッケージを示す際、ディレクトリ内に必要なファイルはどれですか？",
        options: [
          "package.py",
          "__init__.py",
          "main.py",
          "__package__.py"
        ],
        answer: 1,
        explanation: "Pythonのパッケージはディレクトリに __init__.py ファイルを置くことで識別されます（Python 3.3以降は名前空間パッケージとして省略も可能ですが、通常は置きます）。"
      },
      {
        id: "6-8",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nimport math\nprint(math.pi)",
        options: [
          "3",
          "3.14",
          "3.141592653589793",
          "エラーが発生する"
        ],
        answer: 2,
        explanation: "math.pi は円周率πの値を表す定数です。Pythonでは 3.141592653589793 として定義されています。"
      }
    ]
  },
  {
    id: 7,
    title: "第7章 入出力",
    description: "print・フォーマット・ファイル操作",
    rate: 2.5,
    questions: [
      {
        id: "7-1",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nname = \"Python\"\nversion = 3.9\nprint(f\"{name} {version:.1f}\")",
        options: [
          "Python 3.9",
          "Python version",
          "name version",
          "エラーが発生する"
        ],
        answer: 0,
        explanation: "f文字列（f-string）では {変数名} で変数を埋め込めます。{version:.1f} は小数点1桁の浮動小数点形式を指定します。3.9 は .1f で \"3.9\" となります。"
      },
      {
        id: "7-2",
        text: "print()関数でカンマ区切りの代わりに「-」で要素をつなげて出力するための正しい書き方はどれですか？",
        options: [
          "print(\"a\", \"b\", \"c\", sep=\"-\")",
          "print(\"a\", \"b\", \"c\", join=\"-\")",
          "print(\"a\" - \"b\" - \"c\")",
          "print(\"a\", \"b\", \"c\", delimiter=\"-\")"
        ],
        answer: 0,
        explanation: "print() の sep引数で区切り文字を指定できます。デフォルトはスペース「 」です。sep=\"-\" にすると \"a-b-c\" が出力されます。"
      },
      {
        id: "7-3",
        text: "ファイルをテキストモードで読み込む正しい書き方はどれですか？",
        options: [
          "f = open(\"file.txt\", \"w\")",
          "f = open(\"file.txt\", \"r\")",
          "f = open(\"file.txt\", \"a\")",
          "f = open(\"file.txt\", \"rb\")"
        ],
        answer: 1,
        explanation: "open() の第2引数はモードです。\"r\" は読み取り専用（デフォルト）、\"w\" は書き込み（上書き）、\"a\" は追記、\"b\" はバイナリモードを表します。"
      },
      {
        id: "7-4",
        text: "ファイル操作にwith文を使う利点として正しい説明はどれですか？",
        options: [
          "ファイルを高速に読み込める",
          "例外が発生してもファイルが自動的にクローズされる",
          "ファイルを圧縮して保存できる",
          "ファイルの書き込み権限を自動的に取得できる"
        ],
        answer: 1,
        explanation: "with文（コンテキストマネージャ）を使うと、ブロックを抜けた際（例外が発生した場合も含む）にファイルが自動的にクローズされます。f.close()の書き忘れを防げます。"
      },
      {
        id: "7-5",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nprint(\"{:>10}\".format(\"hello\"))",
        options: [
          "hello     ",
          "     hello",
          "hello",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "{:>10} は幅10文字で右寄せを指定します。\"hello\"は5文字なので左に5つのスペースが付いた \"     hello\" が出力されます。左寄せは「<」、中央寄せは「^」です。"
      }
    ]
  },
  {
    id: 8,
    title: "第8章 エラーと例外",
    description: "try・except・raise・例外の種類",
    rate: 10.0,
    questions: [
      {
        id: "8-1",
        text: "次のコードを実行したとき発生する例外はどれですか？\n\nx = int(\"abc\")",
        options: [
          "TypeError",
          "ValueError",
          "SyntaxError",
          "NameError"
        ],
        answer: 1,
        explanation: "int() に数値に変換できない文字列を渡すと ValueError が発生します。TypeError は型が不正な場合、NameError は未定義の名前を参照した場合に発生します。"
      },
      {
        id: "8-2",
        text: "例外処理の finally ブロックについて正しい説明はどれですか？",
        options: [
          "例外が発生した場合のみ実行される",
          "例外が発生しなかった場合のみ実行される",
          "例外の有無にかかわらず常に実行される",
          "except ブロックの中では実行されない"
        ],
        answer: 2,
        explanation: "finally ブロックは例外が発生したかどうかにかかわらず、必ず実行されます。ファイルのクローズやリソースの解放など、後処理の保証に使われます。"
      },
      {
        id: "8-3",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ntry:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print(\"エラー\")\nelse:\n    print(\"正常\")",
        options: [
          "正常",
          "エラー",
          "エラー\n正常",
          "何も出力されない"
        ],
        answer: 1,
        explanation: "1 / 0 は ZeroDivisionError を発生させます。except ブロックが実行されて \"エラー\" が出力されます。else ブロックは例外が発生しなかった場合のみ実行されます。"
      },
      {
        id: "8-4",
        text: "独自の例外クラスを定義するとき、継承すべき適切なクラスはどれですか？",
        options: [
          "Error",
          "Exception",
          "RuntimeError のみ",
          "Pythonでは独自の例外クラスを定義できない"
        ],
        answer: 1,
        explanation: "独自例外クラスは Exception クラス（またはそのサブクラス）を継承して定義します。BaseException を継承することもできますが、通常は Exception を継承します。"
      },
      {
        id: "8-5",
        text: "次のコードを実行したとき発生する例外はどれですか？\n\nlst = [1, 2, 3]\nprint(lst[5])",
        options: [
          "ValueError",
          "KeyError",
          "IndexError",
          "TypeError"
        ],
        answer: 2,
        explanation: "リストの存在しないインデックスにアクセスすると IndexError が発生します。辞書の存在しないキーへのアクセスは KeyError です。"
      },
      {
        id: "8-6",
        text: "raise文の説明として正しいものはどれですか？",
        options: [
          "例外を捕捉する",
          "例外を意図的に発生させる",
          "例外を無視する",
          "プログラムを終了させる"
        ],
        answer: 1,
        explanation: "raise文は例外を意図的に発生させます。「raise ValueError('メッセージ')」のように使います。except節の中で raise のみを書くと、捕捉した例外を再送出できます。"
      },
      {
        id: "8-7",
        text: "次のコードを実行したとき発生する例外はどれですか？\n\nd = {\"a\": 1}\nprint(d[\"b\"])",
        options: [
          "IndexError",
          "ValueError",
          "KeyError",
          "AttributeError"
        ],
        answer: 2,
        explanation: "辞書に存在しないキーでアクセスすると KeyError が発生します。存在しないキーでもエラーを回避するには d.get(\"b\") または d.get(\"b\", default) を使います。"
      },
      {
        id: "8-8",
        text: "複数の例外をまとめて1つのexcept節で処理する正しい書き方はどれですか？",
        options: [
          "except ValueError, TypeError:",
          "except (ValueError, TypeError):",
          "except ValueError or TypeError:",
          "except ValueError | TypeError:"
        ],
        answer: 1,
        explanation: "複数の例外をまとめて処理するには「except (例外1, 例外2):」のようにタプルで指定します。"
      },
      {
        id: "8-9",
        text: "次のコードの実行結果として正しいものはどれですか？\n\ntry:\n    print(\"try\")\nfinally:\n    print(\"finally\")",
        options: [
          "try",
          "finally",
          "try\nfinally",
          "エラーが発生する"
        ],
        answer: 2,
        explanation: "例外が発生しない場合でも finally ブロックは必ず実行されます。try ブロックの \"try\" が出力され、その後 finally ブロックの \"finally\" が出力されます。"
      },
      {
        id: "8-10",
        text: "次のコードを実行したとき発生する例外はどれですか？\n\nprint(undefined_variable)",
        options: [
          "ValueError",
          "TypeError",
          "NameError",
          "AttributeError"
        ],
        answer: 2,
        explanation: "定義されていない変数を参照すると NameError が発生します。AttributeError はオブジェクトに存在しない属性にアクセスした場合に発生します。"
      }
    ]
  },
  {
    id: 9,
    title: "第9章 クラス",
    description: "クラス定義・継承・インスタンス",
    rate: 5.0,
    questions: [
      {
        id: "9-1",
        text: "クラスのインスタンス生成時に自動的に呼び出される特殊メソッドはどれですか？",
        options: [
          "__start__()",
          "__new__()",
          "__init__()",
          "__create__()"
        ],
        answer: 2,
        explanation: "__init__() はインスタンス初期化メソッドです。インスタンス生成時に自動的に呼ばれ、属性の初期化などに使います。__new__() はインスタンス生成自体を担いますが、通常は __init__() を使います。"
      },
      {
        id: "9-2",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nclass Animal:\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n\nd = Dog()\nprint(d.speak())",
        options: [
          "...",
          "Woof!",
          "エラーが発生する",
          "None"
        ],
        answer: 1,
        explanation: "Dog クラスは Animal クラスを継承していますが、speak() メソッドをオーバーライド（上書き）しています。d.speak() は Dog クラスの speak() が呼ばれ、\"Woof!\" が返ります。"
      },
      {
        id: "9-3",
        text: "インスタンスメソッドの第1引数として慣習的に使われる名前はどれですか？",
        options: [
          "this",
          "me",
          "self",
          "cls"
        ],
        answer: 2,
        explanation: "Pythonのインスタンスメソッドの第1引数にはインスタンス自身が渡されます。慣習的に self と命名します（強制ではありませんが強く推奨）。クラスメソッドではクラス自身が渡され cls と命名されます。"
      },
      {
        id: "9-4",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nclass Counter:\n    count = 0\n\n    def __init__(self):\n        Counter.count += 1\n\na = Counter()\nb = Counter()\nprint(Counter.count)",
        options: [
          "0",
          "1",
          "2",
          "エラーが発生する"
        ],
        answer: 2,
        explanation: "count はクラス変数です。インスタンスを生成するたびに __init__ で Counter.count が1増えます。a と b の2つのインスタンスを生成したので count は 2 になります。"
      },
      {
        id: "9-5",
        text: "親クラスのメソッドを子クラスから呼び出すための正しい書き方はどれですか？",
        options: [
          "parent.method()",
          "super().method()",
          "base.method()",
          "inherited.method()"
        ],
        answer: 1,
        explanation: "super() を使うと親クラス（スーパークラス）にアクセスできます。子クラスの __init__ で親の __init__ を呼ぶ場合は super().__init__() とします。"
      },
      {
        id: "9-6",
        text: "isinstance(obj, ClassName) の説明として正しいものはどれですか？",
        options: [
          "obj のクラス名を文字列で返す",
          "obj が ClassName またはそのサブクラスのインスタンスであれば True を返す",
          "ClassName のすべてのインスタンスを返す",
          "obj の属性一覧を返す"
        ],
        answer: 1,
        explanation: "isinstance(obj, ClassName) は obj が ClassName またはそのサブクラスのインスタンスであれば True を返します。型チェックに使われます。"
      },
      {
        id: "9-7",
        text: "次のコードの実行結果として正しいものはどれですか？\n\nclass MyClass:\n    def __str__(self):\n        return \"MyClass instance\"\n\nobj = MyClass()\nprint(obj)",
        options: [
          "<MyClass object>",
          "MyClass instance",
          "None",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "__str__() はオブジェクトの文字列表現を返す特殊メソッドです。print() やstr() で使われます。定義しないとデフォルトの表現（<クラス名 object at アドレス>）が使われます。"
      },
      {
        id: "9-8",
        text: "クラスの説明として正しいものはどれですか？",
        options: [
          "Pythonではクラスは1つの親クラスしか持てない（単一継承のみ）",
          "Pythonでは複数の親クラスを持つ多重継承がサポートされている",
          "クラスのインスタンスは一度作ると属性を追加できない",
          "クラス定義内では関数（メソッド）を定義できない"
        ],
        answer: 1,
        explanation: "Pythonは多重継承をサポートしています。「class Dog(Animal, Mammal):」のように複数の親クラスを指定できます。メソッド解決順序（MRO）によって呼び出す順序が決まります。"
      }
    ]
  },
  {
    id: 10,
    title: "第10章 標準ライブラリめぐり",
    description: "os・math・datetime・random",
    rate: 10.0,
    questions: [
      {
        id: "10-1",
        text: "os.getcwd() の説明として正しいものはどれですか？",
        options: [
          "ファイルを削除する",
          "現在の作業ディレクトリのパスを返す",
          "新しいディレクトリを作成する",
          "ディレクトリの中のファイル一覧を返す"
        ],
        answer: 1,
        explanation: "os.getcwd() は Current Working Directory（現在の作業ディレクトリ）のパスを文字列で返します。getcwd は「get current working directory」の略です。"
      },
      {
        id: "10-2",
        text: "random.choice([1, 2, 3, 4, 5]) の説明として正しいものはどれですか？",
        options: [
          "リストを無作為に並び替える",
          "リストから1つの要素をランダムに選んで返す",
          "1から5のランダムな整数を生成する",
          "リストの先頭要素を返す"
        ],
        answer: 1,
        explanation: "random.choice(seq) はシーケンスからランダムに1つの要素を選んで返します。リストを並び替えるには random.shuffle()、整数を生成するには random.randint() を使います。"
      },
      {
        id: "10-3",
        text: "math.floor(3.7) の実行結果として正しいものはどれですか？",
        options: [
          "4",
          "3",
          "3.7",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "math.floor() は引数以下の最大の整数（切り捨て）を返します。3.7 を切り捨てると 3 になります。切り上げは math.ceil() を使います。"
      },
      {
        id: "10-4",
        text: "datetime モジュールの説明として正しいものはどれですか？",
        options: [
          "ファイルの日時情報のみを扱う専用モジュールである",
          "日付と時刻の操作に使われるモジュールである",
          "ネットワークの通信時刻を取得する専用モジュールである",
          "タイマーの作成のみに使うモジュールである"
        ],
        answer: 1,
        explanation: "datetime モジュールは日付・時刻を扱うクラスや関数を提供します。datetime.datetime.now() で現在日時を取得したり、日付の計算（timedelta）なども行えます。"
      },
      {
        id: "10-5",
        text: "math.ceil(3.2) の実行結果として正しいものはどれですか？",
        options: [
          "3",
          "4",
          "3.2",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "math.ceil() は引数以上の最小の整数（切り上げ）を返します。3.2 を切り上げると 4 になります。"
      },
      {
        id: "10-6",
        text: "os.listdir('.') の説明として正しいものはどれですか？",
        options: [
          "現在のディレクトリのパスを返す",
          "現在のディレクトリ内のファイルとディレクトリの名前のリストを返す",
          "ディレクトリを削除する",
          "新しいファイルを作成する"
        ],
        answer: 1,
        explanation: "os.listdir(path) は指定したパスのディレクトリ内にあるファイルとディレクトリの名前のリストを返します。'.' は現在のディレクトリを意味します。"
      },
      {
        id: "10-7",
        text: "random.randint(1, 10) の説明として正しいものはどれですか？",
        options: [
          "1以上10未満のランダムな整数を返す",
          "1以上10以下のランダムな整数を返す",
          "1から10個のランダムな数のリストを返す",
          "0.1から1.0のランダムな浮動小数点数を返す"
        ],
        answer: 1,
        explanation: "random.randint(a, b) は a 以上 b 以下（両端を含む）のランダムな整数を返します。a未満b以下にしたい場合は random.randrange(a, b) を使います。"
      },
      {
        id: "10-8",
        text: "sys.argv について正しい説明はどれですか？",
        options: [
          "Pythonのバージョン情報を格納するリスト",
          "コマンドライン引数を格納するリスト（sys.argv[0] はスクリプト名）",
          "実行中の関数の引数を格納するタプル",
          "システム環境変数の辞書"
        ],
        answer: 1,
        explanation: "sys.argv はコマンドライン引数のリストです。sys.argv[0] はスクリプト名（またはパス）、sys.argv[1] 以降がユーザーが渡した引数になります。"
      },
      {
        id: "10-9",
        text: "math.sqrt(16) の実行結果として正しいものはどれですか？",
        options: [
          "4",
          "4.0",
          "8",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "math.sqrt() は引数の平方根を浮動小数点数（float）で返します。math.sqrt(16) は 4.0 です。整数が返るわけではありません。"
      },
      {
        id: "10-10",
        text: "os.path.join() の説明として正しいものはどれですか？",
        options: [
          "ファイルパスの拡張子を取得する",
          "OSに応じた適切なパス区切り文字でパスを結合する",
          "ファイルが存在するか確認する",
          "ディレクトリを作成する"
        ],
        answer: 1,
        explanation: "os.path.join() はパスの要素を結合します。WindowsではバックスラッシュY、Unix/MacではスラッシュYと、OSに応じた区切り文字を自動的に使います。"
      }
    ]
  },
  {
    id: 11,
    title: "第11章 標準ライブラリめぐり PartII",
    description: "re・collections・threading",
    rate: 2.5,
    questions: [
      {
        id: "11-1",
        text: "re モジュールの用途として正しいものはどれですか？",
        options: [
          "ファイルの読み書きを行う",
          "正規表現を使ったパターンマッチングを行う",
          "ネットワーク通信を行う",
          "データベースへのアクセスを行う"
        ],
        answer: 1,
        explanation: "re モジュールは正規表現（Regular Expression）を扱うモジュールです。re.match()・re.search()・re.findall() などを使って文字列のパターンマッチングや置換ができます。"
      },
      {
        id: "11-2",
        text: "collections.Counter の説明として正しいものはどれですか？",
        options: [
          "数値のカウントダウンを行うクラス",
          "要素の出現頻度を数える辞書のサブクラス",
          "スタック（LIFO）データ構造を提供するクラス",
          "キューを管理するクラス"
        ],
        answer: 1,
        explanation: "collections.Counter はイテラブルの各要素の出現回数を辞書形式で返すクラスです。Counter(\"hello\") は {'l': 2, 'h': 1, 'e': 1, 'o': 1} のように返します。"
      },
      {
        id: "11-3",
        text: "logging モジュールを使う利点として正しいものはどれですか？",
        options: [
          "print()より高速に出力できる",
          "ログレベル・出力先・フォーマットを柔軟に制御できる",
          "自動的にログをデータベースに保存できる",
          "エラーを自動的に修正できる"
        ],
        answer: 1,
        explanation: "logging モジュールはログレベル（DEBUG, INFO, WARNING, ERROR, CRITICAL）の制御、出力先（ファイル・コンソール）の切り替え、フォーマットの指定など、柔軟なログ管理ができます。"
      },
      {
        id: "11-4",
        text: "re.findall('\\\\d+', 'abc123def456') の実行結果として正しいものはどれですか？",
        options: [
          "['abc', 'def']",
          "['123', '456']",
          "'123'",
          "エラーが発生する"
        ],
        answer: 1,
        explanation: "re.findall() はパターンにマッチするすべての部分文字列をリストで返します。'\\d+' は1桁以上の連続した数字にマッチするので ['123', '456'] が返ります。"
      },
      {
        id: "11-5",
        text: "collections.deque（デック）について正しい説明はどれですか？",
        options: [
          "要素の重複を許さないコレクション",
          "両端からの追加・削除がO(1)で行えるキュー",
          "キーと値のペアを保持する順序付き辞書",
          "スタックのみに使える固定サイズのコレクション"
        ],
        answer: 1,
        explanation: "collections.deque は両端キュー（double-ended queue）です。appendleft()・popleft()で左端へのO(1)操作が可能なため、リストより効率的なキュー実装に使われます。"
      }
    ]
  },
  {
    id: 12,
    title: "第12章 仮想環境とパッケージ",
    description: "venv・pip の使い方",
    rate: 2.5,
    questions: [
      {
        id: "12-1",
        text: "Pythonで「myenv」という名前の仮想環境を作成するコマンドはどれですか？",
        options: [
          "python -m venv myenv",
          "python create venv myenv",
          "virtualenv create myenv",
          "pip install venv myenv"
        ],
        answer: 0,
        explanation: "仮想環境の作成には「python -m venv 環境名」を使います。作成後は Windows では「myenv\\Scripts\\activate」、Mac/Linux では「source myenv/bin/activate」で有効化します。"
      },
      {
        id: "12-2",
        text: "pip を使ってパッケージをインストールするコマンドはどれですか？",
        options: [
          "pip get パッケージ名",
          "pip install パッケージ名",
          "pip add パッケージ名",
          "pip download パッケージ名"
        ],
        answer: 1,
        explanation: "pip はPythonのパッケージ管理ツールです。「pip install パッケージ名」でPyPI（Python Package Index）からパッケージをインストールできます。"
      },
      {
        id: "12-3",
        text: "現在インストールされているパッケージの一覧を表示するpipコマンドはどれですか？",
        options: [
          "pip show",
          "pip list",
          "pip packages",
          "pip installed"
        ],
        answer: 1,
        explanation: "「pip list」で現在の環境にインストールされているパッケージとそのバージョンの一覧を表示できます。「pip show パッケージ名」で特定のパッケージの詳細情報を確認できます。"
      },
      {
        id: "12-4",
        text: "仮想環境を使う主な目的として正しいものはどれですか？",
        options: [
          "コードの実行速度を向上させる",
          "プロジェクトごとに独立したパッケージ環境を管理する",
          "Python本体を最新バージョンに自動更新する",
          "コードを自動的にテストする"
        ],
        answer: 1,
        explanation: "仮想環境（virtual environment）を使うと、プロジェクトごとに独立したパッケージ環境を作れます。プロジェクトAでは requests 2.x、プロジェクトBでは requests 3.x を使うといった依存関係の分離が可能です。"
      },
      {
        id: "12-5",
        text: "requirements.txt の役割として正しい説明はどれですか？",
        options: [
          "Pythonのソースコードを保存するファイル",
          "プロジェクトで必要なパッケージとバージョンを記録するファイル",
          "pip の設定ファイル",
          "仮想環境の設定を保存するファイル"
        ],
        answer: 1,
        explanation: "requirements.txt にはプロジェクトで使用するパッケージ名とバージョンを記述します。「pip freeze > requirements.txt」で現環境の内容を保存し、「pip install -r requirements.txt」で再現できます。"
      }
    ]
  },
  {
    id: 14,
    title: "第14章 対話環境での入力行編集とヒストリ置換",
    description: "対話環境の操作・補完機能",
    rate: 2.5,
    questions: [
      {
        id: "14-1",
        text: "Pythonの対話環境で、以前に入力したコマンドを呼び出す一般的なキー操作はどれですか？",
        options: [
          "Ctrl+C",
          "上矢印キー（↑）",
          "Ctrl+Z",
          "Esc"
        ],
        answer: 1,
        explanation: "対話環境では上矢印キー（↑）でヒストリ（過去のコマンド履歴）を遡ることができます。Ctrl+C は実行中断、Ctrl+D は対話環境の終了（EOF）です。"
      },
      {
        id: "14-2",
        text: "Pythonの対話環境でTabキーを押した場合の動作として正しいものはどれですか？",
        options: [
          "コードが実行される",
          "インデントが追加される",
          "入力中の名前の補完候補が表示される",
          "対話環境が終了する"
        ],
        answer: 2,
        explanation: "対話環境ではTabキーで入力補完（コード補完）が行えます。変数名・関数名・メソッド名などの候補が表示されます。これはreadlineモジュールのrlcompleterが提供します。"
      },
      {
        id: "14-3",
        text: "対話モードで Ctrl+D（WindowsではCtrl+Z）を押した場合の動作として正しいものはどれですか？",
        options: [
          "現在のコードが実行される",
          "EOF（ファイル終端）シグナルが送られ対話モードが終了する",
          "コマンド履歴が表示される",
          "コードが保存される"
        ],
        answer: 1,
        explanation: "Ctrl+D（Unix/Mac）またはCtrl+Z（Windows）はEOF（End Of File）シグナルを送り、対話モードを終了させます。exit() や quit() でも同様に終了できます。"
      },
      {
        id: "14-4",
        text: "readline モジュールが提供する機能として正しいものはどれですか？",
        options: [
          "ファイルを1行ずつ読み込む機能",
          "コマンドライン入力の編集とヒストリ機能",
          "ネットワーク通信を行う機能",
          "正規表現によるパターンマッチング機能"
        ],
        answer: 1,
        explanation: "readline モジュールはGNU Readlineライブラリを利用した行編集・ヒストリ機能を提供します。カーソル移動、削除、前のコマンドの呼び出しなど、コマンドライン操作を豊かにします。"
      },
      {
        id: "14-5",
        text: "対話環境で直前の式の評価結果が自動的に代入される特殊変数はどれですか？",
        options: [
          "_result",
          "_",
          "__ans__",
          "ans"
        ],
        answer: 1,
        explanation: "対話環境では、直前に評価された式の値が特殊変数「_」（アンダースコア）に自動的に代入されます。計算結果をすぐに次の操作に使いたいときに便利です。"
      }
    ]
  }
];
