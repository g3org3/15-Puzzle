install:
	chmod +x install.sh && ./install.sh

rest-server:
	cd rest-server && npm start

mobile-app:
	npm start

docs:
	open rest-server/docs/index.html
