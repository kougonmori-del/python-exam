// ============================================================
// supabase-config.js
// Supabase Dashboard > Settings > API で値を確認して貼り付けてください
// Project URL と anon/public キーを設定します
// ============================================================

const SUPABASE_URL      = 'YOUR_SUPABASE_URL';       // 例: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // 例: eyJhbGci...

// 未設定の場合は認証機能を無効化（既存の試験機能はそのまま動作します）
const SUPABASE_READY = SUPABASE_URL !== 'YOUR_SUPABASE_URL';

const _sb = SUPABASE_READY
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession:   true,
        detectSessionInUrl: false,
      },
    })
  : null;
