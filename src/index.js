import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from "react-redux";
import Page from './page/page'
import { HashRouter } from 'react-router-dom'
import store from './store'
import './index.css'
import Style from './index.styl'
// import { inintStoreStyle } from './store/action'
import axios from 'axios'
import url from './url'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = sessionStorage.getItem('token')
  token && (config.headers.token = token)
  if (config.url !== '/api/editSave') {
    return config
  }
  if (!token) {
    window.location = window.location.origin
  }
  return config
}, function (error) {
  console.error('axios.error')
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// global.url = url
// global.axios = axios
// global.Style = Style
Object.defineProperties(global, {
  'url': {
    value: url,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  'axios': {
    value: axios,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  'Style': {
    value: Style,
    writable: false,
    enumerable: false,
    configurable: false,
  },
});

// store.dispatch(inintStoreStyle(Style))

class App extends React.Component {
  render () {
    return <HashRouter>
      <Provider store={store}>
        <Page />
      </Provider>
    </HashRouter>
  }
}

ReactDom.render(
  <App />
  , document.querySelector('#root')
)
