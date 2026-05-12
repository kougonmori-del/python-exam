// ============================================================
// history-api.js — 解答履歴の保存・取得
// auth.js の後に読み込んでください
// ============================================================

const HISTORY = (() => {

  // ---- 試験セッションと解答詳細を保存 ----
  async function saveSession({ examType, chapterId, questions, answers, timeSec }) {
    if (!SUPABASE_READY || !_sb) return { error: 'Supabase未設定' };

    try {
      const { data: { session } } = await _sb.auth.getSession();
      if (!session) return { error: 'ログインが必要です' };

      const userId       = session.user.id;
      const total        = questions.length;
      const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
      const passed       = correctCount / total >= 0.7;

      // 試験セッション（1行）を挿入
      const { data: sess, error: sessErr } = await _sb
        .from('exam_sessions')
        .insert({
          user_id:         userId,
          exam_type:       examType,
          chapter_id:      chapterId ?? null,
          total_questions: total,
          correct_count:   correctCount,
          time_sec:        timeSec,
          passed:          passed,
        })
        .select()
        .single();

      if (sessErr) return { error: sessErr.message };

      // 解答詳細（問題数分）を一括挿入
      const rows = questions.map((q, i) => ({
        session_id:           sess.id,
        user_id:              userId,
        question_id:          q.id,
        question_text:        q.text.slice(0, 500),
        user_answer_index:    answers[i] ?? null,
        correct_answer_index: q.answer,
        user_answer_text:     answers[i] != null ? q.options[answers[i]] : null,
        correct_answer_text:  q.options[q.answer],
        is_correct:           answers[i] === q.answer,
      }));

      const { error: answersErr } = await _sb.from('exam_answers').insert(rows);
      if (answersErr) return { error: answersErr.message };

      return { success: true, sessionId: sess.id };

    } catch (e) {
      console.error('saveSession error:', e);
      return { error: '履歴の保存中にエラーが発生しました' };
    }
  }

  // ---- 解答履歴一覧を取得（新しい順） ----
  async function getSessions(limit = 30) {
    if (!SUPABASE_READY || !_sb) return { data: [] };

    try {
      const { data, error } = await _sb
        .from('exam_sessions')
        .select('*')
        .order('taken_at', { ascending: false })
        .limit(limit);

      return error ? { error: error.message } : { data: data || [] };

    } catch (e) {
      console.error('getSessions error:', e);
      return { error: '履歴の取得中にエラーが発生しました' };
    }
  }

  // ---- 章ごとの正答率を取得（ホーム画面のバッジ表示用） ----
  async function getChapterAccuracy() {
    if (!SUPABASE_READY || !_sb) return {};

    try {
      const { data } = await _sb
        .from('exam_sessions')
        .select('chapter_id, total_questions, correct_count')
        .eq('exam_type', 'chapter')
        .not('chapter_id', 'is', null);

      if (!data || data.length === 0) return {};

      const agg = {};
      data.forEach(({ chapter_id, total_questions, correct_count }) => {
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
      console.error('getChapterAccuracy error:', e);
      return {};
    }
  }

  return { saveSession, getSessions, getChapterAccuracy };
})();
