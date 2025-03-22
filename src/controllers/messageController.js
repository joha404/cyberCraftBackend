const messageSchema = require("../models/messageSchema");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const pdfBuffer = req.file ? req.file.buffer : null; // Get uploaded file

    if (!pdfBuffer) {
      return res.status(400).json({ error: "PDF file is missing" });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "md@nusaiba.com.bd",
      subject: "Contact Form Submission",
      text: `You have a new message from ${name} (${email}):\n\n${message}`,
      attachments: [
        {
          filename: "contact_form.pdf",
          content: pdfBuffer, // Attach as buffer
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Step 1: Save the message in MongoDB
    const CreateMessage = await messageSchema.create({ name, email, message });

    // Step 2: Generate PDF
    const pdfPath = path.join(__dirname, "contact_message.pdf");
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);
    doc.fontSize(18).text("Contact Form Submission", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`📌 Name: ${name}`);
    doc.text(`📧 Email: ${email}`);
    doc.text("📝 Message:");
    doc.text(message, { indent: 20 });
    doc.end();

    writeStream.on("finish", async () => {
      try {
        // Step 3: Configure Nodemailer
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your app password
          },
        });

        // Step 4: Send Email with PDF Attachment
        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: "md@nusaiba.com.bd",
          subject: "New Contact Form Submission",
          text: "Please find the attached contact form submission.",
          attachments: [
            {
              filename: "contact_message.pdf",
              path: pdfPath,
            },
          ],
        };

        await transporter.sendMail(mailOptions);

        // Step 5: Delete the PDF after sending the email
        fs.unlinkSync(pdfPath);

        res.status(200).json({ message: "✅ Message saved & email sent!" });
      } catch (err) {
        console.error("❌ Error sending email:", err);
        res.status(500).json({ message: "Error sending email" });
      }
    });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    res.status(500).json({ message: "Server error" });
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
  sendEmail,
};
