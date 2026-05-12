-- ============================================================
-- schema.sql
-- Supabase Dashboard > SQL Editor で実行してください
-- 実行前に Authentication > Settings > Email Confirmations を
-- 「OFF」にしてください（メール確認なしで即時登録するため）
-- ============================================================

-- ① プロフィールテーブル
--    Supabase Auth の auth.users と 1:1 で紐付けてユーザー名を管理する
CREATE TABLE public.profiles (
  id          UUID        NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ユーザー名はすべて小文字で一意（大文字小文字を区別しない重複登録を防ぐ）
CREATE UNIQUE INDEX idx_profiles_username ON public.profiles (lower(username));

-- ② 試験セッションテーブル（1回の試験 = 1行）
CREATE TABLE public.exam_sessions (
  id               BIGSERIAL   PRIMARY KEY,
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_type        TEXT        NOT NULL CHECK (exam_type IN ('chapter','all','mock','ai')),
  chapter_id       INT,
  total_questions  INT         NOT NULL,
  correct_count    INT         NOT NULL,
  time_sec         INT         NOT NULL,
  passed           BOOLEAN     NOT NULL,
  taken_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_taken ON public.exam_sessions (user_id, taken_at DESC);

-- ③ 解答詳細テーブル（1問の解答 = 1行）
CREATE TABLE public.exam_answers (
  id                   BIGSERIAL PRIMARY KEY,
  session_id           BIGINT    NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  user_id              UUID      NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id          TEXT      NOT NULL,
  question_text        TEXT      NOT NULL,
  user_answer_index    INT,
  correct_answer_index INT       NOT NULL,
  user_answer_text     TEXT,
  correct_answer_text  TEXT      NOT NULL,
  is_correct           BOOLEAN   NOT NULL
);

CREATE INDEX idx_answers_session ON public.exam_answers (session_id);

-- ============================================================
-- Row Level Security（RLS）
-- 自分のデータのみ読み書き可能にする
-- ============================================================
ALTER TABLE public.profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers  ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "自分のプロフィールのみ参照" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "自分のプロフィールのみ作成" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- exam_sessions
CREATE POLICY "自分のセッションのみ参照" ON public.exam_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "自分のセッションのみ作成" ON public.exam_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- exam_answers
CREATE POLICY "自分の解答のみ参照" ON public.exam_answers
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "自分の解答のみ作成" ON public.exam_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);
