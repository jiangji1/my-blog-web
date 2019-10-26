import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from "react-redux";
import Page from './page/page'
import { HashRouter } from 'react-router-dom'
import store from './store'
import './index.css'
import Style from './index.styl'
import { inintStoreStyle } from './store/action'

store.dispatch(inintStoreStyle(Style))

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
