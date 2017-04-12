import mongoose from 'mongoose'

let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String
  }
})

let user = mongoose.model('user', userSchema)

export default user
