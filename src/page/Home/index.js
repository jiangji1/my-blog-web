import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'

import  List from "./list"

const { withRouter } = ReactRouter
const { Header, Content, Footer } = Layout

@withRouter
class Index extends React.Component {

  jumpLogin = () => {
    this.props.history.push('/login')
  }

  render () {
    // return <Layout className="layout">
    //   <Header>
    //     <div className="logo" />
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       defaultSelectedKeys={['1']}
    //       style={{ lineHeight: '64px' }}
    //     >
    //       <Menu.Item key="1">主页</Menu.Item>
    //       <Menu.Item key="2" onClick={this.jumpLogin}>登录</Menu.Item>
    //     </Menu>
    //   </Header>
    //   <List />
    //   <Footer style={{ textAlign: 'center' }}>滇ICP备19009219号-1</Footer>
    // </Layout>
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
        </Menu>
      <List />
      <Footer style={{ textAlign: 'center' }}>滇ICP备19009219号-1</Footer>
      </div>
    </>
  }
}

export default Index