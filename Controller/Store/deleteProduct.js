const userSchema = require("../../Schema/userSchema.js");
const productSchema = require("../../Schema/productSchema.js");
const jwt = require("jsonwebtoken");

// DELETE USER
const deleteProduct = async (req, res) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }
    const token = auth.split(" ")[1];
    const verifyToken = await jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }

    const allowAccess = await userSchema.findOne({
      _id: verifyToken.id,
    });
    if (allowAccess.verified != true || allowAccess.position != "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }

    const deleteProduct = await productSchema.findOneAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "PRODUCT DELETE SUCCESSFUL", data: deleteProduct });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = deleteProduct;
