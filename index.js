// index.js — the starting point of our tiny web server

const express = require("express");
const app = express();
const PORT = 3000;

// When someone visits the homepage, send back a message
app.get("/", (req, res) => {
  res.send("Hello World! My capstone project server is running.");
});

// When someone visits /about, send a different message
app.get("/about", (req, res) => {
  res.send("This is a basic Node.js + Express starter project.");
});

// Start the server and listen for visitors
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});