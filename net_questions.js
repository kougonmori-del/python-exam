// PRIME STUDY 第2回 Python 3 エンジニア認定基礎 模擬試験より
// 出典: https://study.prime-strategy.co.jp/study/py3ba2/
const NET_QUESTIONS = [
  {
    text: "Pythonの特徴に関する次の記述のうち、誤っているものはどれか。",
    options: [
      "Pythonは柔軟な配列や集合、ディクショナリといった、非常に高水準のデータ型を組み込みで持つ。データ型の一般性が高いためPythonの対応可能な問題領域はAwkより広いが、Perlと比べると同程度である。",
      "Pythonは簡単に使えるとはいえ本格的なプログラム言語であり、大きなプログラムを書くために提供された構造やサポート、エラーチェック機構が、シェルスクリプトなどに比べはるかに多く存在する。",
      "PythonはWindows、MacOS、Linuxなど多くの環境で動作する、拡張可能なフリーのオープンソースソフトウェアである。",
      "Pythonでは、文のグルーピングはカッコで囲うことでなくインデントで行われるなど、プログラムを小さく読みやすく書けるという特徴がある。",
      "Pythonはインタープリタ言語であり、コンパイル等が必要でないため、プログラム開発における時間を節約してくれる。インタープリタは対話的に使うことも可能である。"
    ],
    answer: 0,
    explanation: "Pythonチュートリアルによると、Pythonの対応可能な問題領域はAwkよりもPerlよりも広い。「Perlと比べると同程度」という記述が誤り。B〜Eは正しい記述。"
  },
  {
    text: "Pythonインタープリタに関する次の記述のうち、誤っているものはどれか。",
    options: [
      "標準入力がttyデバイスに接続された状態で起動した場合は、コマンドを対話的に読み込んで実行するが、引数にファイル名を与えたり、標準入力からファイルを与えて起動した場合は、このファイルに入った「スクリプト」を読み込んで実行する。",
      "インタープリタがスクリプト名と続く引数群を知らされると、これらは文字列のリストとなる。import listitems を実行することで、このリストにアクセスできる。",
      "デフォルトの設定では、プライマリプロンプトの記号は「>>>」、セカンダリプロンプトの記号は「…」である。",
      "インタープリタを対話モードで起動すると、はじめにバージョンと著作権からはじまるメッセージが表示され、その後にプライマリプロンプトが表示される。",
      "プログラムの冒頭で「# coding: （エンコーディング方式）」のようにすると、デフォルト以外のエンコーディングを使うことも可能である。"
    ],
    answer: 1,
    explanation: "スクリプト名と引数のリストにアクセスするには「import sys」した後に「sys.argv」を使う。「import listitems」は誤り。"
  },
  {
    text: "数値に関する次の記述のうち、正しいものはどれか。",
    options: [
      "演算を行うための「+」や「-」などの記号はオペランドと呼ばれ、演算の対象は演算子と呼ばれる。",
      "切り下げ除算を行って整数解を得たい場合は「/」を使い、剰余のみ得たい場合は「//」を使う。",
      "変数は、定義（値の代入）や宣言がなされないまま使おうとするとエラーとなる。",
      "整数はintという型を持つ。小数点を伴う数はfloatという型を持つ。除算は常にfloatを返す。",
      "対話モードでは、最後に表示した式を変数「**」（アスタリスク2つ）に代入してある。"
    ],
    answer: 3,
    explanation: "Python 3では「/」演算子は常にfloatを返す。「//」は切り捨て除算。A:演算子とオペランドが逆、B://と/が逆、E:最後の式は変数「_」（アンダースコア）に保存される。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\na = 2\nb = a ** 3\nc = b / 2 + 3\nd = 10\ne = d // b\nf = d % c\nprint('{1}, {0}'.format(e, f))",
    options: [
      "3.0, 1",
      "3.0, 1.25",
      "1.0, 1.25",
      "4.0, 1",
      "1.6666666666666667, 1"
    ],
    answer: 0,
    explanation: "b=2**3=8, c=8/2+3=7.0, e=10//8=1, f=10%7.0=3.0。format({1},{0})はf=3.0が{1}、e=1が{0}なので出力は「3.0, 1」。"
  },
  {
    text: "文字列に関する次の記述のうち、正しいものはどれか。なお「\\」はバックスラッシュに読み替えること。",
    options: [
      "バックスラッシュを前置した文字が特殊文字に解釈されるのが嫌な時は、最初の引用符の前に「raw」を記述する。",
      "文字列リテラルを複数行にわたり書く一つの方法は、トリプルクオートを使う方法である。最初の改行などの行末文字が文字列に含まれることを避けたい場合は、行末に「-」を置く。",
      "変数と文字列リテラルの連結、そして変数同士の連結には「.」（ドット）を使う。",
      "文字列は「*」で繰り返すことができる。「'w' + 3 * 'o'」は対話型インタープリタで出力「wwwo」が得られる。",
      "対話型インタープリタでは文字列は引用符に囲まれ、特殊文字はバックスラッシュでエスケープされた状態で出力される。print()関数では全体を囲む引用符が除去され、エスケープ文字や特殊文字がプリントされた状態で出力される。"
    ],
    answer: 4,
    explanation: "A:raw文字列はr'...'と書く。B:複数行の場合、行末に「\\」（バックスラッシュ）を置く。C:連結は「+」を使う。D:'w'+3*'o'='wooo'で'wwwo'ではない。Eが正しい記述。"
  },
  {
    text: "以下の結果を得たい場合、コードの【A】に入るものとして正しいものはどれか。\n実行結果: sNow\n\nZen = 'NowIsBetterThanNever'\nprint('{}{}{}'.format(【A】))",
    options: [
      "Zen[5], Zen[-4], Zen[2:4]",
      "Zen[4], Zen[-6], Zen[1:3]",
      "Zen[4], Zen[-5], Zen[1:3]",
      "Zen[4], Zen[-5], Zen[1:2]",
      "Zen[5], Zen[-4], Zen[1:3]"
    ],
    answer: 2,
    explanation: "Zen='NowIsBetterThanNever'(20文字)。's'=Zen[4]、'N'=Zen[-5]=Zen[15]、'ow'=Zen[1:3]。よってZen[4]+Zen[-5]+Zen[1:3]='s'+'N'+'ow'='sNow'。"
  },
  {
    text: "次の変数Zenに関して指定した場合、実行時にエラーとならないものはどれか。\nZen = 'BeautifulIsBetterThanUgly'",
    options: [
      "Zen[1000:10000]",
      "Zen[50]",
      "Zen[10] = 'a'",
      "Zen['B']",
      "Zen[1:10] + b"
    ],
    answer: 0,
    explanation: "文字列のスライスは範囲外でもエラーにならず空文字列を返す。B:IndexError（範囲外）、C:TypeError（文字列は変更不可）、D:TypeError（インデックスは整数が必要）、E:NameError（bが未定義）。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\na, b = 0, 1\nwhile a < 10:\n    print(a, end=',')\n    a, b = b, a+b",
    options: [
      "1,1,2,3,5,8,",
      "0,1,1,2,3,5,8,",
      "1,2,3,5,8,13,",
      "0,1,2,3,5,8,",
      "0,1,2,2,3,5,"
    ],
    answer: 1,
    explanation: "フィボナッチ数列。a=0→1→1→2→3→5→8の順に出力し、a=13で終了。出力は「0,1,1,2,3,5,8,」。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\nmonths = ['January', 'March', 'May', 'July']\nmonths.append('September')\nfor month in months[:]:\n    if len(month) > 5:\n        months.insert(0,month)\nprint(months, end = '')",
    options: [
      "['March', 'January', 'January', 'March', 'May', 'July']",
      "['March', 'January', 'January', 'March', 'May', 'July', 'September']",
      "['September', 'March', 'January', 'January', 'March', 'May', 'July', 'September']",
      "['September', 'January', 'January', 'March', 'May', 'July', 'September']",
      "['September', 'March', 'January', 'May', 'July']"
    ],
    answer: 3,
    explanation: "months[:]はコピーなので5要素を順に処理。January(7文字>5)→先頭に挿入、March/May/July(5文字以下)→スキップ、September(9文字>5)→先頭に挿入。結果は['September','January','January','March','May','July','September']。"
  },
  {
    text: "次の結果を得たい場合、コードの【A】【B】に入る組み合わせとして適切なものはどれか。\nfor n in range(2, 10):\n    for x in range(2, n):\n        if n % x == 0:\n            print(n, 'equals', x, '*', n//x)\n            【A】\n    【B】\n        print(n,'is a prime number')",
    options: [
      "【A】continue 【B】else:",
      "【A】continue 【B】else",
      "【A】break 【B】each:",
      "【A】break: 【B】else",
      "【A】break 【B】else:"
    ],
    answer: 4,
    explanation: "for-elseパターン。内側のforループがbreakで終了しなかった場合にelseブロックが実行される。素数でないとき(n%x==0)はbreakし、素数のときはelseブロックで「is a prime number」を出力する。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\nfor i in range(-3, -18, -3):\n    print(i, end=', ')",
    options: [
      "-3, 0, 3, 6, 9, 12, 15,",
      "-3, -6, -9, -12, -15, -18,",
      "-3, -6, -9, -12, -15,",
      "-6, -9, -12, -15, -18,",
      "-6, -9, -12, -15,"
    ],
    answer: 2,
    explanation: "range(-3, -18, -3)は-3から-18未満まで-3ずつ進む。-3,-6,-9,-12,-15の5つ。-18は終了値なので含まれない。"
  },
  {
    text: "次の結果を得たい場合に、コードの2行目以降を代替するものとして正しいものはどれか。なお各選択肢の次の行には「print(i, v)」が記述されるものとする。\n実行結果:\n0 Now\n1 is\n2 better\n3 than\n4 never\n\nZen = ['Now','is','better','than','never']\nfor i, v in enumerate(Zen):\n    print(i, v)",
    options: [
      "for i in range(len(Zen)):",
      "in i for Zen[0:5]:",
      "for i in range(Zen[0:5]):",
      "while i < range(len(Zen)):",
      "while i < len(Zen):"
    ],
    answer: 0,
    explanation: "enumerate()の代替としてrange(len())が使われる。Bはシンタックスエラー、Cはrange()にリストは渡せない、Dはrange()オブジェクトと比較できない、Eはiが未定義。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\ni = 1\ni = 2\ndef f(arg):\n    i = 3\n    print(arg)\ni = 4\ni = 5\nf(i)",
    options: [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    answer: 4,
    explanation: "f(i)を呼び出す時点でグローバル変数iは5。argにi=5が渡され、print(arg)で5が出力される。関数内のi=3はローカル変数で引数には影響しない。"
  },
  {
    text: "次のコードに関し、【A】の行の出力として正しいものはどれか。\ndef culc(a, b, squares=[], cubes=[]):\n    squares.append(a ** 2)\n    cubes.append(b ** 3)\n    return squares, cubes\nprint(culc(2,2))\nprint(culc(3,3))\nprint(culc(4,4))  【A】\nprint(culc(5,5))",
    options: [
      "([16], [64])",
      "([4, 8], [9, 27], [16, 64])",
      "([4, 6, 8], [6, 9, 12])",
      "([4, 9, 16], [8, 27, 64])",
      "([8, 27, 64], [4, 9, 16])"
    ],
    answer: 3,
    explanation: "デフォルト引数のリストは関数定義時に一度だけ生成される。呼び出すたびに蓄積されるため、3回目(culc(4,4))ではsquares=[4,9,16]、cubes=[8,27,64]。"
  },
  {
    text: "次の関数を呼び出す際に、引数の指定として正しいものはどれか。\ndef location(city, state='NewYork', country='USA'):\n    print('I live in', country, '.')\n    print('My company is located in', city, ',', state, '.')",
    options: [
      "location(city='chiyoda', state='Tokyo', zipcode='1000004')",
      "location(state='California', country='USA', 'San Francisco')",
      "location(state='Jakarta', city='Cikini')",
      "location('Geelong', city='Melbourne')",
      "location()"
    ],
    answer: 2,
    explanation: "Cはキーワード引数で正しく指定されている。A:zipcodeは未定義のキーワード引数でエラー、B:キーワード引数の後に位置引数は不可、D:cityに2回値を渡すエラー、E:必須引数cityが未指定。"
  },
  {
    text: "次のコード1行目の【A】【B】に入る組み合わせとして正しいものはどれか。\ndef shop(name, 【A】, 【B】):\n    print('flowershop:', name)\n    keys = sorted(argsX.keys())\n    for kw in keys:\n        print(kw, ':', argsX[kw])\n    for Y in argsY:\n        print(Y)\nshop('Iris','Open: 9:30 am','Close: 10:30 pm','Monday and holidays are closed.',bouquet='Sunflower',plants='Pachira',dried='Rose')",
    options: [
      "【A】argsX 【B】argsY",
      "【A】*argsY 【B】**argsX",
      "【A】**argsY 【B】*argsX",
      "【A】*argsX 【B】**argsY",
      "【A】**argsX 【B】*argsY"
    ],
    answer: 1,
    explanation: "argsX.keys()を呼び出しているのでargsXは辞書(**kwargs)。argsYをfor文で反復しているのでargsYはタプル(*args)。呼び出し時の位置引数がargsY、キーワード引数がargsXとなる。"
  },
  {
    text: "次の記述のうち、誤っているものはどれか。",
    options: [
      "関数注釈（アノテーション）は関数の__annotations__属性にディクショナリとして格納され、関数のほかの部分にはいかなる影響も及ぼさない。",
      "例えば「def func(a: int, b:str) -> value」と関数を記述したときにアノテーションに該当するものは「-> value」のみである。",
      "docstringの1行目は、常にオブジェクトの目的の短く簡潔な要約を記述し、大文字で始まりピリオドで終わる行とすべきである。",
      "docstringに2行目以降がある場合、2行目は空行としてようやくと他の記述を視覚的に分離すべきである。",
      "PEP 8では、演算子の周囲やカンマの後ろにはスペースを入れるが、カッコのすぐ内側にはスペースを入れるべきではないとされる。"
    ],
    answer: 1,
    explanation: "アノテーションには「-> value」だけでなく「a: int」「b: str」も含まれる。すべての引数アノテーションと戻り値アノテーションが__annotations__に格納される。"
  },
  {
    text: "次の結果を得たい場合に、コードの1行目〜3行目を代替するものとして正しいものはどれか。\n実行結果: [0, 9, 36, 81]\n\nsquares = []\nfor x in range(0, 10, 3):\n    squares.append(x ** 2)\nprint(squares)",
    options: [
      "squares = [x in x ** 2 for range(0, 10, 3)]",
      "squares = [x for x ** 2 in range(0, 10, 3)]",
      "squares = [x ** 2 in x for range(0, 10, 3)]",
      "squares = [x ** 2 for range(0, 10, 3) in x]",
      "squares = [x ** 2 for x in range(0, 10, 3)]"
    ],
    answer: 4,
    explanation: "リスト内包表記の正しい構文は[式 for 変数 in イテラブル]。x=0,3,6,9のそれぞれの二乗[0,9,36,81]が得られる。"
  },
  {
    text: "次の実行結果を得たい場合に、コードの2行目（★印の行）を代替するものとして正しいものはどれか。\n実行結果: [(1, 4, 8), (3, 9, 27), (5, 25, 125)]\n\nmatrix = [[1, 3, 5], [4, 9, 25], [8, 27, 125]]\npower = [[row[i] for row in matrix] for i in range(3)]  ★\nprint(power)",
    options: [
      "power = list(zip(*matrix))",
      "power = list(sum(*matrix))",
      "power = list(zip(matrix))",
      "power = set(sum(*matrix))",
      "power = set(sum(matrix))"
    ],
    answer: 0,
    explanation: "zip(*matrix)はmatrixを転置する。*matrixで各行がアンパックされ、zipで列ごとにまとめられる。list()でリストに変換すると[(1,4,8),(3,9,27),(5,25,125)]となる。"
  },
  {
    text: "次の実行結果を得たい場合に、コード1行目〜5行目を代替するものとして正しいものはどれか。\n実行結果: [(1, 3), (1, 2), (1, 5), (2, 3), (2, 5), (3, 2), (3, 5)]\n\ncombs = []\nfor x in [1,2,3]:\n    for y in [3,2,5]:\n        if x != y:\n            combs.append((x, y))\nprint(combs)",
    options: [
      "combs = [(a,b) in a for [1,2,3] in b for [3,2,5] if a != b]",
      "combs = [[a,b] for a in [3,2,5] for b in [1,2,3] if a == b]",
      "combs = [(a,b) for list[1,2,3] for list[3,2,5] if a != b]",
      "combs = [(a,b) for a in [1,2,3] for b in [3,2,5] if a != b]",
      "combs = [[a,b] in a for [1,2,3] in b for [3,2,5] if a == b]"
    ],
    answer: 3,
    explanation: "入れ子ループのリスト内包表記。aが[1,2,3]、bが[3,2,5]で、a!=bの条件を満たす(a,b)のペアを収集する。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\nlist = [-10, 1, 15, 20, 30]\nlist.append(50)\nlist.sort(reverse = True)\nlist.insert(2,5)\nlist.pop(-1)\nprint(list)",
    options: [
      "[50, 2, 30, 20, 15, 1]",
      "[50, 30, 20, 15, 1, -10]",
      "[50, 30, 5, 20, 15, 1]",
      "[-10, 1, 5, 15, 20, 30]",
      "[30, 20, 15, 5, 1, -10]"
    ],
    answer: 2,
    explanation: "append→[-10,1,15,20,30,50]、sort(reverse=True)→[50,30,20,15,1,-10]、insert(2,5)→[50,30,5,20,15,1,-10]、pop(-1)で-10を削除→[50,30,5,20,15,1]。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\nZen = 'FlatIsBetterThanNested'\nprint(Zen[0:20:3])",
    options: [
      "FItTNe",
      "tBtTns",
      "FtBtTnsd",
      "FtBtTns",
      "FItTN"
    ],
    answer: 3,
    explanation: "Zen[0:20:3]はインデックス0,3,6,9,12,15,18の文字を取り出す。F(0),t(3),B(6),t(9),T(12),n(15),s(18)→'FtBtTns'。"
  },
  {
    text: "データ構造に関する次の記述のうち正しいものはどれか。",
    options: [
      "ディクショナリに対する帰属性判定演算子「in」「not in」による判定において、「含まれるかどうか」の判定の対象は「キー」ではなく「値」である。",
      "「set = {} 」において{}は空集合を生成する式であり、{}は空辞書を生成することはできない。",
      "リストとタプルは変更可能（mutable）、集合は変更不能（immutable）である。",
      "ディクショナリは変更不能（immutable）であるが、キーの型は変更可能（mutable）であり、その値は一意でなければならない。",
      "リストとタプルは順序を持つ要素の集まりであるという共通点がある。"
    ],
    answer: 4,
    explanation: "リストとタプルはどちらも順序付きのシーケンス型。A:inはキーを判定する、B:{}は空辞書、空集合はset()、C:タプルはimmutable・集合はmutable、D:ディクショナリはmutable・キーはimmutableである必要がある。"
  },
  {
    text: "対話モードで入力したときに「True」が返されるものは次のうちどれか。",
    options: [
      "(-1, -10, -3, -4) > (-1, -2, -5)",
      "1 > -1 == (1-2)",
      "(1, 2) > (1, 2, -1)",
      "'Matplotlib' > 'NumPy' > 'pandas' > 'scikit-learn'",
      "('bb', 'c') > ('bcd', 'a')"
    ],
    answer: 1,
    explanation: "Pythonの連鎖比較: 1>-1はTrue、-1==(1-2)=-1はTrue。よってTrueandTrue=True。A:(-10>-2)でFalse、C:短い方が小さくFalse、D:M<NでFalse、E:'bb'<'bcd'でFalse。"
  },
  {
    text: "モジュールに関する次の記述のうち、誤っているものはどれか。",
    options: [
      "パッケージとは、「ドット区切モジュール名」を使って、Pythonのモジュールを構築する方法である。",
      "あるモジュールがインポートされるときにインタープリタが検索する順序は、まずビルトインモジュール、次にsys.path変数で得られるディレクトリである。シンボリックリンクを置いてあるディレクトリはモジュール検索パスに入らない。",
      "sys.pathが初期化されている場所は、入力スクリプトのあるディレクトリ、PYTHONPATHであり、インストールごとのデフォルトは含まれない。",
      "Pythonはソースファイルの最終更新日時をコンパイル済みのバージョンと比較し、再コンパイルが必要か判断する。これは完全に自動的に行われる。",
      "コンパイル済みのモジュールはプラットフォーム非依存なので、ひとつのライブラリを異なるアーキテクチャのシステム間で共有できる。"
    ],
    answer: 2,
    explanation: "sys.pathはスクリプトのディレクトリ、PYTHONPATHに加え、インストールごとのデフォルトも含まれる。「インストールごとのデフォルトは含まれない」が誤り。"
  },
  {
    text: "モジュールが定義している名前を対話モードで確認したい。次のコードの２行目【A】に入るものとして正しいものはどれか。\nimport sys\n【A】",
    options: [
      "mod(systems)",
      "mod(sys)",
      "mod()",
      "dir(mod)",
      "dir(sys)"
    ],
    answer: 4,
    explanation: "dir()関数はモジュールが定義している名前のリストを返す。引数にモジュール名を渡す。この場合はdir(sys)。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\nimport math\nprint('{1:.5f}, {0:.3f}'.format(math.pi, math.e))",
    options: [
      "3.142, 2.71828",
      "3.14159, 2.718",
      "2.71828, 3.142",
      "2.718, 3.14159",
      "1:3.14159f, 0:2.718f"
    ],
    answer: 2,
    explanation: "{1}はmath.e(≈2.71828)を5桁小数で、{0}はmath.pi(≈3.14159)を3桁小数で表示。よって「2.71828, 3.142」。"
  },
  {
    text: "次のコードを実行して「整数a:」に「3」、「整数b:」に「0」を入力した場合の正しい結果はどれか。\ntry:\n    int_a = int(input('整数a:'))\n    int_b = int(input('整数b:'))\n    print(int_a ** 3)\n    print((int_a ** 3) / int_b)\nexcept(ZeroDivisionError):\n    print('C')\nexcept(ValueError) as v:\n    print(type(v))\n    print('D')\nexcept:\n    print('E')\nelse:\n    print('F')\nfinally:\n    print('G')",
    options: [
      "27, 0, C, E, F, G",
      "27, 0, C, F, G",
      "27, C, E, F, G",
      "27, F, G",
      "27, C, G"
    ],
    answer: 4,
    explanation: "int_a=3, int_b=0。27を出力後、3**3/0でZeroDivisionError発生→'C'出力。elseはスキップ、finallyは必ず実行→'G'出力。結果は「27, C, G」。"
  },
  {
    text: "エラーと例外に関する次の記述のうち誤っているものはどれか。",
    options: [
      "raise文を用いることで、指定の例外を意図的に発生させることができる。raiseの引数は例外インスタンスでも、Exceptionクラスの派生クラスでも構わない。",
      "発生した例外に値が付随することもあり、これを例外の引数と呼ぶ。except節では、例外名の後に変数を指定することができ、この変数はinstance.argsに例外インスタンス生成時の引数が格納される。",
      "[Ctrl]+[C]キーなどでユーザーがプログラムに割り込みをかけると、KeyError例外が送出される。",
      "パーサ（構文解釈器）は違反のある行を表示し、最初にエラーが検知された点を小さな矢印で示す。エラーは矢印より前のトークンが原因である。",
      "例外のほとんどはプログラムでは処理されず、その結果はエラーメッセージにあらわれる。エラーメッセージの最終行には例外の型が記されている。"
    ],
    answer: 2,
    explanation: "[Ctrl]+[C]の割り込みで発生するのはKeyboardInterrupt例外であり、KeyErrorではない。KeyErrorはディクショナリで存在しないキーを参照したときに発生する。"
  },
  {
    text: "次のコードを実行した場合には適切な方法で、あるクリーンアップがなされる。具体的にはどのような処理がなされているか。\nwith open('file.txt') as f:\n    for line in f:\n        print(line, end='')",
    options: [
      "close('file.txt')",
      "file.close()",
      "file.clean()",
      "f.close()",
      "f.clean()"
    ],
    answer: 3,
    explanation: "with文を使うと、ブロックを抜けた際に自動的にf.close()が呼ばれる。これはコンテキストマネージャの機能で、例外が発生した場合でもクリーンアップが保証される。"
  },
  {
    text: "次の実行結果を得たい場合、コードの【A】【B】【C】【D】に入る組み合わせとして適切なものはどれか。\n実行結果:\nDavid is a\nstrategic\nAI\n\nclass wexal(Exception):\n    pass\nname = 'David'\ndef func(name: int):\n    try:\n        if name != 0:\n            raise_his_character(name)\n    except wexal:\n        print('【A】')\n        raise Exception\ndef raise_his_character(a):\n    print(a, '【B】')\n    raise wexal\n    print('【C】')\ntry:\n    func(name)\nexcept Exception:\n    print('【D】')",
    options: [
      "【A】strategic　【B】is a　【C】naughty boy　【D】AI",
      "【A】is a　【B】strategic　【C】naughty boy　【D】AI",
      "【A】strategic　【B】is a　【C】AI　【D】naughty boy",
      "【A】naughty boy　【B】is a　【C】strategic　【D】AI",
      "【A】AI　【B】strategic　【C】is a　【D】naughty boy"
    ],
    answer: 0,
    explanation: "raise_his_character('David')でprint(a,'【B】')→「David is a」、wexal送出→funcのexceptでprint('【A】')→「strategic」、Exception送出→外のexceptでprint('【D】')→「AI」。【C】は到達しない。"
  },
  {
    text: "次のコードの実行結果として正しいものはどれか。\ndef scope():\n    loc = 'init'\n    def do_local():\n        loc = 'local'\n    def do_nonlocal():\n        nonlocal loc\n        loc = 'nonlocal'\n    def do_global():\n        global loc\n        loc = 'global'\n    do_local()\n    print('A:', loc)\n    do_nonlocal()\n    print('B:', loc)\n    do_global()\n    print('C:', loc)\nscope()\nprint('D:', loc)",
    options: [
      "A: init　B: local　C: nonlocal　D: global",
      "A: init　B: nonlocal　C: nonlocal　D: global",
      "A: init　B: local　C: global　D: global",
      "A: local　B: nonlocal　C: global　D: global",
      "A: local　B: nonlocal　C: nonlocal　D: global"
    ],
    answer: 1,
    explanation: "do_local()はlocal変数を作るだけ→A:init。do_nonlocal()はscope()のlocを変更→B:nonlocal。do_global()はグローバルlocを変更するがscope()のlocには影響なし→C:nonlocal。D:グローバルlocはglobal。"
  },
  {
    text: "次の実行結果を得たい場合、コードの【A】【B】の行および【C】に入る組み合わせとして適切なものはどれか。\n実行結果:\nNeed Speed?\nI'm Saya.\nNeed Speed?\nI'm David.\n\nclass kusanagi():\n    def s(self):\n        print('Need Speed?')\n        【A】\n    def m(self):\n        print('I\\'m Saya.')\nclass wexal(kusanagi):\n    def 【B】:\n        print('I\\'m David.')\nk = kusanagi()\nw = wexal()\nk.s()\nw.【C】",
    options: [
      "【A】self.m()　【B】m(self):　【C】s()",
      "【A】self.m()　【B】self(m):　【C】s()",
      "【A】self(m)　【B】m(self):　【C】s()",
      "【A】self(m)　【B】self(m):　【C】s(self)",
      "【A】self.s()　【B】m(self):　【C】s(self)"
    ],
    answer: 0,
    explanation: "kusanagi.s()はself.m()を呼ぶ。wexalはm()をオーバーライドして'I'm David.'を出力。w.s()で継承したs()が呼ばれ、self.m()でwexal.m()が実行される。"
  },
  {
    text: "コマンドライン上で「python3 script.py one two three four five」を実行したときに、以下の結果を得たい。コード２行目の【A】に入るものとして正しいものはどれか。\n実行結果: ['script.py', 'one', 'two']\n\nimport sys\nprint(【A】)",
    options: [
      "sys.argv[0:2]",
      "sys.argv[0:3]",
      "sys.argv[1:3]",
      "sys.args[1:3]",
      "sys.args[1:4]"
    ],
    answer: 1,
    explanation: "sys.argv=['script.py','one','two','three','four','five']。[0:3]でインデックス0,1,2の3要素['script.py','one','two']を取得。sys.argsは存在しない。"
  },
  {
    text: "次の正規表現を用いたコードの【A】の部分に入れたときエラーとなるものはどれか。\nimport re\nprog = re.compile('(K|S)u(r|s)(a|o)nf?(a|o)(o|m)?g?i?(saya)?', re.IGNORECASE)\n【A】\nprint(ret[0])",
    options: [
      "ret = prog.search('KUSANAGI')",
      "ret = prog.search('Kuronami')",
      "ret = prog.search('kurofune')",
      "ret = prog.search('SUSANOO')",
      "ret = prog.search('kusanomi')"
    ],
    answer: 2,
    explanation: "kurofuneはパターンと一致しない（'n'が来るべき位置に'f'がある）ためsearch()がNoneを返す。ret[0]でTypeError発生。他の選択肢はすべてパターンにマッチする。"
  },
  {
    text: "対話モードでrandomモジュールを用い以下のような各結果を得たい場合、各コード【A】〜【C】に入る正しい組み合わせはどれか。\n>>> import random\n>>> random.【A】(['apple', 'pear', 'banana'])\n'apple'\n>>> random.【B】(range(10),3)\n[3, 7, 5]\n>>> random.【C】(5)\n4",
    options: [
      "【A】choice 【B】random 【C】rand",
      "【A】choice 【B】sample 【C】rand",
      "【A】choice 【B】sample 【C】randrange",
      "【A】sample 【B】choice 【C】rand",
      "【A】sample 【B】random 【C】randrange"
    ],
    answer: 2,
    explanation: "choice()はシーケンスから1要素をランダムに選択。sample()はシーケンスからk個を重複なく選択。randrange()は範囲内の整数をランダムに返す。"
  },
  {
    text: "今日の日付を次の実行結果のように得たい場合、コードの1行目【A】と2行目の【B】に入る適切なものはどれか。\n実行結果: 2020-06-27\n\n【A】\nnow = 【B】\nprint(now)",
    options: [
      "【A】import date 【B】datetime.date(today)",
      "【A】from date 【B】datetime.today()",
      "【A】import datetime from date 【B】datetime.today()",
      "【A】from datetime import date　【B】date.today()",
      "【A】import date from datetime 【B】datetime.today()"
    ],
    answer: 3,
    explanation: "datetimeモジュールからdateクラスをインポートし、date.today()で今日の日付を取得する。「from datetime import date」が正しいインポート方法。"
  },
  {
    text: "loggingモジュールのメッセージの優先度として正しいものはどれか。左から順に優先度が低いものとする。",
    options: [
      "DEBUG、INFO、WARNING、ERROR、CRITICAL",
      "INFO、DEBUG、WARNING、ERROR、CRITICAL",
      "DEBUG、INFO、ERROR、WARNING、CRITICAL",
      "INFO、DEBUG、ERROR、CRITICAL、WARNING",
      "DEBUG、INFO、CRITICAL、ERROR、WARNING"
    ],
    answer: 0,
    explanation: "Pythonのloggingモジュールの優先度（低→高）: DEBUG(10)、INFO(20)、WARNING(30)、ERROR(40)、CRITICAL(50)。"
  },
  {
    text: "仮想環境とパッケージに関する次の記述のうち誤っているものはどれか。",
    options: [
      "pip install でパッケージ名を指定し、そのパッケージ名の後ろに==とバージョン名を付けると、そのバージョンのパッケージをインストールできる。",
      "pip install --upgradeとすることで、当該パッケージを最新バージョンにアップグレードすることができる。",
      "「pip list パッケージ名」で、ある特定のパッケージの詳細情報が表示される。",
      "pip uninstall にパッケージ名を指定すると、その仮想環境からパッケージを削除できる。削除対象となるパッケージの複数指定も可能である。",
      "pip freezeはその仮想環境にインストールされたすべてのパッケージを、pip install向けの形式で出力する。"
    ],
    answer: 2,
    explanation: "特定パッケージの詳細情報を表示するコマンドは「pip show パッケージ名」。「pip list」は全パッケージの一覧表示で、パッケージ名の引数は取らない。"
  },
  {
    text: "次の記述に関して誤っているものはどれか。",
    options: [
      "デフォルト設定ではユーザーディレクトリの「.python_history」ファイルにヒストリが保存される。ヒストリは対話型インタープリタセッションで利用できる。",
      "[Tab]キーを押すと補完機能が呼び出せる。この機能はPythonの文（命令）の名前、現在のローカル変数、使用できるモジュール名を検索するものである。",
      "拡張された対話型インタープリタとしてbpythonがある。これはタブ補完、オブジェクト探索、高度なヒストリ管理などの機能を持つ。",
      "bpythonに類似した拡張対話環境にIPythonがある。IPythonは「pip install ipython」でインストールでき、IPythonの対話モードはipythonコマンドで起動できる。",
      "変数とモジュールの補完機能は、インタープリタの起動時には有効になっていないため設定が必要である。"
    ],
    answer: 4,
    explanation: "Python 3の対話型インタープリタでは、タブ補完機能はデフォルトで有効になっている。別途設定は不要。"
  }
];
