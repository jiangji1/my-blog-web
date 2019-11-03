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

console.log('global', global)
global.url = url
global.axios = axios
global.Style = Style

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
