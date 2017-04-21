import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { message, Pagination } from 'antd'

//组件
import Button from '../Button'

import getQueryString from '../getQueryString'
// 导入css
import './index.css'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      all: 0,
      allPages: 0,
      articleLists: []
    }
    this.getArticle = this.getArticle.bind(this)
    this.updatePage = this.updatePage.bind(this)
  }

  // 请求
  getArticle() {
    let that = this
    window.axios.get('/article?page=' + that.state.current)
    .then(function (response) {
      message.success(response.data.msg)
      that.setState({
        all: response.data.all,
        allPages: response.data.allPages,
        articleLists: response.data.data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  // 翻页
  updatePage(page, pageSize) {
    this.props.history.push({
      pathname: '/dashboard',
      search: '?page=' + page
    })
    window.scroll(0, 0)
    // console.log(this.props.history.location)
    this.setState({
      current: ~~(getQueryString(this.props.history.location.search, 'page'))
    }, () => {
      this.getArticle()
    })
  }

  componentWillMount() {
    var search = this.props.location.search
    if (search.length > 1) {
      var page = ~~(getQueryString(search, 'page'))
      page = page > 0 ? page : 1
      this.setState({
        current: page
      }, () => {
        this.getArticle()
      })
    } else {
      this.getArticle()
    }

  }
  render() {
    return (
      <div className="main-content">
        <Link to="/dashboard/addArticle"><Button type="primary"  className="add-article">新增博文</Button></Link>
        <div className="article-list">
          {this.state.articleLists.map((article) => <Item key={article.name + Math.random()} data={article} />)}
        </div>
        <Pagination
          showQuickJumper={true}
          defaultCurrent={this.state.current}
          defaultPageSize={10}
          total={this.state.all}
          size="large"
          onChange={this.updatePage}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} 篇`}
          />
      </div>
    )
  }
}


class Item extends Component {
  render() {
    return (
      <Link className="article-item" to={'/dashboard/editArticle/' + this.props.data._id}>
        <h1 className="article-name">{ this.props.data.name }</h1>
        <section className="article-content">
          { this.props.data.content }
        </section>
        <p className="article-time">goodboy · { Moment(this.props.data.time).format('YYYY-MM-DD HH:mm:ss') }</p>
      </Link>
    )
  }
}

Item.PropsTypes = {
  data: PropTypes.Object
}

export default Article
