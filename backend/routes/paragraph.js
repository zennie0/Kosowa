const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  addParagraph,
  deleteParagraph,
  getDailyQuota,
} = require('../controllers/paragraphController')

router.post('/:storyId', auth, addParagraph)
router.delete('/:id', auth, deleteParagraph)
router.get('/quota/:storyId', auth, getDailyQuota)

module.exports = router