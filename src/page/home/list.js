import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
const { withRouter } = ReactRouter

@withRouter
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      power: '',
    }
    this.jumpDetail = this.jumpDetail.bind(this)
    this.jumpModify = this.jumpModify.bind(this)
  }
  async componentDidMount () {
    const {
      axios,
      url,
    } = global
    let res = await axios.get(`${url.list}?page=0&size=10`)
    this.setState({
      list: res.list,
      power: res.power,
    })
  }
  jumpDetail (id) {
    this.props.history.push(`/detail?${id}`)
  }
  jumpModify (id) {
    this.props.history.push(`/edit?${id}&modify`)
  }
  render () {
    const {
      list,
      power,
    } = this.state
    return <div>
      <ul className="list_container">
        {
          list && list.length && list.map((v, i) => (
            <li key={i} className="list_item">
              <a onClick={this.jumpDetail.bind(null, v.id)}>
                {v.title || ''}
              </a>
              <div>
                关键词： &nbsp;&nbsp;&nbsp;
                {
                  (v.keyword || '').split(/[,，]/g).map((v2, i2) => <span key={i2}>{v2}</span>)
                }
              </div>
              {
                power === 'all' && <span className="modifu_span" onClick={this.jumpModify.bind(null, v.id)}>修改</span>
              }
            </li>
          ))
        }
      </ul>
    </div>
  }
}

export default Index