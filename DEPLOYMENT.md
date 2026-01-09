# Tony & A Enterprise LLC - Deployment Documentation

## Quick Deploy
```bash
ssh root@50.116.49.78
cd /var/www/monorepo && git checkout dev && git pull origin dev
cd projects/websites/tonyandaenterprisellc-net && npm install && npm run build
nginx -t && systemctl reload nginx
```

## Server Access
```bash
ssh root@50.116.49.78
```

## Git Workflow

### Development Branch (Test first)
```bash
# Local development
git checkout dev
git add -A && git commit -m "Your changes"
git push origin dev

# Deploy to test server
ssh root@50.116.49.78 "cd /var/www/monorepo && git checkout dev && git pull origin dev && cd projects/websites/tonyandaenterprisellc-net && npm run build && systemctl reload nginx"
```

### Production Branch (Live)
```bash
# Merge dev to main
git checkout main && git merge dev && git push origin main

# Deploy to production
ssh root@50.116.49.78 "cd /var/www/monorepo && git checkout main && git pull origin main && npm run build && systemctl reload nginx"
```

## Project Structure
```
/var/www/monorepo/projects/websites/tonyandaenterprisellc-net/
├── dist/          # Built static files (served by nginx)
├── public/        # Source static assets
└── src/           # React source code
```

## URLs
- **Production**: https://tonyandaenterprisellc.net (also .com)
- **Testing**: Same URL after dev branch deploy

## Nginx Configuration
- **File**: `/etc/nginx/sites-available/tonyandaenterprisellc-net`
- **Root**: `/var/www/monorepo/projects/websites/tonyandaenterprisellc-net/dist`
- **Cloudflare**: IPs configured in `/etc/nginx/cloudflare.conf`
- **Security Headers**: `/etc/nginx/snippets/security-headers.conf`

## SSL Certificates
- Certificate: `/etc/ssl/certs/nginx.crt`
- Private Key: `/etc/ssl/private/nginx.key`

## Security Configuration

### Firewall (UFW)
```bash
ufw status verbose
# Enabled: deny incoming, allow outgoing
# Allowed: 22/tcp (SSH), 80/tcp (HTTP), 443/tcp (HTTPS)
```

### Fail2Ban
```bash
systemctl status fail2ban
fail2ban-client status
# Protects SSH and Nginx
```

### SSH Hardening
- Key-based authentication only
- Password authentication: disabled
- Max auth tries: 3
- Config: `/etc/ssh/sshd_config.d/hardening.conf`

### Nginx Security
- TLSv1.2/1.3 only (disabled TLSv1, TLSv1.1, SSLv3)
- HSTS enabled (63072000 seconds)
- Security headers:
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin

## Troubleshooting

### Check services status
```bash
systemctl status nginx
systemctl status fail2ban
```

### Test nginx config
```bash
nginx -t
```

### View logs
```bash
tail -f /var/log/nginx/error.log      # Nginx errors
tail -f /var/log/auth.log             # SSH/Fail2ban logs
```

### Check image accessibility
```bash
curl -I https://tonyandaenterprisellc.net/home-health-care.jpg
```

### Restart services
```bash
systemctl reload nginx
systemctl restart fail2ban
systemctl reload sshd
```

## Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Nginx
- Cloudflare DNS

## Contact Form Configuration

The website includes a contact form at `/contact` that collects:
- Full Name
- Email Address
- Service Interest (Medical Courier, Security, Delivery, Other)
- Message

### Option 1: Formspree (Easiest - No Backend Required)

1. Create account at https://formspree.io
2. Create a new form and get your endpoint URL
3. Update `src/pages/Contact.jsx`:

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! We will contact you shortly.' });
        setFormData({ name: '', email: '', service: '', message: '' });
    }
};
```

### Option 2: EmailJS (Client-side Email)

1. Create account at https://www.emailjs.com
2. Create email template
3. Install: `npm install @emailjs/browser`
4. Update form to use EmailJS SDK

### Option 3: Custom Backend (Node.js)

**Backend Setup:**
```bash
# Install dependencies
cd /var/www/monorepo/projects/websites/tonyandaenterprisellc-net/api
npm install express nodemailer cors

# Configure environment variables
cat > .env << EOF
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@tonyandaenterprisellc.net
EOF

# Start the API server
node contact.js &
```

**Nginx Proxy (add to server block):**
```nginx
location /api/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Option 4: Cloudflare Workers (Serverless)

Create a Cloudflare Worker with the form handling logic and update the form to POST to the worker URL.

### Form Data Storage

Messages are sent directly to email. For backup/tracking, consider:
- Google Sheets integration
- Airtable
- Database storage (PostgreSQL, MongoDB)

## Emergency Rollback
```bash
# Revert nginx config
cp /etc/nginx/sites-available/tonyandaenterprisellc-net.backup /etc/nginx/sites-available/tonyandaenterprisellc-net
nginx -t && systemctl reload nginx

# Revert to previous git commit
cd /var/www/monorepo && git checkout main && git log --oneline -5
git revert HEAD or git reset --hard <commit-hash>
```
