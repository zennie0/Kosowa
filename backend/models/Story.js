const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Mystery', 'Thriller', 'Folklore', 'Drama', 'Comedy', 'Adventure'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'completed'],
    default: 'open',
  },
  contributorCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true })

module.exports = mongoose.model('Story', storySchema)