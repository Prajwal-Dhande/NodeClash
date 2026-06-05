const Notification = require('../models/Notification')

// GET /api/notifications — Fetch all notifications for logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(50)
    
    const unreadCount = await Notification.countDocuments({ user: req.userId, read: false })
    
    res.json({ success: true, notifications, unreadCount })
  } catch (err) {
    console.error('getNotifications error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// PUT /api/notifications/:id/read — Mark a single notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { read: true },
      { new: true }
    )
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' })
    res.json({ success: true, notification })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// PUT /api/notifications/read-all — Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.userId, read: false }, { read: true })
    res.json({ success: true, message: 'All notifications marked as read' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// DELETE /api/notifications/clear — Delete all read notifications
exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.userId, read: true })
    res.json({ success: true, message: 'Cleared all read notifications' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
