const LETTERS = ['A', 'B', 'C', 'D', 'E'];
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
    card.dataset.chapterId = ch.id;
    card.innerHTML = `
      <div class="chapter-num">第${ch.id}章</div>
      <h3>${ch.title.replace(/^第\d+章 /, '')}</h3>
      <p>${ch.description}</p>
      <div class="chapter-footer">
        <span class="q-count">${ch.questions.length}問</span>
        <span class="rate-badge">出題率 ${ch.rate}%</span>
        <span class="accuracy-badge" id="acc-${ch.id}" style="display:none"></span>
      </div>
    `;
    card.addEventListener('click', () => startExam(ch.id));
    grid.appendChild(card);
  });

  // ログイン中なら正答率バッジを非同期で表示
  renderChapterAccuracyBadges();
}

// ---- Exam Start ----
function startExam(chapterId) {
  state.chapterId = chapterId;
  state.examType  = chapterId === null ? 'all' : 'chapter';
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

function startNetExam() {
  state.chapterId = null;
  state.examType  = 'net';
  state.examFinished = false;
  state.questions = shuffle([...NET_QUESTIONS]).map(q => ({
    ...q, chapterTitle: 'ネット問題'
  }));
  initExam('ネット問題（40問）');
}

function startBeginnerExam() {
  state.chapterId = null;
  state.examType  = 'beginner';
  state.examFinished = false;
  state.questions = shuffle([...BEGINNER_QUESTIONS]).map(q => ({
    ...q, chapterTitle: '初級問題'
  }));
  initExam('初級問題（全問）');
}

function startIntermediateExam() {
  state.chapterId = null;
  state.examType  = 'intermediate';
  state.examFinished = false;
  state.questions = shuffle([...INTERMEDIATE_QUESTIONS]).map(q => ({
    ...q, chapterTitle: '中級問題'
  }));
  initExam('中級問題（全問）');
}

function startAdvancedExam() {
  state.chapterId = null;
  state.examType  = 'advanced';
  state.examFinished = false;
  state.questions = shuffle([...ADVANCED_QUESTIONS]).map(q => ({
    ...q, chapterTitle: '上級問題'
  }));
  initExam('上級問題（全問）');
}

function startPyqExam() {
  state.chapterId = null;
  state.examType  = 'pyq';
  state.examFinished = false;
  state.questions = shuffle([...PYQ_QUESTIONS]).map(q => ({
    ...q, chapterTitle: 'PyQ模擬試験'
  }));
  initExam('基礎試験模擬（40問・PyQ）');
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

async function finishExam() {
  stopTimer();
  state.examFinished = true;
  state.fromResult   = false;
  showResult(); // 結果画面を先に表示してから履歴保存（UXを妨げない）

  try {
    const user = await AUTH.getCurrentUser();
    if (user) {
      const result = await HISTORY.saveSession({
        examType:  state.examType,
        chapterId: state.chapterId,
        questions: state.questions,
        answers:   state.answers,
        timeSec:   state.timerSec,
      });
      if (result.success) {
        showToast('解答履歴を保存しました');
      } else {
        showToast('履歴の保存に失敗しました', 'error');
      }
    }
  } catch (e) {
    console.error('History save error:', e);
  }
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

// ============================================================
// ---- Toast 通知 ----
// ============================================================
function showToast(message, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('toast-show')));
  setTimeout(() => {
    t.classList.remove('toast-show');
    t.addEventListener('transitionend', () => t.remove(), { once: true });
  }, 3000);
}

// ============================================================
// ---- ヘッダーの認証エリア更新 ----
// ============================================================
async function updateHeaderAuth() {
  const area = document.getElementById('header-auth-area');
  if (!area) return;

  if (!AUTH.ready) {
    area.innerHTML = '';
    return;
  }

  const user = await AUTH.getCurrentUser();

  if (user) {
    area.innerHTML = `
      <div class="header-user-info">
        <span class="header-username">${escapeHtml(user.username)}</span>
        <button id="btn-header-history" class="btn-header-link">履歴</button>
        <button id="btn-header-logout" class="btn-header-link btn-header-logout">ログアウト</button>
      </div>
    `;
    document.getElementById('btn-header-history').addEventListener('click', renderHistory);
    document.getElementById('btn-header-logout').addEventListener('click', async () => {
      await AUTH.logout();
      await updateHeaderAuth();
      showToast('ログアウトしました', 'info');
      if (state.mode !== 'home') renderHome();
    });
  } else {
    area.innerHTML = `
      <button id="btn-header-login" class="btn-header-link">ログイン / 登録</button>
    `;
    document.getElementById('btn-header-login').addEventListener('click', () => renderAuth('login'));
  }
}

// ============================================================
// ---- 章カードの正答率バッジ（非同期・ログイン時のみ） ----
// ============================================================
async function renderChapterAccuracyBadges() {
  try {
    const user = await AUTH.getCurrentUser();
    if (!user) return;

    const accuracy = await HISTORY.getChapterAccuracy();
    for (const [chId, pct] of Object.entries(accuracy)) {
      const el = document.getElementById(`acc-${chId}`);
      if (el) {
        el.textContent = `正答率 ${pct}%`;
        el.style.display = 'inline-block';
        el.className = `accuracy-badge ${pct >= 70 ? 'acc-good' : 'acc-bad'}`;
      }
    }
  } catch (e) {
    // バッジはサブ機能なので失敗してもサイレントに処理
  }
}

// ============================================================
// ---- 認証タブ切り替え ----
// ============================================================
function switchAuthTab(mode) {
  const loginForm    = document.getElementById('auth-login-form');
  const registerForm = document.getElementById('auth-register-form');
  const tabLogin     = document.getElementById('tab-login');
  const tabRegister  = document.getElementById('tab-register');

  document.getElementById('login-error').textContent    = '';
  document.getElementById('register-error').textContent = '';

  if (mode === 'login') {
    loginForm.style.display    = 'block';
    registerForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    loginForm.style.display    = 'none';
    registerForm.style.display = 'block';
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
  }
}

// ============================================================
// ---- 認証ページ表示 ----
// ============================================================
function renderAuth(mode = 'login') {
  showPage('page-auth');
  switchAuthTab(mode);
  document.getElementById('login-username').value  = '';
  document.getElementById('login-password').value  = '';
  document.getElementById('reg-username').value    = '';
  document.getElementById('reg-password').value    = '';
  document.getElementById('reg-password2').value   = '';
}

// ============================================================
// ---- 解答履歴ページ表示 ----
// ============================================================
async function renderHistory() {
  const user = await AUTH.getCurrentUser();
  if (!user) {
    renderAuth('login');
    showToast('履歴を見るにはログインが必要です', 'error');
    return;
  }

  showPage('page-history');
  const listEl = document.getElementById('history-list');
  listEl.innerHTML = '<div class="history-loading">読み込み中...</div>';

  const { data: sessions, error } = await HISTORY.getSessions(30);

  if (error) {
    listEl.innerHTML = '<div class="auth-error" style="margin:16px 0; text-align:center;">履歴の取得に失敗しました</div>';
    return;
  }

  if (!sessions || sessions.length === 0) {
    listEl.innerHTML = `
      <div class="history-empty">
        まだ解答履歴はありません。<br>
        試験を解いて記録を残しましょう！
      </div>
    `;
    return;
  }

  const MODE_LABELS = {
    chapter:      (id) => `第${id}章`,
    all:          ()   => '全章練習',
    mock:         ()   => '模擬試験',
    ai:           ()   => 'AIオリジナル',
    net:          ()   => 'ネット問題',
    beginner:     ()   => '初級問題',
    intermediate: ()   => '中級問題',
    advanced:     ()   => '上級問題',
    pyq:          ()   => 'PyQ模擬試験',
  };

  listEl.innerHTML = sessions.map(s => {
    const date = new Date(s.taken_at).toLocaleString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
    const pct       = Math.round((s.correct_count / s.total_questions) * 100);
    const modeLabel = escapeHtml((MODE_LABELS[s.exam_type] || (() => s.exam_type))(s.chapter_id));
    const time      = formatTime(s.time_sec);
    const passClass = s.passed ? 'pass' : 'fail';

    return `
      <div class="history-item history-${passClass}">
        <div class="history-meta">
          <span class="history-date">${escapeHtml(date)}</span>
          <span class="history-mode-badge">${modeLabel}</span>
        </div>
        <div class="history-score-row">
          <span class="history-score-text">${s.correct_count}/${s.total_questions}問</span>
          <span class="history-pct">${pct}%</span>
          <span class="pass-badge ${passClass}" style="font-size:12px; padding:3px 10px;">${s.passed ? '合格' : '不合格'}</span>
          <span class="history-time-text">⏱ ${escapeHtml(time)}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// ---- Init ----
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderHome();

  // 既存のボタン
  document.getElementById('logo-link').addEventListener('click', renderHome);
  document.getElementById('btn-all').addEventListener('click', () => startExam(null));
  document.getElementById('btn-mock').addEventListener('click', startMockExam);
  document.getElementById('btn-ai').addEventListener('click', startAIExam);
  document.getElementById('btn-net').addEventListener('click', startNetExam);
  document.getElementById('btn-beginner').addEventListener('click', startBeginnerExam);
  document.getElementById('btn-intermediate').addEventListener('click', startIntermediateExam);
  document.getElementById('btn-advanced').addEventListener('click', startAdvancedExam);
  document.getElementById('btn-pyq').addEventListener('click', startPyqExam);
  document.getElementById('btn-prev').addEventListener('click', prevQuestion);
  document.getElementById('btn-next').addEventListener('click', nextQuestion);
  document.getElementById('btn-reveal').addEventListener('click', revealAnswer);
  document.getElementById('btn-finish').addEventListener('click', () => finishExam().catch(console.error));
  document.getElementById('btn-back-home').addEventListener('click', renderHome);
  document.getElementById('btn-back-result').addEventListener('click', backToResult);
  document.getElementById('btn-retry').addEventListener('click', () => {
    if      (state.examType === 'mock')         startMockExam();
    else if (state.examType === 'ai')           startAIExam();
    else if (state.examType === 'net')          startNetExam();
    else if (state.examType === 'beginner')     startBeginnerExam();
    else if (state.examType === 'intermediate') startIntermediateExam();
    else if (state.examType === 'advanced')     startAdvancedExam();
    else if (state.examType === 'pyq')          startPyqExam();
    else                                        startExam(state.chapterId);
  });
  document.getElementById('btn-result-home').addEventListener('click', renderHome);
  document.getElementById('btn-result-home2').addEventListener('click', renderHome);

  // 認証タブ
  document.getElementById('tab-login').addEventListener('click', () => switchAuthTab('login'));
  document.getElementById('tab-register').addEventListener('click', () => switchAuthTab('register'));

  // ログインフォーム送信
  document.getElementById('btn-do-login').addEventListener('click', async () => {
    const btn    = document.getElementById('btn-do-login');
    const errEl  = document.getElementById('login-error');
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    btn.disabled   = true;
    btn.textContent = 'ログイン中...';
    errEl.textContent = '';

    const result = await AUTH.login(username, password);

    btn.disabled    = false;
    btn.textContent = 'ログイン';

    if (result.error) {
      errEl.textContent = result.error;
      return;
    }

    await updateHeaderAuth();
    showToast(`ようこそ、${escapeHtml(result.username)}さん！`);
    renderHome();
  });

  // Enterキーでもログイン送信
  ['login-username', 'login-password'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('btn-do-login').click();
    });
  });

  // 新規登録フォーム送信
  document.getElementById('btn-do-register').addEventListener('click', async () => {
    const btn       = document.getElementById('btn-do-register');
    const errEl     = document.getElementById('register-error');
    const username  = document.getElementById('reg-username').value.trim();
    const password  = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

    btn.disabled    = true;
    btn.textContent = '作成中...';
    errEl.textContent = '';

    const result = await AUTH.register(username, password, password2);

    btn.disabled    = false;
    btn.textContent = 'アカウントを作成';

    if (result.error) {
      errEl.textContent = result.error;
      return;
    }

    await updateHeaderAuth();
    showToast(`アカウント「${escapeHtml(result.username)}」を作成しました！`);
    renderHome();
  });

  // 認証状態の変化を監視
  AUTH.onAuthChange(() => {
    updateHeaderAuth();
    if (state.mode === 'home') renderChapterAccuracyBadges();
  });

  // 初期認証状態を確認してヘッダーを更新
  updateHeaderAuth();
});
