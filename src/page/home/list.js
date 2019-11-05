import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
const { withRouter } = ReactRouter

@withRouter
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 1, 2]
    }
    this.jumpDetail = this.jumpDetail.bind(this)
  }
  async componentDidMount () {
    const {
      axios,
      url,
    } = global
    let res = await axios.get(`${url.list}?page=0&size=10`)
    console.log(res)
    this.setState({
      list: res.data,
    })
  }
  jumpDetail (e) {
    const { id } = e.target.dataset
    this.props.history.push(`/detail?${id}`)
  }
  render () {
    console.log('this.props', this.props)
    const {
      list,
    } = this.state
    return <div>
      <ul className="list_container">
        {
          list.map((v, i) => (
            <li key={i} className="list_item">
              <a onClick={this.jumpDetail} data-id={v.id}>
                {v.title}
              </a>
              <div>
                关键词： &nbsp;&nbsp;&nbsp;
                {
                  (v.keyword || '').split(/[,，]/g).map((v2, i2) => <span key={i2}>{v2}</span>)
                }
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: v.str }}></div> */}
            </li>
          ))
        }
      </ul>
    </div>
  }
}

export default Index