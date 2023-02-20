const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../Controller/Store/saveProduct");

// user authentication route
router.post("/addproduct", addProduct);
router.get("/allproducts", getAllProducts);
router.patch("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
