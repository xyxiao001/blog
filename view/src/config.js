let obj
if (process.env.NODE_ENV === 'development') {
  obj = {
    host: 'http://localhost:8888'
  }
} else {
  obj = {
    host: '/api'
  }
}
export default obj
