const Notification = require('../models/Notification')

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('story', 'title')
      .sort({ createdAt: -1 })

    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      read: false,
    })

    res.json({ count })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { $set: { read: true } }
    )

    res.json({ message: 'All notifications marked as read' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const markOneRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    notification.read = true
    await notification.save()

    res.json(notification)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await notification.deleteOne()
    res.json({ message: 'Notification deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markOneRead,
  deleteNotification,
}