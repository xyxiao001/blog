import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import user from './models/user'

const app = express()

//创建一个数据库连接
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blog')
const  db = mongoose.connection
db.on('error', console.error.bind(console,'连接错误:'))

console.log('正在连接数据库！')
db.once('open', (callback) => {
  console.log('数据库连接成功！')
})

// 允许跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.get('/', (req, res) => {
  user.findOne((error, data) => {
    if (error) {
      console.log(error)
    } else {
      return res.json(data)
    }
  })
  // return res.json({
  //   name: 'goodboy',
  //   url: 'http://xyxiao.cn'
  // })
})

const server = app.listen(config.port, function() {
	console.log(`The server is already started, Listen on port ${config.port}!`)
})
