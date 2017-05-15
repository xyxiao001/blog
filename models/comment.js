import mongoose from 'mongoose'

let Schema = mongoose.Schema

let commentSchema = new Schema({
  articleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  username: {
    type: String
  },
  comment: {
    type: String
  },
  agree: {
    type: Number,
    default: 0
  },
  disagree: {
    type: Number,
    default: 0
  },
  replyList: {
    type: Array
  },
  time: {
    type: Date,
    default: Date.now
  }
})

let comment = mongoose.model('comment', commentSchema, 'comment')

export default comment
