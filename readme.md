wget https://github.com/ddosify/ddosify/releases/latest/download/ddosify_amd64.deb
dpkg -i ddosify_amd64.deb
apt-get install gettext-base

ddosify -config ddosify/scenario-echo.yaml