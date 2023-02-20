const express = require("express");
const router = express.Router();

const loginUser = require("../Controller/Auth/loginUser.js");
const registerUser = require("../Controller/Auth/registerUser.js");
const verifyRegOTP = require("../Controller/Auth/verifyRegOTP");
const resendOTP = require("../Controller/Auth/resendOTP");
const {
  allUsers,
  updateUserPosition,
  deleteUser,
} = require("../Controller/Auth/usersCRUD.js");

router.post("/registeruser", registerUser);
router.post("/verifyotp", verifyRegOTP);
router.post("/resendotp", resendOTP);
router.post("/loginuser", loginUser);
router.get("/allusers", allUsers);
router.patch("/updateuser/:id", updateUserPosition);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
