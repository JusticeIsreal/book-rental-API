const UserOTPVerification = require("../../Schema/UserOTPVerification");
const sendOTPVerificationEmail = require("./sendOTP");

// resend otp
const resendOTP = async (req, res) => {
  try {
    // get  the email and apssword
    const { userId, email } = req.body;

    // if none
    if (!userId || !email) {
      throw Error("Enter password");
    } else {
      // delete any previous OTP record for that user
      await UserOTPVerification.deleteMany({ userId });
      // call the send otp middleware
      await sendOTPVerificationEmail({ _id: userId, email }, res);
    }
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};

module.exports = resendOTP;
