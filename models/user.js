import mongoose from 'mongoose'

let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String
  },
  password: {
    type: String
  }
})

let user = mongoose.model('user', userSchema, 'users')

export default user
