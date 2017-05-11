import mongoose from 'mongoose'

let Schema = mongoose.Schema

let commentSchema = new Schema({
  articleId: {
    type: String,
  },
  comments: {
    type: Array
  },
  time: {
    type: Date,
    default: Date.now
  }
})

let comment = mongoose.model('comment', commentSchema, 'comment')

export default comment
