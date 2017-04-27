import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { message, Button } from 'antd'

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
    this.updateName = this.updateName.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.login = this.login.bind(this)
    this.rule = this.rule.bind(this)
  }
  updateName(e) {
    this.setState({
      username: e.target.value
    })
  }
  updatePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  rule() {
    var name = this.state.username.replace(/(^\s*)|(\s*$)/g, '')
    var password = this.state.password.replace(/(^\s*)|(\s*$)/g, '')
    if (name.length === 0) {
      message.error('用户名不能为空')
      return false
    }
    if (password.length === 0) {
      message.error('密码不能为空')
      return false
    }
    return true
  }
  login () {
    if(!this.rule()) {
      return false
    }
    var that = this
    var data = {
      username: this.state.username,
      password: this.state.password
    }
    window.axios.post('/login', data)
    .then(function (response) {
      if (response.data.status === 1) {
        message.success(response.data.msg)
        window.localStorage.setItem('token', response.data.token)
        autoLogin.singin(() => {
          that.setState({
            redirectToReferrer: true
          })
        })
      } else {
        message.error(response.data.msg)
      }
    })
    .catch(function (error) {
      message.error('请求失败！')
      console.log(error)
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
            <input type="text" placeholder="username" onChange={this.updateName} />
          </div>
          <div className="form-item">
            <input type="password" placeholder="password" onChange={this.updatePassword} />
          </div>
          <Button className="go-login" type="primary" onClick={this.login}>登录</Button>
        </div>
      </div>
    )
  }
}

export default Login
