// ExamApp 基礎・初級より
// 出典: https://python-basic.com/exam1/
const BEGINNER_QUESTIONS = [
  {
    text: "Pythonの特徴に関する説明で、誤っているものはどれか。",
    options: [
      "Windows、Mac、Linuxで使える。",
      "手動でコンパイルする必要がない。",
      "文のグルーピングはカッコで囲う。",
      "インタープリタは対話的に使うことができる。"
    ],
    answer: 2,
    explanation: "Pythonでは文のグルーピングはカッコではなくインデント（字下げ）で行う。これはPythonの大きな特徴の一つ。"
  },
  {
    text: "Pythonに関する説明で、誤っているものはどれか。",
    options: [
      "インタープリタはend()で終了する。",
      "インタープリタでコマンド入力を促すプロンプトを、プライマリプロンプトとセカンダリプロンプトと言う。",
      "デフォルトでは、PythonのソースコードはUTF-8として扱われる。",
      "デフォルト以外のエンコーディングを使うことができる。"
    ],
    answer: 0,
    explanation: "インタープリタを終了するにはexit()またはquit()を使う。end()という関数は存在しない。"
  },
  {
    text: "次のコードで、コメントとして扱われないものはどれか。\n# A\nnum = 1  # B\n        # C\ntext = 'Hello # D'",
    options: [
      "# A",
      "# B",
      "# C",
      "# D"
    ],
    answer: 3,
    explanation: "文字列リテラルの中に含まれる#はコメントとして扱われない。「# D」はシングルクォートで囲まれた文字列の一部なので文字データ。"
  },
  {
    text: "Pythonの文字列に関する説明で、誤っているものはどれか。",
    options: [
      "文字列は+演算子で連結できる。",
      "文字列はインデックス番号による指定ができる。",
      "文字列を複数行にわたって書く場合は、トリプルクォーテーションで囲う。",
      "文字列はミュータブルであり、内容を変更できる。"
    ],
    answer: 3,
    explanation: "文字列はイミュータブル（変更不可）。一度作成した文字列の内容を直接変更することはできない。変更が必要な場合は新しい文字列を生成する。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nsample = 'Pen' + 2 * 'Pine' + 'Apple'\nprint(sample)",
    options: [
      "エラーになる。",
      "PenPinePineApple",
      "PenPenPineApple",
      "Pen2PineApple"
    ],
    answer: 1,
    explanation: "2 * 'Pine' は 'PinePine'。'Pen' + 'PinePine' + 'Apple' = 'PenPinePineApple'。文字列と整数の*演算は繰り返しを表す。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nsample = 'apple'\nprint(len(sample))",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    answer: 2,
    explanation: "len()関数は文字列の長さ（文字数）を返す。'apple'はa,p,p,l,eの5文字。"
  },
  {
    text: "Pythonのリストに関する説明で、正しいものはどれか。",
    options: [
      "リストは波カッコ{}を使って作成する。",
      "リストの要素はインデックス番号を使ってアクセスできる。",
      "リストは異なるデータ型の値を同時に格納することはできない。",
      "リストは一度作成すると、要素を変更することができない。"
    ],
    answer: 1,
    explanation: "リストは角括弧[]で作成し、インデックスでアクセスできる。異なるデータ型の混在も可能で、ミュータブル（変更可能）。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nsample = [1, 2, 3, 4, 5]\nprint(sample[1:4])",
    options: [
      "[1, 2, 3]",
      "[1, 2, 3, 4, 5]",
      "[2, 3, 4]",
      "[3, 4, 5]"
    ],
    answer: 2,
    explanation: "スライス[1:4]はインデックス1から3までの要素を取得する（4は含まない）。インデックス1=2、2=3、3=4なので[2, 3, 4]。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nx = 10\nif x == 1:\n    print('A')\nelif x < 10:\n    print('B')\nelse:\n    print('C')",
    options: [
      "エラーになる。",
      "C",
      "B",
      "A"
    ],
    answer: 1,
    explanation: "x=10なので、x==1はFalse、x<10もFalse、よってelseブロックが実行されCが出力される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nwords = ['pine', 'apple', 'pen']\nfor word in words:\n    print(word)",
    options: [
      "pine が3回出力される。",
      "pine / apple / pen が1行ずつ出力される。",
      "['pine', 'apple', 'pen'] が3回出力される。",
      "エラーになる。"
    ],
    answer: 1,
    explanation: "for文でリストの各要素を順番に取り出してprintするため、pine、apple、penが1行ずつ出力される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nfor count in range(3):\n    print(count)",
    options: [
      "0 / 1 / 2 / 3",
      "0 / 2",
      "0 / 1 / 2",
      "1 / 2 / 3"
    ],
    answer: 2,
    explanation: "range(3)は0, 1, 2の3つの整数を生成する。3は含まれない。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nfor i in range(4):\n    if i == 2:\n        continue\n    print(i)",
    options: [
      "0 / 1",
      "0 / 1 / 2 / 3",
      "0 / 1 / 3",
      "1 / 2 / 4"
    ],
    answer: 2,
    explanation: "continueはその回のループをスキップして次に進む。i=2のときスキップされるため、0、1、3が出力される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\ncount = 0\nwhile count < 3:\n    pass",
    options: [
      "0と1が出力される。",
      "エラーになる。",
      "無限ループになる。",
      "passと表示される。"
    ],
    answer: 2,
    explanation: "countが更新されないためcount<3が常にTrueのまま。pass文は何もしないため、無限ループになる。"
  },
  {
    text: "次のコードの出力結果として、正しいものはどれか。\ndef add_one(arg):\n    result = arg + 1\n    print(result)\nadd_one(1)",
    options: [
      "1",
      "2",
      "result",
      "エラーになる。"
    ],
    answer: 1,
    explanation: "add_one(1)を呼ぶとarg=1、result=1+1=2。print(result)で2が出力される。"
  },
  {
    text: "次のコードの出力結果として、正しいものはどれか。\ndef add_one(arg):\n    return arg + 1\nprint(add_one(1))",
    options: [
      "2",
      "1",
      "エラーになる。",
      "None"
    ],
    answer: 0,
    explanation: "add_one(1)はarg+1=2をreturnする。print()がその戻り値2を受け取って表示する。"
  },
  {
    text: "次のコードの出力結果として、正しいものはどれか。\ndef add(a, b=2):\n    return a + b\nprint(add(1))",
    options: [
      "エラーになる。",
      "3",
      "1, 2",
      "1"
    ],
    answer: 1,
    explanation: "bにはデフォルト値2が設定されているため、add(1)はa=1、b=2として実行される。戻り値は1+2=3。"
  },
  {
    text: "Pythonのデータ構造に関する説明で、誤っているものはどれか。",
    options: [
      "リストは[]で表し、要素の追加・変更・削除ができる。",
      "タプルは()で表し、要素の追加・変更・削除はできない。",
      "辞書は{キー: 値}で表し、値は変更できるが、キーは変更できない。また、同じキーを重複して格納することはできない。",
      "集合は{}で表し、同じ値を重複して格納し、取り出すことができる。"
    ],
    answer: 3,
    explanation: "集合（set）は重複した値を格納できない。同じ値を追加しても1つとして保持される。また要素の変更はできないが追加・削除はできる。"
  }
];
