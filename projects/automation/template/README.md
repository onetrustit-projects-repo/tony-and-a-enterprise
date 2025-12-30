# Automation Project Template

Automation scripts and configuration for DevOps tasks.

## Structure

```
├── config/               # Configuration files
│   ├── docker-compose.yml
│   └── .env.example
├── scripts/              # Automation scripts
│   ├── deploy.sh
│   └── backup.sh
├── README.md
└── .gitignore
```

## Common Scripts

### deploy.sh

```bash
#!/bin/bash
# Deploy automation

set -e

echo "Starting deployment..."

# Build
npm run build

# Test
npm test

# Deploy
./scripts/deploy-production.sh

echo "Deployment complete!"
```

### backup.sh

```bash
#!/bin/bash
# Backup automation

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Database backup
pg_dump "$DATABASE_URL" > "$BACKUP_DIR/db_$DATE.sql"

# File backup
tar -czf "$BACKUP_DIR/files_$DATE.tar.gz" ./data

echo "Backup complete: $BACKUP_DIR"
```

## Configuration

### docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ENV=production
    volumes:
      - data:/app/data

volumes:
  data:
```

### .env.example

```bash
# Copy to .env and fill in values
DATABASE_URL=
API_KEY=
ENV=development
```
