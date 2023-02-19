const adminAccessSchema = require("../../Schema/adminSchema.js");
const jwt = require("jsonwebtoken");
// To get all successful registered users
const allUsers = async (req, res) => {
  try {
    const users = await adminAccessSchema.find();
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "FAILED",
        message: "No token provided, You dont have access to this data",
      });
    }
    const token = auth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "Invalide token access" });
    }
    // const allowAccess = await adminAccessSchema.findOne({
    //   _id: verifyToken.id,
    // });

    // console.log(allowAccess);
    res.status(200).json({ status: "SUCCESS", data: users });
  } catch (error) {
    throw Error(error.message);
  }
};

// update user position to give access
const updateUserPosition = async (req, res) => {
  try {
    const { id: userId } = req.body;

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
    const allowAccess = await adminAccessSchema.findOne({
      _id: verifyToken.id,
    });
    if (!allowAccess.verified === true || !allowAccess.position === "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }
    const user = await adminAccessSchema.findOneAndUpdate({ _id: userId });
    if (!user) {
      res.status(401).json({ status: "ERROR", message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { allUsers, updateUserPosition };
