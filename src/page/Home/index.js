import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'

import  List from "./list"

const { withRouter } = ReactRouter
const { Header, Content, Footer } = Layout

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

@connect(mapStateToProps )
@withRouter
class Index extends React.Component {
  componentDidMount () {
    const token = sessionStorage.getItem('token')
    if (!token) {
      return
    }

  }

  jumpLogin = () => {
    this.props.history.push('/login')
  }
  jumpEdit = () => {
    this.props.history.push('/edit')
  }

  render () {
    const {
      user
    } = this.props

    return <>
      <div className="home">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">主页</Menu.Item>
          <Menu.Item key="2" onClick={this.jumpLogin}>登录</Menu.Item>
          {
            user.user === 'all'
            && <Menu.Item key="3" onClick={this.jumpEdit}>写文章</Menu.Item>
          }
        </Menu>
        webpack-auto-upload-j 顺序 <br/>
        1.node 连接服务器 2.node读取本地文件夹中所有文件 3.node把文件上传服务器
      <List />
      <Footer style={{ textAlign: 'center' }}>滇ICP备19009219号-1</Footer>
      </div>
    </>
  }
}

export default Index