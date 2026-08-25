import { useState, useEffect, useRef } from 'react';
import {
  Upload, Trash2, Plus, X, CheckCircle, AlertCircle, Loader2, Edit3, Info, BookOpen
} from 'lucide-react';
import { useApi, validateImageFile } from './AdminDashboard';

/* ── Resource Form (create) ─────────────────────────────────────────────────── */
export function ResourceForm({ token, onCreated }) {
  const { post } = useApi(token);
  const [form, setForm] = useState({
    title: '', description: '', domain: 'Web2', category: '', difficulty: 'Beginner', tags: '', url: '', isPublished: true
  });
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
      setError(check.error); setWarning(''); setFile(null); setPreview(null); return;
    }
    setError(''); setWarning(check.warning || ''); setFile(f); setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.domain) { setError('Title and domain are required'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      Object.keys(form).forEach(key => fd.append(key, form[key]));
      if (file) fd.append('image', file);

      const data = await post('/resources', fd);
      if (data.error) throw new Error(data.error);
      setForm({ title: '', description: '', domain: 'Web2', category: '', difficulty: 'Beginner', tags: '', url: '', isPublished: true });
      setFile(null); setPreview(null); setWarning('');
      onCreated(data.resource);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="event-form glass" onSubmit={handleSubmit}>
      <h3 className="form-title"><Plus size={18} /> Create Resource</h3>
      <div className="form-grid">
        <div className="form-field full">
          <label>Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="form-input" required />
        </div>
        <div className="form-field">
          <label>Domain *</label>
          <select value={form.domain} onChange={e => setForm(p => ({ ...p, domain: e.target.value }))} className="form-input">
            <option>Web2</option>
            <option>Web3</option>
            <option>AI/ML</option>
            <option>Cyber Security</option>
            <option>App Development</option>
            <option>Open Source</option>
          </select>
        </div>
        <div className="form-field">
          <label>Category</label>
          <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Course, Documentation" className="form-input" />
        </div>
        <div className="form-field">
          <label>Difficulty</label>
          <select value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))} className="form-input">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="form-field">
          <label>Tags (comma separated)</label>
          <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="React, Node.js" className="form-input" />
        </div>
        <div className="form-field full">
          <label>Description</label>
          <textarea rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="form-input" />
        </div>
        <div className="form-field full">
          <label>URL / Link</label>
          <input type="url" value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://..." className="form-input" />
        </div>
        <div className="form-field full">
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} />
            Published (visible to users)
          </label>
        </div>
        <div className="form-field full">
          <div className="upload-header">
            <label>Thumbnail Image</label>
          </div>
          <div className="upload-area" onClick={() => fileRef.current.click()}>
            {preview ? <img src={preview} alt="preview" className="upload-preview" /> : <><Upload size={28} className="upload-icon" /><p>Click or drag to select image</p></>}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleFile} />
          </div>
          {file && (
            <div className="upload-filename">
              <span>{file.name}</span>
              <button type="button" onClick={() => { setFile(null); setPreview(null); }}><X size={14} /></button>
            </div>
          )}
        </div>
      </div>
      {error && <p className="form-error"><AlertCircle size={14} /> {error}</p>}
      <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Plus size={16} />}
        {loading ? 'Creating...' : 'Create Resource'}
      </button>
    </form>
  );
}

/* ── Edit Resource Modal ────────────────────────────────────────────────────── */
function EditResourceModal({ resource, token, onClose, onUpdated }) {
  const { put } = useApi(token);
  const [form, setForm] = useState({
    title: resource.title || '', description: resource.description || '', domain: resource.domain || 'Web2',
    category: resource.category || '', difficulty: resource.difficulty || 'Beginner',
    tags: resource.tags ? resource.tags.join(', ') : '', url: resource.url || '', isPublished: resource.isPublished !== false
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(resource.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const check = validateImageFile(f);
    if (check.error) { setError(check.error); return; }
    setError(''); setFile(f); setPreview(URL.createObjectURL(f));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.domain) { setError('Title and domain are required'); return; }
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      Object.keys(form).forEach(key => fd.append(key, form[key]));
      if (file) fd.append('image', file);

      const data = await put(`/resources/${resource._id}`, fd);
      if (data.error) throw new Error(data.error);
      onUpdated(data.resource);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <h3 className="modal-title"><Edit3 size={18} /> Edit Resource</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleUpdate} className="modal-form">
          <div className="form-field"><label>Title *</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="form-input" required /></div>
          <div className="form-field"><label>Domain *</label><select value={form.domain} onChange={e => setForm(p => ({ ...p, domain: e.target.value }))} className="form-input"><option>Web2</option><option>Web3</option><option>AI/ML</option><option>Cyber Security</option><option>App Development</option><option>Open Source</option></select></div>
          <div className="form-field"><label>Category</label><input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="form-input" /></div>
          <div className="form-field"><label>Difficulty</label><select value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))} className="form-input"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
          <div className="form-field"><label>Tags</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className="form-input" /></div>
          <div className="form-field"><label>URL</label><input type="url" value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} className="form-input" /></div>
          <div className="form-field"><label>Description</label><textarea rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="form-input" /></div>
          <div className="form-field"><label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} /> Published</label></div>
          <div className="form-field">
            <label>Thumbnail Image</label>
            <div className="upload-area edit-upload-area" onClick={() => fileRef.current.click()}>
              {preview ? <img src={preview} alt="preview" className="upload-preview" /> : <><Upload size={24} className="upload-icon" /><p>Click to replace image</p></>}
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleFile} />
            </div>
          </div>
          {error && <p className="form-error"><AlertCircle size={14} /> {error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Resources List ─────────────────────────────────────────────────────────── */
export function ResourcesList({ token, refresh, setRefresh, addToast }) {
  const { get, del } = useApi(token);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    setLoading(true);
    get('/resources/all')
      .then(data => setResources(Array.isArray(data) ? data : data.resources || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, [refresh]);

  const deleteResource = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete resource "${title}"?`)) return;
    try {
      await del(`/resources/${id}`);
      setResources(prev => prev.filter(r => r._id !== id));
      addToast({ type: 'success', message: `Resource "${title}" deleted.` });
    } catch {
      addToast({ type: 'error', message: 'Failed to delete resource.' });
    }
  };

  const handleUpdated = (updatedRes) => {
    setResources(prev => prev.map(r => (r._id === updatedRes._id ? updatedRes : r)));
    addToast({ type: 'success', message: `Resource "${updatedRes.title}" updated successfully.` });
    setRefresh(r => r + 1);
  };

  if (loading) return <div className="loading-state"><Loader2 size={24} className="spin" /> Loading resources…</div>;
  if (!resources.length) return <div className="empty-state">No resources yet. Create one above!</div>;

  return (
    <>
      <div className="events-grid">
        {resources.map(res => (
          <div key={res._id} className="event-card glass">
            {res.imageUrl
              ? <img src={res.imageUrl} alt={res.title} className="event-card-img" />
              : <div className="event-card-no-img"><BookOpen size={32} /></div>}
            
            <div className={`event-status-badge ${res.isPublished ? 'status-ongoing' : 'status-past'}`}>
              {res.isPublished ? 'Published' : 'Draft'}
            </div>

            <div className="event-card-body">
              <h4 className="event-card-title">{res.title}</h4>
              <div className="event-card-date">
                <span>{res.domain} • {res.difficulty}</span>
              </div>
              {res.description && <p className="event-card-desc">{res.description}</p>}
            </div>

            <div className="event-card-actions">
              <button className="event-btn edit" onClick={() => setEditingResource(res)} title="Edit resource">
                <Edit3 size={14} /> Edit
              </button>
              <button className="event-btn delete" onClick={() => deleteResource(res._id, res.title)} title="Delete resource">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingResource && (
        <EditResourceModal
          resource={editingResource}
          token={token}
          onClose={() => setEditingResource(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  );
}
