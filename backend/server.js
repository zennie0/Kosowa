const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/stories', require('./routes/stories'))
app.use('/api/paragraphs', require('./routes/paragraph'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/notifications', require('./routes/notifications'))

app.get('/', (req, res) => {
  res.json({ message: 'Kosowa API is running' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })