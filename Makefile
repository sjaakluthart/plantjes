NODEMON_CMD = node_modules/.bin/nodemon

dev:
	$(NODEMON_CMD) src/server/server.js

mongo:
	mongod --dbpath=./data --port 27017
