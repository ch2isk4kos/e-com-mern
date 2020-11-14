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
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log(`MongoDB Atlas Error: ${err.message}`);

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes
app.get("/api", (req, res) => {
	res.json({
		data: "Hello from NodeAPI"
	})
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
