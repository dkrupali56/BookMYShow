const express = require("express");
const app = express();
const { connection } = require("./db/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Routes
const bookingRoute = require("./Routes/movieRoute");

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Allow requests from any origin

// Determine the base URL based on the environment mode
const baseURL =
  process.env.MODE === "development"
    ? "http://localhost:3001"
    : "http://backendonrender.com";

console.log(`Base URL set to: ${baseURL}`);

// Connect to the database
connection();

// Home route
app.get("/", (req, res) => {
  res.send("Hi, I am the home page");
});

// Booking routes
app.use("/api", bookingRoute);

// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

module.exports = app;
