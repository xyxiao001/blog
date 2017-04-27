const autoLogin = {
  isLogin: true,
  singin(func) {
    this.isLogin = true
    setTimeout(func, 1000)
  },
  signout(func) {
    this.isLogin = false
    window.localStorage.setItem('token', '')
    setTimeout(func, 1000)
  }
}

export default autoLogin
