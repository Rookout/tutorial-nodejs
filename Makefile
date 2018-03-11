run-prod: install-dependencies install-rookout-agent start-web

start-web:
	export NODE_ENV=production && node ./index.js

install-rookout-agent:
	wget "https://get.rookout.com" -O setup.sh
	sh ./setup.sh agent --token=<YOUR_TOKEN>
	/etc/init.d/rookout-agent start

install-dependencies:
	npm install --production
