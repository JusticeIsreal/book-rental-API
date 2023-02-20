const express = require("express");
const router = express.Router();

const {
  updateTransaction,
  allTransaction,
} = require("../Controller/Transaction/Transaction");



// admin access routes
router.get("/alltransaction", allTransaction);
router.patch("/updatetransaction/:id", updateTransaction);


module.exports = router;
