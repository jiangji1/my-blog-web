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
    this.titleChange = this.titleChange.bind(this)
    this.keywordChange = this.keywordChange.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.save = this.save.bind(this)
  }
  handleEditorChange (editorState) {
    this.setState({
      editorState
    })
  }
  async save () {
    const { editorState, keyword, title } = this.state
    let str =  editorState.toHTML && editorState.toHTML()
    if (!str) return
    const {
      axios,
      url,
    } = global
    let files = str.match(/src="([^"]*)/g) || []
    let str2 = str.replace(/src="([^"]*)/g, 'src="str.replace,jiangji123')
    let formdata = new FormData()
    formdata.append('title', title)
    formdata.append('keyword', keyword)
    formdata.append('str', str2)
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
  titleChange (e) {
    this.setState({
      title: e.target.value,
    })
  }
  render () {
    const {
      title,
      keyword,
      editorState,
    } = this.state
    const { Style } = global
    console.log
    return <div className={Style.edit}>
      <div className={Style.edit_title}>
        <span>关键词</span>
        <input value={keyword} onChange={this.keywordChange} />
      </div>
      <div className={Style.edit_keyword}>
        <span>标题</span>
        <input value={title} onChange={this.titleChange} />
      </div>
      <BraftEditor
        value={editorState}
        onChange={this.handleEditorChange}
      />
      <button onClick={this.save}>保存</button>
    </div>
  }
}

export default Detail