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
// const saveProduct = require("../Controller/Store/saveProduct");
// const deleteProduct = require("../Controller/Store/deleteProduct");
// const updateProduct = require("../Controller/Store/updateProduct");
// const allProducts = require("../Controller/Store/allProducts");

// user authentication route
router.post("/registeruser", registerUser);
router.post("/verifyotp", verifyRegOTP);
router.post("/resendotp", resendOTP);
router.post("/loginuser", loginUser);

// admin access routes
router.get("/allusers", allUsers);
router.patch("/updateuser/:id", updateUserPosition);
router.delete("/deleteuser/:id", deleteUser);

// products rout
// router.post("/saveproduct", saveProduct);
// router.delete("/deleteproduct/:id", deleteProduct);
// router.patch("/updateproduct/:id", updateProduct);
// router.get("/allproducts", allProducts);

module.exports = router;
