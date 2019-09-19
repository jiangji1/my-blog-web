import * as React from 'react'
import * as ReactDom from 'react-dom'
import './index.css'

class Index extends React.Component {
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
      <div className="but" onClick={this.toggle}>\\child:but</div>
    </>
  }
}

export default Index
