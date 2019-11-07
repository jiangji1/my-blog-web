import * as React from 'react'
import { Layout } from 'antd'
import * as ReactRouter from 'react-router-dom'
const { withRouter } = ReactRouter
@withRouter
class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      detail: {},
    }
  }
  async componentDidMount () {
    const {
      axios,
      url,
    } = global
    const id = this.props.location.search.slice(1)
    let res = await axios.get(`${url.detail}?id=${id}`)
    console.log(res)
    this.setState({
      detail: res[0],
    })
  }
  render () {
    const { detail } = this.state
    return <div className="detail_container">
      <div className="keywords">
        <span>关键词：</span>
        {(detail.keyword || '').split(/[,，]/).map((v, i) => <span key={i}>{v}</span>)} 
      </div>
    <div>标题：{detail.title}</div>
    <br />
    <div dangerouslySetInnerHTML={{ __html:detail.str }}></div>
    </div>
  }
}

export default Detail