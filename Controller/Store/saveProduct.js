const multer = require("multer");
const path = require("path");
const Product = require("../../Schema/productSchema");
const jwt = require("jsonwebtoken");
const userSchema = require("../../Schema/userSchema");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: fileFilter,
});

// add product
const addProduct = async (req, res) => {
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
  const allowAccess = await userSchema.findOne({
    _id: verifyToken.id,
  });
  if (allowAccess.verified != true || allowAccess.position === "client") {
    return res.status(401).json({
      status: "ERROR",
      message: "You are not authorized to perform this action",
    });
  }
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      const newProduct = new Product({
        productname: req.body.productname,
        productprice: req.body.productprice,
        productnumber: req.body.productnumber,
        productoldprice: req.body.productoldprice,
        productcategory: req.body.productcategory,
        productclass: req.body.productclass,
        productavailable: req.body.productavailable,
        productdescription: req.body.productdescription,
        productimage: req.file ? req.file.filename : "",
      });

      newProduct
        .save()
        .then((product) => {
          res.status(201).json(product);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  });
};

// get all products
const getAllProducts = async (req, res) => {
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
  const allowAccess = await userSchema.findOne({
    _id: verifyToken.id,
  });
  if (allowAccess.verified != true || allowAccess.position != "owner") {
    return res.status(401).json({
      status: "ERROR",
      message: "You are not authorized to perform this action",
    });
  }
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
    const allowAccess = await userSchema.findOne({
      _id: verifyToken.id,
    });
    if (allowAccess.verified != true || allowAccess.position != "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }
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

// update product
const updateProduct = async (req, res) => {
  try {
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
    const allowAccess = await userSchema.findOne({
      _id: verifyToken.id,
    });
    if (allowAccess.verified != true || allowAccess.position != "owner") {
      return res.status(401).json({
        status: "ERROR",
        message: "You are not authorized to perform this action",
      });
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.body.productname != null) {
      product.productname = req.body.productname;
    }
    if (req.body.productprice != null) {
      product.productprice = req.body.productprice;
    }
    if (req.body.productnumber != null) {
      product.productnumber = req.body.productnumber;
    }
    if (req.body.productoldprice != null) {
      product.productoldprice = req.body.productoldprice;
    }
    if (req.body.productcategory != null) {
      product.productcategory = req.body.productcategory;
    }
    if (req.body.productclass != null) {
      product.productclass = req.body.productclass;
    }
    if (req.body.productavaliable != null) {
      product.productavaliable = req.body.productavaliable;
    }
    if (req.body.productdiscription != null) {
      product.productdiscription = req.body.productdiscription;
    }

    // Handle image upload
    upload.single("productimage")(req, res, (err) => {
      if (err) {
        // If there is an error during upload
        return res.status(400).json({ message: err.message });
      } else {
        // If upload is successful
        if (req.file) {
          product.productimage = req.file.path;
        }

        product.save();

        res.status(200).json({
          message: "Product updated successfully",
          product: product,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
