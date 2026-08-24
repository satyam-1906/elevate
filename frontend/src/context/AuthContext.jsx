import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('elevate_token'));
  const [loading, setLoading] = useState(true);

  /* ── Restore session on mount ─────────────────────────────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem('elevate_user');
    if (saved && token) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, [token]);

  /* ── Google login (called after Google credential response) ───────────── */
  const loginWithGoogle = useCallback(async (googleIdToken, role = 'student') => {
    const res = await fetch(`${API}/auths/google`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token: googleIdToken, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('elevate_token', data.token);
    localStorage.setItem('elevate_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  /* ── Logout ───────────────────────────────────────────────────────────── */
  const logout = useCallback(() => {
    localStorage.removeItem('elevate_token');
    localStorage.removeItem('elevate_user');
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin   = user?.role === 'admin';
  const isStudent = !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAdmin, isStudent, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
