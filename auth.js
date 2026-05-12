// ============================================================
// auth.js — 登録・ログイン・ログアウト・セッション管理
// supabase-config.js の後に読み込んでください
// ============================================================

const AUTH = (() => {
  // Supabase Auth はメール形式が必要なため、内部的にダミードメインを使用
  // ユーザーにはアカウント名のみ入力させ、メールは一切表示しない
  const _DOMAIN = '@pyexam.local';
  const _toEmail = (name) => `${name.toLowerCase().trim()}${_DOMAIN}`;

  let _cachedUsername = null;

  // ---- バリデーション ----
  function _validateUsername(name) {
    const n = (name || '').trim();
    if (!n) return 'アカウント名を入力してください';
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(n)) {
      return 'アカウント名は3〜20文字の半角英数字・_（アンダースコア）・-（ハイフン）のみ使用できます';
    }
    return null;
  }

  function _validatePassword(pw) {
    if (!pw || pw.length < 8) return 'パスワードは8文字以上で設定してください';
    return null;
  }

  // ---- 新規登録 ----
  async function register(username, password, password2) {
    if (!SUPABASE_READY) return { error: 'Supabaseが設定されていません（supabase-config.jsを確認してください）' };

    const usernameErr = _validateUsername(username);
    if (usernameErr) return { error: usernameErr };

    const passwordErr = _validatePassword(password);
    if (passwordErr) return { error: passwordErr };

    if (password !== password2) return { error: 'パスワードが一致しません' };

    const name = username.trim();

    try {
      // フロントエンド事前チェック（大文字小文字を区別せず重複確認）
      const { data: existing } = await _sb
        .from('profiles')
        .select('username')
        .ilike('username', name)
        .maybeSingle();

      if (existing) return { error: 'このアカウント名はすでに使用されています' };

      // Supabase Auth でユーザー作成（パスワードはbcryptで自動ハッシュ化）
      const { data, error: signUpErr } = await _sb.auth.signUp({
        email:    _toEmail(name),
        password: password,
      });

      if (signUpErr) {
        if (signUpErr.message?.includes('already registered')) {
          return { error: 'このアカウント名はすでに使用されています' };
        }
        return { error: 'アカウント作成に失敗しました: ' + signUpErr.message };
      }

      if (!data?.user) return { error: 'アカウント作成に失敗しました' };

      // profiles テーブルにユーザー名を登録（DB の UNIQUE 制約が最終チェック）
      const { error: profileErr } = await _sb
        .from('profiles')
        .insert({ id: data.user.id, username: name });

      if (profileErr) {
        if (profileErr.code === '23505') {
          return { error: 'このアカウント名はすでに使用されています' };
        }
        return { error: 'プロフィール登録に失敗しました' };
      }

      _cachedUsername = name;
      return { success: true, username: name };

    } catch (e) {
      console.error('Register error:', e);
      return { error: '登録中にエラーが発生しました' };
    }
  }

  // ---- ログイン ----
  async function login(username, password) {
    if (!SUPABASE_READY) return { error: 'Supabaseが設定されていません' };

    const name = (username || '').trim();
    if (!name)    return { error: 'アカウント名を入力してください' };
    if (!password) return { error: 'パスワードを入力してください' };

    try {
      const { data, error: signInErr } = await _sb.auth.signInWithPassword({
        email:    _toEmail(name),
        password: password,
      });

      if (signInErr) return { error: 'アカウント名またはパスワードが正しくありません' };

      // profiles から正式なユーザー名（元の大文字小文字）を取得
      const { data: profile } = await _sb
        .from('profiles')
        .select('username')
        .eq('id', data.user.id)
        .maybeSingle();

      _cachedUsername = profile?.username || name;
      return { success: true, username: _cachedUsername };

    } catch (e) {
      console.error('Login error:', e);
      return { error: 'ログイン中にエラーが発生しました' };
    }
  }

  // ---- ログアウト ----
  async function logout() {
    if (!SUPABASE_READY) return;
    try {
      await _sb.auth.signOut();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      _cachedUsername = null;
    }
  }

  // ---- 現在のユーザー取得（null = 未ログイン）----
  async function getCurrentUser() {
    if (!SUPABASE_READY || !_sb) return null;
    try {
      const { data: { session } } = await _sb.auth.getSession();
      if (!session) return null;

      // キャッシュがあればネットワーク不要
      if (_cachedUsername) {
        return { id: session.user.id, username: _cachedUsername };
      }

      // 初回のみ profiles を参照
      const { data: profile } = await _sb
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .maybeSingle();

      _cachedUsername = profile?.username || null;
      return _cachedUsername ? { id: session.user.id, username: _cachedUsername } : null;

    } catch (e) {
      console.error('getCurrentUser error:', e);
      return null;
    }
  }

  // ---- 認証状態の変化を購読 ----
  function onAuthChange(callback) {
    if (!SUPABASE_READY || !_sb) return;
    _sb.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') _cachedUsername = null;
      callback(event, session);
    });
  }

  return {
    register,
    login,
    logout,
    getCurrentUser,
    onAuthChange,
    get ready() { return SUPABASE_READY; },
  };
})();
