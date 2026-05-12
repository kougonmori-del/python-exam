// ============================================================
// auth.js — localStorage版（外部サービス不要）
// bcryptjs でパスワードをハッシュ化し、すべてブラウザ内に保存します
// ============================================================

const AUTH = (() => {
  const USERS_KEY   = 'pyexam_users';
  const SESSION_KEY = 'pyexam_session';

  // ---- ストレージ操作 ----
  function _getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  }

  function _saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function _getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  }

  function _saveSession(data) {
    if (data) localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    else      localStorage.removeItem(SESSION_KEY);
  }

  function _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

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
    const usernameErr = _validateUsername(username);
    if (usernameErr) return { error: usernameErr };

    const passwordErr = _validatePassword(password);
    if (passwordErr) return { error: passwordErr };

    if (password !== password2) return { error: 'パスワードが一致しません' };

    const name  = username.trim();
    const users = _getUsers();

    // 重複チェック（大文字小文字を区別しない）
    if (users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
      return { error: 'このアカウント名はすでに使用されています' };
    }

    try {
      // bcryptjs でパスワードをハッシュ化（平文保存しない）
      const salt         = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = {
        id: _generateId(),
        username: name,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      _saveUsers(users);

      // 登録後は自動ログイン
      _saveSession({ userId: newUser.id, username: newUser.username });
      return { success: true, username: newUser.username };

    } catch (e) {
      console.error('Register error:', e);
      return { error: '登録中にエラーが発生しました' };
    }
  }

  // ---- ログイン ----
  async function login(username, password) {
    const name = (username || '').trim();
    if (!name)    return { error: 'アカウント名を入力してください' };
    if (!password) return { error: 'パスワードを入力してください' };

    const users = _getUsers();
    const user  = users.find(u => u.username.toLowerCase() === name.toLowerCase());

    if (!user) return { error: 'アカウント名またはパスワードが正しくありません' };

    try {
      // bcryptjs でハッシュを照合
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return { error: 'アカウント名またはパスワードが正しくありません' };

      _saveSession({ userId: user.id, username: user.username });
      return { success: true, username: user.username };

    } catch (e) {
      console.error('Login error:', e);
      return { error: 'ログイン中にエラーが発生しました' };
    }
  }

  // ---- ログアウト ----
  async function logout() {
    _saveSession(null);
  }

  // ---- 現在のユーザーを取得（null = 未ログイン） ----
  async function getCurrentUser() {
    return _getSession(); // { userId, username } または null
  }

  // ---- 認証状態の変化を購読（別タブ対応） ----
  function onAuthChange(callback) {
    window.addEventListener('storage', e => {
      if (e.key === SESSION_KEY) callback();
    });
  }

  return {
    register,
    login,
    logout,
    getCurrentUser,
    onAuthChange,
    get ready() { return true; }, // 外部サービス不要なので常に true
  };
})();
