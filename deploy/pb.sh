#!/bin/bash
exec /opt/pocketbase_binary serve \
  --http=0.0.0.0:8090 \
  --dir=/var/lib/pocketbase/pb_data \
  --migrationsDir=/var/lib/pocketbase/pb_migrations
