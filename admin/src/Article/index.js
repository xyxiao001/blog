import React, { Component } from 'react'

import Button from '../Button'
// 导入css
import './index.css'

class Article extends Component {
  render() {
    return (
      <div className="main-content">
        <Button type="primary" onClick={() => console.log('触发新增博文事件')}>新增博文</Button>
        <div className="article-list">
          博文列表
        </div>
      </div>
    )
  }
}

export default Article
