import React from 'react'
import { render } from 'react-dom'
import App from './app'
import http from './http'


window.axios = http()

render((
  <App />
), document.getElementById('root'))
