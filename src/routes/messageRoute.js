const express = require("express");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  sendMessage,
  getMessage,
  deleteSingleMessage,
  sendEmail,
} = require("../controllers/messageController");
// const { sendEmail } = require("../controllers/sendEmailController"); // Import the sendEmail function
const messageRoute = express.Router();

messageRoute.post("/send-email", uploadMiddleware, sendEmail); // Make sure this matches your frontend request
messageRoute.post("/create", sendMessage);
messageRoute.delete("/delete/:id", deleteSingleMessage);
messageRoute.get("/", getMessage);

module.exports = messageRoute;
