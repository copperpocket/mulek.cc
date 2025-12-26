#!/bin/bash
# deploy.sh - faster deploy for Astro SSR site with PM2

SERVER="root@10.8.50.40"
REMOTE_WEBROOT="/var/www/mulek.cc"
BACKUP_WEBROOT="/var/www/bak.mulek.cc"
LOCAL_BUILD="./dist"
APP_NAME="mulek-astro-app" # PM2 process name

echo "Building site..."
npm run build || { echo "Build failed"; exit 1; }

echo "Uploading and deploying site..."

# --- 1. Backup Old Site and Clean Old Backups ---
ssh $SERVER bash -s << 'EOF'
MAX_BACKUPS=5
REMOTE_WEBROOT="/var/www/mulek.cc"
BACKUP_WEBROOT="/var/www/bak.mulek.cc"
APP_NAME="mulek-astro-app"

mkdir -p $BACKUP_WEBROOT

if [ -d $REMOTE_WEBROOT ]; then
    TIMESTAMP=$(date +%Y%m%d%H%M%S)
    mv $REMOTE_WEBROOT $BACKUP_WEBROOT/$APP_NAME-$TIMESTAMP
    echo "Backup complete: $BACKUP_WEBROOT/$APP_NAME-$TIMESTAMP"
fi

cd $BACKUP_WEBROOT
ls -t $APP_NAME-* 2>/dev/null | tail -n +$((MAX_BACKUPS+1)) | xargs -r rm -rf
mkdir -p $REMOTE_WEBROOT
EOF

# --- 2. Upload Files with rsync ---
rsync -avz --delete $LOCAL_BUILD/ $SERVER:$REMOTE_WEBROOT/
rsync -avz ./package.json ./package-lock.json $SERVER:$REMOTE_WEBROOT/

# --- 3. Install Dependencies and Restart PM2 ---
ssh $SERVER bash -s << 'EOF'
REMOTE_WEBROOT="/var/www/mulek.cc"
APP_NAME="mulek-astro-app"

cd $REMOTE_WEBROOT

# Only install if package.json/package-lock.json changed
if [ ! -d node_modules ] || [ package.json -nt node_modules ] || [ package-lock.json -nt node_modules ]; then
    echo "Installing Node dependencies..."
    npm ci --production
else
    echo "Node dependencies up-to-date."
fi

# Start or reload PM2
if pm2 show $APP_NAME > /dev/null 2>&1; then
    pm2 reload $APP_NAME
    echo "PM2: App reloaded."
else
    pm2 start $REMOTE_WEBROOT/server/entry.mjs --name $APP_NAME
    pm2 save
    echo "PM2: App started."
fi

# Set permissions (optional: consider narrowing scope if slow)
chown -R www-data:www-data $REMOTE_WEBROOT
chmod -R 755 $REMOTE_WEBROOT
EOF

echo "Deployment complete! Visit https://mulek.cc to verify."
