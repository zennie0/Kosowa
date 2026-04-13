const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  addComment,
  getComments,
  deleteComment,
  addReply,
  deleteReply,
} = require('../controllers/commentController')

router.post('/:storyId', auth, addComment)
router.get('/:storyId', getComments)
router.delete('/:id', auth, deleteComment)
router.post('/:id/replies', auth, addReply)
router.delete('/:id/replies/:replyId', auth, deleteReply)

module.exports = router