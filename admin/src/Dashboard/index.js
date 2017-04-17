import React, { Component } from 'react'

import Slider from '../Slider'

// 导入css
import './index.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="main-warper">
        <Slider />
        <div className="main-content">
          dashboard
        </div>
      </div>
    )
  }
}

export default Dashboard
