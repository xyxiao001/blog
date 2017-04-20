import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import Moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Button from '../Button'

// 导入css
import './index.css'

class EditArticle extends Component {
  constructor(props) {
    super(props)
    this.updateName = this.updateName.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.updateEdit = this.updateEdit.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.state = {
      id: 0,
      edit: true,
      info: {
        name: '',
        tags: [],
        content: '',
        time: ''
      }
    }
  }
  componentWillMount() {
    var path = this.props.match.path
    if(path.search('/dashboard/addArticle') !== -1) {
      var obj = Object.assign({}, this.state.info)
      obj.time = Moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
      this.setState({
        edit: false,
        info: obj
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
          response.data.time = Moment(response.data.time).format('YYYY-MM-DD HH:MM:SS')
          that.setState({
            info: response.data.data
          }, () => {
            that.refs.name.value = that.state.info.name
            that.refs.edit.value = that.state.info.content
            that.refs.time.value = that.state.info.time
          })
        })
        .catch(function (error) {
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

  updateTime(e) {
    var obj = Object.assign({}, this.state.info)
    obj.time = e.target.value
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
    var that = this
    window.axios.post('/updateArticle', {
      data: JSON.stringify(that.state.info)
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
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
            <input
              ref="time"
              defaultValue={this.state.info.time}
              className="x-input"
              placeholder="文章时间"
              onChange={this.updateTime}
            />
          <label className="x-label">文章内容</label>
            <textarea
              ref="edit"
              className="x-input"
              defaultValue={this.state.info.content}
              onChange={this.updateEdit}
            />
          <Button type="primary" className="saveEdit" onClick={this.updateArticle}>更新文章</Button>
          <Button type="danger" className="saveEdit" onClick={() => console.log('删除')}>删除文章</Button>
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
