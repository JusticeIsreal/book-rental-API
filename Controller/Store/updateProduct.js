const userSchema = require("../../Schema/userSchema.js");
const productSchema = require("../../Schema/productSchema.js");
const jwt = require("jsonwebtoken");

// update product
const updatedProduct = async (req, res) => {
  try {
    // check if there is successfull token login
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }

    // get token and verify with jwt
    const token = auth.split(" ")[1];
    const verifyToken = await jwt.verify(token, process.env.SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }

    // find user with token
    const allowAccess = await userSchema.findOne({
      _id: verifyToken.id,
    });

    // condition user with access
    if (allowAccess.verified != true || allowAccess.position != "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }

    // update user
    const updatedProduct = await productSchema.findOneAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res
      .status(200)
      .json({ status: "PRODUCT UPDATE SUCCESS", data: updatedProduct });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updatedProduct;
