import { useState, useEffect, useRef } from 'react';
import {
  Trophy, Upload, Trash2, Plus, X, AlertCircle, Loader2, Edit3,
  CalendarDays, Award
} from 'lucide-react';
import { useApi, validateImageFile } from './AdminDashboard';

const CATEGORIES = [
  'Hackathon',
  'Web2',
  'Web3',
  'AI/ML',
  'Cyber Security',
  'App Dev',
  'Open Source',
  'Competitive Programming',
  'Workshop',
  'General'
];

const POSITION_SUGGESTIONS = [
  '1st Place',
  '2nd Place',
  '3rd Place',
  'Winner',
  'Runner Up',
  'Special Mention',
  'Best Innovation',
  'Best UI/UX'
];

/* ── Winner Input Row ──────────────────────────────────────────────────────── */
function WinnerRow({ winner, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, { ...winner, [field]: value });
  };

  return (
    <div className="admin-winner-card glass" style={{
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      background: 'rgba(255, 255, 255, 0.02)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--accent)', fontSize: '13px' }}>
          <Award size={15} />
          <span>Winner #{index + 1}</span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="event-btn delete"
          style={{ padding: '4px 8px', fontSize: '12px', flex: 'none' }}
          title="Remove this winner"
        >
          <X size={14} /> Remove
        </button>
      </div>

      <div className="form-grid" style={{ gap: '10px' }}>
        <div className="form-field">
          <label>Position / Rank *</label>
          <input
            list={`positions-${index}`}
            value={winner.position || ''}
            onChange={(e) => updateField('position', e.target.value)}
            placeholder="e.g. 1st Place, Winner"
            className="form-input"
            required
          />
          <datalist id={`positions-${index}`}>
            {POSITION_SUGGESTIONS.map((pos) => (
              <option key={pos} value={pos} />
            ))}
          </datalist>
        </div>

        <div className="form-field">
          <label>Winner / Team Name *</label>
          <input
            value={winner.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g. Team NeuroPulse or Alex Chen"
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label>Project / Solution Title</label>
          <input
            value={winner.projectTitle || ''}
            onChange={(e) => updateField('projectTitle', e.target.value)}
            placeholder="e.g. PulseNet - Distributed AI Engine"
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label>Prize / Reward</label>
          <input
            value={winner.prize || ''}
            onChange={(e) => updateField('prize', e.target.value)}
            placeholder="e.g. ₹30,000, Trophy, Goodies"
            className="form-input"
          />
        </div>

        <div className="form-field full">
          <label>Project URL / GitHub</label>
          <input
            type="url"
            value={winner.projectUrl || ''}
            onChange={(e) => updateField('projectUrl', e.target.value)}
            placeholder="https://github.com/..."
            className="form-input"
          />
        </div>

        <div className="form-field full">
          <label>Team Members (comma separated)</label>
          <input
            value={Array.isArray(winner.members) ? winner.members.join(', ') : (winner.members || '')}
            onChange={(e) => updateField('members', e.target.value.split(',').map(m => m.trim()).filter(Boolean))}
            placeholder="e.g. Aarav Sharma, Meera Patel, Rohan Sen"
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Hall of Fame Create Form ──────────────────────────────────────────────── */
export function HallOfFameForm({ token, onCreated }) {
  const { post } = useApi(token);
  const [form, setForm] = useState({
    eventName: '',
    date: '',
    category: 'Hackathon',
    description: '',
    bannerUrl: '',
    isPublished: true
  });
  const [winners, setWinners] = useState([
    { position: '1st Place', name: '', projectTitle: '', prize: '', projectUrl: '', members: [] }
  ]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
      setFile(null);
      setPreview(null);
      return;
    }
    setError('');
    setWarning(check.warning || '');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleAddWinner = () => {
    const nextRank = winners.length === 1 ? '2nd Place' : winners.length === 2 ? '3rd Place' : 'Special Mention';
    setWinners(prev => [
      ...prev,
      { position: nextRank, name: '', projectTitle: '', prize: '', projectUrl: '', members: [] }
    ]);
  };

  const handleWinnerChange = (index, updated) => {
    setWinners(prev => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
  };

  const handleRemoveWinner = (index) => {
    setWinners(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.eventName.trim() || !form.date) {
      setError('Event name and date are required.');
      return;
    }

    // Validate winners: require name if a winner exists
    const validWinners = winners.filter(w => w.name && w.name.trim());

    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('eventName', form.eventName.trim());
      fd.append('date', form.date);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('isPublished', form.isPublished);
      if (form.bannerUrl) fd.append('bannerUrl', form.bannerUrl);
      if (file) fd.append('banner', file);
      fd.append('winners', JSON.stringify(validWinners));

      const data = await post('/hall-of-fame', fd);
      if (data.error) throw new Error(data.error);

      // Reset form
      setForm({
        eventName: '',
        date: '',
        category: 'Hackathon',
        description: '',
        bannerUrl: '',
        isPublished: true
      });
      setWinners([
        { position: '1st Place', name: '', projectTitle: '', prize: '', projectUrl: '', members: [] }
      ]);
      setFile(null);
      setPreview(null);
      setWarning('');
      if (fileRef.current) fileRef.current.value = '';

      onCreated(data.item);
    } catch (err) {
      setError(err.message || 'Failed to create Hall of Fame entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="event-form glass" onSubmit={handleSubmit}>
      <h3 className="form-title">
        <Trophy size={18} /> Add Event to Hall of Fame
      </h3>

      <div className="form-grid">
        <div className="form-field full">
          <label>Event Name *</label>
          <input
            value={form.eventName}
            onChange={e => setForm(p => ({ ...p, eventName: e.target.value }))}
            placeholder="e.g. Elevate Inceptum Hackathon 2026"
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label>Conducted Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label>Category / Track</label>
          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className="form-input"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-field full">
          <label>Short Description of Event</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Provide a brief summary of the event, themes, challenges, or participant turnout..."
            className="form-input"
          />
        </div>

        {/* Banner image upload / URL */}
        <div className="form-field full">
          <div className="upload-header">
            <label>Event Banner Picture</label>
            <span className="upload-limits-note">JPG, PNG, WebP up to 5MB</span>
          </div>

          <div className="upload-area" onClick={() => fileRef.current?.click()}>
            {preview ? (
              <img src={preview} alt="Banner Preview" className="upload-preview" />
            ) : form.bannerUrl ? (
              <img src={form.bannerUrl} alt="Banner URL Preview" className="upload-preview" />
            ) : (
              <>
                <Upload size={28} className="upload-icon" />
                <p>Click or drag to upload event banner picture</p>
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
              <span>{file.name}</span>
              <button type="button" onClick={() => { setFile(null); setPreview(null); }}>
                <X size={14} />
              </button>
            </div>
          )}

          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Or provide an external Image URL:</span>
            <input
              type="url"
              value={form.bannerUrl}
              onChange={e => setForm(p => ({ ...p, bannerUrl: e.target.value }))}
              placeholder="https://..."
              className="form-input"
              style={{ marginTop: '4px' }}
            />
          </div>
        </div>

        {/* Winners Section */}
        <div className="form-field full" style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              🏆 Event Winners & Podium
            </label>
            <button
              type="button"
              onClick={handleAddWinner}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={14} /> Add Another Winner
            </button>
          </div>

          {winners.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No winners added yet. Click &quot;Add Another Winner&quot; to mention champions.
            </p>
          ) : (
            winners.map((winner, idx) => (
              <WinnerRow
                key={idx}
                winner={winner}
                index={idx}
                onChange={handleWinnerChange}
                onRemove={handleRemoveWinner}
              />
            ))
          )}
        </div>

        <div className="form-field full">
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))}
            />
            <span>Published (visible publicly in Hall of Fame)</span>
          </label>
        </div>
      </div>

      {warning && (
        <p className="form-warning" style={{ color: 'var(--warning)', fontSize: '12px', marginTop: '8px' }}>
          <AlertCircle size={14} /> {warning}
        </p>
      )}

      {error && (
        <p className="form-error" style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary submit-btn" disabled={loading} style={{ marginTop: '16px' }}>
        {loading ? <Loader2 size={16} className="spin" /> : <Trophy size={16} />}
        {loading ? 'Adding to Hall of Fame...' : 'Publish to Hall of Fame'}
      </button>
    </form>
  );
}

/* ── Edit Hall of Fame Modal ───────────────────────────────────────────────── */
export function EditHallOfFameModal({ event, token, onClose, onUpdated }) {
  const { put } = useApi(token);
  const [form, setForm] = useState({
    eventName: event.eventName || '',
    date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
    category: event.category || 'Hackathon',
    description: event.description || '',
    bannerUrl: event.bannerUrl || '',
    isPublished: event.isPublished !== undefined ? event.isPublished : true
  });
  const [winners, setWinners] = useState(
    Array.isArray(event.winners) && event.winners.length > 0 ? event.winners : []
  );
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(event.bannerUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const check = validateImageFile(f);
    if (check.error) {
      setError(check.error);
      return;
    }
    setError('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleAddWinner = () => {
    setWinners(prev => [
      ...prev,
      { position: 'Runner Up', name: '', projectTitle: '', prize: '', projectUrl: '', members: [] }
    ]);
  };

  const handleWinnerChange = (index, updated) => {
    setWinners(prev => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
  };

  const handleRemoveWinner = (index) => {
    setWinners(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.eventName.trim() || !form.date) {
      setError('Event name and date are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('eventName', form.eventName.trim());
      fd.append('date', form.date);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('isPublished', form.isPublished);
      if (form.bannerUrl) fd.append('bannerUrl', form.bannerUrl);
      if (file) fd.append('banner', file);
      fd.append('winners', JSON.stringify(winners));

      const data = await put(`/hall-of-fame/${event._id}`, fd);
      if (data.error) throw new Error(data.error);

      onUpdated(data.item);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update Hall of Fame entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <Edit3 size={18} /> Edit Hall of Fame Event
          </h3>
          <button onClick={onClose} className="modal-close"><X size={18} /></button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-field full">
            <label>Event Name *</label>
            <input
              value={form.eventName}
              onChange={e => setForm(p => ({ ...p, eventName: e.target.value }))}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-field">
              <label>Conducted Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="form-input"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field full">
            <label>Short Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="form-input"
            />
          </div>

          <div className="form-field full">
            <label>Banner Image</label>
            <div className="upload-area edit-upload-area" onClick={() => fileRef.current?.click()}>
              {preview ? (
                <img src={preview} alt="Banner" className="upload-preview" />
              ) : (
                <>
                  <Upload size={24} className="upload-icon" />
                  <p>Click to replace banner image</p>
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
          </div>

          <div className="form-field full">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                🏆 Winners ({winners.length})
              </label>
              <button
                type="button"
                onClick={handleAddWinner}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '12px' }}
              >
                <Plus size={13} /> Add Winner
              </button>
            </div>

            {winners.map((winner, idx) => (
              <WinnerRow
                key={idx}
                winner={winner}
                index={idx}
                onChange={handleWinnerChange}
                onRemove={handleRemoveWinner}
              />
            ))}
          </div>

          <div className="form-field full">
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))}
              />
              <span>Published publicly in Hall of Fame</span>
            </label>
          </div>

          {error && (
            <p className="form-error" style={{ color: 'var(--error)', fontSize: '13px' }}>
              <AlertCircle size={14} /> {error}
            </p>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Loader2 size={16} className="spin" /> : <Edit3 size={16} />}
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Hall of Fame List (Admin View) ────────────────────────────────────────── */
export function HallOfFameList({ token, refresh, setRefresh, addToast }) {
  const { get, del } = useApi(token);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    get('/hall-of-fame?all=true')
      .then(data => {
        if (!unmounted) {
          setItems(Array.isArray(data) ? data : []);
        }
      })
      .catch(err => {
        console.error('Failed to fetch Hall of Fame items:', err);
      })
      .finally(() => {
        if (!unmounted) setLoading(false);
      });

    return () => { unmounted = true; };
  }, [refresh]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from the Hall of Fame?`)) {
      return;
    }
    try {
      const res = await del(`/hall-of-fame/${id}`);
      if (res.error) throw new Error(res.error);
      addToast({ type: 'success', message: `Deleted "${title}" successfully.` });
      setRefresh(r => r + 1);
    } catch (err) {
      addToast({ type: 'error', message: err.message || 'Failed to delete.' });
    }
  };

  const handleUpdated = (updated) => {
    addToast({ type: 'success', message: `Updated "${updated.eventName}" successfully.` });
    setRefresh(r => r + 1);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <Loader2 size={24} className="spin" />
        <span>Loading Hall of Fame events...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <Trophy size={40} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
        <p>No events in Hall of Fame yet. Use the form above to add an event with winners!</p>
      </div>
    );
  }

  return (
    <>
      <div className="events-grid">
        {items.map((item) => {
          const itemDate = new Date(item.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          return (
            <div key={item._id} className="event-card glass">
              {item.bannerUrl ? (
                <img src={item.bannerUrl} alt={item.eventName} className="event-card-img" />
              ) : (
                <div className="event-card-no-img">
                  <Trophy size={32} />
                </div>
              )}

              <div className="event-status-badge status-upcoming" style={{
                background: item.isPublished ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                borderColor: item.isPublished ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)',
                color: item.isPublished ? '#4ade80' : '#f87171'
              }}>
                {item.isPublished ? 'Live' : 'Hidden'}
              </div>

              <div className="event-card-body">
                <span className="event-card-date">
                  <CalendarDays size={13} />
                  <span>{itemDate}</span>
                  <span style={{ margin: '0 4px', opacity: 0.5 }}>•</span>
                  <span>{item.category || 'Event'}</span>
                </span>

                <h4 className="event-card-title">{item.eventName}</h4>

                {item.description && (
                  <p className="event-card-desc" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.description}
                  </p>
                )}

                {/* Winners summary badge */}
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Award size={12} />
                    <span>{item.winners?.length || 0} Winners Recorded</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {item.winners?.slice(0, 3).map((w, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {w.position}: {w.name}
                      </span>
                    ))}
                    {(item.winners?.length || 0) > 3 && (
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        +{item.winners.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="event-card-actions">
                <button
                  className="event-btn edit"
                  onClick={() => setEditingItem(item)}
                  title="Edit event and winners"
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button
                  className="event-btn delete"
                  onClick={() => handleDelete(item._id, item.eventName)}
                  title="Delete event"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingItem && (
        <EditHallOfFameModal
          event={editingItem}
          token={token}
          onClose={() => setEditingItem(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  );
}
