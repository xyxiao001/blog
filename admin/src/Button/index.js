import React, { Component } from 'react'

// 导入css
import './index.css'

class Tags extends Component {
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    return (
      <button className="x-btn">{this.props.children}</button>
    )
  }
}

export default Tags
