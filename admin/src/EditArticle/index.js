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
    this.updateEdit = this.updateEdit.bind(this)
    this.state = {
      id: 0,
      info: {
        name: '',
        tags: [],
        content: '',
        time: ''
      }
    }
  }
  componentWillMount() {
    var id = this.props.match.params.id
    this.setState({
      id: id
    }, () => {
      var that = this
      window.axios.get('/article?id=' + this.state.id)
      .then(function (response) {
        // console.log(response.data)
        that.setState({
          info: response.data
        }, () => {
          that.refs.name.value = that.state.info.name
          that.refs.edit.value = that.state.info.content
          that.refs.time.value = Moment(that.state.info.time).format('YYYY-MM-DD HH:MM:SS')
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    })
  }
  updateEdit(e) {
    var obj = Object.assign({}, this.state.info)
    obj.content = e.target.value
    this.setState({
      info: obj
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
            />
          <label className="x-label">文章时间</label>
            <input
              ref="time"
              defaultValue={this.state.info.time}
              className="x-input"
              placeholder="文章时间"
            />
          <label className="x-label">文章内容</label>
            <textarea
              ref="edit"
              className="x-input"
              defaultValue={this.state.info.content}
              onChange={this.updateEdit}
            />
          <Button type="primary" className="saveEdit" onClick={() => console.log('更新')}>更新文章</Button>
          <Button type="danger" className="saveEdit" onClick={() => console.log('删除')}>删除文章</Button>
          </div>
          <div className="preview">
            <h1>{this.state.info.name}</h1>
            <ReactMarkdown source={this.state.info.content} />
          </div>
        </div>
      </div>
    )
  }
}

export default EditArticle
