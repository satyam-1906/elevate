import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AdminGuard from '../AdminGuard';
import {
  LayoutDashboard, CalendarDays, Image, LogOut, Upload,
  Trash2, Plus, X, CheckCircle, AlertCircle, Loader2, Edit3, Eye, Info, BookOpen
} from 'lucide-react';
import { ResourceForm, ResourcesList } from './AdminResources';
import './AdminDashboard.css';

const API = import.meta.env.VITE_API_URL;

/* ── API helper ──────────────────────────────────────────────────────────── */
export function useApi(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const get = (path) =>
    fetch(`${API}${path}`, { headers }).then(r => r.json());

  const post = (path, formData) =>
    fetch(`${API}${path}`, { method: 'POST', headers, body: formData }).then(r => r.json());

  const put = (path, formData) =>
    fetch(`${API}${path}`, { method: 'PUT', headers, body: formData }).then(r => r.json());

  const del = (path) =>
    fetch(`${API}${path}`, { method: 'DELETE', headers }).then(r => r.json());

  return { get, post, put, del };
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

/* ── Helper: validate image file ─────────────────────────────────────────── */
export function validateImageFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid format. Only JPG, PNG, and WebP images are allowed.' };
  }
  // 5MB limit
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { error: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds maximum allowed limit of 5 MB.` };
  }
  // Warning if > 2MB
  let warning = null;
  if (file.size > 2 * 1024 * 1024) {
    warning = `File is ${(file.size / (1024 * 1024)).toFixed(1)} MB. For optimal page speed, 1–2 MB is recommended.`;
  }
  return { error: null, warning };
}

/* ── Event Form (create) ─────────────────────────────────────────────────── */
function EventForm({ token, onCreated }) {
  const { post } = useApi(token);
  const [form, setForm]       = useState({ title: '', date: '', description: '' });
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [warning, setWarning] = useState('');
  const fileRef               = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const check = validateImageFile(f);
    if (check.error) {
      setError(check.error);
      setWarning('');
      setFile(null);
      setPreview(null);
      return;
    }
    setError('');
    setWarning(check.warning || '');
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
      setFile(null); setPreview(null); setWarning('');
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
            placeholder="e.g. Web3 & AI Hackathon 2026" className="form-input" />
        </div>

        {/* Date */}
        <div className="form-field">
          <label>Event Date *</label>
          <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            className="form-input" />
        </div>

        {/* Description */}
        <div className="form-field full">
          <label>Description</label>
          <textarea rows={3} value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Event highlights, rules, schedule and prizes..." className="form-input" />
        </div>

        {/* Image upload */}
        <div className="form-field full">
          <div className="upload-header">
            <label>Cover Image (Cloudinary)</label>
            <span className="upload-limits-note">Ideal: 1–2 MB | Max: 5 MB | Max Res: ~1920×1080</span>
          </div>
          <div className="upload-area" onClick={() => fileRef.current.click()}>
            {preview
              ? <img src={preview} alt="preview" className="upload-preview" />
              : <>
                  <Upload size={28} className="upload-icon" />
                  <p>Click or drag to select cover image</p>
                  <span className="upload-hint">Formats: JPG, PNG, WebP (Max 5MB)</span>
                </>}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }} onChange={handleFile} />
          </div>
          {file && (
            <div className="upload-filename">
              <span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
              <button type="button" onClick={() => { setFile(null); setPreview(null); setWarning(''); }}>
                <X size={14} />
              </button>
            </div>
          )}
          {warning && (
            <p className="form-warning"><Info size={14} /> {warning}</p>
          )}
        </div>
      </div>

      {error && <p className="form-error"><AlertCircle size={14} /> {error}</p>}

      <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Plus size={16} />}
        {loading ? 'Creating Event...' : 'Create Event'}
      </button>
    </form>
  );
}

/* ── Edit Event Modal ────────────────────────────────────────────────────── */
function EditEventModal({ event, token, onClose, onUpdated }) {
  const { put } = useApi(token);
  const [form, setForm] = useState({
    title: event.title || '',
    date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
    description: event.description || '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(event.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const check = validateImageFile(f);
    if (check.error) {
      setError(check.error);
      setWarning('');
      return;
    }
    setError('');
    setWarning(check.warning || '');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      setError('Title and date are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('date', form.date);
      fd.append('description', form.description);
      if (file) fd.append('image', file);

      const data = await put(`/events/${event._id}`, fd);
      if (data.error) throw new Error(data.error);
      onUpdated(data.event);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass">
        <div className="modal-header">
          <h3 className="modal-title"><Edit3 size={18} /> Edit Event</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleUpdate} className="modal-form">
          <div className="form-field">
            <label>Event Title *</label>
            <input
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label>Event Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <div className="upload-header">
              <label>Cover Image</label>
              <span className="upload-limits-note">Ideal: 1–2 MB | Max: 5 MB</span>
            </div>
            <div className="upload-area edit-upload-area" onClick={() => fileRef.current.click()}>
              {preview ? (
                <img src={preview} alt="preview" className="upload-preview" />
              ) : (
                <>
                  <Upload size={24} className="upload-icon" />
                  <p>Click to replace cover image</p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: 'none' }}
                onChange={handleFile}
              />
            </div>
            {file && (
              <div className="upload-filename">
                <span>New image: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                <button type="button" onClick={() => { setFile(null); setPreview(event.imageUrl || null); setWarning(''); }}>
                  <X size={14} />
                </button>
              </div>
            )}
            {warning && <p className="form-warning"><Info size={14} /> {warning}</p>}
          </div>

          {error && <p className="form-error"><AlertCircle size={14} /> {error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Loader2 size={16} className="spin" /> : <CheckCircle size={16} />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Events List ─────────────────────────────────────────────────────────── */
function EventsList({ token, refresh, setRefresh, addToast }) {
  const { get, del } = useApi(token);
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    setLoading(true);
    get('/events/all')
      .then(data => setEvents(Array.isArray(data) ? data : data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const deleteEvent = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete event "${title}"?`)) return;
    try {
      await del(`/events/${id}`);
      setEvents(prev => prev.filter(e => e._id !== id));
      addToast({ type: 'success', message: `Event "${title}" deleted.` });
    } catch {
      addToast({ type: 'error', message: 'Failed to delete event.' });
    }
  };

  const handleUpdated = (updatedEv) => {
    setEvents(prev => prev.map(e => (e._id === updatedEv._id ? updatedEv : e)));
    addToast({ type: 'success', message: `Event "${updatedEv.title}" updated successfully.` });
    setRefresh(r => r + 1);
  };

  if (loading) return <div className="loading-state"><Loader2 size={24} className="spin" /> Loading events…</div>;
  if (!events.length) return <div className="empty-state">No events yet. Create one above!</div>;

  return (
    <>
      <div className="events-grid">
        {events.map(ev => {
          const evDate = new Date(ev.date);
          const now = new Date();
          const isToday = evDate.toDateString() === now.toDateString();
          const isPast = evDate < now && !isToday;
          const status = isToday ? 'Ongoing' : isPast ? 'Past' : 'Upcoming';
          const statusClass = isToday ? 'status-ongoing' : isPast ? 'status-past' : 'status-upcoming';

          return (
            <div key={ev._id} className="event-card glass">
              {ev.imageUrl
                ? <img src={ev.imageUrl} alt={ev.title} className="event-card-img" />
                : <div className="event-card-no-img"><Image size={32} /></div>}
              
              <div className={`event-status-badge ${statusClass}`}>{status}</div>

              <div className="event-card-body">
                <h4 className="event-card-title">{ev.title}</h4>
                <div className="event-card-date">
                  <CalendarDays size={13} />
                  {evDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                {ev.description && <p className="event-card-desc">{ev.description}</p>}
              </div>

              <div className="event-card-actions">
                <button
                  className="event-btn edit"
                  onClick={() => setEditingEvent(ev)}
                  title="Edit event"
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button
                  className="event-btn delete"
                  onClick={() => deleteEvent(ev._id, ev.title)}
                  title="Delete event"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          token={token}
          onClose={() => setEditingEvent(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
function Sidebar({ active, setActive, onLogout, user }) {
  const items = [
    { id: 'events', label: 'Events',  Icon: CalendarDays },
    { id: 'resources', label: 'Knowledge Hub', Icon: BookOpen },
    { id: 'media',  label: 'Media',   Icon: Image },
  ];

  return (
    <aside className="admin-sidebar glass">
      <div className="sidebar-brand">
        <img src="/logo.jpg" alt="Elevate" className="sidebar-logo" />
        <div>
          <span className="sidebar-title">Elevate</span>
          <span className="sidebar-role">Admin Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Management</div>
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
    addToast({ type: 'success', message: `Event "${ev.title}" created successfully!` });
    setRefresh(r => r + 1);
  };

  const handleResourceCreated = (res) => {
    addToast({ type: 'success', message: `Resource "${res.title}" created successfully!` });
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
              {active === 'events' ? 'Event Management' : active === 'resources' ? 'Knowledge Hub' : 'Media Library'}
            </h1>
            <p className="admin-page-sub">
              {active === 'events'
                ? 'Create, edit, delete, and manage campus events with Cloudinary image processing.'
                : active === 'resources'
                ? 'Manage resources, tutorials, and guides for the Knowledge Hub.'
                : 'Browse and manage uploaded assets.'}
            </p>
          </div>
          <div className="admin-badge">
            <LayoutDashboard size={14} />
            <span>Admin Clearance</span>
          </div>
        </div>

        {/* Content */}
        {active === 'events' && (
          <>
            <EventForm token={token} onCreated={handleEventCreated} />
            <div className="section-divider">
              <h3 className="section-label">All Published Events</h3>
            </div>
            <EventsList token={token} refresh={refresh} setRefresh={setRefresh} addToast={addToast} />
          </>
        )}

        {active === 'resources' && (
          <>
            <ResourceForm token={token} onCreated={handleResourceCreated} />
            <div className="section-divider">
              <h3 className="section-label">All Resources</h3>
            </div>
            <ResourcesList token={token} refresh={refresh} setRefresh={setRefresh} addToast={addToast} />
          </>
        )}

        {active === 'media' && (
          <div className="placeholder-panel glass">
            <Image size={40} className="placeholder-icon" />
            <p>Media library is under development.</p>
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

