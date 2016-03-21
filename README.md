# plantjes
Graduation Project, Communication &amp; Multimedia Design, Amsterdam University of Applied Sciences

Requirements:
* [Node.js](https://nodejs.org/en/)
* [Bower](http://bower.io/)
* [Gulp](http://gulpjs.com/)

## Setup

Clone the repo with git:
```
git clone git@github.com:sjaakluthart/plantjes.git
```

### Installation

Install the node modules:
```
npm install
```

Install the bower components:
```
bower install
```

Generate the development build and watch for any changes:
```
gulp dev
```

Generate the production build:
```
gulp production
```

### Running

To start the website run:
```
make dev
```

Your terminal should return something like:
```
[nodemon] 1.9.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/server/server.js`
info: Server started; listening on port 3000
```
