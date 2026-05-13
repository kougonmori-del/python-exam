// PyQ（BeProud）Python 3 エンジニア認定基礎試験用模擬試験より
// 出典: https://beproud.github.io/pyq-lp/documents/exam_basic/trial.pdf
const PYQ_QUESTIONS = [
  {
    text: "Pythonの特徴として誤っているものを選択してください（1つ選択）",
    options: [
      "変数や引数の宣言が不要である",
      "複数の文のまとまりをカッコで表現する",
      "コンパイルが不要なインタープリター言語である",
      "配列や集合やディクショナリなど汎用的なデータ型を組み込みで使える"
    ],
    answer: 1,
    explanation: "Pythonでは複数の文のまとまりはカッコではなくインデント（字下げ）で表現する。これはPythonの大きな特徴の一つ。"
  },
  {
    text: "Pythonのインタープリターの特徴として正しいものを選択してください（1つ選択）",
    options: [
      "python -c モジュール名でモジュールのソースファイル名を完全な形で指定したかのように実行できる",
      "インタープリターの引数は、sysモジュールのargs属性で取得できる",
      "インタープリターを対話モードで起動すると、プロンプトが>>のように表示される",
      "インタープリターを終了するには、ファイル終端キャラクタ（WindowsではCtrl+Z）を入力するかquit()を入力する"
    ],
    answer: 3,
    explanation: "インタープリターの終了はCtrl+Z（Windows）またはquit()で行う。-cはモジュールではなくコマンド文字列の実行。引数はsys.argv（argsではない）。プロンプトは>>>（3つ）。"
  },
  {
    text: "文字列の定義として誤っているものを選択してください（1つ選択）",
    options: [
      's = "It\'s OK."',
      "s = '''1. one\\n2. two'''",
      "s = 'one' 'two'",
      's = ""Hi!""'
    ],
    answer: 3,
    explanation: 's = ""Hi!""は構文エラー。""は空文字列で、Hi!の後に再び""が来る形になりSyntaxErrorとなる。正しくは s = "Hi!" と書く。'
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nit = \"telescope\"\nprint(it[6:] + it[2:5])",
    options: [
      "telescles",
      "copeeles",
      "opeles",
      "scopetel"
    ],
    answer: 2,
    explanation: '"telescope"はt(0)e(1)l(2)e(3)s(4)c(5)o(6)p(7)e(8)。it[6:]="ope"、it[2:5]="les"。"ope"+"les"="opeles"。'
  },
  {
    text: 'name[-3:-1]の実行結果が"al"になるとき、nameの作成方法として正しいものを選択してください（1つ選択）',
    options: [
      'name = "small"',
      'name = "calorie"',
      'name = "aluminum"',
      'name = "oriental"'
    ],
    answer: 0,
    explanation: '"small"=s(0)m(1)a(2)l(3)l(4)の5文字。[-3:-1]はインデックス2〜3=a,l="al"となる。他の選択肢はいずれも"al"にならない。'
  },
  {
    text: '次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nch1 = "1"\nch2 = "3"\nprint(ch1 * 2 + ch2)',
    options: [
      "5",
      "23",
      "113",
      "123"
    ],
    answer: 2,
    explanation: 'ch1 * 2 = "11"（文字列の繰り返し）。"11" + "3" = "113"。文字列なので数値演算ではなく文字列操作になる。'
  },
  {
    text: "文字列やリストの特徴として正しいものを選択してください（1つ選択）",
    options: [
      "文字列は可変体で、リストも可変体である",
      "文字列は可変体で、リストは不変体である",
      "文字列は不変体で、リストは可変体である",
      "文字列は不変体で、リストも不変体である"
    ],
    answer: 2,
    explanation: "文字列はイミュータブル（不変体）で作成後に内容を変更できない。リストはミュータブル（可変体）で要素の追加・変更・削除が可能。"
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nmonth, day = 12, 24\na, b = day + 1, (month + 1) % 12\nprint(a, b)",
    options: [
      "13 1",
      "13 25",
      "25 1",
      "25 13"
    ],
    answer: 2,
    explanation: "a = 24 + 1 = 25。b = (12 + 1) % 12 = 13 % 12 = 1。print(25, 1)が出力される。"
  },
  {
    text: '次のコードを実行した結果として表示されるものを選択してください（1つ選択）\ntypes = ["float", "int", "str"]\nfor t in types:\n    if len(t) == 3:\n        print(t)',
    options: [
      "int str（1行で表示される）",
      "float int str（1行で表示される）",
      "int / str（1行ずつ表示される）",
      "float / int / str（1行ずつ表示される）"
    ],
    answer: 2,
    explanation: 'len("float")=5で非表示。len("int")=3→表示。len("str")=3→表示。print()は改行するため、intとstrが1行ずつ出力される。'
  },
  {
    text: '次のコードを実行して期待する結果が表示されるとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\nnumbers_list = [[1, 3, 5], [1, 2, 3]]\nfor numbers in numbers_list:\n    print(numbers, end=" ")\n    ①\n\n【期待する結果】\n[1, 3, 5] All numbers are odd\n[1, 2, 3] Even numbers found',
    options: [
      "for number in numbers:\n    if number % 2 == 0:\n        print(\"Even numbers found\")\n    else:\n        print(\"All numbers are odd\")",
      "for number in numbers:\n    if number % 2 == 0:\n        print(\"Even numbers found\")\n        break\n    else:\n        print(\"All numbers are odd\")",
      "for number in numbers:\n    if number % 2 == 0:\n        print(\"Even numbers found\")\nelse:\n    print(\"All numbers are odd\")",
      "for number in numbers:\n    if number % 2 == 0:\n        print(\"Even numbers found\")\n        break\nelse:\n    print(\"All numbers are odd\")"
    ],
    answer: 3,
    explanation: "for-else構文を使う。偶数が見つかればprint後にbreakしelseをスキップ。奇数のみのリストはbreakしないのでelse節で「All numbers are odd」を出力。"
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\ndef calc(value, x=2):\n    return value ** x\nprint(calc(2, 3) * calc(3))",
    options: [
      "9",
      "18",
      "36",
      "72"
    ],
    answer: 3,
    explanation: "calc(2, 3) = 2**3 = 8。calc(3) = 3**2 = 9（xのデフォルト値は2）。8 * 9 = 72。"
  },
  {
    text: "次のコードを実行してHello! Good bye! が表示されるとき、空欄①、②に入る記述の組み合わせとして正しいものを選択してください（1つ選択）\ndef greeting(①, ②):\n    for message in messages:\n        print(message, **options)\ngreeting(\"Hello\", \"Good bye\", end=\"! \")",
    options: [
      "① *messages ② *options",
      "① *messages ② **options",
      "① **messages ② *options",
      "① **messages ② **options"
    ],
    answer: 1,
    explanation: '"Hello"と"Good bye"は位置引数→*messagesでタプルとして受け取る。end="! "はキーワード引数→**optionsで辞書として受け取りprint内で**optionsとして展開する。'
  },
  {
    text: "次のコードの空欄①、②、③に入る引数の説明の組み合わせとして正しいものを選択してください（1つ選択）\ndef greeting(①, /, ②, *, ③):\n    pass",
    options: [
      "① 位置のみ ② 位置またはキーワード ③ キーワードのみ",
      "① 位置のみ ② キーワードのみ ③ 位置またはキーワード",
      "① キーワードのみ ② 位置のみ ③ 位置またはキーワード",
      "① 位置またはキーワード ② 位置のみ ③ キーワードのみ"
    ],
    answer: 0,
    explanation: "/の前の引数は位置のみ（positional-only）。/と*の間は位置またはキーワード。*の後の引数はキーワードのみ（keyword-only）。"
  },
  {
    text: "次のコードの関数の使い方として誤っているものを選択してください（1つ選択）\ndef greeting(*messages, to=None):\n    pass",
    options: [
      'greeting("Hello")',
      'greeting("Hello", to="Taro")',
      'greeting(to="Taro", "Hello")',
      'greeting("Hello", "Good bye")'
    ],
    answer: 2,
    explanation: 'greeting(to="Taro", "Hello")はキーワード引数の後に位置引数を置いているためSyntaxError。Pythonでは位置引数はキーワード引数より前に記述しなければならない。'
  },
  {
    text: '次のコードを実行してcarrot,tomatoが表示されるとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\nvegetables = ["carrot", "tomato"]\noptions = {"sep": ","}\nprint(①)',
    options: [
      "vegetables, options",
      "vegetables, *options",
      "*vegetables, *options",
      "*vegetables, **options"
    ],
    answer: 3,
    explanation: '*vegetablesでリストを展開してprint("carrot", "tomato"...)に、**optionsで辞書を展開してsep=","を渡す。結果："carrot,tomato"。'
  },
  {
    text: '次のコードを実行した結果として表示されるものを選択してください（1つ選択）\naddress = ["hokkaido", "mie", "akita"]\naddress.sort(key=lambda s: len(s))\nprint(address)',
    options: [
      "['akita', 'hokkaido', 'mie']",
      "['hokkaido', 'akita', 'mie']",
      "['mie', 'akita', 'hokkaido']",
      "['mie', 'hokkaido', 'akita']"
    ],
    answer: 2,
    explanation: "文字列長でソート：mie(3)、akita(5)、hokkaido(8)。昇順に並べると['mie', 'akita', 'hokkaido']。"
  },
  {
    text: "ドキュメンテーション文字列の慣習として誤っているものを選択してください（1つ選択）",
    options: [
      "1行目に簡潔な説明などを書く",
      "1行目は大文字ではじめて、ピリオドで終わらせる",
      "続きを書く場合、2行目に詳細な説明を書く",
      "詳細な説明として、呼び出し方法や副作用などを書く"
    ],
    answer: 2,
    explanation: "docstringの慣習では、続きを書く場合は1行目の後に空行（2行目）を入れ、3行目以降に詳細を書く。2行目に詳細を書くのは誤り。"
  },
  {
    text: '次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nvegetables = ["tomato"]\nvegetables.append("carrot")\nvegetables.append("potato")\nvegetables.reverse()\nvegetables.pop()\nvegetables.pop()\nprint(vegetables)',
    options: [
      "[]",
      "['carrot']",
      "['potato']",
      "['tomato']"
    ],
    answer: 2,
    explanation: 'append後：["tomato","carrot","potato"]。reverse後：["potato","carrot","tomato"]。pop()×2で末尾から削除→["potato"]。'
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nprint([[3 * i + j + 1 for j in range(3)] for i in range(2)])",
    options: [
      "[[1, 2, 3, 4, 5, 6]]",
      "[[1, 2, 3], [4, 5, 6]]",
      "[[1, 2], [3, 4], [5, 6]]",
      "[[1], [2], [3], [4], [5], [6]]"
    ],
    answer: 1,
    explanation: "i=0: [1,2,3]（j=0,1,2）。i=1: [4,5,6]（j=0,1,2）。外側のリスト内包表記で[[1,2,3],[4,5,6]]となる。"
  },
  {
    text: "次のコードを実行して{2} {2, 3, 5, 7, 9, 11}が表示されるとき、空欄①、②に入る記述の組み合わせとして正しいものを選択してください（1つ選択）\nodds = {3, 5, 7, 9, 11}\nprimes = {2, 3, 5, 7, 11}\nprint(①, ②)",
    options: [
      "① primes ^ odds ② odds & primes",
      "① primes ^ odds ② odds | primes",
      "① primes - odds ② odds & primes",
      "① primes - odds ② odds | primes"
    ],
    answer: 3,
    explanation: "primes - odds（差集合）= {2}（primesのみにある要素）。odds | primes（和集合）= {2,3,5,7,9,11}（両方の全要素）。"
  },
  {
    text: "ディクショナリの作成方法として誤っているものを選択してください（1つ選択）",
    options: [
      '{"carrot": 80, "tomato": 100}',
      'dict("carrot"=80, "tomato"=100)',
      'dict([("carrot", 80), ("tomato", 100)])',
      '{k: v for k, v in [("carrot", 80), ("tomato", 100)]}'
    ],
    answer: 1,
    explanation: 'dict()のキーワード引数名は識別子でなければならず、"carrot"のような文字列リテラルは使えないためSyntaxError。正しくはdict(carrot=80)のように書く。'
  },
  {
    text: "次のコードを実行して期待する結果が表示されるとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\nvegetables = {0: \"carrot\", 1: \"potato\", 2: \"tomato\"}\nfor kv in ①:\n    print(kv)\n\n【期待する結果】\n(0, 'carrot')\n(1, 'potato')\n(2, 'tomato')",
    options: [
      "vegetables",
      "zip(vegetables)",
      "vegetables.items()",
      "enumerate(vegetables)"
    ],
    answer: 2,
    explanation: "vegetables.items()はキーと値のペアを(key, value)タプルのビューとして返す。for文でイテレートすると各タプルが順に取得できる。"
  },
  {
    text: "次のコードを実行してTrueが表示されるとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\ntemp = 22\nprint(①)",
    options: [
      "10 <= temp < 20",
      "temp >= 10 or temp < 20",
      "temp >= 10 and temp < 20",
      "temp >= 10 and not temp >= 20 or temp < 20"
    ],
    answer: 1,
    explanation: "temp=22のとき：A: 10<=22<20=False。B: 22>=10 or 22<20=True or False=True。C: 22>=10 and 22<20=True and False=False。D: Falseになる。正解はB。"
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\ncompare1 = \"carrot\" < \"tomato\" < \"potato\"\ncompare2 = [3, 2] < [3, 1, 4]\ncompare3 = (3, 1) < (3, 1, -1)\nprint(compare1, compare2, compare3)",
    options: [
      "False False False",
      "False False True",
      "False True False",
      "True False False"
    ],
    answer: 1,
    explanation: 'compare1: "tomato"<"potato"はFalse（t>p）→False。compare2: [3,2]vs[3,1,4]、2>1なのでFalse。compare3: (3,1)は(3,1,-1)の前置→短い方が小さい→True。結果: False False True。'
  },
  {
    text: "次のコードを正常に実行できるとき、空欄①に入る記述として誤っているものを選択してください（1つ選択）\nimport math\nfrom math import pi\nfrom math import pi as pai\nprint(①)",
    options: [
      "pi",
      "pai",
      "math.pi",
      "math.pai"
    ],
    answer: 3,
    explanation: "math.paiは存在しない。paiはfrom math import pi as paiでローカル名前空間に定義されたが、mathモジュールの属性ではない。math.piは正しい。"
  },
  {
    text: "下記のディレクトリ構成のtodo_appパッケージを使います。baseサブモジュールをインポートする方法として正しいものを選択してください（1つ選択）\n【ディレクトリ構成】\ntodo_app/\n    __init__.py\n    model/\n        __init__.py\n        base.py",
    options: [
      "import base",
      "import model.base",
      "import todo_app.base",
      "import todo_app.model.base"
    ],
    answer: 3,
    explanation: "パッケージ内のサブモジュールをインポートするにはパッケージ名から始まる完全なパスを指定する。todo_app.model.baseが正しい。"
  },
  {
    text: "open関数のモード引数（第2引数）の特徴として誤っているものを選択してください（1つ選択）",
    options: [
      "モード引数は省略できない",
      "\"rb\"は、バイナリモードの読み込みの指定である",
      "\"r+\"は、テキストモードの読み書きの指定である",
      "\"a\"は、テキストモードの追加書き込みの指定である"
    ],
    answer: 0,
    explanation: "open()のモード引数は省略可能で、省略時のデフォルトは\"r\"（テキストモードで読み込み）。"
  },
  {
    text: "次のコードを実行した結果として表示されるエラーを選択してください（1つ選択）\nprint(python_version)",
    options: [
      "NameError",
      "TypeError",
      "ValueError",
      "SyntaxError"
    ],
    answer: 0,
    explanation: "python_versionは定義されていない変数。未定義の名前を参照するとNameErrorが発生する。"
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nnumerator = 1\ndenominator = 0\ntry:\n    result = numerator / denominator\nexcept ZeroDivisionError:\n    print(\"division by zero\")\nelse:\n    print(\"executed else\")\nfinally:\n    print(\"executed finally\")",
    options: [
      "executed else / executed finally",
      "division by zero / executed else",
      "division by zero / executed finally",
      "division by zero"
    ],
    answer: 2,
    explanation: "1/0でZeroDivisionError発生→except節で\"division by zero\"出力。else節は例外が発生しなかった場合のみ実行されるためスキップ。finally節は常に実行→\"executed finally\"。"
  },
  {
    text: "次のコードを正常に実行できるとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\ndef divide(numerator, denominator):\n    try:\n        result = numerator / denominator\n    except ZeroDivisionError as e:\n        raise ValueError(\"Illegal argument\") ① e\n    else:\n        return result\ntry:\n    result = divide(1, 0)\nexcept ValueError as e:\n    print(e)",
    options: [
      "as",
      "from",
      "in",
      "with"
    ],
    answer: 1,
    explanation: "raise ... from eは例外チェーン（exception chaining）の構文。元の例外eを原因として新しい例外を発生させる。"
  },
  {
    text: "次のコードで例外時でもデータベースの終了処理を実行したいとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\nprint(\"Open DB\")\ntry:\n    # データベースの処理\n    ...\n①:\n    # データベースの終了処理\n    print(\"Close DB\")",
    options: [
      "close",
      "ending",
      "finally",
      "terminal"
    ],
    answer: 2,
    explanation: "finally節は例外の発生有無にかかわらず必ず実行される。リソースの後処理（DBのクローズなど）に使う。"
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nclass Path1:\n    def __init__(self, dirs):\n        self.dirs = dirs\n        self.sep = \"/\"\n    def join(self):\n        return self.sep.join(self.dirs)\nclass Path2(Path1):\n    def __init__(self, dirs):\n        super().__init__(dirs)\n        self.sep = \"\\\\\"\npth1 = Path1([\"home\", \"taro\"])\npth2 = Path2([\"users\", \"taro\"])\nprint(pth1.join(), pth2.join())",
    options: [
      "home/taro users/taro",
      "home/taro users\\taro",
      "home\\taro users/taro",
      "home\\taro users\\taro"
    ],
    answer: 1,
    explanation: 'pth1はsep="/"で"home/taro"。pth2はsuper().__init__()後にsep="\\"（1つのバックスラッシュ）に上書きされ"users\\taro"になる。'
  },
  {
    text: "次のコードを実行して0 1 1 2 3 5 8が表示されるとき、空欄①に入る記述として正しいものを選択してください（1つ選択）\ndef fibonacci(limit):\n    i, j = 0, 1\n    while i <= limit:\n        ① i\n        i, j = j, i + j\nfor i in fibonacci(10):\n    print(i, end=\" \")",
    options: [
      "push",
      "return",
      "send",
      "yield"
    ],
    answer: 3,
    explanation: "yieldを使うとジェネレータ関数になり、呼び出し元にiの値を1つずつ返しながら処理を継続できる。for文でフィボナッチ数列を順に取得できる。"
  },
  {
    text: "osモジュールの特徴として誤っているものを選択してください（1つ選択）",
    options: [
      "os.chdir(移動先)でカレントディレクトリを変更できる",
      "os.pwd()でカレントディレクトリを取得できる",
      "dir(os)でosモジュールの全属性名を取得できる",
      "help(os)でosモジュールのヘルプを確認できる"
    ],
    answer: 1,
    explanation: "カレントディレクトリを取得するのはos.getcwd()。os.pwd()という関数は存在しない（Unixコマンドのpwdと混同しないように注意）。"
  },
  {
    text: "次のファイルfile.pyを実行して['buy', 'milk'] 2/3が表示されるとき、実行方法の記述として正しいものを選択してください（1つ選択）\nimport argparse\nparser = argparse.ArgumentParser()\nparser.add_argument(\"task\", nargs=\"+\")\nparser.add_argument(\"--date\")\nargs = parser.parse_args()\nprint(args.task, args.date)",
    options: [
      "python file.py buy milk 2/3",
      "python file.py 2/3 buy milk",
      "python file.py --date 2/3 buy milk",
      "python file.py --date 2/3 \"['buy', 'milk']\""
    ],
    answer: 2,
    explanation: "--dateオプションの値として2/3を渡し、残りの位置引数buyとmilkをtask（nargs=\"+\"）に渡す。args.task=['buy','milk']、args.date='2/3'となる。"
  },
  {
    text: "次のファイルを実行したとき処理される内容として正しいものを選択してください（1つ選択）\nfrom datetime import date\ndef date_str(year, month, day):\n    \"\"\"To string from year, month, date.\n    >>> print(date_str(2024, 2, 3))\n    2024-02-03\n    \"\"\"\n    dt = date(year, month, day)\n    return dt.strftime(\"%Y-%m-%d\")\nimport doctest\ndoctest.testmod()",
    options: [
      "print(date_str(2024, 2, 3))を実行せず、何もチェックしない",
      "print(date_str(2024, 2, 3))を実行せず、docstringがあるかをチェックする",
      "print(date_str(2024, 2, 3))を実行し、エラーが発生するかどうかだけをチェックする",
      "print(date_str(2024, 2, 3))を実行し、出力が2024-02-03と同じかどうかをチェックする"
    ],
    answer: 3,
    explanation: "doctest.testmod()はdocstring内の>>>で始まるサンプルコードを実際に実行し、直後に記載された期待値と出力が一致するかを検証する。"
  },
  {
    text: "標準ライブラリの説明として誤っているものを選択してください（1つ選択）",
    options: [
      "csvモジュールは、スプレッドシートなどで使用されているCSV形式のファイルを読み書きできる",
      "emailパッケージは、電子メールのデコードやヘッダプロトコルの処理などメッセージの構築ができる",
      "jsonパッケージは、JSON形式のデータを安定的にパースできる",
      "sqlite1モジュールは、SQLを用いてSQLiteデータベースを更新できる"
    ],
    answer: 3,
    explanation: "SQLiteを操作するモジュールはsqlite3（3が正しい）。sqlite1というモジュールは存在しない。"
  },
  {
    text: "次のコードを実行した結果として表示されるものを選択してください（1つ選択）\nimport logging\nlogging.warning(\"Key not found\")\nlogging.critical(\"Key not found\")\nlogging.debug(\"Key not found\")\nlogging.error(\"Key not found\")\nlogging.info(\"Key not found\")",
    options: [
      "CRITICAL:root:Key not found / ERROR:root:Key not found",
      "CRITICAL:root:Key not found / DEBUG:root:Key not found / ERROR:root:Key not found",
      "WARNING:root:Key not found / CRITICAL:root:Key not found / ERROR:root:Key not found",
      "WARNING:root:Key not found / CRITICAL:root:Key not found / DEBUG:root:Key not found / ERROR:root:Key not found"
    ],
    answer: 2,
    explanation: "デフォルトログレベルはWARNING。WARNING以上（WARNING/ERROR/CRITICAL）のみ表示される。DEBUGとINFOは表示されない。呼び出し順にWARNING→CRITICAL→ERRORの3件が出力される。"
  },
  {
    text: "コマンドとその説明として誤っているものを選択してください（1つ選択）",
    options: [
      "pip install --file requirements.txtは、requirements.txtに記述されたパッケージをインストールする",
      "python -m pip install --upgrade pipは、pipの最新版をインストールする",
      "pip uninstall pyyamlは、pyyamlをアンインストール（削除）する",
      "pip freeze > requirements.txtは、インストールされたパッケージ一覧を作成し、requirements.txtに保存する"
    ],
    answer: 0,
    explanation: "requirements.txtからインストールするオプションは-r（または--requirement）。--fileというオプションは存在しない。正しくはpip install -r requirements.txt。"
  },
  {
    text: "対話型インタープリターの説明として誤っているものを選択してください（1つ選択）",
    options: [
      "ユーザディレクトリの.python_historyに入力のヒストリが保存される",
      "拡張されたインタープリターとして、bpythonやIPythonがある",
      "if文などのブロック内で改行すると、インデントが自動的に挿入される",
      "ローカル変数などを途中まで入力してTabキーを押すと、候補が表示されたり補完されたりする"
    ],
    answer: 2,
    explanation: "標準のPython対話型インタープリターはブロック内改行時にインデントを自動挿入しない（手動で入力が必要）。IPythonなどの拡張REPLではできる場合もある。"
  }
];