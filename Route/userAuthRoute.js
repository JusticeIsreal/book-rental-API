const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../Controller/Auth/adminAccessController");
const verifyRegOTP = require("../Controller/Auth/verifyRegOTP");
const resendOTP = require("../Controller/Auth/resendOTP");

router.post("/reguser", registerUser);
router.post("/verifyotp", verifyRegOTP);
router.post("/resendotp", resendOTP);
router.post("/loguser", loginUser);

module.exports = router;
