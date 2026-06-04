const express = require('express')
const router = express.Router()
const { signup, login, verifyOtp, resendOtp, getMe, googleAuth, githubAuth, requestPasswordChange, verifyPasswordChange } = require('../controllers/authController')
const authMiddleware = require('../middleware/authmiddleware')

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-otp', verifyOtp)
router.post('/resend-otp', resendOtp)
router.get('/me', authMiddleware, getMe)

// 🔥 OAuth Routes
router.post('/google', googleAuth)
router.post('/github', githubAuth)

// 🔥 Password Change
router.post('/change-password/request', authMiddleware, requestPasswordChange)
router.post('/change-password/verify', authMiddleware, verifyPasswordChange)

module.exports = router