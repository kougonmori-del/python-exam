// ============================================================
// history-api.js — localStorage版（外部サービス不要）
// ユーザーごとにブラウザのローカルストレージへ保存します
// ============================================================

const HISTORY = (() => {
  // ユーザーIDごとに別キーで保存（データ分離）
  const _key = (userId) => `pyexam_history_${userId}`;
  const MAX_RECORDS = 100; // 最大保存件数

  // ---- 試験セッションを保存 ----
  async function saveSession({ examType, chapterId, questions, answers, timeSec }) {
    const session = await AUTH.getCurrentUser();
    if (!session) return { error: 'ログインが必要です' };

    const total        = questions.length;
    const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
    const passed       = correctCount / total >= 0.7;

    // renderHistory() が期待するフィールド名に合わせる（スネークケース）
    const record = {
      id:              Date.now().toString(36) + Math.random().toString(36).slice(2),
      exam_type:       examType,
      chapter_id:      chapterId ?? null,
      total_questions: total,
      correct_count:   correctCount,
      time_sec:        timeSec,
      passed:          passed,
      taken_at:        new Date().toISOString(),
    };

    try {
      const key     = _key(session.userId);
      const history = JSON.parse(localStorage.getItem(key) || '[]');
      history.unshift(record); // 新しいものを先頭に追加
      if (history.length > MAX_RECORDS) history.length = MAX_RECORDS;
      localStorage.setItem(key, JSON.stringify(history));
      return { success: true };
    } catch (e) {
      console.error('saveSession error:', e);
      return { error: '保存に失敗しました（ストレージ容量を確認してください）' };
    }
  }

  // ---- 解答履歴一覧を取得 ----
  async function getSessions(limit = 30) {
    const session = await AUTH.getCurrentUser();
    if (!session) return { data: [] };

    try {
      const key     = _key(session.userId);
      const history = JSON.parse(localStorage.getItem(key) || '[]');
      return { data: history.slice(0, limit) };
    } catch (e) {
      console.error('getSessions error:', e);
      return { error: '履歴の取得に失敗しました' };
    }
  }

  // ---- 章ごとの正答率を取得（ホーム画面のバッジ用） ----
  async function getChapterAccuracy() {
    const session = await AUTH.getCurrentUser();
    if (!session) return {};

    try {
      const key     = _key(session.userId);
      const history = JSON.parse(localStorage.getItem(key) || '[]');

      const chapterOnly = history.filter(h => h.exam_type === 'chapter' && h.chapter_id != null);
      if (chapterOnly.length === 0) return {};

      const agg = {};
      chapterOnly.forEach(({ chapter_id, total_questions, correct_count }) => {
        if (!agg[chapter_id]) agg[chapter_id] = { total: 0, correct: 0 };
        agg[chapter_id].total   += total_questions;
        agg[chapter_id].correct += correct_count;
      });

      const result = {};
      for (const [id, { total, correct }] of Object.entries(agg)) {
        result[Number(id)] = Math.round((correct / total) * 100);
      }
      return result;
    } catch (e) {
      return {};
    }
  }

  return { saveSession, getSessions, getChapterAccuracy };
})();
