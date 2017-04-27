import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

// 导入页面
import Dashboard from './Dashboard'
import Test from './Test'
import Login from './Login'
import autoLogin from './isLogin'

import { message } from 'antd'
// 引入公用css
import './app.css'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    autoLogin.isLogin ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: true
    }
  }
  componentWillMount() {
    var that = this
    var token = window.localStorage.getItem('token')
    if (token) {
      console.log('token 存在 向后台请求验证token')
      window.axios.post('/tokenAuto', {
        token: token
      })
      .then(function (response) {
          if (response.data.status !== 1) {
            message.error(response.data.msg)
            autoLogin.signout(() => {
              that.setState({
                login: false
              })
            })
          }
      })
      .catch(function (error) {
        message.error('请求失败！')
        console.log(error)
      })
    } else {
      console.log('token 不存在, 重新登录!')
      autoLogin.signout(() => {
        this.setState({
          login: false
        })
      })
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="page">
          <Route exact path="/" render={() => <Redirect to="/dashboard" />}/>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/Test" component={Test} />
        </div>
      </BrowserRouter>
    )
  }
}
