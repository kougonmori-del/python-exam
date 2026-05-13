// ExamApp 基礎・上級より
// 出典: https://python-basic.com/exam3/
const ADVANCED_QUESTIONS = [
  {
    text: "Pythonに関する説明として、誤っているものはどれか。",
    options: [
      "Pythonには、デスクトップ用のアプリを作る機能は用意されていない。",
      "Pythonのリストやdictはイテラブルであり、for文やin演算子で一貫して扱える。",
      "Pythonは、ソースコードを自動的にバイトコードに変換し、それをインタープリタが実行する。",
      "PythonはC言語に比べて処理に時間がかかることがある。"
    ],
    answer: 0,
    explanation: "PythonにはTkinter、PyQt、Kivyなどのフレームワークがあり、デスクトップアプリを作ることができる。よってこの説明は誤り。"
  },
  {
    text: "文字エンコーディングに関する説明で、誤っているものはどれか。",
    options: [
      "UTF-8は可変長の文字エンコーディングであり、1文字あたりのバイト数は一定ではない。",
      "Unicodeは、文字をコンピュータで扱うためのバイト列である。",
      "同じ文字でも、異なる文字エンコーディングで保存するとバイト列は異なる。",
      "誤った文字エンコーディングで読み込むと、文字化けやエラーが発生することがある。"
    ],
    answer: 1,
    explanation: "Unicodeはバイト列ではなく、文字とコードポイントのマッピングを定義する規格。実際のバイト列への変換はUTF-8などのエンコーディングが担う。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\na = 1\nb = 2\nb, c = a + 3, b + 1\nd = 1 + b ** 2\ne = d - 8 / 2\nf = e % 3\nprint(d)\nprint(e)\nprint(f)",
    options: [
      "9 / 5.0 / 1",
      "7 / 4 / 1.0",
      "17 / 13 / 1",
      "17 / 13.0 / 1.0"
    ],
    answer: 3,
    explanation: "a=1,b=2 → b=a+3=4, c=b+1=3 → d=1+4**2=17 → e=17-8/2=17-4.0=13.0（/は浮動小数点除算）→ f=13.0%3=1.0（float%intはfloat）。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nprint('Process started.\\\\n' + 'Waiting for \\'input\\'...')",
    options: [
      "SyntaxErrorになる。",
      "Process started. の後に改行されてWaiting for 'input'... が表示される。",
      "Process started.\\nWaiting for 'input'...",
      "Process started.\\\\nWaiting for input..."
    ],
    answer: 2,
    explanation: "\\\\nはバックスラッシュ1文字＋nとして扱われ改行にはならない。\\'はシングルクォートを表す。出力はProcess started.\\nWaiting for 'input'...（\\nは文字通りのバックスラッシュ+n）。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nlog = 'WARNING|DiskFull'\npos = log.index('|')\nlevel = log[:pos]\nmessage = log[pos+1:]\nprint(level)\nprint(message)",
    options: [
      "DiskFull / WARNING",
      "WARNING| / DiskFull",
      "WARNING / |DiskFull",
      "WARNING / DiskFull"
    ],
    answer: 3,
    explanation: "index('|')は|の位置（7）を返す。log[:7]はWARNING、log[8:]はDiskFull（|は含まない）。WARNINGとDiskFullが順に出力される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nitems = [['apple', 100], ['banana', 80]]\nfor item in items:\n    if item[0] == 'banana':\n        item[1] -= 20\nprint(items[1][1])",
    options: [
      "banana",
      "100",
      "80",
      "60"
    ],
    answer: 3,
    explanation: "bananaを見つけたとき item[1] -= 20 で80から20引かれて60になる。items[1][1]はbananaエントリの価格（60）を参照する。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\na, b = 1, 3\nwhile a < 5:\n    print(a)\n    a, b = b, a + b",
    options: [
      "1 / 3 / 4",
      "1 / 2 / 4",
      "1 / 3 / 5",
      "1 / 3 / 4 / 7"
    ],
    answer: 0,
    explanation: "a=1→print(1)→a=3,b=4。a=3→print(3)→a=4,b=7。a=4→print(4)→a=7,b=11。a=7で5以上のためループ終了。出力: 1, 3, 4。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nids = [1001, 1002, 1003]\nfor i, v in enumerate(ids):\n    if i != 0:\n        print(',', end='')\n    print(v, end='')",
    options: [
      "1001, / 1002, / 1003",
      "1001,1002,1003",
      ",1001,1002,1003",
      "1001 1002 1003"
    ],
    answer: 1,
    explanation: "i=0のときカンマなしで1001を出力。i=1,2のとき先にカンマを出力してから値を出力。end=''で改行なし。結果: 1001,1002,1003が1行に表示される。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nuser_ids = ['A001', 'A002', 'A003']\nfor i in range(len(user_ids)):\n    i += 1\n    print(i, user_ids[i])",
    options: [
      "0 A001 / 1 A002 / 2 A003",
      "1 A001 / 2 A002 / 3 A003",
      "1 A002 / 2 A003 / エラー",
      "1 A001 / 2 A002 / エラー"
    ],
    answer: 2,
    explanation: "i=0→i+=1でi=1→user_ids[1]=A002を表示。i=1→i=2→A003を表示。i=2→i=3→user_ids[3]は範囲外でIndexErrorが発生する。"
  },
  {
    text: "次のコードを実行した結果として、正しいものはどれか。\nresult = 'error'\nfor count in range(3):\n    try:\n        if result != 'ok':\n            raise Exception()\n    except Exception:\n        print('リトライ')\n    else:\n        print('通信成功')\n        break\nelse:\n    print('リトライ3回失敗')",
    options: [
      "「リトライ」が3回表示された後、「リトライ3回失敗」が表示される。",
      "「通信成功」が1回表示された後、ループが終了する。",
      "「リトライ」が3回表示された後、「通信成功」が表示される。",
      "「リトライ3回失敗」のみ表示される。"
    ],
    answer: 0,
    explanation: "resultが'error'のままなので毎回例外が発生し「リトライ」が3回出力される。breakが実行されないためfor-else節の「リトライ3回失敗」も表示される。"
  },
  {
    text: "関数に定義されたdocstringの説明として、正しいものはどれか。",
    options: [
      "docstringはコメントと同様に無視され、実行中に取得することはできない。",
      "docstringはユーザー定義の関数のみに存在し、組み込み関数には存在しない。",
      "docstringは、関数オブジェクトの__doc__属性として保持されている。",
      "docstringを取得するには、関数名に対してdoc()関数を呼び出す。"
    ],
    answer: 2,
    explanation: "docstringは関数オブジェクトの__doc__属性としてランタイムでアクセス可能。help()でも参照できる。コメントと異なり実行時に取得できる。"
  },
  {
    text: "引数に関して、エラーにならないものはどれか。",
    options: [
      "def func(a, b, c): を func(1, 2, 3, 4) と呼び出す。",
      "def func(a, b, c): を func(1, c=3, b=2) と呼び出す。",
      "def func(a, b, c): を func(a=1, b=2, d=4) と呼び出す。",
      "def func(a=1, b, c=3): と定義する。"
    ],
    answer: 1,
    explanation: "func(1, c=3, b=2)は位置引数1とキーワード引数b,cで全引数を正しく渡している。引数の数と名前が合致するためエラーにならない。他の選択肢はいずれもエラーになる。"
  }
];
