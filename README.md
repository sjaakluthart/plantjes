# plantjes
Graduation Project, Communication &amp; Multimedia Design, Amsterdam University of Applied Sciences

Requirements:
* [Node.js](https://nodejs.org/en/)
* [Bower](http://bower.io/)
* [Gulp](http://gulpjs.com/)
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

To start the MongoDB server on port 27017 open a new window and run:
```
cd ~/Sites/plantjes
mkdir data
make mongo
```

To start the express server open a new window and run:
```
cd ~/Sites/plantjes
make dev
```

The project is now visible at `localhost:3000`.
