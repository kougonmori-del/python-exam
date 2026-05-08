const LETTERS = ['A', 'B', 'C', 'D'];
const PASS_RATE = 0.7;

// 本番試験の出題分布（40問）
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
  answers: [],
  revealed: [],
  chapterId: null,
  examType: 'chapter', // 'chapter' | 'all' | 'mock' | 'ai'
  timerSec: 0,
  timerInterval: null,
  examFinished: false,
};

// ---- 空白の可視化 ----
function formatOptionText(text) {
  const escaped = escapeHtml(text);
  // 2文字以上の連続スペースを可視化
  return escaped.replace(/( {2,})|( {1})(?=[^ ]|$)/g, (match, multi, single) => {
    if (multi) {
      return multi.split('').map(() => '<span class="visible-space"> </span>').join('');
    }
    return match;
  }).replace(/^( +)/g, (spaces) =>
    spaces.split('').map(() => '<span class="visible-space"> </span>').join('')
  );
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---- 問題文のHTMLレンダリング ----
function renderQuestionText(text) {
  const lines = text.split('\n');
  let mainLines = [];
  let codeLines = [];
  let inCode = false;

  const codeStarters = [
    'print(', 'def ', 'for ', 'if ', 'while ', 'try:', 'class ',
    'x =', 's =', 'i =', 'lst =', 'd =', 'name =', 'result =',
    'import ', 'from ', 'except', 'else:', 'elif ', 'return',
    'del ', 'with ', 'raise', 'assert', 'a =', 'b =', 'n =',
    'num =', 'obj =', 'f =', 'count', 'square', 'func', 'my',
    'animal', 'dog', 'cat', 'data', 'value', 'items', 'keys'
  ];

  for (const line of lines) {
    const stripped = line.trim();
    if (!inCode && (
      codeStarters.some(s => stripped.startsWith(s)) ||
      line.startsWith('    ') ||
      stripped.startsWith('#')
    )) {
      inCode = true;
    }
    if (inCode) {
      codeLines.push(line);
    } else {
      mainLines.push(line);
    }
  }

  let html = `<div>${escapeHtml(mainLines.join('\n'))}</div>`;
  if (codeLines.length > 0) {
    html += `<div class="code-block">${escapeHtml(codeLines.join('\n'))}</div>`;
  }
  return html;
}

// ---- ランダム選択 ----
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function selectMockQuestions() {
  let selected = [];
  for (const { id, count } of MOCK_DISTRIBUTION) {
    const ch = CHAPTERS.find(c => c.id === id);
    if (!ch) continue;
    const pool = shuffle(ch.questions);
    const taken = pool.slice(0, Math.min(count, pool.length));
    taken.forEach(q => selected.push({ ...q, chapterTitle: ch.title }));
  }
  return selected;
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
  state.examType = 'chapter';
  state.examFinished = false;

  if (chapterId === null) {
    state.questions = CHAPTERS.flatMap(ch =>
      ch.questions.map(q => ({ ...q, chapterTitle: ch.title }))
    );
  } else {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    state.questions = ch.questions.map(q => ({ ...q, chapterTitle: ch.title }));
  }

  initExam(chapterId === null ? '全章 練習モード' : CHAPTERS.find(c => c.id === chapterId).title);
}

function startMockExam() {
  state.chapterId = null;
  state.examType = 'mock';
  state.examFinished = false;
  state.questions = selectMockQuestions();
  initExam('本番形式 模擬試験（40問）');
}

function startAIExam() {
  state.chapterId = null;
  state.examType = 'ai';
  state.examFinished = false;
  state.questions = shuffle(AI_QUESTIONS).slice(0, 40).map(q => ({
    ...q, chapterTitle: 'AIオリジナル'
  }));
  initExam('AIオリジナル試験（40問）');
}

function initExam(title) {
  state.currentIndex = 0;
  state.answers = new Array(state.questions.length).fill(null);
  state.revealed = new Array(state.questions.length).fill(false);
  state.timerSec = 0;
  state.mode = 'exam';
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
  state.timerInterval = setInterval(() => {
    state.timerSec++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
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
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  const idx = state.currentIndex;
  const revealed = state.revealed[idx];
  const selectedAns = state.answers[idx];

  document.getElementById('progress-bar').style.width = `${((idx + 1) / total) * 100}%`;
  document.getElementById('q-counter').textContent = `問題 ${idx + 1} / ${total}`;
  document.getElementById('q-number').textContent = `問題 ${idx + 1}`;
  document.getElementById('q-text').innerHTML = renderQuestionText(q.text);

  const optList = document.getElementById('options-list');
  optList.innerHTML = '';

  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.className = 'option-item';

    if (revealed) {
      if (i === q.answer) li.classList.add('correct');
      else if (i === selectedAns && i !== q.answer) li.classList.add('wrong');
    } else if (i === selectedAns) {
      li.classList.add('selected');
    }

    // 空白を可視化
    const hasLeadingSpaces = /^ +/.test(opt);
    const hasMultiSpaces = / {2,}/.test(opt);
    let optHtml;
    if (hasLeadingSpaces || hasMultiSpaces) {
      optHtml = `<span class="option-code">${makeSpacesVisible(escapeHtml(opt))}</span>`;
    } else {
      optHtml = escapeHtml(opt);
    }

    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${i}" ${selectedAns === i ? 'checked' : ''} ${revealed ? 'disabled' : ''}>
        <span class="option-letter">${LETTERS[i]}</span>
        <span>${optHtml}</span>
      </label>
    `;

    if (!revealed) {
      li.querySelector('label').addEventListener('click', () => selectOption(i));
    }
    optList.appendChild(li);
  });

  const expBox = document.getElementById('explanation');
  expBox.innerHTML = `<div class="ex-label">解説</div>${escapeHtml(q.explanation)}`;
  expBox.classList.toggle('show', revealed);

  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').style.display = idx < total - 1 ? 'inline-block' : 'none';
  document.getElementById('btn-finish').style.display = idx === total - 1 ? 'inline-block' : 'none';
  document.getElementById('btn-reveal').style.display = revealed ? 'none' : 'inline-block';
  document.getElementById('btn-reveal').disabled = selectedAns === null;
}

function makeSpacesVisible(escapedText) {
  return escapedText.replace(/ /g, '<span class="visible-space">_</span>');
}

function selectOption(i) {
  if (state.revealed[state.currentIndex]) return;
  state.answers[state.currentIndex] = i;
  renderQuestion();
}

function revealAnswer() {
  if (state.answers[state.currentIndex] === null) return;
  state.revealed[state.currentIndex] = true;
  renderQuestion();
}

function prevQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderQuestion();
  }
}

function nextQuestion() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex++;
    renderQuestion();
  }
}

function finishExam() {
  stopTimer();
  state.examFinished = true;
  showResult();
}

// ---- Result ----
function showResult() {
  state.mode = 'result';
  showPage('page-result');

  const questions = state.questions;
  const answers = state.answers;
  const total = questions.length;
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;
  const pct = Math.round((correct / total) * 100);
  const passed = correct / total >= PASS_RATE;

  const circle = document.getElementById('score-circle');
  circle.style.setProperty('--pct', pct);
  document.getElementById('score-num').textContent = correct;
  document.getElementById('score-denom').textContent = `/ ${total}`;
  document.getElementById('result-title').textContent = `正解数 ${correct}問 / ${total}問`;
  document.getElementById('result-pct').textContent = `正解率 ${pct}%`;

  const badge = document.getElementById('pass-badge');
  badge.textContent = passed ? '合格ライン達成！（70%以上）' : '不合格（70%未満）';
  badge.className = `pass-badge ${passed ? 'pass' : 'fail'}`;
  document.getElementById('result-time').textContent = `所要時間: ${formatTime(state.timerSec)}`;

  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';

  questions.forEach((q, i) => {
    const userAns = answers[i];
    const isCorrect = userAns === q.answer;

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'correct-item' : 'wrong-item'}`;

    const qText = q.text.replace(/\n+/g, ' ').substring(0, 80) + (q.text.length > 80 ? '...' : '');

    item.innerHTML = `
      <div class="review-q">${i + 1}. ${escapeHtml(qText)}</div>
      <div class="review-answer">
        あなたの回答: <span class="${isCorrect ? 'correct-ans' : 'wrong-ans'}">${userAns !== null ? LETTERS[userAns] + '. ' + escapeHtml(q.options[userAns]) : '未回答'}</span>
      </div>
      ${!isCorrect ? `<div class="review-answer">正解: <span class="correct-ans">${LETTERS[q.answer]}. ${escapeHtml(q.options[q.answer])}</span></div>` : ''}
      <div class="review-explanation">${escapeHtml(q.explanation)}</div>
    `;
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
  document.getElementById('btn-retry').addEventListener('click', () => {
    if (state.examType === 'mock') startMockExam();
    else if (state.examType === 'ai') startAIExam();
    else startExam(state.chapterId);
  });
  document.getElementById('btn-result-home').addEventListener('click', renderHome);
});
