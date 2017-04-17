import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// 导入css
import './index.css'

class Slider extends Component {
  render() {
    return (
      <div className="slider">
        <ul>
          <li>
            <NavLink exact to="/dashboard" className="slider-item">博文管理</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tags" className="slider-item">标签管理</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/data" className="slider-item">数据统计</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Slider
