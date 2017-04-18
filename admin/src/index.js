import React from 'react'
import { render } from 'react-dom'
import App from './app'
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.host
window.axios = axios

render((
  <App />
), document.getElementById('root'))
