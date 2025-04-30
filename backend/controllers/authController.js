const axios = require('axios');
const User = require('../models/User');
require('dotenv').config();

// Generate 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// ✅ Send OTP via Fast2SMS API
const sendOTPViaFast2SMS = async (phoneNumber, otp) => {
  const options = {
    method: 'POST',
    url: 'https://www.fast2sms.com/dev/bulkV2',
    headers: {
      'authorization': process.env.FAST2SMS_API_KEY,
      'Content-Type': 'application/json'
    },
    data: {
      variables_values: otp,
      route: 'otp',
      numbers: phoneNumber
    }
  };

  const response = await axios.request(options);
  return response.data;
};

// ✅ Send OTP API
exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = new User({ phoneNumber });
    }

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendOTPViaFast2SMS(phoneNumber, otp);

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

// ✅ Verify OTP API
exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};

  
// Reset Password API Endpoint
exports.resetPassword = async (req, res) => {
  const { phoneNumber, newPassword } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Here, you can hash the password before saving it for better security
    user.password = newPassword;  // In a real app, hash this password!
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in resetting password:', error);
    res.status(500).json({ message: 'Error in resetting password' });
  }
};
