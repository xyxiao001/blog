import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// 导入页面
import Dashboard from './Dashboard'
import Test from './Test'

// 引入公用css
import './app.css'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="page-wraper">
          <Route exact path="/" component={Dashboard} />
          <Route path="/Test" component={Test} />
        </div>
      </BrowserRouter>
    )
  }
}
