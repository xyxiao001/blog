import React, { Component } from 'react'

import Button from '../Button'
// 导入css
import './index.css'

class Article extends Component {
  render() {
    return (
      <div className="main-content">
        <p>博文</p>
        <Button type="primary">新增博文</Button>
      </div>
    )
  }
}

export default Article
