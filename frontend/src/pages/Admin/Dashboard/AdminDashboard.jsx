import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AdminGuard from '../AdminGuard';
import {
  LayoutDashboard, CalendarDays, Image, LogOut, Upload,
  Trash2, Plus, X, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import './AdminDashboard.css';

const API = 'http://localhost:5000/api';

/* ── API helper ──────────────────────────────────────────────────────────── */
function useApi(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const get = (path) =>
    fetch(`${API}${path}`, { headers }).then(r => r.json());

  const post = (path, formData) =>
    fetch(`${API}${path}`, { method: 'POST', headers, body: formData }).then(r => r.json());

  const del = (path) =>
    fetch(`${API}${path}`, { method: 'DELETE', headers }).then(r => r.json());

  return { get, post, del };
}

/* ── Toast notification ──────────────────────────────────────────────────── */
function Toast({ toast, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`toast-item ${toast.type}`}>
      {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      <span>{toast.message}</span>
      <button onClick={onClose} className="toast-close"><X size={14} /></button>
    </div>
  );
}

/* ── Event Form (create) ─────────────────────────────────────────────────── */
function EventForm({ token, onCreated }) {
  const { post } = useApi(token);
  const [form, setForm]       = useState({ title: '', date: '', description: '' });
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const fileRef               = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) { setError('Title and date are required'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('date', form.date);
      fd.append('description', form.description);
      if (file) fd.append('image', file);
      const data = await post('/events', fd);
      if (data.error) throw new Error(data.error);
      setForm({ title: '', date: '', description: '' });
      setFile(null); setPreview(null);
      onCreated(data.event);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="event-form glass" onSubmit={handleSubmit}>
      <h3 className="form-title"><Plus size={18} /> Create Event</h3>

      <div className="form-grid">
        {/* Title */}
        <div className="form-field full">
          <label>Event Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Web3 Hackathon 2025" className="form-input" />
        </div>

        {/* Date */}
        <div className="form-field">
          <label>Date *</label>
          <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            className="form-input" />
        </div>

        {/* Description */}
        <div className="form-field full">
          <label>Description</label>
          <textarea rows={3} value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Brief description of the event..." className="form-input" />
        </div>

        {/* Image upload */}
        <div className="form-field full">
          <label>Cover Image (Cloudinary upload)</label>
          <div className="upload-area" onClick={() => fileRef.current.click()}>
            {preview
              ? <img src={preview} alt="preview" className="upload-preview" />
              : <>
                  <Upload size={28} className="upload-icon" />
                  <p>Click to select an image (JPG, PNG, WebP)</p>
                  <span className="upload-hint">Uploads directly to Cloudinary</span>
                </>}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }} onChange={handleFile} />
          </div>
          {file && (
            <div className="upload-filename">
              <span>{file.name}</span>
              <button type="button" onClick={() => { setFile(null); setPreview(null); }}>
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="form-error"><AlertCircle size={14} /> {error}</p>}

      <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Plus size={16} />}
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}

/* ── Events List ─────────────────────────────────────────────────────────── */
function EventsList({ token, refresh, setRefresh, addToast }) {
  const { get, del } = useApi(token);
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    get('/events/all')
      .then(data => setEvents(Array.isArray(data) ? data : data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await del(`/events/${id}`);
      setEvents(prev => prev.filter(e => e._id !== id));
      addToast({ type: 'success', message: 'Event deleted.' });
    } catch {
      addToast({ type: 'error', message: 'Failed to delete event.' });
    }
  };

  if (loading) return <div className="loading-state"><Loader2 size={24} className="spin" /> Loading events…</div>;
  if (!events.length) return <div className="empty-state">No events yet. Create one above!</div>;

  return (
    <div className="events-grid">
      {events.map(ev => (
        <div key={ev._id} className="event-card glass">
          {ev.imageUrl
            ? <img src={ev.imageUrl} alt={ev.title} className="event-card-img" />
            : <div className="event-card-no-img"><Image size={32} /></div>}
          <div className="event-card-body">
            <h4 className="event-card-title">{ev.title}</h4>
            <div className="event-card-date">
              <CalendarDays size={13} />
              {new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            {ev.description && <p className="event-card-desc">{ev.description}</p>}
          </div>
          <button className="event-delete-btn" onClick={() => deleteEvent(ev._id)} title="Delete event">
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
function Sidebar({ active, setActive, onLogout, user }) {
  const items = [
    { id: 'events', label: 'Events',  Icon: CalendarDays },
    { id: 'media',  label: 'Media',   Icon: Image },
  ];

  return (
    <aside className="admin-sidebar glass">
      <div className="sidebar-brand">
        <img src="/logo.jpg" alt="Elevate" className="sidebar-logo" />
        <div>
          <span className="sidebar-title">Elevate</span>
          <span className="sidebar-role">Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Content</div>
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sidebar-item ${active === id ? 'active' : ''}`}
            onClick={() => setActive(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-user">
        <img src={user?.picture || '/logo.jpg'} alt={user?.name} className="user-avatar" />
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <span className="user-email">{user?.email}</span>
        </div>
        <button className="logout-btn" onClick={onLogout} title="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

/* ── Main dashboard ──────────────────────────────────────────────────────── */
function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [active,  setActive]  = useState('events');
  const [refresh, setRefresh] = useState(0);
  const [toasts,  setToasts]  = useState([]);

  const addToast = (t) => setToasts(p => [...p, { ...t, id: Date.now() }]);
  const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

  const handleLogout = () => { logout(); navigate('/'); };

  const handleEventCreated = (ev) => {
    addToast({ type: 'success', message: `Event "${ev.title}" created!` });
    setRefresh(r => r + 1);
  };

  return (
    <div className="admin-layout">
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} user={user} />

      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">
              {active === 'events' ? 'Event Management' : 'Media Library'}
            </h1>
            <p className="admin-page-sub">
              {active === 'events'
                ? 'Create, view, and manage campus events with Cloudinary image uploads.'
                : 'Browse all uploaded media assets.'}
            </p>
          </div>
          <div className="admin-badge">
            <LayoutDashboard size={14} />
            <span>Admin Dashboard</span>
          </div>
        </div>

        {/* Content */}
        {active === 'events' && (
          <>
            <EventForm token={token} onCreated={handleEventCreated} />
            <div className="section-divider">
              <h3 className="section-label">All Events</h3>
            </div>
            <EventsList token={token} refresh={refresh} setRefresh={setRefresh} addToast={addToast} />
          </>
        )}

        {active === 'media' && (
          <div className="placeholder-panel glass">
            <Image size={40} className="placeholder-icon" />
            <p>Media library coming soon.</p>
          </div>
        )}
      </main>

      {/* Toast stack */}
      <div className="toast-stack">
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}
