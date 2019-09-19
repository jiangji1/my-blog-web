import * as React from 'react'
import * as ReactDom from 'react-dom'

class App extends React.Component {
  public state = {
    a: true
  }
  toggle = () => {
    this.setState({
      a: !this.state.a
    })
  }
  render () {
    return <>
      <div className="but" onClick={this.toggle}>but</div>
      {
        this.state.a && <div>webpackMy</div>
      }
      <FF />
    </>
  }
}

function FF () {
  return <div>FF</div>
}

ReactDom.render(
  <App />
  , document.querySelector('#root')
)
