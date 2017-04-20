import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import user from './models/user'
import article from './models/article'
import bodyParser from 'body-parser'

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

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 允许跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
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
})

app.get('/article', (req, res) => {
  if (req.query.id) {
    // 如果查询参数带id 那么直接返回一条的详细信息
    article.findOne({_id: req.query.id}).exec((error, data) => {
      if (error) {
        console.log(error.message)
        return res.json({
          status: 0,
          msg: '查询文章失败'
        })
      } else {
        return res.json({
          status: 1,
          msg: '查询文章成功',
          data: data
        })
      }
    })
    return false
  }
  article.find().sort({'time': -1}).exec((error, data) => {
    if (error) {
      return res.json({
        status: 0,
        msg: '查询文章失败'
      })
      console.log(error)
    } else {
      return res.json({
        status: 0,
        msg: '查询文章列表成功',
        data: data
      })
    }
  })
})

app.post('/updateArticle', (req, res) => {
  var obj = JSON.parse(req.body.data)
  obj.time = new Date(obj.time)
  if (obj.time == 'Invalid Date') {
    obj.time = new Date()
  }
  if (obj._id && obj._id !== 0) {
    //数据库查询id 更新文章
    article.update({_id: obj._id}, obj).exec((error, data) => {
      if (error) {
        console.log(error)
        return res.json({
          status: 0,
          msg: '更新失败'
        })
      } else {
        return res.json({
          status: 1,
          msg: '更新成功'
        })
      }
    })
  } else {
    return res.json({
      status: 0,
      msg: '更新失败'
    })
  }
})

app.post('/addArticle', (req, res) => {
  var obj = JSON.parse(req.body.data)
  obj.time = new Date(obj.time)
  if (obj.time == 'Invalid Date') {
    obj.time = new Date()
  }
  var add = new article(obj)
  add.save()
  return res.json({
    status: 1,
    msg: '添加文章成功'
  })
})

const server = app.listen(config.port, function() {
	console.log(`The server is already started, Listen on port ${config.port}!`)
})
