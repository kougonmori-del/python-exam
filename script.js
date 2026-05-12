const LETTERS = ['A', 'B', 'C', 'D'];
const PASS_RATE = 0.7;

const MOCK_DISTRIBUTION = [
  { id: 1,  count: 1 },
  { id: 2,  count: 1 },
  { id: 3,  count: 6 },
  { id: 4,  count: 9 },
  { id: 5,  count: 7 },
  { id: 6,  count: 2 },
  { id: 7,  count: 1 },
  { id: 8,  count: 4 },
  { id: 9,  count: 2 },
  { id: 10, count: 4 },
  { id: 11, count: 1 },
  { id: 12, count: 1 },
  { id: 14, count: 1 },
];

let state = {
  mode: 'home',
  questions: [],
  currentIndex: 0,
  // answers[i] = 選んだ選択肢の originalIndex（元データでの位置）。null は未回答。
  answers: [],
  revealed: [],
  // shuffledOptions[i] = [{text, originalIndex}, ...] シャッフル済み選択肢配列
  shuffledOptions: [],
  chapterId: null,
  examType: 'chapter',
  timerSec: 0,
  timerInterval: null,
  examFinished: false,
  fromResult: false,
};

// ---- ユーティリティ ----
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 問題ごとに選択肢をシャッフルし、元の位置(originalIndex)を保持する
function generateShuffledOptions(questions) {
  return questions.map(q =>
    shuffle(q.options.map((text, originalIndex) => ({ text, originalIndex })))
  );
}

// ---- 空白の可視化 ----
function makeSpacesVisible(escapedText) {
  return escapedText.replace(/ /g, '<span class="visible-space">_</span>');
}

function buildOptionHtml(text) {
  const hasLeadingSpaces = /^ +/.test(text);
  const hasMultiSpaces   = / {2,}/.test(text);
  if (hasLeadingSpaces || hasMultiSpaces) {
    return `<span class="option-code">${makeSpacesVisible(escapeHtml(text))}</span>`;
  }
  return escapeHtml(text);
}

// ---- 問題文レンダリング ----
const CODE_STARTERS = [
  'print(','def ','for ','if ','while ','try:','class ',
  'x =','s =','i =','lst =','d =','name =','result =',
  'import ','from ','except','else:','elif ','return',
  'del ','with ','raise','assert','a =','b =','n =',
  'num =','obj =','f =','count','square','func','my',
  'animal','dog','cat','data','value','items','keys',
];

function splitTextAndCode(text) {
  const lines = text.split('\n');
  let mainLines = [], codeLines = [], inCode = false;
  for (const line of lines) {
    const stripped = line.trim();
    if (!inCode && (
      CODE_STARTERS.some(s => stripped.startsWith(s)) ||
      line.startsWith('    ') ||
      stripped.startsWith('#')
    )) inCode = true;
    if (inCode) codeLines.push(line); else mainLines.push(line);
  }
  return { mainLines, codeLines };
}

function renderQuestionText(text) {
  const { mainLines, codeLines } = splitTextAndCode(text);
  let html = `<div>${escapeHtml(mainLines.join('\n'))}</div>`;
  if (codeLines.length > 0) {
    html += `<div class="code-block">${escapeHtml(codeLines.join('\n'))}</div>`;
  }
  return html;
}

// ---- Pages ----
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---- Home ----
function renderHome() {
  state.mode = 'home';
  stopTimer();
  showPage('page-home');

  const grid = document.getElementById('chapter-grid');
  grid.innerHTML = '';
  CHAPTERS.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.innerHTML = `
      <div class="chapter-num">第${ch.id}章</div>
      <h3>${ch.title.replace(/^第\d+章 /, '')}</h3>
      <p>${ch.description}</p>
      <div class="chapter-footer">
        <span class="q-count">${ch.questions.length}問</span>
        <span class="rate-badge">出題率 ${ch.rate}%</span>
      </div>
    `;
    card.addEventListener('click', () => startExam(ch.id));
    grid.appendChild(card);
  });
}

// ---- Exam Start ----
function startExam(chapterId) {
  state.chapterId = chapterId;
  state.examType  = 'chapter';
  state.examFinished = false;

  if (chapterId === null) {
    state.questions = CHAPTERS.flatMap(ch =>
      ch.questions.map(q => ({ ...q, chapterTitle: ch.title }))
    );
  } else {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    state.questions = ch.questions.map(q => ({ ...q, chapterTitle: ch.title }));
  }

  initExam(chapterId === null
    ? '全章 練習モード'
    : CHAPTERS.find(c => c.id === chapterId).title
  );
}

function startMockExam() {
  state.chapterId = null;
  state.examType  = 'mock';
  state.examFinished = false;
  state.questions = selectMockQuestions();
  initExam('本番形式 模擬試験（40問）');
}

function startAIExam() {
  state.chapterId = null;
  state.examType  = 'ai';
  state.examFinished = false;
  state.questions = shuffle(AI_QUESTIONS).slice(0, 40).map(q => ({
    ...q, chapterTitle: 'AIオリジナル'
  }));
  initExam('AIオリジナル試験（40問）');
}

function selectMockQuestions() {
  const selected = [];
  for (const { id, count } of MOCK_DISTRIBUTION) {
    const ch = CHAPTERS.find(c => c.id === id);
    if (!ch) continue;
    shuffle(ch.questions)
      .slice(0, Math.min(count, ch.questions.length))
      .forEach(q => selected.push({ ...q, chapterTitle: ch.title }));
  }
  return selected;
}

function initExam(title) {
  state.currentIndex    = 0;
  state.answers         = new Array(state.questions.length).fill(null);
  state.revealed        = new Array(state.questions.length).fill(false);
  state.shuffledOptions = generateShuffledOptions(state.questions);
  state.timerSec        = 0;
  state.mode            = 'exam';
  state.fromResult      = false;

  showPage('page-exam');
  document.getElementById('exam-title').textContent = title;
  startTimer();
  renderQuestion();
}

// ---- Timer ----
function startTimer() {
  stopTimer();
  state.timerSec = 0;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => { state.timerSec++; updateTimerDisplay(); }, 1000);
}

function stopTimer() {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
}

function formatTime(sec) {
  return `${Math.floor(sec/60).toString().padStart(2,'0')}:${(sec%60).toString().padStart(2,'0')}`;
}

function updateTimerDisplay() {
  const el = document.getElementById('timer');
  if (!el) return;
  el.textContent = formatTime(state.timerSec);
  el.className = 'timer';
  if (state.timerSec >= 50 * 60) el.classList.add('danger');
  else if (state.timerSec >= 45 * 60) el.classList.add('warning');
}

// ---- Question Render ----
function renderQuestion() {
  const q        = state.questions[state.currentIndex];
  const idx      = state.currentIndex;
  const total    = state.questions.length;
  const revealed = state.revealed[idx];
  // answers[idx] = 選択済みの originalIndex（null = 未選択）
  const selectedOriginalIndex = state.answers[idx];

  document.getElementById('progress-bar').style.width = `${((idx + 1) / total) * 100}%`;
  document.getElementById('q-counter').textContent    = `問題 ${idx + 1} / ${total}`;
  document.getElementById('q-number').textContent     = `問題 ${idx + 1}`;
  document.getElementById('q-text').innerHTML         = renderQuestionText(q.text);

  // シャッフル済み選択肢でレンダリング
  const shuffled = state.shuffledOptions[idx];
  const optList  = document.getElementById('options-list');
  optList.innerHTML = '';

  shuffled.forEach((opt, j) => {
    // opt.originalIndex と q.answer を比較して正解判定
    const isSelected = selectedOriginalIndex === opt.originalIndex;
    const isCorrect  = q.answer             === opt.originalIndex;

    const li = document.createElement('li');
    li.className = 'option-item';

    if (revealed) {
      if (isCorrect)              li.classList.add('correct');
      else if (isSelected)        li.classList.add('wrong');
    } else if (isSelected) {
      li.classList.add('selected');
    }

    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${j}"
          ${isSelected ? 'checked' : ''} ${revealed ? 'disabled' : ''}>
        <span class="option-letter">${LETTERS[j]}</span>
        <span>${buildOptionHtml(opt.text)}</span>
      </label>
    `;

    // クリック時に originalIndex を保存（シャッフル位置 j ではない）
    if (!revealed) {
      li.querySelector('label').addEventListener('click', () => selectOption(opt.originalIndex));
    }
    optList.appendChild(li);
  });

  const expBox = document.getElementById('explanation');
  expBox.innerHTML = `<div class="ex-label">解説</div>${escapeHtml(q.explanation)}`;
  expBox.classList.toggle('show', revealed);

  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').style.display =
    idx < total - 1 ? 'inline-block' : 'none';
  document.getElementById('btn-finish').style.display =
    (!state.fromResult && idx === total - 1) ? 'inline-block' : 'none';
  document.getElementById('btn-back-result').style.display =
    state.fromResult ? 'inline-block' : 'none';
  document.getElementById('btn-reveal').style.display =
    revealed ? 'none' : 'inline-block';
  document.getElementById('btn-reveal').disabled = selectedOriginalIndex === null;
}

// originalIndex を受け取って保存
function selectOption(originalIndex) {
  if (state.revealed[state.currentIndex]) return;
  state.answers[state.currentIndex] = originalIndex;
  renderQuestion();
}

function revealAnswer() {
  if (state.answers[state.currentIndex] === null) return;
  state.revealed[state.currentIndex] = true;
  renderQuestion();
}

function prevQuestion() {
  if (state.currentIndex > 0) { state.currentIndex--; renderQuestion(); }
}

function nextQuestion() {
  if (state.currentIndex < state.questions.length - 1) { state.currentIndex++; renderQuestion(); }
}

function finishExam() {
  stopTimer();
  state.examFinished = true;
  state.fromResult   = false;
  showResult();
}

// 結果画面から特定の問題へ遷移
function goToQuestion(index) {
  state.fromResult   = true;
  state.currentIndex = index;
  state.revealed     = new Array(state.questions.length).fill(true);
  showPage('page-exam');
  renderQuestion();
}

function backToResult() {
  state.fromResult = false;
  showPage('page-result');
}

// ---- Result ----
function showResult() {
  state.mode = 'result';
  showPage('page-result');

  const questions = state.questions;
  const answers   = state.answers;
  const total     = questions.length;

  // 正解判定: answers[i]（originalIndex）=== q.answer（originalIndex）
  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
  const pct    = Math.round((correctCount / total) * 100);
  const passed = correctCount / total >= PASS_RATE;

  document.getElementById('score-circle').style.setProperty('--pct', pct);
  document.getElementById('score-num').textContent    = correctCount;
  document.getElementById('score-denom').textContent  = `/ ${total}`;
  document.getElementById('result-title').textContent = `正解数 ${correctCount}問 / ${total}問`;
  document.getElementById('result-pct').textContent   = `正解率 ${pct}%`;

  const badge = document.getElementById('pass-badge');
  badge.textContent = passed ? '合格ライン達成！（70%以上）' : '不合格（70%未満）';
  badge.className   = `pass-badge ${passed ? 'pass' : 'fail'}`;
  document.getElementById('result-time').textContent = `所要時間: ${formatTime(state.timerSec)}`;

  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';

  questions.forEach((q, i) => {
    const selectedOriginalIndex = answers[i];
    const isCorrect = selectedOriginalIndex === q.answer;
    const shuffled  = state.shuffledOptions[i];

    // ユーザーが選んだ選択肢のシャッフル位置（表示ラベル A/B/C/D）を求める
    const selectedShuffledPos = shuffled
      ? shuffled.findIndex(o => o.originalIndex === selectedOriginalIndex)
      : -1;
    const correctShuffledPos  = shuffled
      ? shuffled.findIndex(o => o.originalIndex === q.answer)
      : q.answer;

    // 選択肢テキストは元データから取得（内容は不変）
    const selectedText = selectedOriginalIndex !== null ? q.options[selectedOriginalIndex] : null;
    const correctText  = q.options[q.answer];

    const selectedLabel = selectedShuffledPos >= 0 ? LETTERS[selectedShuffledPos] + '. ' : '';
    const correctLabel  = correctShuffledPos  >= 0 ? LETTERS[correctShuffledPos]  + '. ' : '';

    // 問題文（コードブロック含む全文）
    const { mainLines, codeLines } = splitTextAndCode(q.text);
    let qHtml = `<div class="review-q-text">${i + 1}. ${escapeHtml(mainLines.join('\n'))}</div>`;
    if (codeLines.length > 0) {
      qHtml += `<div class="code-block" style="font-size:12px;padding:10px 14px;margin:8px 0;">${escapeHtml(codeLines.join('\n'))}</div>`;
    }

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'correct-item' : 'wrong-item'}`;
    item.style.cursor = 'pointer';
    item.title = 'クリックして問題を確認';

    item.innerHTML = `
      ${qHtml}
      <div class="review-nav-hint">🔍 クリックして問題に移動</div>
      <div class="review-answer">
        あなたの回答:
        <span class="${isCorrect ? 'correct-ans' : 'wrong-ans'}">
          ${selectedText !== null
            ? escapeHtml(selectedLabel + selectedText)
            : '未回答'}
        </span>
      </div>
      ${!isCorrect
        ? `<div class="review-answer">正解:
             <span class="correct-ans">${escapeHtml(correctLabel + correctText)}</span>
           </div>`
        : ''}
      <div class="review-explanation">${escapeHtml(q.explanation)}</div>
    `;

    item.addEventListener('click', () => goToQuestion(i));
    reviewList.appendChild(item);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderHome();

  document.getElementById('logo-link').addEventListener('click', renderHome);
  document.getElementById('btn-all').addEventListener('click', () => startExam(null));
  document.getElementById('btn-mock').addEventListener('click', startMockExam);
  document.getElementById('btn-ai').addEventListener('click', startAIExam);
  document.getElementById('btn-prev').addEventListener('click', prevQuestion);
  document.getElementById('btn-next').addEventListener('click', nextQuestion);
  document.getElementById('btn-reveal').addEventListener('click', revealAnswer);
  document.getElementById('btn-finish').addEventListener('click', finishExam);
  document.getElementById('btn-back-home').addEventListener('click', renderHome);
  document.getElementById('btn-back-result').addEventListener('click', backToResult);
  document.getElementById('btn-retry').addEventListener('click', () => {
    if (state.examType === 'mock')      startMockExam();
    else if (state.examType === 'ai')   startAIExam();
    else                                startExam(state.chapterId);
  });
  document.getElementById('btn-result-home').addEventListener('click', renderHome);
});
