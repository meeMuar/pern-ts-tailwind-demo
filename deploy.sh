#!/bin/sh     
sudo git pull https://github.com/meeMuar/pern-ts-tailwind-demo.git
cd server
npm install
cd ..
cd client
npm install
npm run build
cd ..
sudo systemctl restart nginx
sudo pm2 restart all
