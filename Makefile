NODEMON_CMD = node_modules/.bin/nodemon
ESLINT_CMD = node_modules/.bin/eslint

dev:
	$(NODEMON_CMD) src/server/server.js

mongo:
	mongod --dbpath=./data --port 27017

eslint:
	$(ESLINT_CMD) src/**/*.jsx
