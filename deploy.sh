#!/bin/bash
# deploy.sh - deploy Astro site to Apache

SERVER="root@10.8.50.40"
REMOTE_WEBROOT="/var/www/mulek.cc"
BACKUP_WEBROOT="/var/www/bak.mulek.cc"
LOCAL_BUILD="./dist"

echo "Building site..."
npm run build || { echo "Build failed"; exit 1; }

echo "Uploading and deploying site..."
# Use one SSH session to backup, create folder, set permissions, and reload Apache
ssh $SERVER bash -s << EOF
if [ -d $REMOTE_WEBROOT ]; then mv $REMOTE_WEBROOT $BACKUP_WEBROOT; fi
mkdir -p $REMOTE_WEBROOT
exit
EOF

# Upload files
scp -r $LOCAL_BUILD/* $SERVER:$REMOTE_WEBROOT/

ssh $SERVER bash -s << EOF
chown -R www-data:www-data $REMOTE_WEBROOT
chmod -R 755 $REMOTE_WEBROOT
systemctl reload apache2
EOF

echo "Deployment complete! Visit https://mulek.cc to verify."
