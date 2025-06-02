const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, resetPassword, login, resendOTP } = require('../controllers/authController');

// OTP routes
router.post('/send-otp', sendOTP);  // Send OTP
router.post('/verify-otp', verifyOTP);  // Verify OTP

// Reset password route
router.post('/reset-password', resetPassword);  // Reset password

// Login route
router.post('/login', login);  // Login route

// Resend OTP route
router.post('/resend-otp', resendOTP);  // Resend OTP route

module.exports = router;
