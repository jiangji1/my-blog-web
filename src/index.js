import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Button } from 'antd'
import Sy from'./index.css'
import S from'./index.styl'
import Child from './child'
console.log(S)

class App extends React.Component {
  state = {
    a: true
  }
  toggle = () => {
    this.setState({
      a: !this.state.a
    })
  }
  render () {
    return <>
      <div className={Sy.but} onClick={this.toggle}><span>\\parent:but</span></div>
      <Button type="primary">Primary</Button>
      {
        this.state.a && <div>webpackMy</div>
      }
      <Child />
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
