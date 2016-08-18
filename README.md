# Plant Buddy
Graduation Project, Communication &amp; Multimedia Design, Amsterdam University of Applied Sciences

Requirements:
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.org/)

## Setup

Clone the repo with git:
```
cd ~/Sites
git clone git@github.com:sjaakluthart/plantjes.git
```

Install MongoDB, I prefer [HomeBrew](http://brew.sh/).
```
brew install mongodb
```

### Installation

Install the node modules:
```
npm install
```

Generate the development build and watch for any changes:
```
make dev-build
```

Generate the production build:
```
make production-build
```

### Running

To start the MongoDB server on port 27017 run:
```
cd ~/Sites/plantjes
mkdir data
make mongo
```

To start the express server run:
```
cd ~/Sites/plantjes
make app
```

To start the express server with [nodemon](https://www.npmjs.com/package/nodemon) run:
```
cd ~/Sites/plantjes
make dev
```

To serve the project with BrowserSync run:
```
make serve
```

This will also execute the dev build task.

BrowserSync will reload the project when any changes occur in `['./public/index.html', './public/assets/*.*', './public/build.js']` and inject any css changes from `'./public/style.css'`.

Your terminal should now return something like:
```
[BS] [info] Proxying: http://localhost:3000
[BS] Access URLs:
 -------------------------------------
       Local: http://localhost:3001
    External: http://192.168.0.22:3001
 -------------------------------------
          UI: http://localhost:3002
 UI External: http://192.168.0.22:3002
```
