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
    if (allowAccess.verified != true || allowAccess.position != "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }
    const user = await adminAccessSchema.findOneAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: "SUCCESS", data: user });
  } catch (error) {
    throw new Error(error.message);
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
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

    const allowAccess = await adminAccessSchema.findOne({
      _id: verifyToken.id,
    });
    if (allowAccess.verified != true || allowAccess.position != "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }

    const deleteUser = await adminAccessSchema.findOneAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "USER DELETe SUCCESSFUL", data: deleteUser });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { allUsers, updateUserPosition, deleteUser };
