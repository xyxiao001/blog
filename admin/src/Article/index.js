import React, { Component } from 'react'
import PropTypes from 'prop-types'

//组件
import Button from '../Button'
// 导入css
import './index.css'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleLists: []
    }
  }
  componentWillMount() {
    let that = this
    window.axios.get('/article')
    .then(function (response) {
      that.setState({
        articleLists: response.data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  render() {
    return (
      <div className="main-content">
        <Button type="primary" onClick={() => console.log('触发新增博文事件')}>新增博文</Button>
        <div className="article-list">
          {this.state.articleLists.map((article) => <Item key={article.name} data={article} />)}
        </div>
      </div>
    )
  }
}


class Item extends Component {
  render() {
    return (
      <div className="article-item">
        <p>{ this.props.data.name }</p>
        <p>{ this.props.data.time }</p>
      </div>
    )
  }
}

Item.PropsTypes = {
  data: PropTypes.Object
}

export default Article
