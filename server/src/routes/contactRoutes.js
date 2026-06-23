const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

// @route   POST /api/contact
// @desc    Submit contact form and notify admin
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required' });
    }

    // Respond immediately to the user
    res.status(200).json({ success: true, message: 'Message sent successfully!' });

    // Send contact email to admin in background (fire-and-forget)
    sendContactEmail(email, message)
      .catch(err => console.error('Background contact email failed:', err.message));
  } catch (error) {
    console.error('Contact form error:', error);
    // Only send error if headers haven't been sent yet
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

module.exports = router;
