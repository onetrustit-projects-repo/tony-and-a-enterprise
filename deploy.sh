#!/bin/bash
set -e
echo === Deploying tonyandaenterprisellc-net ===
cd /var/www/monorepo
git fetch origin main
git reset --hard origin/main
cd projects/websites/tonyandaenterprisellc-net
npm ci
npm run build
systemctl reload nginx
echo === Deployment complete ===
