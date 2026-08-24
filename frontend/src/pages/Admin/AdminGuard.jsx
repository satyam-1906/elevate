import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Wraps any admin page — redirects to /login/admin if not an admin.
 */
export default function AdminGuard({ children }) {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user || !isAdmin) navigate('/login/admin');
  }, [user, isAdmin, loading, navigate]);

  if (loading || !isAdmin) return null;
  return children;
}
