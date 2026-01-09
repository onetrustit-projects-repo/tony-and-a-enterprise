#!/bin/bash
set -e

SERVER="root@50.50.116.49.78"
REPO_DIR="/var/www/monorepo"

echo "=== Deploying to production server ==="

ssh $SERVER "bash -s" << DEPLOY_SCRIPT
set -e

REPO_DIR="$REPO_DIR"
WEBSITE_DIR="$REPO_DIR/projects/websites/tonyandaenterprisellc-net"

cd \$REPO_DIR

echo "Fetching latest code..."
git fetch origin main
git reset --hard origin/main

echo "Building website..."
cd \$WEBSITE_DIR

if [ ! -f "package.json" ]; then
    echo "Error: package.json not found"
    exit 1
fi

npm ci --production=false 2>/dev/null || npm install
npm run build

echo "Reloading nginx..."
systemctl reload nginx

echo "=== Deployment complete ==="
DEPLOY_SCRIPT

echo "=== Done ==="
