import * as React from 'react'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 1, 2]
    }
  }
  render () {
    const {
      list,
    } = this.state
    return <div>
      <ul className="list_container">
        {
          list.map((v, i) => (
            <li key={i} className="list_item">
              <a>
                {v}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  }
}

export default Index