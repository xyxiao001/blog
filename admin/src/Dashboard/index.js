import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Slider from '../Slider'
import Article from '../Article'
import Tags from '../Tags'
import Data from '../Data'
import EditArticle from '../EditArticle'

// 导入css
import './index.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="main-warper">
        <Slider />
        <Route exact path="/dashboard" component={Article} />
        <Route path="/dashboard/editArticle/:id" component={EditArticle} />
        <Route path="/dashboard/tags" component={Tags} />
        <Route path="/dashboard/data" component={Data} />
      </div>
    )
  }
}

export default Dashboard
