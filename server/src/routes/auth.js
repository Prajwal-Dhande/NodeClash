const express = require('express')
const router = express.Router()
const { signup, login, verifyOtp, resendOtp, getMe, googleAuth, githubAuth, requestPasswordChange, verifyPasswordChange, forgotPassword, resetPassword } = require('../controllers/authController')
const authMiddleware = require('../middleware/authmiddleware')

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-otp', verifyOtp)
router.post('/resend-otp', resendOtp)
router.get('/me', authMiddleware, getMe)

// 🔥 OAuth Routes
router.post('/google', googleAuth)
router.post('/github', githubAuth)

// 🔥 Password Change (logged-in)
router.post('/change-password/request', authMiddleware, requestPasswordChange)
router.post('/change-password/verify', authMiddleware, verifyPasswordChange)

// 🔥 Forgot Password (not logged-in)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router