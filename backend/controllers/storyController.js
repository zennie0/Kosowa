const Story = require('../models/Story')
const Paragraph = require('../models/Paragraph')
const User = require('../models/User')

const createStory = async (req, res) => {
  try {
    const { title, genre, description, firstParagraph } = req.body

    if (!title || !genre || !description || !firstParagraph) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const words = firstParagraph.trim().split(/\s+/).length
    if (words > 200) {
      return res.status(400).json({ message: 'Opening paragraph must be under 200 words' })
    }

    const story = await Story.create({
      title,
      genre,
      description,
      owner: req.user.id,
    })

    await Paragraph.create({
      story: story._id,
      author: req.user.id,
      text: firstParagraph,
      isOwnerParagraph: true,
    })

    res.status(201).json(story)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getAllStories = async (req, res) => {
  try {
    const { genre, search } = req.query

    const filter = {}
    if (genre && genre !== 'All') filter.genre = genre
    if (search) filter.title = { $regex: search, $options: 'i' }

    const stories = await Story.find(filter)
      .populate('owner', 'name username')
      .sort({ createdAt: -1 })

    res.json(stories)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('owner', 'name username')

    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    const paragraphs = await Paragraph.find({ story: story._id })
      .populate('author', 'name username')
      .sort({ createdAt: 1 })

    res.json({ story, paragraphs })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getMyStories = async (req, res) => {
  try {
    const stories = await Story.find({ owner: req.user.id })
      .sort({ createdAt: -1 })

    res.json(stories)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const getProfileStories = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const stories = await Story.find({ owner: user._id })
      .sort({ createdAt: -1 })

    res.json({ user: { name: user.name, username: user.username, createdAt: user.createdAt }, stories })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const completeStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)

    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    if (story.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the owner can complete this story' })
    }

    story.status = 'completed'
    await story.save()

    res.json(story)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)

    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }

    if (story.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the owner can delete this story' })
    }

    await Paragraph.deleteMany({ story: story._id })
    await story.deleteOne()

    res.json({ message: 'Story deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = {
  createStory,
  getAllStories,
  getStoryById,
  getMyStories,
  getProfileStories,
  completeStory,
  deleteStory,
}