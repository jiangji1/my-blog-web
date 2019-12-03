import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import { message } from 'antd';
import { saveUser } from './../../store/action'
import { connect } from 'react-redux'

const { withRouter } = ReactRouter

function mapStateToProps () { return {} }

function mapDispatchToProps (dispatch) {
  console.log(saveUser)
  return {
    saveUser: user => dispatch(saveUser(user))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
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
  componentDidMount () {
   this.getList()
  }
  getList = async () => {
    const {
      axios,
      url,
    } = global
    let res = await axios.get(`${url.list}?page=0&size=10`)
    const { power } = res
    this.setState({
      list: res.list,
      power,
    })
    this.props.saveUser({
      user: power
    })
  }
  jumpDetail (id) {
    this.props.history.push(`/detail?${id}`)
  }
  jumpModify (id) {
    this.props.history.push(`/edit?${id}&modify`)
  }
  del = async (id, i) => {
    const {
      axios,
      url,
    } = global
    let res = await axios.post(`${url.del}`, { id })
    if (!res.success) {
      return message.error('删除失败')
    }
    message.success('删除成功')
    this.state.list.splice(i, 1)
    this.setState({})
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
                关键词a： &nbsp;&nbsp;&nbsp;
                {
                  (v.keyword || '').split(/[,，]/g).map((v2, i2) => <span key={i2}>{v2}</span>)
                }
              </div>
              {
                power === 'all' && <>
                <span className="del_span" onClick={this.del.bind(null, v.id, i)}>删除</span>
                <span className="modify_span" onClick={this.jumpModify.bind(null, v.id)}>修改</span>
                </>
              }
            </li>
          ))
        }
      </ul>
    </div>
  }
}

export default Index