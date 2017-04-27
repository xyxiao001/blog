const autoLogin = {
  isLogin: true,
  singin(func) {
    this.isLogin = true
    func()
  },
  signout(func) {
    this.isLogin = false
    window.localStorage.setItem('token', '')
    func()
  }
}

export default autoLogin
