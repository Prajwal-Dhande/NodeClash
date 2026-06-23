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

    // Respond immediately to the user
    res.status(200).json({ success: true, message: 'Successfully subscribed to the newsletter!' });

    // Send admin notification in background (fire-and-forget)
    sendNewsletterNotificationEmail(email, preferences || { general: true, digest: true })
      .catch(err => console.error('Background newsletter notification failed:', err.message));
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    // Only send error if headers haven't been sent yet
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

module.exports = router;
