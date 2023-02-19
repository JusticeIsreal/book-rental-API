const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes
const userAccess = require("./Route/userAuthRoute");
app.use("/api/v1/userverification", userAccess);

const connectDB = require("./Database/adminDB.js");
const connectAdminToDataBase = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log("app is listening on port 1234");
    });
  } catch (error) {
    console.log(error);
  }
};
connectAdminToDataBase();
