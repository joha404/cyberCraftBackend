const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnect = require("./src/config/db");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use 5000 if no PORT is defined

// Connect to MongoDB
(async () => {
  try {
    await DBConnect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Stop server if DB connection fails
  }
})();

// Allowed Origins for CORS
const allowedOrigins = [
  "https://cyber-craft-frontend.vercel.app",
  "http://localhost:5173",
  "https://cyber-craft-frontend-hgvtaldqj-joha404s-projects.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json()); // Replaces bodyParser.json()
app.use(cookieParser());

// ✅ API Routes
app.get("/", (req, res) => {
  res.send("🏠 Home page - Server is running!");
});

app.use("/api", require("./src/routes/userRoute")); // User Routes
app.use("/message", require("./src/routes/messageRoute")); // Message Routes
app.use("/employee", require("./src/routes/employeRoute")); // Employee Routes

// 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
