import express from 'express'
import config from './config'

const app = express()

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8777');
  return res.json({
    name: 'goodboy',
    url: 'http://xyxiao.cn'
  })
})

const server = app.listen(config.port, function() {
	console.log(`The server is already started, Listen on port ${config.port}!`)
})
