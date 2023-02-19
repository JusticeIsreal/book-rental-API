const adminAccessSchema = require("../../Schema/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const sendOTPVerificationEmail = require("./sendOTP");

// Register Admin
const registerUser = async (req, res) => {
  // collect the form details and destructure it
  const { name, email, position, password } = req.body;

  // check if any user in the database already use the email entered in
  const existingUser = await adminAccessSchema.findOne({ email: email });

  // if the email is already exits cancel the registration
  if (existingUser) {
    return res.status(400).json({
      status: "FAILED",
      error: `${email} has been taken by another user`,
    });
  }

  // If the email has not been used the proceed
  try {
    // using bcrypt to encrypt the password
    const rounds = 10;
    const hashPassword = await bcrypt.hash(password, rounds);

    //   return all the values entered and store in the data base and add verified status for email verification
    let user = await adminAccessSchema.create({
      name,
      email,
      position,
      password: hashPassword,
      verified: false,
    });

    //   save the details to database but also send OTP to the user email
    user
      .save()
      .then((items) => {
        sendOTPVerificationEmail(items, res);
      })
      .catch((err) => {
        res.status(400).json({ status: "FAILED", message: err.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// log in as an admin
const loginUser = (req, res) => {
  res.send("register");
};

module.exports = { registerUser, loginUser };
