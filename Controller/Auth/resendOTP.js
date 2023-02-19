const UserOTPVerification = require("../../Schema/UserOTPVerification");
const sendOTPVerificationEmail = require("./sendOTP");
const resendOTP = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Enter password");
    } else {
      await UserOTPVerification.deleteMany({ userId });
      await sendOTPVerificationEmail({ _id: userId, email }, res);
    }
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};

module.exports = resendOTP;
