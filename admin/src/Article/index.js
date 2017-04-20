import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'moment'

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
        articleLists: response.data.data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  render() {
    return (
      <div className="main-content">
        <Link to="/dashboard/addArticle"><Button type="primary"  className="add-article">新增博文</Button></Link>
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
      <Link className="article-item" to={'/dashboard/editArticle/' + this.props.data._id}>
        <h1 className="article-name">{ this.props.data.name }</h1>
        <section className="article-content">
          { this.props.data.content }
        </section>
        <p className="article-time">goodboy · { Moment(this.props.data.time).format('YYYY-MM-DD HH:MM:SS') }</p>
      </Link>
    )
  }
}

Item.PropsTypes = {
  data: PropTypes.Object
}

export default Article
