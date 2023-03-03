const multer = require("multer");
const path = require("path");
const Product = require("../../Schema/productSchema");
const jwt = require("jsonwebtoken");
const userSchema = require("../../Schema/userSchema");
const fs = require("fs");
// add product
const addProduct = async (req, res) => {
  try {
    // const auth = req.headers.authorization;
    // if (!auth || !auth.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     status: "FAILED",
    //     message: "No token provided, You dont have access to this data",
    //   });
    // }

    // const token = auth.split(" ")[1];
    // const verifyToken = jwt.verify(token, process.env.SECRET);

    // if (!verifyToken) {
    //   return res
    //     .status(401)
    //     .json({ status: "ERROR", message: "Invalide token access" });
    // }
    // const allowAccess = await userSchema.findOne({
    //   _id: verifyToken.id,
    // });
    // if (allowAccess.verified != true || allowAccess.position === "client") {
    //   return res.status(401).json({
    //     status: "ERROR",
    //     message: "You are not authorized to perform this action",
    //   });
    // }
    const newProduct = new Product({
      productname: req.body.productname,
      productprice: req.body.productprice,
      productnumber: req.body.productnumber,
      productoldprice: req.body.productoldprice,
      productcategory: req.body.productcategory,
      productclass: req.body.productclass,
      productavailable: req.body.productavailable,
      productdescription: req.body.productdescription,
      productimage: req.body.productimage,
    });

    newProduct
      .save()
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// bhkgbjjkhkjgi

// get all products
const getAllProducts = async (req, res) => {
  // const auth = req.headers.authorization;
  // if (!auth || !auth.startsWith("Bearer ")) {
  //   return res.status(401).json({
  //     status: "FAILED",
  //     message: "No token provided, You dont have access to this data",
  //   });
  // }

  // const token = auth.split(" ")[1];
  // const verifyToken = jwt.verify(token, process.env.SECRET);

  // if (!verifyToken) {
  //   return res
  //     .status(401)
  //     .json({ status: "ERROR", message: "Invalide token access" });
  // }
  // const allowAccess = await userSchema.findOne({
  //   _id: verifyToken.id,
  // });
  // if (allowAccess.verified != true || allowAccess.position != "owner") {
  //   return res.status(401).json({
  //     status: "ERROR",
  //     message: "You are not authorized to perform this action",
  //   });
  // }
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    // const auth = req.headers.authorization;
    // if (!auth || !auth.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     status: "FAILED",
    //     message: "No token provided, You dont have access to this data",
    //   });
    // }

    // const token = auth.split(" ")[1];
    // const verifyToken = jwt.verify(token, process.env.SECRET);

    // if (!verifyToken) {
    //   return res
    //     .status(401)
    //     .json({ status: "ERROR", message: "Invalide token access" });
    // }
    // const allowAccess = await userSchema.findOne({
    //   _id: verifyToken.id,
    // });
    // if (allowAccess.verified != true || allowAccess.position != "owner") {
    //   return res.status(401).json({
    //     status: "ERROR",
    //     message: "You are not authorized to perform this action",
    //   });
    // }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// find single product
const findOneProduct = async (req, res) => {
  try {
    // const auth = req.headers.authorization;
    // if (!auth || !auth.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     status: "FAILED",
    //     message: "No token provided, You dont have access to this data",
    //   });
    // }

    // const token = auth.split(" ")[1];
    // const verifyToken = jwt.verify(token, process.env.SECRET);

    // if (!verifyToken) {
    //   return res
    //     .status(401)
    //     .json({ status: "ERROR", message: "Invalide token access" });
    // }
    // const allowAccess = await userSchema.findOne({
    //   _id: verifyToken.id,
    // });
    // if (allowAccess.verified != true || allowAccess.position != "owner") {
    //   return res.status(401).json({
    //     status: "ERROR",
    //     message: "You are not authorized to perform this action",
    //   });
    // }
    const Singleproduct = await Product.findById(req.params.id);

    if (!Singleproduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // await product.remove();

    res.status(200).json({ Singleproduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    // const auth = req.headers.authorization;
    // if (!auth || !auth.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     status: "FAILED",
    //     message: "No token provided, You dont have access to this data",
    //   });
    // }

    // const token = auth.split(" ")[1];
    // const verifyToken = jwt.verify(token, process.env.SECRET);

    // if (!verifyToken) {
    //   return res
    //     .status(401)
    //     .json({ status: "ERROR", message: "Invalide token access" });
    // }
    // const allowAccess = await userSchema.findOne({
    //   _id: verifyToken.id,
    // });
    // if (allowAccess.verified != true || allowAccess.position != "owner") {
    //   return res.status(401).json({
    //     status: "ERROR",
    //     message: "You are not authorized to perform this action",
    //   });
    // }
    // const product = await Product.findById(req.params.id);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      // console.log(req.params.id),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      product: product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterProduct = async (req, res) => {
  try {
    const newArrival = await Product.find({ productclass: "newarrival" });
    const promo = await Product.find({ productclass: "promo" });
    const bestseller = await Product.find({ productclass: "bestseller" });
    const romance = await Product.find({ productcategory: "romance" });
    const scifi = await Product.find({ productcategory: "scifi" });
    const motivation = await Product.find({ productcategory: "motivation" });

    res.status(200).json({
      newArrival: newArrival,
      promo: promo,
      bestseller: bestseller,
      romance: romance,
      scifi: scifi,
      motivation: motivation,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  findOneProduct,
  filterProduct,
};
