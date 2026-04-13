const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markOneRead,
  deleteNotification,
} = require('../controllers/notificationController')

router.get('/', auth, getNotifications)
router.get('/unread-count', auth, getUnreadCount)
router.patch('/mark-all-read', auth, markAllRead)
router.patch('/:id/read', auth, markOneRead)
router.delete('/:id', auth, deleteNotification)

module.exports = router