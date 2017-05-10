import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import bodyParser from 'body-parser'
import moment from 'moment'
import jwt from 'jwt-simple'

// 表
import user from './models/user'
import article from './models/article'
import pageView from './models/pageView'
import comment from './models/comment'

const app = express()

// 设置jwt密钥
app.set('jwtTokenSecret', 'goodboy')

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
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, accessToken")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

// app.get('/', (req, res) => {
//   user.findOne((error, data) => {
//     if (error) {
//       console.log(error)
//     } else {
//       return res.json(data)
//     }
//   })
// })

// 登录验证
app.post('/login', (req, res) => {
  var obj = req.body
  user.findOne({name: obj.username}).exec((error, data) => {
    if (error) {
      console.log(error)
      return res.json({
        status: 0,
        msg: '数据库查询失败'
      })
    } else {
      if(!data) {
        return res.json({
          status: 0,
          msg: '用户不存在'
        })
      }

      if (obj.password !== data.password) {
        return res.json({
          status: 0,
          msg: '密码错误'
        })
      }

      // 表明存在用户, 登录成功生成token
      // 过期时间
      var expires = moment().add(7, 'd').valueOf('')
      var token = jwt.encode({
        iss: data._id,
        exp: expires
      }, app.get('jwtTokenSecret'))

      return res.json({
        status: 1,
        token: token,
        msg: '登陆成功'
      })
    }
  })
})

// 校验token
app.post('/tokenAuto', (req, res) => {
  var token = req.body.token
  try {
    var decoded = jwt.decode(token, app.get('jwtTokenSecret'))
    // 判断时间是否过期
    var now = Date.parse(new Date)
    if (decoded.exp < now) {
      return res.json({
        status: 0,
        msg: 'token 已过期'
      })
    } else {
      return res.json({
        status: 1,
        msg: 'token正常'
      })
    }
  } catch (e) {
    return res.json({
      status: 0,
      msg: 'token无效'
    })
  }
})

// 文章列表和详情
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

  // 每页条数
  let limit = 10
  if (req.query.limit) {
    limit = ~~(req.query.limit)
    limit = limit > 0 ? limit : 5
  }
  article.find().sort({'time': -1}).exec((error, data) => {
    if (error) {
      return res.json({
        status: 0,
        msg: '查询文章失败'
      })
      console.log(error)
    } else {
      let all = data.length
      // 算出总页数
      let allPages = Math.ceil(all / limit)
      // 得到当前页数
      let current = req.query.page ? ~~(req.query.page) : 1
      if (current < 1) {
        current = 1
      }
      current = current > allPages ? allPages : current
      article.find().sort({'time': -1}).skip((current - 1) * limit).limit(limit).exec((error, data) => {
        if (error) {
          return res.json({
            status: 0,
            msg: '查询文章失败'
          })
          console.log(error)
        } else {
          // 处理文章
          var lists = data.map((item, index) => {
            if (item.content.length > 200) {
              item.content = item.content.substring(0, 200) + '...'
            }
            return item
          })
          return res.json({
            status: 0,
            msg: '查询文章列表成功',
            limit: limit,
            current: current,
            all: all,
            allPages: allPages,
            data: lists
          })
        }
      })
    }
  })
})

// 更新文章
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

// 删除文章
app.post('/deleteArticle', (req, res) => {
  var id = JSON.parse(req.body.id)
  if (id) {
    article.remove({_id: id}).exec((error, data) => {
      if (error) {
        console.log(error)
        return res.json({
          status: 0,
          msg: '删除失败'
        })
      } else {
        return res.json({
          status: 1,
          msg: '删除成功'
        })
      }
    })
  }
})

// 浏览量增加
app.get('/addPageView', (req, res) => {
  var name = req.query.name ? req.query.name : 'total'
  var add = req.query.add
  if (add === 'false') {
    pageView.findOne({name: 'total'}).exec((error, data) => {
      if (error) {
        return res.json({
          status: 0,
          msg: '查询浏览量失败'
        })
      } else {
        return res.json({
          status: 1,
          view: data.view,
          msg: '查询浏览量'
        })
      }
    })
  } else {
    pageView.update({name: name}, {'$inc': {view: 1}}).exec((error, data) => {
      if (error) {
        return res.json({
          status: 0,
          msg: '增加浏览量失败'
        })
      } else {
        pageView.findOne({name: name}).exec((error, data) => {
          if (error) {
            return res.json({
              status: 0,
              msg: '增加浏览量失败'
            })
          } else {
            if (data) {
              return res.json({
                status: 1,
                view: data.view,
                msg: '增加浏览量成功'
              })
            } else {
              var newView = new pageView({name: name, view: 1})
              newView.save()
              return res.json({
                status: 1,
                view: 1,
                msg: '增加浏览量成功'
              })
            }
          }
        })
      }
    })
  }
})

// 新增评论
app.post('/addComment', (req, res) => {
  // 先去看看评论表里面是否有这个id
  comment.findOne({articleId: req.body.id}).exec((error, data) => {
    if (error) {
      return res.json({
        status: 0,
        msg: '评论失败'
      })
    } else {
      if (data) {
        comment.update({articleId: req.body.id}, {$push: {comments: {
          username: req.body.username,
          comment: req.body.comment,
          requestname: req.body.requestname
        }}}).exec((error, data) => {
          if (error) {
            return res.json({
              status: 0,
              msg: '评论失败'
            })
          }
          return res.json({
            status: 1,
            msg: '评论成功'
          })
        })
      } else {
        var newComment = new comment({articleId: req.body.id, comments:[{
          username: req.body.username,
          comment: req.body.comment,
          requestname: req.body.requestname
        }]})
        newComment.save()
        return res.json({
          status: 1,
          msg: '评论成功'
        })
      }
    }
  })
})

// 获取评论
app.get('/getComment', (req, res) => {
  comment.findOne({articleId: req.query.id}).exec((error, data) => {
    if (error) {
      return res.json({
        status: 0,
        msg: '获取评论失败'
      })
    }
    return res.json({
      status: 1,
      data: data.comments,
      msg: '获取评论成功'
    })
  })
})

const server = app.listen(config.port, function() {
	console.log(`The server is already started, Listen on port ${config.port}!`)
})
