import * as React from 'react'
import { connect } from "react-redux";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { message } from 'antd';

function mapStateToProps(props) {
  console.log(props)
  return { ...props }
}
@connect(mapStateToProps)
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: '123'
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.submitContent = this.submitContent.bind(this)
  }
  handleEditorChange (editorState) {
    this.setState({
      editorState
    })
  }
  async submitContent (editorState) {
    let str = editorState.toHTML()
    console.log(str)
    let params = {
      a: str
    }
    let res = await send()
    if (!res.succes) {
      return
    }
    message.success('ok')
    this.props.router.push('/home')
  }
  render () {
    const {
      editorState,
    } = this.state
    return <div className="edit">
      <BraftEditor
        value={editorState}
        onChange={this.handleEditorChange}
        onSave={this.submitContent}
      />
    </div>
  }
}

export default Detail