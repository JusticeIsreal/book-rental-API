const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  findOneProduct,
  filterProduct,
} = require("../Controller/Store/Product");

// user authentication route
router.get("/filterproduct", filterProduct);
router.get("/findoneproduct/:id", findOneProduct);
router.post("/addproduct", addProduct);
router.get("/allproducts", getAllProducts);
router.patch("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
