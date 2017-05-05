import mongoose from 'mongoose'

let Schema = mongoose.Schema

let pageViewSchema = new Schema({
  name: {
    type: String,
  },
  view: {
    type: Number
  }
})

let pageView = mongoose.model('pageView', pageViewSchema, 'pageView')

export default pageView
