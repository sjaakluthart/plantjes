NODEMON_CMD = node_modules/.bin/nodemon
ESLINT_CMD = node_modules/.bin/eslint
GULP_CMD = node_modules/.bin/gulp

app:
	node --harmony ./app.js

dev:
	$(NODEMON_CMD) --harmony ./app.js

mongo:
	mongod --dbpath=./data --port 27017

eslint:
	$(ESLINT_CMD) client/**/*.jsx app.js server/**/*.js

dev-build:
	$(GULP_CMD) dev

production-build:
	$(GULP_CMD) production

serve:
	$(GULP_CMD) serve

bundle:
	$(GULP_CMD) bundle
