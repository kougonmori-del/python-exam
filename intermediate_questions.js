// ExamApp 基礎・中級より
// 出典: https://python-basic.com/exam2/
const INTERMEDIATE_QUESTIONS = [
  {
    text: "Pythonの特徴に関する説明で、誤っているものはどれか。",
    options: [
      "Pythonのプログラムはモジュールに分割して再利用できる。",
      "PythonのプログラムはC言語に比べて短く書ける。",
      "Pythonで変数を作成するには変数宣言キーワードが必要。",
      "Pythonはインタープリタ言語であり、手動でコンパイルする必要がない。"
    ],
    answer: 2,
    explanation: "Pythonでは変数宣言キーワードは不要。変数は代入によって自動的に作成される。これはPythonの大きな特徴の一つ。"
  },
  {
    text: "Pythonのインタープリタで次のコードを実行した場合、表示される結果として正しいものはどれか。\n>>> a = 10",
    options: [
      "a",
      "10",
      "何も表示されない。",
      "エラーが表示される。"
    ],
    answer: 2,
    explanation: "変数への代入文は何も出力しない。インタープリタは代入の結果を自動的に表示しない。式を評価した場合のみ結果が表示される。"
  },
  {
    text: "数値計算の結果で、誤っているものはどれか。",
    options: [
      "7 // 2 は 3",
      "10 % 3 は 1",
      "5 + 2.0 は 7",
      "2 + 3 * 4 は 14"
    ],
    answer: 2,
    explanation: "5 + 2.0 の結果は整数の7ではなく浮動小数点数の7.0になる。整数と浮動小数点数の演算結果は浮動小数点数型になる。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nsample = 'Apple'\nprint(sample[5])",
    options: [
      "e",
      "エラーになる。",
      "5",
      "A"
    ],
    answer: 1,
    explanation: "'Apple'のインデックスは0〜4（5文字）。インデックス5は範囲外のためIndexErrorが発生する。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nprint(r'C:\\users\\new')",
    options: [
      "エラーになる。",
      "C:\\users の後に改行されてewが表示される。",
      "C:usersnew",
      "C:\\users\\new"
    ],
    answer: 3,
    explanation: "r'...'はraw文字列リテラルでバックスラッシュをエスケープ文字として扱わない。バックスラッシュはそのまま文字として扱われ、C:\\users\\new と表示される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nprint('a' 'b' + 'c')",
    options: [
      "エラーになる。",
      "bc",
      "abc",
      "ab"
    ],
    answer: 2,
    explanation: "隣接する文字列リテラルは自動的に連結される。'a' 'b' は 'ab' になり、+ 'c' で 'abc' になる。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nnums = [1, 2, 3]\nnums[-1] = 4\nprint(nums)",
    options: [
      "[1, 2, 4]",
      "[1, 2, 3, 4]",
      "[4]",
      "エラーになる。"
    ],
    answer: 0,
    explanation: "インデックス-1はリストの最後の要素を指す。nums[-1] = 4 でインデックス2の値（3）が4に書き換えられ、[1, 2, 4] になる。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nnums = [1, 2, 3]\nnums.append(4, 5)\nprint(nums)",
    options: [
      "[1, 2, 3, 4, 5]",
      "[1, 2, 3, [4, 5]]",
      "[1, 2, 3]",
      "エラーになる。"
    ],
    answer: 3,
    explanation: "append()メソッドは引数を1つしか受け取れない。2つの引数を渡すとTypeErrorが発生する。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nx = 10\nif x == 10:\n    print('A')\n    if x <= 10:\n        print('B')\n        if x > 10:\n            print('C')\n            if x >= 10:\n                print('D')\nprint('E')",
    options: [
      "エラーになる。",
      "A / E",
      "A / B / E",
      "A / B / D / E"
    ],
    answer: 2,
    explanation: "x=10: x==10はTrue→A出力。x<=10はTrue→B出力。x>10はFalse→Cは実行されずDも実行されない。print('E')は条件に関係なく実行される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nfruits = ['apple', 'banana']\ndrinks = ['coffee', 'tea']\nfor fruit in fruits:\n    print(fruit)\n    for drink in drinks:\n        print(drink)",
    options: [
      "apple / coffee / tea / banana / coffee / tea",
      "apple / coffee / banana / tea",
      "apple / banana / coffee / tea",
      "apple / banana / coffee / tea / apple / banana / coffee / tea"
    ],
    answer: 0,
    explanation: "外側のループがfruitを1つ取り出すたびに、内側のループでdrinks全体を繰り返す。apple→coffee→tea→banana→coffee→teaの順に出力される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\ntotal_pages = 7\nfor page in range(1, total_pages + 1, 2):\n    print(f'{page}ページ')",
    options: [
      "1ページ / 2ページ / 3ページ / 4ページ / 5ページ / 6ページ",
      "2ページ / 4ページ / 6ページ",
      "1ページ / 3ページ / 5ページ",
      "1ページ / 3ページ / 5ページ / 7ページ"
    ],
    answer: 3,
    explanation: "range(1, 8, 2)は1, 3, 5, 7を生成する（1から8未満まで2ずつ増加）。7も含まれるため4つ出力される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nfor i in range(3):\n    if i == 1:\n        continue\n    for j in range(3):\n        if j == 1:\n            break\n        print(i, j)",
    options: [
      "0 0 / 2 0",
      "0 0",
      "0 0 / 1 0 / 2 0",
      "0 0 / 0 1 / 1 0 / 1 1 / 2 0 / 2 1"
    ],
    answer: 0,
    explanation: "i=1のときcontinueで外側ループをスキップ。i=0とi=2のとき、内側ループはj=0で出力しj=1でbreak。結果：0 0と2 0が出力される。"
  },
  {
    text: "Pythonのスコープに関する説明で、誤っているものはどれか。",
    options: [
      "for文内で定義した変数はfor文の外からも参照できる。",
      "if文内で定義した変数はif文の外からも参照できる。",
      "関数内で定義した変数は関数の外からも参照できる。",
      "グローバル変数はfor文、if文、関数の中からも参照できる。"
    ],
    answer: 2,
    explanation: "関数内で定義した変数はローカルスコープを持ち、関数の外からは参照できない。for文やif文内の変数は外からもアクセスできる（Pythonはブロックスコープを持たない）。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\ndef calc(x, y=5):\n    print(x + y)\n\ncalc(3)\ncalc(3, 10)",
    options: [
      "3 / 13",
      "8 / 13",
      "8 / 8",
      "エラーになる。"
    ],
    answer: 1,
    explanation: "calc(3)はy=5（デフォルト値）なので3+5=8を出力。calc(3, 10)はy=10なので3+10=13を出力。8と13が順に出力される。"
  }
];
