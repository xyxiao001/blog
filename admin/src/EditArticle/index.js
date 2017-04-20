import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import Moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Button from '../Button'
import { message, DatePicker, Modal } from 'antd'

// 导入css
import './index.css'

class EditArticle extends Component {
  constructor(props) {
    super(props)
    this.updateName = this.updateName.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.updateEdit = this.updateEdit.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.addArticle = this.addArticle.bind(this)
    this.rule = this.rule.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)
    this.state = {
      id: 0,
      edit: true,
      info: {
        name: '',
        tags: [],
        content: '',
        time: new Date()
      }
    }
  }
  componentWillMount() {
    var path = this.props.match.path
    if(path.search('/dashboard/addArticle') !== -1) {
      this.setState({
        edit: false
      })
    } else {
      var id = this.props.match.params.id
      this.setState({
        id: id
      }, () => {
        var that = this
        window.axios.get('/article?id=' + this.state.id)
        .then(function (response) {
          // console.log(response.data)
          message.success(response.data.msg)
          response.data.data.time = Moment(response.data.data.time).format('YYYY-MM-DD HH:mm:ss')
          that.setState({
            info: response.data.data
          }, () => {
            that.refs.name.value = that.state.info.name
            that.refs.edit.value = that.state.info.content
            // that.refs.time.value = that.state.info.time
          })
        })
        .catch(function (error) {
          message.error('请求失败！')
          console.log(error)
        })
      })
    }
  }

  updateName(e) {
    var obj = Object.assign({}, this.state.info)
    obj.name = e.target.value
    this.setState({
      info: obj
    })
  }

  updateTime(value, date) {
    var obj = Object.assign({}, this.state.info)
    obj.time = date
    this.setState({
      info: obj
    })
  }

  updateEdit(e) {
    var obj = Object.assign({}, this.state.info)
    obj.content = e.target.value
    this.setState({
      info: obj
    })
  }

  // 修改文章
  updateArticle() {
    if (!this.rule()) {
      return false
    }
    var that = this
    window.axios.post('/updateArticle', {
      data: JSON.stringify(that.state.info)
    })
    .then(function (response) {
      if(~~(response.data.status) === 1) {
        message.success(response.data.msg)
      } else {
        message.error(response.data.msg)
      }
      // console.log(response)
    })
    .catch(function (error) {
      message.error('请求失败！')
      console.log(error)
    })
  }

  // 新增文章
  addArticle() {
    if (!this.rule()) {
      return false
    }
    var that = this
    window.axios.post('/addArticle', {
      data: JSON.stringify(that.state.info)
    })
    .then(function (response) {
      message.success(response.data.msg)
      that.refs.name.value = ''
      that.refs.edit.value = ''
      var obj = {
        name: '',
        content: '',
        time: new Date()
      }
      that.setState({
        info: obj
      })
      // that.props.history.goBack(-1)
    })
    .catch(function (error) {
      message.error('请求失败！')
      console.log(error)
    })
  }

  // 删除文章
  deleteArticle() {
    var that = this
    Modal.confirm({
      title: '确认删除？',
      content: '删除后无法恢复！',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        window.axios.post('/deleteArticle', {
          id: JSON.stringify(that.state.info._id)
        })
        .then(function (response) {
          message.success(response.data.msg)
          that.props.history.goBack(-1)
          // console.log(response)
        })
        .catch(function (error) {
          message.error('请求失败！')
          console.log(error)
        })
      }
    })
  }
  // 校验规则
  rule () {
    var o = this.state.info
    var s = true
    o.name = o.name.replace(/(^\s*)|(\s*$)/g, '')
    if (o.name.length <= 0) {
      message.error('博客标题不能为空')
      s = false
      return false
    }
    o.content = o.content.replace(/(^\s*)|(\s*$)/g, '')
    if (o.content.length <= 0) {
      message.error('文章内容不能为空')
      s = false
      return false
    }
    return s
  }

  render() {
    return (
      <div className="main-content">
        <div className="box-edit">
          <div className="edit">
            <label className="x-label">文章标题</label>
            <input
              ref="name"
              defaultValue={this.state.info.name}
              className="x-input"
              placeholder="请输入文章标题"
              onChange={this.updateName}
            />
          <label className="x-label">文章时间</label>
            <DatePicker
              showTime
              allowClear={false}
              ref="time"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择时间"
              value={Moment(this.state.info.time)}
              onChange={this.updateTime}
            />
          <label className="x-label">文章内容</label>
            <textarea
              ref="edit"
              className="x-input"
              defaultValue={this.state.info.content}
              onChange={this.updateEdit}
            />
          <div className={this.state.edit ? 'edit-control' : 'hide'}>
            <Button type="primary" className="saveEdit" onClick={this.updateArticle}>更新文章</Button>
            <Button type="danger" className="saveEdit" onClick={this.deleteArticle}>删除文章</Button>
          </div>
          <div className={!this.state.edit ? 'add-control' : 'hide'}>
            <Button type="primary" className="saveEdit" onClick={this.addArticle}>保存文章</Button>
          </div>
          </div>
          <div className="preview">
            <h1 className="title">{this.state.info.name}</h1>
            <ReactMarkdown className="markdown-body" source={this.state.info.content} />
          </div>
        </div>
      </div>
    )
  }
}

export default EditArticle
