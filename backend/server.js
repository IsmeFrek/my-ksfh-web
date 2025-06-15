const express = require("express");
const cors = require("cors");
const app = express();
const filesRouter = require("./routes/filesRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check/root route
app.get("/", (req, res) => {
  res.send("API server is running!");
});

// Main API
app.use("/api/files", filesRouter);


// Serve frontend build static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// ...existing code...
const PORT = 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`API running on http://0.0.0.0:${PORT}`)
);