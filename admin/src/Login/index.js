import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd'

// 导入css
import './index.css'

//登录验证
import autoLogin from '../isLogin'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: ''
    }
    this.login = this.login.bind(this)
  }
  login () {
    window.localStorage.setItem('token', 'test')
    autoLogin.singin(() => {
      this.setState({
        redirectToReferrer: true
      })
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    return (
      <div className="login">
        <div className="login-box">
          <p className="title">admin</p>
          <div className="form-item">
            <input type="text" placeholder="username" />
          </div>
          <div className="form-item">
            <input type="password" placeholder="password" />
          </div>
          <Button className="go-login" type="primary" onClick={this.login}>登录</Button>
        </div>
      </div>
    )
  }
}

export default Login
