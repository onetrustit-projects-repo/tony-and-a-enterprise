# Tony & A Enterprise LLC — Website

> Medical Courier & Private Security Services | Women-Owned Business
> Website: [https://tonyandaenterprisellc.net](https://tonyandaenterprisellc.net)
> Admin Panel: [https://admin.tonyandaenterprisellc.net](https://admin.tonyandaenterprisellc.net)

---

## Business Overview

Tony & A Enterprise LLC is a women-owned business providing two core service lines:

- **Medical Courier Services** — HIPAA/BBP-certified transport for lab specimens, pharmaceuticals, medical records, and supplies. Same-day delivery and scheduled routes for healthcare facilities.
- **Private Security Services** — Unarmed professional security personnel for events, site monitoring, and asset protection. 24/7 availability, CPR certified, background-checked guards.
- **Non-Medical Home Health Care** — Companion care, light exercise, meal prep, and home cleaning for individuals maintaining independence at home.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React 19 + Vite | Static build served by Nginx |
| Styling | Tailwind CSS v4 + Framer Motion | |
| Admin API | Express.js (port 3001) | JWT auth, multer file uploads |
| CMS | PocketBase (port 8090) | Admin dashboard at `/_/` |
| Database | PocketBase (SQLite) | |
| Email | Nodemailer (SMTP) | |
| Hosting | Linode (Ubuntu 24.04) | |
| Web Server | Nginx | Cloudflare CDN + SSL termination |
| Process Manager | PM2 (PocketBase) + systemd | |

---

## Architecture

```
Cloudflare (CDN + SSL)
        ↓  HTTPS
Nginx (ports 80, 443)
        ├── /             → /var/www/tonyandaenterprisellc-net/dist/   (React/Vite static)
        ├── /api/         → localhost:3001  (Express Admin API)
        ├── /uploads/     → /var/www/tonyandaenterprisellc-net/dist/uploads/
        ├── /pb/_/        → localhost:8090/_/  (PocketBase CMS)
        └── admin.*       → localhost:8090/_/  (PocketBase — separate subdomain)
```

### Key Directories

```
/var/www/tonyandaenterprisellc-net/
├── src/                      ← React source (git-tracked)
│   ├── config/siteConfig.js  ← Site-wide content config
│   └── pages/                ← Page components
├── dist/                     ← Vite build output (deployed, NOT in git)
│   ├── uploads/              ← User-uploaded images
│   └── assets/               ← JS/CSS bundles
├── admin/                    ← Express Admin API (port 3001)
│   └── data/admins.json      ← Admin credentials (change default!)
└── api/                      ← Contact form handler (standalone)

/var/lib/pocketbase/
├── pb_data/                  ← PocketBase SQLite DB
└── pb_migrations/            ← PocketBase migrations

/var/www/monorepo/            ← Git repo (this repo)
```

---

## Deployment

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Build & Deploy

```bash
# 1. Pull latest
git pull origin main

# 2. Install frontend deps
cd /var/www/tonyandaenterprisellc-net
npm install

# 3. Build frontend
npm run build

# 4. Restart Admin API (Express, port 3001)
systemctl restart tonyanda-admin   # or: pm2 restart tonyanda-admin

# 5. Reload Nginx
nginx -t && systemctl reload nginx
```

### Admin API (port 3001)

```bash
cd /var/www/tonyandaenterprisellc-net/admin
npm install
node server.js
```

Default credentials: `admin / Admin@123!` — **change immediately after first login.**

### PocketBase (port 8090)

```bash
# Start
/var/lib/pocketbase/pb.sh

# PM2 (persistent)
pm2 start /var/lib/pocketbase/pb.sh --name pocketbase
pm2 save
```

---

## Git Workflow

> ⚠️ The `dist/` folder is built locally and rsynced to the server — it is NOT tracked in git.

```bash
# Normal workflow: commit source only
git add src/ config/ package.json admin/
git commit -m "描述"
git push origin main
```

---

## Environment Variables

```env
# Admin API
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CONTACT_EMAIL=contact@tonyandaenterprisellc.net
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=pass

# PocketBase
PB_DATA=/var/lib/pocketbase/pb_data
```

---

## Services

| Service | Port | Status Endpoint |
|---|---|---|
| Nginx | 80, 443 | — |
| Admin API | 3001 | `curl localhost:3001/api/health` |
| PocketBase | 8090 | `curl localhost:8090/api/health` |

---

## Contact

- **Business:** Tony & A Enterprise LLC
- **Phone:** (908) 251-9749
- **Email:** contact@tonyandaenterprisellc.net
- **Address:** 380 Park Avenue, Orange, NJ 07050
- **Hours:** 24 Hours, 7 Days a Week
