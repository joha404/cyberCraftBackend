const messageSchema = require("../models/messageSchema");

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const CreateMessage = await messageSchema.create({
      name,
      email,
      message,
    });
    res.status(200).send(CreateMessage);
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
};

const getMessage = async (req, res) => {
  try {
    const allMessage = await messageSchema.find();
    res.status(200).send(allMessage);
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
};

const deleteSingleMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await messageSchema.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res
      .status(200)
      .json({ message: "Message deleted successfully", deletedMessage });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  sendMessage,
  getMessage,
  deleteSingleMessage,
};
