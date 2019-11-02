import * as React from 'react'
import { connect } from "react-redux";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { message } from 'antd';
import Lib from '../../lib'
const { dataURLtoFile } = Lib

function mapStateToProps(props) {
  console.log(props)
  return { ...props }
}
@connect(mapStateToProps)
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: '',
      keyword: '',
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.submitContent = this.submitContent.bind(this)
    this.save = this.save.bind(this)
    this.keywordChange = this.keywordChange.bind(this)
  }
  handleEditorChange (editorState) {
    this.setState({
      editorState
    })
  }
  submitContent (editorState) {}
  async save () {
    const { editorState, keyword } = this.state
    let str =  editorState.toHTML && editorState.toHTML()
    if (!str) return
    const {
      axios,
      url,
    } = global
    let files = str.match(/src="([^"]*)/g) || []
    let str2 = str.replace(/src="([^"]*)/g, 'src="str.replace,jiangji123')
    let formdata = new FormData()
    formdata.append('str', str2)
    formdata.append('keyword', keyword)
    files.forEach( (v, i) => formdata.append(`img${i}`, dataURLtoFile(v, '.jpg')) )
    const res = await axios.post(url.editSave, formdata)
    console.log(res)
    message.success('ok')
  }
  keywordChange (e) {
    this.setState({
      keyword: e.target.value,
    })
  }
  render () {
    const {
      editorState,
      keyword,
    } = this.state
    return <div className="edit">
      <input value={keyword} onChange={this.keywordChange} />
      <BraftEditor
        value={editorState}
        onChange={this.handleEditorChange}
        onSave={this.submitContent}
      />
      <button onClick={this.save}>保存</button>
    </div>
  }
}

export default Detail