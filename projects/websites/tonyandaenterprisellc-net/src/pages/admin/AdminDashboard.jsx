import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Trash2, Image, LogOut, RefreshCw, 
  Check, X, Crown, AlertTriangle, Copy, ArrowRight,
  Layout, Settings, Eye, Link
} from 'lucide-react';
import './Admin.css';

const API_BASE = '/api';

const WEBSITE_IMAGES = [
  { id: 'logo', name: 'Website Logo', currentImage: '/logo.png', path: 'public/logo.png', description: 'Main logo displayed in header and footer' },
  { id: 'home-health-care', name: 'Home Health Care', currentImage: '/home-health-care.jpg', path: 'public/home-health-care.jpg', description: 'Image on Home page for non-medical home care section' },
  { id: 'medical-care', name: 'Medical Care', currentImage: '/medical-care.jpg', path: 'public/medical-care.jpg', description: 'Image on Medical Courier page' },
  { id: 'non-medical-care', name: 'Non-Medical Home Care', currentImage: '/non-medical-care.jpg', path: 'public/non-medical-care.jpg', description: 'Featured image on Medical Courier page for non-medical care section' },
  { id: 'private-security', name: 'Private Security', currentImage: '/private-security.jpg', path: 'public/private-security.jpg', description: 'Featured image on Private Security page header and section' },
];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('images');
  const [selectedImage, setSelectedImage] = useState(null);
  const [contentText, setContentText] = useState('');
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    if (!token || !userData) {
      navigate('/admin');
      return null;
    }
    return { token, user: JSON.parse(userData) };
  }, [navigate]);

  const fetchImages = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_BASE}/images?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
      });
      const data = await response.json();
      if (response.ok) {
        setAllImages(data.images || []);
        setImages((data.images || []).filter(img => !img.source));
      }
    } catch (_err) {
      setError('Failed to load images');
    }
  }, []);

  useEffect(() => {
    const auth = checkAuth();
    if (auth) {
      setUser(auth.user);
      fetchImages(auth.token);
      const interval = setInterval(() => fetchImages(auth.token), 30000);
      setLoading(false);
      return () => clearInterval(interval);
    }
  }, [checkAuth, fetchImages]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (activeTab === 'content' && token) {
      setContentLoading(true);
      fetch(`${API_BASE}/content`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to load content');
          return response.json();
        })
        .then((data) => {
          setContentText(JSON.stringify(data, null, 2));
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setContentLoading(false);
        });
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem('adminToken');
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`${API_BASE}/upload-image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
        body: formData
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (data.name && data.url) {
        const uploadedImage = {
          id: data.name.replace(/\.[^.]+$/, ''),
          name: data.name,
          originalName: data.originalName || null,
          url: data.url,
          size: file.size,
          modified: Date.now(),
        };
        setAllImages((current) => [uploadedImage, ...current.filter((img) => img.name !== uploadedImage.name)]);
        setImages((current) => [uploadedImage, ...current.filter((img) => img.name !== uploadedImage.name)]);
      }
      setSuccess('Image uploaded successfully');
      await fetchImages(token);
      setTimeout(() => setSuccess(''), 3000);
    } catch (_err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (name) => {
    if (!confirm(`Delete ${name}?`)) return;
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE}/images/${encodeURIComponent(name)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      fetchImages(token);
      setSuccess('Image deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (_err) {
      setError(err.message);
    }
  };

  const handlePromote = async (name) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE}/images/${encodeURIComponent(name)}/promote`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      fetchImages(token);
      setSuccess('Image promoted to website');
      setTimeout(() => setSuccess(''), 3000);
    } catch (_err) {
      setError(err.message);
    }
  };

  const handleAssignImage = async (slot, imageName) => {
    const token = localStorage.getItem('adminToken');
    const slotInfo = WEBSITE_IMAGES.find(s => s.id === slot);
    try {
      const response = await fetch(`${API_BASE}/images/${encodeURIComponent(imageName)}/replace`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ targetPath: slotInfo.path })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSuccess(`Updated ${slotInfo.name} image`);
      fetchImages(token);
      setShowAssignModal(false);
      setSelectedSlot(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (_err) {
      setError(err.message);
    }
  };

  // Direct upload to replace a site-managed image
  const handleReplaceSiteImage = async (imageId, file) => {
    const token = localStorage.getItem('adminToken');
    const slotInfo = WEBSITE_IMAGES.find(s => s.id === imageId);
    
    console.log('Uploading image:', { imageId, fileName: file.name, fileSize: file.size, slotInfo });
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch(`${API_BASE}/site-images/${slotInfo.path.split('/').pop()}/replace`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      
      setSuccess(`Successfully replaced ${slotInfo.name} image`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (_err) {
      console.error('Upload error:', err);
      setError(err.message);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };


  const handleSaveContent = async () => {
    const token = localStorage.getItem('adminToken');
    setContentSaving(true);
    setError('');

    try {
      const parsed = JSON.parse(contentText);
      const response = await fetch(`${API_BASE}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save content');
      setContentText(JSON.stringify(data, null, 2));
      setSuccess('Website content saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (_err) {
      setError(err.message || 'Invalid JSON');
    } finally {
      setContentSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="admin-loading">
        <RefreshCw className="admin-spin" size={48} />
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <Image size={32} />
          <h1>Admin Panel</h1>
        </div>
        <div className="admin-header-right">
          <div className="admin-user-info">
            <Crown size={20} />
            <span>{user?.username}</span>
          </div>
          <button className="admin-btn admin-btn-secondary" onClick={() => setShowPasswordModal(true)}>
            Change Password
          </button>
          <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {error && (
          <div className="admin-alert admin-alert-error">
            <AlertTriangle size={20} />
            <span>{error}</span>
            <button onClick={() => setError('')}><X size={20} /></button>
          </div>
        )}
        {success && (
          <div className="admin-alert admin-alert-success">
            <Check size={20} />
            <span>{success}</span>
            <button onClick={() => setSuccess('')}><X size={20} /></button>
          </div>
        )}

        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'slots' ? 'active' : ''}`} onClick={() => setActiveTab('slots')}>
            <Layout size={20} /> Website Images
          </button>
          <button className={`admin-tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>
            <Image size={20} /> Image Library
          </button>
          <button className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
            <Settings size={20} /> Content JSON
          </button>
        </div>

        {activeTab === 'slots' && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Website Image Management</h2>
              <p className="admin-section-desc">Upload new images directly to replace any website image</p>
            </div>
            <div className="admin-slots-grid">
              {WEBSITE_IMAGES.map(slot => (
                <div key={slot.id} className="admin-slot-card">
                  <div className="admin-slot-header">
                    <h3>{slot.name}</h3>
                  </div>
                  <div className="admin-slot-preview">
                    <img src={slot.currentImage} alt={slot.name} />
                  </div>
                  <div className="admin-slot-info">
                    <p className="admin-slot-path">{slot.path}</p>
                    <p className="admin-slot-desc">{slot.description}</p>
                  </div>
                  <div className="admin-slot-upload">
                    <input 
                      type="file" 
                      id={`upload-${slot.id}`} 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          console.log('File selected:', { name: file.name, size: file.size, type: file.type });
                          handleReplaceSiteImage(slot.id, file);
                        }
                        e.target.value = '';
                      }}
                      hidden
                    />
                    <label htmlFor={`upload-${slot.id}`} className="admin-btn admin-btn-primary admin-btn-small">
                      <Upload size={16} /> Upload New
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'images' && (
          <>
            <section className="admin-section">
              <div className="admin-section-header">
                <h2>Upload New Image</h2>
              </div>
              <div className="admin-upload-area">
                <input type="file" id="image-upload" accept="image/*" onChange={handleUpload} disabled={uploading} hidden />
                <label htmlFor="image-upload" className="admin-upload-label">
                  <Upload size={48} />
                  <p>{uploading ? 'Uploading...' : 'Click or drag image to upload'}</p>
                  <span>JPG, PNG, GIF, WebP (max 20MB)</span>
                </label>
              </div>
            </section>

            <section className="admin-section">
              <div className="admin-section-header">
                <h2>Image Library ({images.length})</h2>
                <p className="admin-section-desc">Newest uploads appear first.</p>
                <button className="admin-btn admin-btn-secondary" onClick={() => fetchImages(localStorage.getItem('adminToken'))}>
                  <RefreshCw size={20} /> Refresh
                </button>
              </div>
              <div className="admin-image-grid">
                {images.map(img => (
                  <div key={img.name} className={`admin-image-card ${selectedImage === img.name ? 'selected' : ''}`} onClick={() => setSelectedImage(selectedImage === img.name ? null : img.name)}>
                    <div className="admin-image-preview">
                      <img src={img.url} alt={img.name} />
                    </div>
                    <div className="admin-image-info">
                      <p className="admin-image-name" title={img.name}>{img.name}</p>
                      {img.originalName && img.originalName !== img.name && (
                        <p className="admin-image-size" title={img.originalName}>Uploaded as: {img.originalName}</p>
                      )}
                      <p className="admin-image-size">{(img.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="admin-image-url">
                      <code>{window.location.origin}{img.url}</code>
                      <button onClick={(e) => { e.stopPropagation(); handleCopyUrl(img.url); }} title="Copy URL">
                        <Copy size={14} />
                      </button>
                      {copiedUrl === img.url && <span className="admin-copied">Copied!</span>}
                    </div>
                    <div className="admin-image-actions">
                      <button className="admin-btn admin-btn-small admin-btn-success" onClick={(e) => { e.stopPropagation(); handlePromote(img.name); }} title="Promote to website">
                        <Crown size={16} />
                      </button>
                      <button className="admin-btn admin-btn-small admin-btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(img.name); }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="admin-empty-state">
                    <Image size={64} />
                    <p>No images uploaded yet</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === 'content' && (
          <section className="admin-section">
            <div className="admin-section-header">
              <div>
                <h2>Website Content</h2>
                <p className="admin-section-desc">Edit the shared site content JSON used by the live frontend.</p>
              </div>
              <button className="admin-btn admin-btn-primary" onClick={handleSaveContent} disabled={contentSaving || contentLoading}>
                {contentSaving ? 'Saving...' : 'Save Content'}
              </button>
            </div>
            {contentLoading ? (
              <div className="admin-empty-state">
                <p>Loading content...</p>
              </div>
            ) : (
              <textarea
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                className="admin-content-editor"
                spellCheck="false"
                rows="28"
              />
            )}
          </section>
        )}
      </main>

      {showAssignModal && selectedSlot && (
        <div className="admin-modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Assign Image to: {WEBSITE_IMAGES.find(s => s.id === selectedSlot)?.name}</h2>
              <button onClick={() => setShowAssignModal(false)}><X size={24} /></button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-assign-desc">{WEBSITE_IMAGES.find(s => s.id === selectedSlot)?.description}</p>
              <div className="admin-assign-grid">
                {images.map(img => (
                  <div key={img.name} className="admin-assign-option" onClick={() => handleAssignImage(selectedSlot, img.name)}>
                    <img src={img.url} alt={img.name} />
                    <p>{img.name}</p>
                  </div>
                ))}
              </div>
              {images.length === 0 && (
                <div className="admin-empty-state">
                  <p>No uploaded images available. Upload images first in the Image Library tab.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
