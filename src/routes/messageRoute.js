const express = require("express");
const {
  sendMessage,
  getMessage,
  deleteSingleMessage,
} = require("../controllers/messageController");
const messageRoute = express.Router();

messageRoute.post("/create", sendMessage);
messageRoute.delete("/delete/:id", deleteSingleMessage);
messageRoute.get("/", getMessage);

module.exports = messageRoute;
