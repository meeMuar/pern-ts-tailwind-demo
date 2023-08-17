#!/bin/sh     
cd server
npm install
cd ..
cd client
npm install
npm run build
cd ..
sudo systemctl restart nginx
sudo pm2 restart all || true
