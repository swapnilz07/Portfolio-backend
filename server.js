const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");
const { isEmail } = require("validator");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swapnil.zakade.33@gmail.com",
    pass: process.env.PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
  const { fullName, email, mobileNumber, emailSubject, message } = req.body;

  if (!isEmail(email)) {
    return res.status(400).send("Invalid email address.");
  }

  const mailOptions = {
    from: email,
    to: "swapnil.zakade.33@gmail.com",
    subject: emailSubject,
    text: `Name: ${fullName}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
