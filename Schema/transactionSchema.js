const mongoose = require("mongoose");

transactionSchemaFunc = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  position: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  productbought: {
    type: Array,
  },
});

module.exports = mongoose.model("transactionSchema", transactionSchemaFunc);
