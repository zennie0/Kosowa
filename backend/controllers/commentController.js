const Comment = require('../models/Comment')
const Story = require('../models/Story')
const Notification = require('../models/Notification')

const addComment = async (req, res) => {
  try {
    const { text } = req.body
    const { storyId } = req.params

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' })
    }

    const story = await Story.findById(storyId)
    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    const comment = await Comment.create({
      story: storyId,
      author: req.user.id,
      text: text.trim(),
      replies: [],
    })

    await comment.populate('author', 'name username')

    if (story.owner.toString() !== req.user.id) {
      await Notification.create({
        recipient: story.owner,
        type: 'comment',
        message: `@${req.user.username} commented on ${story.title}`,
        story: storyId,
      })
    }

    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getComments = async (req, res) => {
  try {
    const { storyId } = req.params

    const comments = await Comment.find({ story: storyId })
      .populate('author', 'name username')
      .populate('replies.author', 'name username')
      .sort({ createdAt: -1 })

    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    const story = await Story.findById(comment.story)
    const isStoryOwner = story.owner.toString() === req.user.id
    const isCommentAuthor = comment.author.toString() === req.user.id

    if (!isStoryOwner && !isCommentAuthor) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' })
    }

    await comment.deleteOne()
    res.json({ message: 'Comment deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const addReply = async (req, res) => {
  try {
    const { text } = req.body
    const { id } = req.params

    if (!text) {
      return res.status(400).json({ message: 'Reply text is required' })
    }

    const comment = await Comment.findById(id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    const reply = {
      author: req.user.id,
      text: text.trim(),
    }

    comment.replies.push(reply)
    await comment.save()
    await comment.populate('replies.author', 'name username')

    const newReply = comment.replies[comment.replies.length - 1]
    res.status(201).json(newReply)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const deleteReply = async (req, res) => {
  try {
    const { id, replyId } = req.params

    const comment = await Comment.findById(id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    const reply = comment.replies.id(replyId)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }

    const story = await Story.findById(comment.story)
    const isStoryOwner = story.owner.toString() === req.user.id
    const isReplyAuthor = reply.author.toString() === req.user.id

    if (!isStoryOwner && !isReplyAuthor) {
      return res.status(403).json({ message: 'Not authorized to delete this reply' })
    }

    reply.deleteOne()
    await comment.save()

    res.json({ message: 'Reply deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { addComment, getComments, deleteComment, addReply, deleteReply }