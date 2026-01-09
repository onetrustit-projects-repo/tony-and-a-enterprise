#!/bin/bash
set -e

REPO_DIR="/var/www/monorepo"
WEBSITE_DIR="/var/www/monorepo/projects/websites/tonyandaenterprisellc-net"
SERVICE_NAME="tonyandaenterprisellc-net"

echo "=== Deploying tonyandaenterprisellc-net ==="

cd $REPO_DIR

git fetch origin main
git reset --hard origin/main

cd $WEBSITE_DIR

if [ ! -f "package.json" ]; then
    echo "Error: package.json not found"
    exit 1
fi

echo "Installing dependencies..."
npm ci --production=false 2>/dev/null || npm install

echo "Building..."
npm run build

echo "Restarting nginx..."
systemctl reload nginx

echo "=== Deployment complete ==="
