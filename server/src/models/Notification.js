const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'success', 'error'], default: 'info' },
  read: { type: Boolean, default: false },
  link: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now, expires: 30 * 24 * 60 * 60 } // Auto-delete after 30 days (TTL index)
})

module.exports = mongoose.model('Notification', notificationSchema)
