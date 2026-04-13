const Paragraph = require('../models/Paragraph')
const Story = require('../models/Story')
const Notification = require('../models/Notification')

const addParagraph = async (req, res) => {
  try {
    const { text } = req.body
    const storyId = req.params.storyId

    if (!text) {
      return res.status(400).json({ message: 'Paragraph text is required' })
    }

    const words = text.trim().split(/\s+/).length
    if (words > 200) {
      return res.status(400).json({ message: 'Paragraph must be under 200 words' })
    }

    const story = await Story.findById(storyId)
    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    if (story.status === 'completed') {
      return res.status(400).json({ message: 'This story is completed and no longer accepting contributions' })
    }

    const isOwner = story.owner.toString() === req.user.id

    if (!isOwner) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const todayCount = await Paragraph.countDocuments({
        story: storyId,
        author: req.user.id,
        createdAt: { $gte: today },
      })

      if (todayCount >= 5) {
        return res.status(400).json({ message: 'You have reached your limit of 5 paragraphs per day for this story' })
      }
    }

    const paragraph = await Paragraph.create({
      story: storyId,
      author: req.user.id,
      text: text.trim(),
      isOwnerParagraph: isOwner,
    })

    await paragraph.populate('author', 'name username')

    if (!isOwner) {
      const existingContributor = await Paragraph.findOne({
        story: storyId,
        author: req.user.id,
        _id: { $ne: paragraph._id },
      })

      if (!existingContributor) {
        await Story.findByIdAndUpdate(storyId, { $inc: { contributorCount: 1 } })
      }

      await Notification.create({
        recipient: story.owner,
        type: 'contribution',
        message: `@${req.user.username} added a new paragraph to ${story.title}`,
        story: storyId,
      })
    }

    res.status(201).json(paragraph)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const deleteParagraph = async (req, res) => {
  try {
    const paragraph = await Paragraph.findById(req.params.id)

    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' })
    }

    const story = await Story.findById(paragraph.story)

    const isOwner = story.owner.toString() === req.user.id
    const isAuthor = paragraph.author.toString() === req.user.id

    if (!isOwner) {
      return res.status(403).json({ message: 'Only the story owner can delete paragraphs' })
    }

    await paragraph.deleteOne()

    res.json({ message: 'Paragraph deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getDailyQuota = async (req, res) => {
  try {
    const { storyId } = req.params

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayCount = await Paragraph.countDocuments({
      story: storyId,
      author: req.user.id,
      createdAt: { $gte: today },
    })

    res.json({ used: todayCount, limit: 5, remaining: 5 - todayCount })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { addParagraph, deleteParagraph, getDailyQuota }