const mongoose = require("mongoose");

productSchemaFunc = mongoose.Schema({
  productname: {
    type: String,
    // required: [true, "Enter a product name"],
  },
  productprice: {
    type: Number,
    // required: [true, "Enter a product price"],
  },
  productnumber: {
    type: Number,
    // required: [true, "Enter a product unique number"],
  },
  productoldprice: {
    type: Number,
  },
  productcategory: {
    type: String,
    // required: [true, "Enter a product category"],
  },
  productclass: {
    type: String,
    // required: [true, "Enter a product class"],
  },
  productavaliable: {
    type: Number,
    // required: [true, "Enter number of product available"],
  },
  productdiscription: {
    type: String,
    // required: [true, "Enter number of product discription"],
  },
  productimage: {
    type: String,
    // required: [true, "Enter number of product image"],
  },
});

module.exports = mongoose.model("productSchema", productSchemaFunc);
