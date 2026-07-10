#!/bin/bash

# Tony & A Enterprise LLC - Admin System Test Script
# This script tests all the critical functionality of the admin system

set -e

BASE_URL="https://tonyandaenterprisellc.net"
API_URL="http://localhost:3001"
ADMIN_USER="admin"
ADMIN_PASS="Admin@123!"

echo "=========================================="
echo "Tony & A Enterprise - Admin System Test"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass() { echo -e "${GREEN}✓ PASS${NC}: $1"; }
fail() { echo -e "${RED}✗ FAIL${NC}: $1"; }
warn() { echo -e "${YELLOW}⚠ WARN${NC}: $1"; }

# Test 1: Check nginx is running
echo "Test 1: Nginx Service"
if systemctl is-active --quiet nginx; then
    pass "Nginx is running"
else
    fail "Nginx is not running"
fi

# Test 2: Check admin service is running
echo ""
echo "Test 2: Admin API Service"
if systemctl is-active --quiet tonyanda-admin; then
    pass "Admin service is running"
else
    fail "Admin service is not running"
fi

# Test 3: Check port 3001 is listening
echo ""
echo "Test 3: Port 3001 Listening"
if ss -tlnp 2>/dev/null | grep -q ":3001" || netstat -tlnp 2>/dev/null | grep -q ":3001"; then
    pass "Port 3001 is listening"
else
    fail "Port 3001 is not listening"
fi

# Test 4: Test API login
echo ""
echo "Test 4: Admin Login API"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/admin/login" \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"$ADMIN_USER\",\"password\":\"$ADMIN_PASS\"}")

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    pass "Admin login successful"
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
else
    fail "Admin login failed: $LOGIN_RESPONSE"
    exit 1
fi

# Test 5: Test image upload
echo ""
echo "Test 5: Image Upload"
UPLOAD_RESPONSE=$(curl -s -X POST "$API_URL/api/images/upload" \
    -H "Authorization: Bearer $TOKEN" \
    -F "image=@/var/www/monorepo/projects/websites/tonyandaenterprisellc-net/dist/logo.png")

if echo "$UPLOAD_RESPONSE" | grep -q "success"; then
    pass "Image upload successful"
    IMAGE_NAME=$(echo "$UPLOAD_RESPONSE" | grep -o '"filename":"[^"]*' | cut -d'"' -f4)
else
    fail "Image upload failed: $UPLOAD_RESPONSE"
fi

# Test 6: Test image list
echo ""
echo "Test 6: Image List API"
IMAGES_RESPONSE=$(curl -s "$API_URL/api/images" \
    -H "Authorization: Bearer $TOKEN")

if echo "$IMAGES_RESPONSE" | grep -q "images"; then
    IMAGE_COUNT=$(echo "$IMAGES_RESPONSE" | grep -o '"filename"' | wc -l)
    pass "Image list API working ($IMAGE_COUNT images found)"
else
    fail "Image list API failed"
fi

# Test 7: Test frontend accessibility
echo ""
echo "Test 7: Frontend Accessibility"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
if [ "$FRONTEND_STATUS" = "200" ]; then
    pass "Frontend is accessible (HTTP 200)"
else
    fail "Frontend returned status $FRONTEND_STATUS"
fi

# Test 8: Test admin dashboard accessibility
echo ""
echo "Test 8: Admin Dashboard Accessibility"
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/admin/dashboard/")
if [ "$ADMIN_STATUS" = "200" ]; then
    pass "Admin dashboard is accessible (HTTP 200)"
else
    fail "Admin dashboard returned status $ADMIN_STATUS"
fi

# Test 9: Test uploaded image accessibility
echo ""
echo "Test 9: Uploaded Image Accessibility"
if [ -n "$IMAGE_NAME" ]; then
    IMAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/uploads/$IMAGE_NAME")
    if [ "$IMAGE_STATUS" = "200" ]; then
        pass "Uploaded image is accessible (HTTP 200)"
    else
        fail "Uploaded image returned status $IMAGE_STATUS"
    fi
else
    warn "Skipped - no uploaded image to test"
fi

# Test 10: Check file permissions
echo ""
echo "Test 10: File Permissions"
UPLOAD_DIR="/var/www/monorepo/projects/websites/tonyandaenterprisellc-net/admin/public/uploads"
if [ -d "$UPLOAD_DIR" ] && [ -r "$UPLOAD_DIR" ] && [ -w "$UPLOAD_DIR" ]; then
    OWNER=$(stat -c '%U' "$UPLOAD_DIR" 2>/dev/null || echo "unknown")
    if [ "$OWNER" = "www-data" ]; then
        pass "Uploads directory has correct ownership ($OWNER)"
    else
        warn "Uploads directory owner is $OWNER (expected www-data)"
    fi
else
    fail "Uploads directory permissions issue"
fi

echo ""
echo "=========================================="
echo "Test Complete"
echo "=========================================="
echo ""
echo "Admin Credentials:"
echo "  Username: $ADMIN_USER"
echo "  Password: $ADMIN_PASS"
echo ""
echo "Admin Dashboard: $BASE_URL/admin/dashboard/"
echo ""
