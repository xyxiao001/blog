import React, { Component } from 'react'

// 导入css
import './index.css'

class Slider extends Component {
  render() {
    return (
      <div className="slider">
        <ul>
          <li className="slider-item activity">
            <a>博文管理</a>
          </li>
          <li className="slider-item">
            <a>标签管理</a>
          </li>
          <li className="slider-item">
            <a>数据统计</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Slider
