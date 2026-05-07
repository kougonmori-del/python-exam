const LETTERS = ['A', 'B', 'C', 'D'];
const PASS_RATE = 0.7;

let state = {
  mode: 'home',      // 'home' | 'exam' | 'result'
  questions: [],
  currentIndex: 0,
  answers: [],       // selected option index or null
  revealed: [],      // bool: explanation shown
  chapterId: null,   // null = all
  timerSec: 0,
  timerInterval: null,
  examFinished: false,
};

// ---- Utilities ----

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function buildQuestionText(text) {
  const parts = text.split(/\n\n/);
  return parts.map(p => {
    if (p.trim().startsWith('print(') || p.trim().startsWith('def ') || p.trim().startsWith('for ') ||
        p.trim().startsWith('if ') || p.trim().startsWith('while ') || p.trim().startsWith('try:') ||
        p.trim().startsWith('class ') || p.trim().startsWith('x =') || p.trim().startsWith('s =') ||
        p.trim().startsWith('i =') || p.trim().startsWith('lst =') || p.trim().startsWith('d =') ||
        p.trim().startsWith('name =') || p.trim().startsWith('result =') || p.trim().startsWith('import ')) {
      return `<div class="code-block">${escapeHtml(p.trim())}</div>`;
    }
    return `<span>${escapeHtml(p)}</span>`;
  }).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

// ---- Exam ----

function startExam(chapterId) {
  state.chapterId = chapterId;
  state.examFinished = false;

  if (chapterId === null) {
    state.questions = CHAPTERS.flatMap(ch => ch.questions.map(q => ({ ...q, chapterTitle: ch.title })));
  } else {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    state.questions = ch.questions.map(q => ({ ...q, chapterTitle: ch.title }));
  }

  state.currentIndex = 0;
  state.answers = new Array(state.questions.length).fill(null);
  state.revealed = new Array(state.questions.length).fill(false);
  state.timerSec = 0;

  state.mode = 'exam';
  showPage('page-exam');

  const examTitle = document.getElementById('exam-title');
  if (chapterId === null) {
    examTitle.textContent = '全章 模擬試験';
  } else {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    examTitle.textContent = ch.title;
  }

  startTimer();
  renderQuestion();
}

function startTimer() {
  stopTimer();
  state.timerSec = 0;
  const timerEl = document.getElementById('timer');
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

function updateTimerDisplay() {
  const el = document.getElementById('timer');
  if (!el) return;
  el.textContent = formatTime(state.timerSec);
  el.className = 'timer';
  if (state.timerSec >= 50 * 60) el.classList.add('danger');
  else if (state.timerSec >= 45 * 60) el.classList.add('warning');
}

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  const idx = state.currentIndex;
  const revealed = state.revealed[idx];
  const selectedAns = state.answers[idx];

  // Progress
  document.getElementById('progress-bar').style.width = `${((idx + 1) / total) * 100}%`;
  document.getElementById('q-counter').textContent = `問題 ${idx + 1} / ${total}`;

  // Question text: split code blocks
  const qTextEl = document.getElementById('q-text');
  const lines = q.text.split('\n');
  let mainText = '';
  let codeLines = [];
  let inCode = false;

  lines.forEach(line => {
    const stripped = line.trim();
    // Detect code block (indented or starts with known Python keywords)
    if (!inCode && codeLines.length === 0 && (
      stripped.startsWith('print(') || stripped.startsWith('def ') || stripped.startsWith('for ') ||
      stripped.startsWith('if ') || stripped.startsWith('while ') || stripped.startsWith('try:') ||
      stripped.startsWith('class ') || stripped.startsWith('x =') || stripped.startsWith('s =') ||
      stripped.startsWith('i =') || stripped.startsWith('lst =') || stripped.startsWith('d =') ||
      stripped.startsWith('name =') || stripped.startsWith('result =') || stripped.startsWith('import ') ||
      stripped.startsWith('from ') || line.startsWith('    ') || stripped.startsWith('except') ||
      stripped.startsWith('else:') || stripped.startsWith('elif ') || stripped.startsWith('return') ||
      stripped.startsWith('d = {') || stripped.startsWith('del ')
    )) {
      inCode = true;
    }
    if (inCode) {
      codeLines.push(line);
    } else {
      mainText += (mainText ? '\n' : '') + line;
    }
  });

  // Build HTML
  let html = `<div>${escapeHtml(mainText)}</div>`;
  if (codeLines.length > 0) {
    html += `<div class="code-block">${escapeHtml(codeLines.join('\n'))}</div>`;
  }
  qTextEl.innerHTML = html;

  document.getElementById('q-number').textContent = `問題 ${idx + 1}`;

  // Options
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

    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${i}" ${selectedAns === i ? 'checked' : ''} ${revealed ? 'disabled' : ''}>
        <span class="option-letter">${LETTERS[i]}</span>
        <span>${escapeHtml(opt)}</span>
      </label>
    `;

    if (!revealed) {
      li.querySelector('label').addEventListener('click', () => selectOption(i));
    }

    optList.appendChild(li);
  });

  // Explanation
  const expBox = document.getElementById('explanation');
  expBox.innerHTML = `<div class="ex-label">解説</div>${escapeHtml(q.explanation)}`;
  expBox.classList.toggle('show', revealed);

  // Buttons
  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').style.display = idx < total - 1 ? 'inline-block' : 'none';
  document.getElementById('btn-finish').style.display = idx === total - 1 ? 'inline-block' : 'none';
  document.getElementById('btn-reveal').style.display = revealed ? 'none' : 'inline-block';
  document.getElementById('btn-reveal').disabled = selectedAns === null;
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
  // Reveal all unanswered as wrong (keep nulls)
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

  // Score circle
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

  // Review list
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
  document.getElementById('btn-prev').addEventListener('click', prevQuestion);
  document.getElementById('btn-next').addEventListener('click', nextQuestion);
  document.getElementById('btn-reveal').addEventListener('click', revealAnswer);
  document.getElementById('btn-finish').addEventListener('click', finishExam);
  document.getElementById('btn-back-home').addEventListener('click', renderHome);
  document.getElementById('btn-retry').addEventListener('click', () => startExam(state.chapterId));
  document.getElementById('btn-result-home').addEventListener('click', renderHome);
});
