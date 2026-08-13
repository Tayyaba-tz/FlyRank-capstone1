// index.js — the starting point of our web server

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------

// Parses incoming JSON request bodies (so we can read req.body on POST routes)
app.use(express.json());

// Serves static files (like our homepage.html) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Simple logger — prints every request to the terminal so we can see traffic
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ---------- Routes ----------

// Homepage — serves the static HTML file in /public
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// About route — plain text response
app.get("/about", (req, res) => {
  res.send("This is a basic Node.js + Express starter project.");
});

// Health check route — useful for confirming the server is alive
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Example JSON API route — returns a small list of sample items
app.get("/api/tasks", (req, res) => {
  const tasks = [
    { id: 1, title: "Set up toolchain", done: true },
    { id: 2, title: "Build starter server", done: true },
    { id: 3, title: "Add first API route", done: false },
  ];
  res.json(tasks);
});

// Example POST route — accepts JSON data and echoes it back
app.post("/api/tasks", (req, res) => {
  const newTask = req.body;
  if (!newTask || !newTask.title) {
    return res.status(400).json({ error: "A 'title' field is required." });
  }
  res.status(201).json({ message: "Task received", task: newTask });
});

// ---------- 404 handler ----------
// Runs when no route above matched the request
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ---------- Error handler ----------
// Catches any errors thrown in the routes above
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});