# Server-side Notes

```txt
$ npm init
$ npm install body-parser cors express express-jwt firebase-admin jsonwebtoken mongoose 
$ npm install -D morgan nodemon
```

## Server-side Dependecies

**[Express](<>)**

## `index.js` Skeleton
```js
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const mongooseConfigOptions = {
	useNewUrlParser = true,
	useCreateIndex = true,
	useFindAndModify = true,
}

// env
const MONGODB_URI = process.env.MONGODB_ATLAS_URI;
const PORT = process.env.PORT;

// client entry point
const app = express();

// database
mongoose
.connect(MONGODB_URI, mongooseConfigOptions)
.then(() => console.log(`Listening on ${PORT}`))
.catch(err => console.log(`MongoDB Atlas Error: ${err.message}`);
```

## Cloud Services

**[MongoDB Atlas](<>)**
**[Robo 3T](<>)**

## Validate Firebase Authentication Token

## Create User Instance with MongoDB

## Update User Instance with MongoDB
