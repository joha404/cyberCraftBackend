const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const DBConnect = require("./src/config/db");
const cors = require("cors");

const port = process.env.PORT || 5000; // Fallback port

// Database Connection
DBConnect();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-production-domain.com",
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

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

// user Route
const userRoute = require("./src/routes/userRoute");
app.use("/api", userRoute);

// mesage Route
const messageRoute = require("./src/routes/messageRoute");
app.use("/message", messageRoute);

// employee Route
const employeeRoute = require("./src/routes/employeRoute");
app.use("/employee", employeeRoute);

// Start Server
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
