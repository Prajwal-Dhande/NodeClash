const express = require('express')
const router = express.Router()
const auth = require('../middleware/authmiddleware')
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearAll
} = require('../controllers/notificationController')

// All routes require authentication
router.get('/', auth, getNotifications)
router.put('/read-all', auth, markAllAsRead)
router.put('/:id/read', auth, markAsRead)
router.delete('/clear', auth, clearAll)

module.exports = router
