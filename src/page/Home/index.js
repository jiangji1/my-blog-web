import * as React from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import  List from "./list"
import url from "./../../url";

const { Header, Content, Footer } = Layout

class Index extends React.Component {
  componentDidMount () {
    let x = new XMLHttpRequest()
    console.log('url', url.list)
    x.onload = function (e) {
      console.log('e', e.currentTarget.response)
    }
    x.open('get', url.list)
    x.send()
  }
  render () {
    return <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">主页</Menu.Item>
          <Menu.Item key="2">其他</Menu.Item>
        </Menu>
      </Header>
      <List />
      <Footer style={{ textAlign: 'center' }}>滇ICP备19009219号-1</Footer>
    </Layout>
  }
}

export default Index