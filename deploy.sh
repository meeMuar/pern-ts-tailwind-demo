#!/bin/sh     
sudo git pull 
cd server
sudo npm install
cd ..
cd client
npm install
sudo npm run build
cd ..
sudo systemctl restart nginx
sudo pm2 restart all
