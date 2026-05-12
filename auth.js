// ============================================================
// auth.js — localStorage版（外部ライブラリ不要）
// ブラウザ組み込みの Web Crypto API でパスワードをハッシュ化します
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

  // ---- パスワードのハッシュ化（Web Crypto API / SHA-256 + ソルト） ----
  function _generateSalt() {
    const arr = new Uint8Array(16);
    (window.crypto || crypto).getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function _hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data    = encoder.encode(salt + ':' + password);
    const subtle  = (window.crypto || crypto).subtle;
    const buf     = await subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
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
      const salt         = _generateSalt();
      const passwordHash = await _hashPassword(password, salt);

      const newUser = {
        id: _generateId(),
        username: name,
        passwordHash,
        salt,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      _saveUsers(users);

      _saveSession({ userId: newUser.id, username: newUser.username });
      return { success: true, username: newUser.username };

    } catch (e) {
      console.error('Register error:', e);
      return { error: '登録中にエラーが発生しました: ' + (e && e.message ? e.message : String(e)) };
    }
  }

  // ---- ログイン ----
  async function login(username, password) {
    const name = (username || '').trim();
    if (!name)     return { error: 'アカウント名を入力してください' };
    if (!password) return { error: 'パスワードを入力してください' };

    const users = _getUsers();
    const user  = users.find(u => u.username.toLowerCase() === name.toLowerCase());

    if (!user) return { error: 'アカウント名またはパスワードが正しくありません' };

    try {
      const computedHash = await _hashPassword(password, user.salt);
      if (computedHash !== user.passwordHash) {
        return { error: 'アカウント名またはパスワードが正しくありません' };
      }

      _saveSession({ userId: user.id, username: user.username });
      return { success: true, username: user.username };

    } catch (e) {
      console.error('Login error:', e);
      return { error: 'ログイン中にエラーが発生しました: ' + (e && e.message ? e.message : String(e)) };
    }
  }

  // ---- ログアウト ----
  async function logout() {
    _saveSession(null);
  }

  // ---- 現在のユーザー取得（null = 未ログイン） ----
  async function getCurrentUser() {
    return _getSession();
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
    get ready() { return true; },
  };
})();
