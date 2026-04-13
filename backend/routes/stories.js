const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  createStory,
  getAllStories,
  getStoryById,
  getMyStories,
  getProfileStories,
  completeStory,
  deleteStory,
} = require('../controllers/storyController')

router.get('/', getAllStories)
router.get('/mine', auth, getMyStories)
router.get('/profile/:username', getProfileStories)
router.get('/:id', getStoryById)
router.post('/', auth, createStory)
router.patch('/:id/complete', auth, completeStory)
router.delete('/:id', auth, deleteStory)

module.exports = router