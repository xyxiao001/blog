let obj
if (process.env.NODE_ENV === 'development') {
  obj = {
    host: 'http://localhost:8888',
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  }
} else {
  obj = {
    host: 'https://xyxiao.cn:8888'
  }
}
export default obj
