# Tony & A Enterprise LLC - Deployment Documentation

## Server Access
```bash
ssh root@50.116.49.78
```

## Project Structure
```
/var/www/monorepo/projects/websites/tonyandaenterprisellc-net/
├── dist/          # Built static files (served by nginx)
├── public/        # Source static assets
└── src/           # React source code
```

## Deployment Commands

### 1. Pull latest changes
```bash
cd /var/www/monorepo
git pull origin main
```

### 2. Build the project
```bash
cd /var/www/monorepo/projects/websites/tonyandaenterprisellc-net
npm install
npm run build
```

### 3. Restart nginx
```bash
nginx -t
systemctl reload nginx
```

## Nginx Configuration
**File**: `/etc/nginx/sites-available/tonyandaenterprisellc-net`

**Root**: `/var/www/monorepo/projects/websites/tonyandaenterprisellc-net/dist`

**Cloudflare**: IPs configured in `/etc/nginx/cloudflare.conf`

## SSL Certificates
- Certificate: `/etc/ssl/certs/nginx.crt`
- Private Key: `/etc/ssl/private/nginx.key`

## URLs
- **Production**: https://tonyandaenterprisellc.com
- **Image Test**: https://tonyandaenterprisellc.com/home-health-care.jpg

## Troubleshooting

### Check if nginx is running
```bash
systemctl status nginx
```

### Test nginx config
```bash
nginx -t
```

### View nginx error logs
```bash
tail -f /var/log/nginx/error.log
```

### Check image is accessible
```bash
curl -I https://tonyandaenterprisellc.com/home-health-care.jpg
```

## Git SSH Setup
```bash
ssh-copy-id root@50.116.49.78
ssh root@50.116.49.78
```

## Stack
- React + Vite
- Tailwind CSS
- Nginx
- Cloudflare DNS
