import axios from 'axios'
import config from './config'

const createInstance = () => {
  let instance = axios.create({
    baseURL: config.host
  })

  // 请求拦截
  // var token = window.localStorage.getItem('token')
  // instance.interceptors.request.use(
	// 	(req) => {
	// 		if (token) {
	// 			req.headers.accessToken = token
	// 		}
	// 		return req
	// })

  // 响应拦截
  // instance.interceptors.response.use(
  //   (res) => {
  //     return res.data
  //   },
  //   (err) => {
  //     console.log(err)
  //     try {
  //       return Promise.reject(err.response.data)
  //     } catch(err) {
  //       console.log(err)
  //       return Promise.reject({
  //         success: false,
  //         message: '未知错误'
  //       })
  //     }
  // })

  return instance
}

export default createInstance
