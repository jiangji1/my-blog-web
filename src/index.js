import * as React from 'react'
import * as ReactDom from 'react-dom'
import Page from './page/page'
import { HashRouter } from 'react-router-dom'

// console.log(process.env.NODE_ENV)

class App extends React.Component {
  render () {
    return <HashRouter>
      <Page />
    </HashRouter>
  }
}

ReactDom.render(
  <App />
  , document.querySelector('#root')
)
