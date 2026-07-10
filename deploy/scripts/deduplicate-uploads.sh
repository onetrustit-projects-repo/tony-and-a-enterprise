#!/bin/bash
set -e

# Three uploads locations
UPLOAD_DIRS=(
  "/var/www/tonyandaenterprisellc-net/dist/uploads"
  "/var/www/tonyandaenterprisellc-net/public/uploads"
  "/var/www/tonyandaenterprisellc-net/admin/public/uploads"
)

# Files referenced in source/config OR site-managed (KEEP these)
KEEP_FILES=(
  "logo.png"
  "home-health-care.jpg"
  "medical-care.jpg"
  "non-medical-care.jpg"
  "private-security.jpg"
  "logo-new.png"
  "53dc1759-b4c5-40ca-9f7c-da579e58cb48.jpg"
  "a299bcfe-75d1-49fd-8c4e-a561cab246e4.jpg"
  "0b036754-7de6-4ce7-94ef-a22353f46dfa.jpeg"
  "1768494281111-434788177.jpg"
)

# Force delete (test uploads, etc.)
FORCE_DELETE=(
  "ed74998b-4905-4f29-b438-457787180002.png"
)

# Files to clean from /public/ root (duplicates of dist/ root images)
PUBLIC_ROOT_TRASH=(
  "3aa9302d-5d67-4620-84ae-b9fcddb8048d.png"
  "72c78bfa-b4df-4cff-84b7-56c9071647e4.jpg"
  "9c77663c-212e-47f1-a0b3-c8685c6013ca.jpg"
  "9fad70ca-26bf-425d-b6f2-13d4c6ad45d8.jpg"
  "a839499d-2b1a-4bd5-ae62-8992fa0e29d8.jpg"
  "f469435f-fb77-4190-92ac-09665a8f578d.jpg"
  "react.svg"
  "vite.svg"
)

DRY_RUN=false

echo "=== PRE-CLEANUP STATE ==="
total_files=0
total_size=0
for dir in "${UPLOAD_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    cnt=$(ls "$dir" 2>/dev/null | wc -l)
    sz=$(du -sb "$dir" 2>/dev/null | awk '{print $1}')
    total_files=$((total_files + cnt))
    total_size=$((total_size + sz))
    echo "  $dir: $cnt files, $((sz / 1024)) KB"
  fi
done
echo "Total: $total_files files, $((total_size / 1024)) KB"
echo ""

# Compute canonical map from dist/uploads (master)
MASTER_DIR="${UPLOAD_DIRS[0]}"
cd "$MASTER_DIR"

ALL_FILES=$(find . -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | sed 's|^\./||')

declare -A HASH_TO_FILES
for f in $ALL_FILES; do
  hash=$(md5sum "$f" | awk '{print $1}')
  if [ -z "${HASH_TO_FILES[$hash]}" ]; then
    HASH_TO_FILES[$hash]="$f"
  else
    HASH_TO_FILES[$hash]="${HASH_TO_FILES[$hash]} $f"
  fi
done

TO_DELETE=()
for hash in "${!HASH_TO_FILES[@]}"; do
  files="${HASH_TO_FILES[$hash]}"
  canonical=""
  for f in $files; do
    for k in "${KEEP_FILES[@]}"; do
      if [ "$f" = "$k" ]; then
        canonical="$f"
        break 2
      fi
    done
  done

  if [ -z "$canonical" ]; then
    canonical=$(echo "$files" | tr ' ' '\n' | sort | head -1)
  fi

  for f in $files; do
    if [ "$f" != "$canonical" ]; then
      TO_DELETE+=("$f")
    fi
  done
done

# Add forced deletes
for f in "${FORCE_DELETE[@]}"; do
  already=0
  for d in "${TO_DELETE[@]}"; do
    if [ "$d" = "$f" ]; then already=1; break; fi
  done
  if [ $already -eq 0 ]; then
    TO_DELETE+=("$f")
  fi
done

echo "=== DEDUPLICATION PLAN ==="
echo "Unique image content (dist/uploads): ${#HASH_TO_FILES[@]}"
echo "Files to delete: ${#TO_DELETE[@]}"
echo ""
for f in "${TO_DELETE[@]}"; do
  echo "  $f"
done
echo ""

echo "=== PUBLIC/ ROOT TRASH TO REMOVE ==="
for f in "${PUBLIC_ROOT_TRASH[@]}"; do
  if [ -f "/var/www/tonyandaenterprisellc-net/public/$f" ]; then
    echo "  /var/www/tonyandaenterprisellc-net/public/$f"
  fi
done
echo ""

if [ "$DRY_RUN" = true ]; then
  echo "=== DRY RUN — no files deleted ==="
  echo "Set DRY_RUN=false to execute"
else
  echo "=== EXECUTING DELETION ==="

  # Delete duplicates from all 3 uploads dirs
  for dir in "${UPLOAD_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then continue; fi
    for f in "${TO_DELETE[@]}"; do
      if [ -f "$dir/$f" ]; then
        rm -f "$dir/$f"
        echo "  Deleted: $dir/$f"
      fi
    done
  done

  # Delete public/ root trash
  PUBLIC_DIR="/var/www/tonyandaenterprisellc-net/public"
  for f in "${PUBLIC_ROOT_TRASH[@]}"; do
    if [ -f "$PUBLIC_DIR/$f" ]; then
      rm -f "$PUBLIC_DIR/$f"
      echo "  Deleted: $PUBLIC_DIR/$f"
    fi
  done

  echo ""
  echo "=== POST-CLEANUP STATE ==="
  for dir in "${UPLOAD_DIRS[@]}"; do
    if [ -d "$dir" ]; then
      cnt=$(ls "$dir" 2>/dev/null | wc -l)
      sz=$(du -sh "$dir" 2>/dev/null | awk '{print $1}')
      echo "  $dir: $cnt files, $sz"
    fi
  done
  if [ -d "/var/www/tonyandaenterprisellc-net/public" ]; then
    cnt=$(ls /var/www/tonyandaenterprisellc-net/public/ 2>/dev/null | wc -l)
    echo "  public/ root: $cnt files"
  fi
fi