let obj
if (process.env.NODE_ENV === 'development') {
  obj = {
    host: 'http://localhost:8888'
  }
} else {
  obj = {
    host: 'http://118.89.161.85:8888'
  }
}
export default obj
