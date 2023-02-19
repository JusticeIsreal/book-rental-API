// log in as an admin
const adminAccessSchema = require("../../Schema/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminAccessSchema.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);

    if (user.verified === false) {
      return res.status(403).json({
        status: "ERROR",
        message: "Email has not been verified, Kindly Verify you email",
      });
    }

    if (!user || !validPassword) {
      return res
        .satus(400)
        .json({ status: "FAILED", message: "Invalid user name or password" });
    }

    const userToken = {
      username: user.username,
      id: user.id,
    };
    const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: "1d" });

    res.status(200).json({ status: "SUCCESS", data: token });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = loginUser;
