import * as React from 'react'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 1, 2]
    }
  }
  async componentDidMount () {
    const {
      axios,
      url,
    } = global
    let x = new XMLHttpRequest()
    let res = await axios.get(`${url.list}?page=0&size=10`)
    console.log(res)
    this.setState({
      list: res.data,
    })
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
              <a >
                {/* {v.str} */}
              </a>
              <div dangerouslySetInnerHTML={{ __html: v.str }}></div>
            </li>
          ))
        }
      </ul>
    </div>
  }
}

export default Index