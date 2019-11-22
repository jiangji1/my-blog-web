import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
const { withRouter } = ReactRouter
@withRouter
class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      user: '',
      pwd: '',
    }
    this.changeFn = this.changeFn.bind(this)
    this.loginFn = this.loginFn.bind(this)
  }
  changeFn (e) {
    e = e.target
    this.setState({
      [e.dataset.type]: e.value
    })
  }
  async loginFn () {
    const {
      axios,
      url,
    } = global
    const {
      user,
      pwd
    } = this.state
    const res = await axios.post(
      url.login,
      {
        user,
        pwd
      }
    )
    console.log(res)
    if (!res.success) {
      return
    }
    sessionStorage.setItem('token', res.token)
    this.props.history.push('/home')
  }
  componentDidMount () {
    window.addEventListener('keydown',this.enter)
  }
  componentWillUnmount () {
    window.removeEventListener('keydown', this.enter)
  }
  enter = (e) => {
    if (e.keyCode === 13) {
      this.loginFn()
    }
  }
  render () {
    const {
      user,
      pwd,
    } = this.state
    return <>
      <div>
        用户名：
        <input type='text' data-type="user" value={user} onChange={this.changeFn} />
      </div>
      <div>
        密码
        <input type='password' data-type="pwd" value={pwd} onChange={this.changeFn} />
      </div>
      {/* <div>
        <button onClick={this.loginFn}>登录</button>
      </div> */}
    </>
  }
}

export default Index