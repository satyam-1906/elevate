import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

/* ── Google identity services loader ──────────────────────────────────── */
function loadGoogleScript() {
  return new Promise((resolve) => {
    if (window.google) return resolve();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.onload = resolve;
    document.head.appendChild(s);
  });
}

export default function LoginPage({ role = 'student' }) {
  const { loginWithGoogle, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const isInitialized = useRef(false);

  const isAdminPage = role === 'admin';

  /* redirect if already logged-in */
  useEffect(() => {
    if (!user) return;
    if (isAdmin) navigate('/admin/dashboard');
    else         navigate('/');
  }, [user, isAdmin, navigate]);

  /* ── Render & initialise Google button ───────────────────────────────── */
  const initButton = useCallback(async () => {
    if (isInitialized.current) return;
    
    await loadGoogleScript();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async ({ credential }) => {
        setLoading(true);
        setError('');
        try {
          const user = await loginWithGoogle(credential, role);
          if (role === 'admin' && user.role !== 'admin') {
            throw new Error('Access denied. You are not an admin.');
          }
          navigate(role === 'admin' ? '/admin/dashboard' : '/');
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      },
    });

    isInitialized.current = true;

    window.google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'filled_blue', size: 'large', width: 300, text: 'signin_with' }
    );
  }, [loginWithGoogle, navigate, role]);

  useEffect(() => { initButton(); }, [initButton]);

  return (
    <div className="login-page">
      {/* Ambient blobs */}
      <div className="login-blob login-blob-1" />
      <div className="login-blob login-blob-2" />

      <div className="login-card glass">
        {/* Header */}
        <div className="login-header">
          <img src="/logo.jpg" alt="Elevate" className="login-logo" />
          <h1 className="login-title">
            {isAdminPage ? 'Admin Portal' : 'Student Login'}
          </h1>
          <p className="login-subtitle">
            {isAdminPage
              ? 'Sign in with your @iiitn.ac.in admin account to manage content.'
              : 'Sign in with your @iiitn.ac.in college email to access resources.'}
          </p>
        </div>

        {/* Domain badge */}
        <div className="login-domain-badge">
          <span className="badge-dot" />
          <span>Restricted to <strong>@iiitn.ac.in</strong> accounts</span>
        </div>

        {/* Error */}
        {error && (
          <div className="login-error" role="alert">
            <span>⚠ {error}</span>
          </div>
        )}

        {/* Google button */}
        <div className="login-btn-wrap">
          {loading
            ? <div className="login-spinner" />
            : <div id="google-btn" />}
        </div>

        {/* Footer link */}
        <p className="login-footer-text">
          {isAdminPage
            ? <a href="/login/student" className="login-link">Not an admin? Student login →</a>
            : <a href="/login/admin"   className="login-link">Elevate admin? Login here →</a>}
        </p>
      </div>
    </div>
  );
}
