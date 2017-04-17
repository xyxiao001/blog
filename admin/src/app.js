import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// 导入页面
import Dashboard from './Dashboard'
import Test from './Test'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/Test" component={Test} />
        </div>
      </BrowserRouter>
    )
  }
}
