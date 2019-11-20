import * as React from 'react'
import { connect } from "react-redux";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { message } from 'antd';
import Lib from '../../lib'
const { dataURLtoFile } = Lib

function mapStateToProps(props) {
  // console.log(props)
  return { ...props }
}
@connect(mapStateToProps)
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: [],
      title: '',
      keyword: '',
      editorState: '',
      id: null,
      objImgs: [],
    }
    this.titleChange = this.titleChange.bind(this)
    this.keywordChange = this.keywordChange.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.save = this.save.bind(this)
    this.getData = this.getData.bind(this)
  }
  componentDidMount () {
    const search = this.props.history.location.search.slice(1).split('&')
    if (search.includes('modify')) {
      const id = search[0]
      this.setState({
        id,
        search,
      })
      this.getData(search[0])
    }
  }
  async getData (id) {
    const {
      axios,
      url,
    } = global
    let [res] = await axios.get(`${url.detail}?id=${id}`)
    console.log(res)
    const objImgs = (res.str.match(/src=".([^"]*)/g) || []).map(v => v.slice(5))
    this.setState({
      title: res.title,
      keyword: res.keyword,
      editorState: res.str,
      objImgs,
    })
  }
  handleEditorChange (editorState) {
    this.setState({
      editorState
    })
  }
  async save () {
    const { editorState, keyword, title, id, objImgs, search } = this.state
    let str =  editorState.toHTML && editorState.toHTML()
    if (!str) return
    const {
      axios,
      url,
    } = global
    let files = str.match(/src="data([^"]*)/g) || []
    let str2 = str.replace(/src="data([^"]*)/g, 'src="str.replace,jiangji123')
    let formdata = new FormData()
    formdata.append('title', title || ' ')
    formdata.append('keyword', keyword || ' ')
    formdata.append('str', str2)
    files.forEach( (v, i) => formdata.append(`img${i}`, dataURLtoFile(v, '.jpg')) )
    if (id) {
      formdata.append('id', id)
      if (objImgs.length) {
        const newImgs = (str.match(/src=".([^"]*)/g) || []).map(v => v.slice(5))
        let obj = {}
        objImgs.forEach(v => obj[v] = 'old')
        newImgs.forEach(v => obj[v] = 'new')
        const delImgs = []
        Object.entries(obj).forEach(v => v[1] === 'old' && delImgs.push(v[0]))
        formdata.append('delImgs', JSON.stringify(delImgs))
      }
    }
    const res = await axios.post(url.editSave, formdata)
    console.log(res)
    if (!res.success) {
      return message.error('无权限')
    }
    message.success('修改成功')
    setTimeout(() => {
      this.getData(search[0])
    }, 2500);
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
        value={BraftEditor.createEditorState(editorState)}
        onChange={this.handleEditorChange}
      />
      <button onClick={this.save}>保存</button>
    </div>
  }
}

export default Detail