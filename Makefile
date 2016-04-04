NODEMON_CMD = node_modules/.bin/nodemon
ESLINT_CMD = node_modules/.bin/eslint

dev:
	$(NODEMON_CMD) ./app.js

mongo:
	mongod --dbpath=./data --port 27017

eslint:
	$(ESLINT_CMD) client/**/*.jsx
