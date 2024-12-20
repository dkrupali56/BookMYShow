const express = require("express");
const app = express();
const { connection } = require("./db/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const bookingRoute = require("./Routes/movieRoute");

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure CORS to accept requests from any origin
app.use(cors({ origin: "*" }));

// Determine the base URL based on the environment mode
const baseURL = process.env.MODE === "development" 
  ? "http://localhost:3001" 
  : "http://backendonrender.com";

console.log(`Base URL set to: ${baseURL}`);

// Connecting to database
connection();

// Home route
app.get("/", async (req, res) => {
    res.send("Hi, I am the home page");
});

// Use booking routes with the base URL as context
app.use("/api", bookingRoute);

// Listening on the specified port
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
