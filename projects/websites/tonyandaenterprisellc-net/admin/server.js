import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, unlinkSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Logger utility - must be defined before use
const logger = {
  info: (msg, data = {}) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, data ? JSON.stringify(data) : ''),
  error: (msg, error = {}) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, error ? JSON.stringify(error) : ''),
  warn: (msg, data = {}) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, data ? JSON.stringify(data) : ''),
  log: (msg) => console.log(`[LOG] ${new Date().toISOString()} - ${msg}`)
};

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Configuration
const ADMIN_FILE = join(__dirname, 'data', 'admins.json');
const UPLOAD_METADATA_FILE = join(__dirname, 'data', 'upload-metadata.json');
const UPLOAD_DIR = '/var/www/tonyandaenterprisellc-net/public/uploads';
const LIVE_UPLOAD_DIR = '/var/www/tonyandaenterprisellc-net/dist/uploads';
const LEGACY_UPLOAD_DIR = '/var/www/tonyandaenterprisellc-net/admin/public/uploads';
const WEBSITE_PUBLIC_DIR = '/var/www/tonyandaenterprisellc-net/dist';
const PUBLIC_DIR = '/var/www/tonyandaenterprisellc-net/public';
const SITE_CONFIG_FILE = '/var/www/tonyandaenterprisellc-net/src/config/siteConfig.js';
const PUBLIC_CONTENT_FILE = '/var/www/tonyandaenterprisellc-net/data/sections.json';
const CONTACT_MESSAGES_FILE = '/var/www/tonyandaenterprisellc-net/data/contact-messages.json';

// Define which images can be managed
const MANAGED_IMAGES = [
  'logo.png',
  'home-health-care.jpg',
  'medical-care.jpg',
  'non-medical-care.jpg',
  'private-security.jpg'
];

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle OPTIONS preflight requests
app.options('*', cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/uploads', express.static(LIVE_UPLOAD_DIR));
app.use('/uploads', express.static(LEGACY_UPLOAD_DIR));

// Ensure directories exist
mkdirSync(UPLOAD_DIR, { recursive: true });
mkdirSync(LIVE_UPLOAD_DIR, { recursive: true });
mkdirSync(LEGACY_UPLOAD_DIR, { recursive: true });
mkdirSync(join(__dirname, 'data'), { recursive: true });
mkdirSync('/var/www/tonyandaenterprisellc-net/data', { recursive: true });

function formatPhoneLink(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits ? `tel:+1${digits}` : undefined;
}

function normalizePublicContent(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return {};
  }

  if (content.branding || content.navigation || content.pages || (content.contact && content.contact.address)) {
    return content;
  }

  const normalized = {};
  const home = {};

  if (content.homeHero) {
    home.hero = {
      badge: content.homeHero.badge,
      titlePrefix: content.homeHero.titlePrefix || content.homeHero.title,
      titleAccent1: content.homeHero.titleAccent1 || content.homeHero.accent1,
      titleMid: content.homeHero.titleMid || content.homeHero.mid,
      titleAccent2: content.homeHero.titleAccent2 || content.homeHero.accent2,
      image: content.homeHero.image,
    };
  }

  if (content.homeHealthCare) {
    home.homeHealthCare = content.homeHealthCare;
  }

  if (Array.isArray(content.coreServices)) {
    home.coreServices = content.coreServices;
  }

  if (Array.isArray(content.features)) {
    home.features = content.features;
  }

  if (Object.keys(home).length > 0) {
    normalized.pages = { ...normalized.pages, home };
  }

  if (content.about) {
    normalized.pages = { ...normalized.pages, about: content.about };
  }

  if (content.medicalCourier) {
    normalized.pages = { ...normalized.pages, medicalCourier: content.medicalCourier };
  }

  if (content.privateSecurity) {
    normalized.pages = { ...normalized.pages, privateSecurity: content.privateSecurity };
  }

  if (content.contact) {
    normalized.contact = content.contact.address
      ? content.contact
      : {
          phone: content.contact.phone,
          phoneLink: content.contact.phoneLink || formatPhoneLink(content.contact.phone),
          email: content.contact.email,
          address: {
            street: content.contact.street,
            city: content.contact.city,
            state: content.contact.state,
            zip: content.contact.zip,
          },
          hours: content.contact.hours,
        };
  }

  return normalized;
}

function readPublicContent() {
  if (!existsSync(PUBLIC_CONTENT_FILE)) {
    return {};
  }

  try {
    return normalizePublicContent(JSON.parse(readFileSync(PUBLIC_CONTENT_FILE, 'utf8')));
  } catch (error) {
    logger.error('Failed to read public content file', { error: error.message, file: PUBLIC_CONTENT_FILE });
    return {};
  }
}

function writePublicContent(content) {
  writeFileSync(PUBLIC_CONTENT_FILE, JSON.stringify(content, null, 2));
  return content;
}

function getUploadImage(filename) {
  const canonicalPath = join(UPLOAD_DIR, filename);
  if (existsSync(canonicalPath)) {
    return {
      name: filename,
      url: `/uploads/${filename}`,
      size: statSync(canonicalPath).size,
      modified: statSync(canonicalPath).mtimeMs,
    };
  }

  const livePath = join(LIVE_UPLOAD_DIR, filename);
  if (existsSync(livePath)) {
    return {
      name: filename,
      url: `/uploads/${filename}`,
      size: statSync(livePath).size,
      modified: statSync(livePath).mtimeMs,
    };
  }

  const legacyPath = join(LEGACY_UPLOAD_DIR, filename);
  if (existsSync(legacyPath)) {
    return {
      name: filename,
      url: `/uploads/${filename}`,
      size: statSync(legacyPath).size,
      modified: statSync(legacyPath).mtimeMs,
    };
  }

  return null;
}

function getUploadSourcePath(filename) {
  const canonicalPath = join(UPLOAD_DIR, filename);
  if (existsSync(canonicalPath)) {
    return canonicalPath;
  }

  const livePath = join(LIVE_UPLOAD_DIR, filename);
  if (existsSync(livePath)) {
    return livePath;
  }

  const legacyPath = join(LEGACY_UPLOAD_DIR, filename);
  if (existsSync(legacyPath)) {
    return legacyPath;
  }

  return null;
}

function getUploadSourcePaths(filename) {
  return [join(UPLOAD_DIR, filename), join(LIVE_UPLOAD_DIR, filename), join(LEGACY_UPLOAD_DIR, filename)].filter((filePath, index, paths) => {
    return existsSync(filePath) && paths.indexOf(filePath) === index;
  });
}

function syncUploadToLiveDirectories(filename) {
  const sourcePath = join(UPLOAD_DIR, filename);

  if (!existsSync(sourcePath)) {
    return;
  }

  copyFileSync(sourcePath, join(LIVE_UPLOAD_DIR, filename));
  copyFileSync(sourcePath, join(LEGACY_UPLOAD_DIR, filename));
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    logger.info('Multer: Processing file', { originalName: file.originalname, mimetype: file.mimetype });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`;
    logger.info('Multer: Generated filename', { uniqueName });
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Initialize default admin if no admins exist
function initializeAdmins() {
  if (!existsSync(ADMIN_FILE)) {
    const defaultAdmin = {
      id: uuidv4(),
      username: 'admin',
      password: bcrypt.hashSync('Admin@123!', 10),
      role: 'superadmin',
      createdAt: new Date().toISOString()
    };
    writeFileSync(ADMIN_FILE, JSON.stringify([defaultAdmin], null, 2));
    console.log('Default admin created. Change password immediately!');
  }
}

// Read admins
function getAdmins() {
  if (existsSync(ADMIN_FILE)) {
    return JSON.parse(readFileSync(ADMIN_FILE));
  }
  return [];
}

function getUploadMetadata() {
  if (existsSync(UPLOAD_METADATA_FILE)) {
    return JSON.parse(readFileSync(UPLOAD_METADATA_FILE));
  }

  return {};
}

function saveUploadMetadata(metadata) {
  writeFileSync(UPLOAD_METADATA_FILE, JSON.stringify(metadata, null, 2));
}

// Verify token middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Auth Routes
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const admins = getAdmins();
  
  const admin = admins.find(a => a.username === username);
  
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: admin.id, username: admin.username, role: admin.role } });
});

app.post('/api/admin/change-password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admins = getAdmins();
  
  const adminIndex = admins.findIndex(a => a.id === req.user.id);
  if (adminIndex === -1) {
    return res.status(404).json({ error: 'Admin not found' });
  }

  if (!bcrypt.compareSync(currentPassword, admins[adminIndex].password)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  admins[adminIndex].password = bcrypt.hashSync(newPassword, 10);
  writeFileSync(ADMIN_FILE, JSON.stringify(admins, null, 2));

  res.json({ message: 'Password changed successfully' });
});

app.get('/api/public-content', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.json(readPublicContent());
});

app.get('/api/content', authenticateToken, (req, res) => {
  res.json(readPublicContent());
});

app.put('/api/content', authenticateToken, (req, res) => {
  const nextContent = normalizePublicContent(req.body);

  if (!nextContent || typeof nextContent !== 'object' || Array.isArray(nextContent)) {
    return res.status(400).json({ error: 'Content payload must be a JSON object' });
  }

  writePublicContent(nextContent);
  res.json(nextContent);
});

// Image Management Routes
app.get('/api/images', (req, res) => {
  const images = [];
  const seenUploads = new Set();
  const uploadMetadata = getUploadMetadata();

  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  [UPLOAD_DIR, LIVE_UPLOAD_DIR, LEGACY_UPLOAD_DIR].forEach((directory) => {
    if (!existsSync(directory)) {
      return;
    }

    const files = readdirSync(directory);
    files.forEach((file) => {
      if (seenUploads.has(file)) {
        return;
      }

      const image = getUploadImage(file);
      if (image) {
        images.push({
          ...image,
          originalName: uploadMetadata[file]?.originalName || null,
        });
        seenUploads.add(file);
      }
    });
  });

  images.sort((a, b) => (b.modified || 0) - (a.modified || 0));
  
  // Get images from website public directory
  const websiteImages = [];
  if (existsSync(WEBSITE_PUBLIC_DIR)) {
    const files = readdirSync(WEBSITE_PUBLIC_DIR);
    files.forEach(file => {
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
        const filePath = join(WEBSITE_PUBLIC_DIR, file);
        const stats = statSync(filePath);
        const existingInUploads = seenUploads.has(file);
        if (!existingInUploads) {
          websiteImages.push({
            name: file,
            url: `/${file}`,
            size: stats.size,
            source: 'website',
            modified: stats.mtimeMs,
          });
        }
      }
    });
  }

  websiteImages.sort((a, b) => (b.modified || 0) - (a.modified || 0));
  
  res.json({ images: [...images, ...websiteImages] });
});
// Contact form handlers
function getContactMessages() {
  try {
    if (!existsSync(CONTACT_MESSAGES_FILE)) {
      return [];
    }
    return JSON.parse(readFileSync(CONTACT_MESSAGES_FILE, 'utf8'));
  } catch (error) {
    logger.error('Failed to read contact messages file', { error: error.message, file: CONTACT_MESSAGES_FILE });
    return [];
  }
}

function saveContactMessages(messages) {
  try {
    writeFileSync(CONTACT_MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    logger.error('Failed to save contact messages file', { error: error.message, file: CONTACT_MESSAGES_FILE });
  }
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidString(val, maxLen = 5000) {
  return typeof val === 'string' && val.trim().length > 0 && val.length <= maxLen;
}

// Public contact form submission (no auth required — open to visitors)
app.post('/api/contact', (req, res) => {
  const { name, email, service, message, phone } = req.body || {};

  // Validation
  if (!isValidString(name, 200)) {
    return res.status(400).json({ error: 'Name is required and must be 1-200 characters' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }
  if (!isValidString(message, 5000)) {
    return res.status(400).json({ error: 'Message is required and must be 1-5000 characters' });
  }

  const trimmedService = typeof service === 'string' ? service.trim().slice(0, 200) : '';
  const trimmedPhone = typeof phone === 'string' ? phone.trim().slice(0, 50) : '';

  const entry = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    service: trimmedService,
    phone: trimmedPhone,
    message: message.trim(),
    date: new Date().toISOString(),
    read: false,
    ip: req.ip || req.headers['x-forwarded-for'] || 'unknown'
  };

  try {
    const messages = getContactMessages();
    messages.unshift(entry);
    // Cap stored messages to last 1000 to prevent unbounded growth
    const trimmed = messages.slice(0, 1000);
    saveContactMessages(trimmed);

    logger.info('Contact form submission', { id: entry.id, email: entry.email, service: entry.service });

    res.json({
      success: true,
      message: 'Thank you! Your message has been received. We will contact you shortly.',
      id: entry.id
    });
  } catch (error) {
    logger.error('Contact form save failed', { error: error.message });
    res.status(500).json({ error: 'Failed to submit message. Please email us directly at contact@tonyandaenterprisellc.net' });
  }
});

// Admin: list contact messages (authenticated)
app.get('/api/contact/messages', authenticateToken, (req, res) => {
  const messages = getContactMessages();
  res.json({
    messages,
    total: messages.length,
    unread: messages.filter(m => !m.read).length
  });
});

// Admin: mark message as read
app.put('/api/contact/messages/:id/read', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid message id' });
  }
  const messages = getContactMessages();
  const idx = messages.findIndex(m => m.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }
  messages[idx].read = true;
  messages[idx].readAt = new Date().toISOString();
  saveContactMessages(messages);
  res.json({ success: true, message: messages[idx] });
});

// Admin: delete message
app.delete('/api/contact/messages/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid message id' });
  }
  const messages = getContactMessages();
  const filtered = messages.filter(m => m.id !== id);
  if (filtered.length === messages.length) {
    return res.status(404).json({ error: 'Message not found' });
  }
  saveContactMessages(filtered);
  res.json({ success: true, deleted: id });
});


app.post('/api/images/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadMetadata = getUploadMetadata();
  uploadMetadata[req.file.filename] = {
    originalName: req.file.originalname,
    uploadedAt: new Date().toISOString(),
  };
  saveUploadMetadata(uploadMetadata);
  syncUploadToLiveDirectories(req.file.filename);

  res.json({
    success: true,
    image: {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      originalName: req.file.originalname,
    }
  });
});

// Simple upload endpoint for admin panel (no auth required when logged in via browser)
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    logger.error('Upload failed: no file');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadMetadata = getUploadMetadata();
  uploadMetadata[req.file.filename] = {
    originalName: req.file.originalname,
    uploadedAt: new Date().toISOString(),
  };
  saveUploadMetadata(uploadMetadata);
  syncUploadToLiveDirectories(req.file.filename);

  logger.info('Image uploaded successfully', { 
    filename: req.file.filename, 
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype 
  });

  res.json({
    success: true,
    url: `/uploads/${req.file.filename}`,
    name: req.file.filename,
    originalName: req.file.originalname,
  });
});

app.delete('/api/images/:filename', authenticateToken, (req, res) => {
  const { filename } = req.params;
  const filePaths = getUploadSourcePaths(filename);
  
  if (filePaths.length === 0) {
    return res.status(404).json({ error: 'Image not found' });
  }
  
  filePaths.forEach((filePath) => unlinkSync(filePath));
  const uploadMetadata = getUploadMetadata();
  if (uploadMetadata[filename]) {
    delete uploadMetadata[filename];
    saveUploadMetadata(uploadMetadata);
  }
  res.json({ success: true, message: 'Image deleted' });
});

// Simple delete endpoint for admin panel
app.delete('/api/images/:filename', (req, res) => {
  const { filename } = req.params;
  const filePaths = getUploadSourcePaths(filename);
  
  if (filePaths.length === 0) {
    return res.status(404).json({ error: 'Image not found' });
  }
  
  filePaths.forEach((filePath) => unlinkSync(filePath));
  const uploadMetadata = getUploadMetadata();
  if (uploadMetadata[filename]) {
    delete uploadMetadata[filename];
    saveUploadMetadata(uploadMetadata);
  }
  res.json({ success: true });
});

// Copy image to website public directory
app.post('/api/images/:filename/promote', authenticateToken, (req, res) => {
  const { filename } = req.params;
  const sourcePath = getUploadSourcePath(filename);
  const destPath = join(WEBSITE_PUBLIC_DIR, filename);
  
  if (!sourcePath) {
    return res.status(404).json({ error: 'Image not found in uploads' });
  }
  
  copyFileSync(sourcePath, destPath);
  res.json({ 
    success: true, 
    message: 'Image promoted to website public directory',
    url: `/${filename}`
  });
});

// Replace website image with uploaded image
app.post('/api/images/:filename/replace', authenticateToken, upload.single('image'), (req, res) => {
  const { filename } = req.params;
  const body = req.body || {};
  const targetPathParam = body.targetPath;
  
  // If targetPath is provided, use it; otherwise use the filename
  let targetPath;
  let targetFilename;
  if (targetPathParam) {
    // targetPath can be like "public/logo.png" - convert to full path
    if (targetPathParam.startsWith('/')) {
      targetPath = targetPathParam;
    } else {
      // Assume it's a relative path from website root
      targetPath = join('/var/www/tonyandaenterprisellc-net', targetPathParam);
    }
    // Extract just the filename (e.g., "logo.png" from "public/logo.png")
    targetFilename = targetPathParam.split('/').pop();
  } else {
    targetPath = join(WEBSITE_PUBLIC_DIR, filename);
    targetFilename = filename;
  }
  
  // Find the source image - check uploads first, then website public folder
  let sourcePath;
  if (req.file) {
    sourcePath = join(UPLOAD_DIR, req.file.filename);
  } else {
    const uploadPath = getUploadSourcePath(filename);
    if (uploadPath) {
      sourcePath = uploadPath;
    } else {
      // Check if file exists in website public folder
      const websitePath = join(WEBSITE_PUBLIC_DIR, filename);
      if (existsSync(websitePath)) {
        sourcePath = websitePath;
      } else {
        return res.status(404).json({ error: 'Source image not found: ' + filename });
      }
    }
  }
  
  if (!existsSync(sourcePath)) {
    return res.status(404).json({ error: 'Source image not found: ' + sourcePath });
  }
  
  // Ensure the target directory exists
  const targetDir = dirname(targetPath);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  
  // Copy to public folder
  copyFileSync(sourcePath, targetPath);
  
  // Also copy to dist folder (for production serving)
  const distPath = join('/var/www/tonyandaenterprisellc-net/dist', targetFilename);
  const distDir = dirname(distPath);
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  copyFileSync(sourcePath, distPath);
  
  const publicIndex = targetPath.indexOf('public/');
  const url = publicIndex >= 0 ? '/' + targetPath.substring(publicIndex + 7) : targetPath;
  res.json({ 
    success: true, 
    message: `Updated ${targetFilename} in public/ and dist/ folders`,
    url: url
  });
});

// System info
app.get('/api/system/info', authenticateToken, (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// ============================================
// SITE IMAGE MANAGEMENT ENDPOINTS
// ============================================

// Get all site-managed images with their current usage
app.get('/api/site-images', (req, res) => {
  const siteImages = [];
  
  MANAGED_IMAGES.forEach(imageName => {
    const publicPath = join(PUBLIC_DIR, imageName);
    const distPath = join(WEBSITE_PUBLIC_DIR, imageName);
    
    const inPublic = existsSync(publicPath);
    const inDist = existsSync(distPath);
    
    if (inPublic || inDist) {
      const stats = inPublic ? statSync(publicPath) : statSync(distPath);
      siteImages.push({
        name: imageName,
        url: `/${imageName}`,
        size: stats.size,
        inPublic,
        inDist,
        lastModified: stats.mtime
      });
    }
  });
  
  res.json({ images: siteImages });
});

// Upload and replace a site-managed image
app.post('/api/site-images/:imageName/replace', authenticateToken, upload.single('image'), (req, res) => {
  const { imageName } = req.params;
  
  logger.info('Replace request received', { imageName, hasFile: !!req.file, fileName: req.file?.filename });
  
  // Validate this is a managed image
  if (!MANAGED_IMAGES.includes(imageName)) {
    logger.error('Invalid image name', { imageName, managedImages: MANAGED_IMAGES });
    return res.status(400).json({ 
      error: 'Image not in managed list',
      managedImages: MANAGED_IMAGES
    });
  }
  
  if (!req.file) {
    logger.error('No file in request', { imageName });
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const sourcePath = join(UPLOAD_DIR, req.file.filename);
  const publicDest = join(PUBLIC_DIR, imageName);
  const distDest = join(WEBSITE_PUBLIC_DIR, imageName);
  
  logger.info('Copying files', { sourcePath, publicDest, distDest });
  
  // Verify source file exists
  if (!existsSync(sourcePath)) {
    logger.error('Source file not found', { sourcePath });
    return res.status(500).json({ error: 'Uploaded file not found on server' });
  }
  
  // Copy to public directory
  try {
    copyFileSync(sourcePath, publicDest);
    logger.info('Copied to public', { publicDest });
  } catch (err) {
    logger.error('Failed to copy to public', { error: err.message, publicDest });
  }
  
  // Copy to dist directory
  try {
    copyFileSync(sourcePath, distDest);
    logger.info('Copied to dist', { distDest });
  } catch (err) {
    logger.error('Failed to copy to dist', { error: err.message, distDest });
  }
  
  logger.info('Replace completed successfully', { imageName, fileSize: req.file.size });
  
  res.json({
    success: true,
    message: `Replaced ${imageName} in both public/ and dist/ folders`,
    image: {
      name: imageName,
      url: `/${imageName}`,
      size: req.file.size
    }
  });
});

// Upload a new image and optionally promote it to site images
app.post('/api/site-images/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const imageUrl = `/uploads/${req.file.filename}`;
  
  res.json({
    success: true,
    message: 'Image uploaded successfully. Use promote endpoint to add to site.',
    image: {
      filename: req.file.filename,
      url: imageUrl,
      size: req.file.size
    },
    actions: {
      promote: `POST /api/images/${req.file.filename}/promote`,
      replaceSite: `POST /api/site-images/${req.file.filename}/replace (rename file first)`
    }
  });
});

// Copy an uploaded image to replace a site-managed image
app.post('/api/site-images/promote/:sourceImage/to/:targetImage', authenticateToken, (req, res) => {
  const { sourceImage, targetImage } = req.params;
  
  logger.info('Promote request', { sourceImage, targetImage });
  
  // Validate target is managed
  if (!MANAGED_IMAGES.includes(targetImage)) {
    logger.error('Target not in managed list', { targetImage, managedImages: MANAGED_IMAGES });
    return res.status(400).json({
      error: 'Target image not in managed list',
      managedImages: MANAGED_IMAGES
    });
  }
  
  const sourcePath = join(UPLOAD_DIR, sourceImage);
  
  if (!existsSync(sourcePath)) {
    // Check if source is already in public
    const publicSource = join(PUBLIC_DIR, sourceImage);
    if (existsSync(publicSource)) {
      const finalSource = publicSource;
      const publicDest = join(PUBLIC_DIR, targetImage);
      const distDest = join(WEBSITE_PUBLIC_DIR, targetImage);
      
      logger.info('Promoting from public', { source: finalSource, target: targetImage });
      
      copyFileSync(finalSource, publicDest);
      copyFileSync(finalSource, distDest);
      
      logger.info('Promote completed', { from: sourceImage, to: targetImage });
      
      return res.json({
        success: true,
        message: `Promoted ${sourceImage} to ${targetImage}`,
        from: sourceImage,
        to: targetImage
      });
    }
    logger.error('Source image not found', { sourceImage, sourcePath });
    return res.status(404).json({ error: 'Source image not found' });
  }
  
  const publicDest = join(PUBLIC_DIR, targetImage);
  const distDest = join(WEBSITE_PUBLIC_DIR, targetImage);
  
  logger.info('Promoting from uploads', { source: sourcePath, target: targetImage });
  
  copyFileSync(sourcePath, publicDest);
  copyFileSync(sourcePath, distDest);
  
  logger.info('Promote completed', { from: sourceImage, to: targetImage });
  
  res.json({
    success: true,
    message: `Promoted ${sourceImage} to ${targetImage}`,
    from: sourceImage,
    to: targetImage
  });
});

// Get site configuration for images
app.get('/api/site-config', authenticateToken, (req, res) => {
  const siteImages = {};
  
  MANAGED_IMAGES.forEach(imageName => {
    const publicPath = join(PUBLIC_DIR, imageName);
    if (existsSync(publicPath)) {
      siteImages[imageName] = {
        path: `/${imageName}`,
        exists: true
      };
    }
  });
  
  res.json({
    managedImages: MANAGED_IMAGES,
    siteImages,
    configLocation: SITE_CONFIG_FILE
  });
});

// Rebuild frontend (after config changes)
app.post('/api/site/rebuild', authenticateToken, (req, res) => {
  const { execSync } = require('child_process');
  
  try {
    process.chdir('/var/www/tonyandaenterprisellc-net');
    execSync('npm run build', { encoding: 'utf-8', timeout: 120000 });
    
    res.json({
      success: true,
      message: 'Frontend rebuilt successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Build failed',
      details: error.message
    });
  }
});

// Initialize and start server
initializeAdmins();

app.listen(PORT, () => {
  console.log(`Admin API server running on http://localhost:${PORT}`);
  console.log('Default login: admin / Admin@123!');
  console.log('CHANGE THE PASSWORD IMMEDIATELY AFTER FIRST LOGIN!');
});
