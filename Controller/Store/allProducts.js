const productSchema = require("../../Schema/productSchema.js");
const jwt = require("jsonwebtoken");

// To get all successful registered users
const allProducts = async (req, res) => {
  try {
    // check if the user has a successful token lopgin
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }

    // split token from bearer and get real value to verify
    const token = auth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }
    // get all users the the database
    const products = await productSchema.find();
    res.status(200).json({ status: "SUCCESS", data: products });
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = allProducts;
