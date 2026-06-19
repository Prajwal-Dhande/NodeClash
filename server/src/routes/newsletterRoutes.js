const express = require('express');
const router = express.Router();
const { sendNewsletterNotificationEmail } = require('../services/emailService');

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter and notify admin
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Send notification email to admin
    await sendNewsletterNotificationEmail(email, preferences || { general: true, digest: true });

    res.status(200).json({ success: true, message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
