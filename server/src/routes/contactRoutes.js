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

    // Send contact email to admin
    await sendContactEmail(email, message);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
