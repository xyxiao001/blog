import mongoose from 'mongoose'

let Schema = mongoose.Schema

let articleSchema = new Schema({
  name: {
    type: String,
  },
  tags: {
    type: Array
  },
  content: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
})

let article = mongoose.model('article', articleSchema, 'article')

export default article
