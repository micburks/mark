import React from 'react'
import marked from 'marked'
import mousetrap from 'mousetrap'
import { join } from 'path'
import { sanitize } from 'dompurify'
import { isNotNull, readFileSync, writeFile } from '../utils.js'
import { highlightAuto } from 'highlight.js'
import Editor from './Editor.jsx'

export default class Detail extends React.Component {
  componentDidMount () {
    mousetrap.bind(['command+s', 'ctrl+s'], () => {
      if (isNotNull(this.props.file)) {
        console.log('cant save: i have no content')
        // this.save()
      }
    })
  }

  save (value) {
    const path = join(...this.props.path, this.props.file.name)

    writeFile(path, value)
      .then(() => {
        this.props.showSaved(this.props.file.name)
      })
  }

  render () {
    let contents = ''
    if (this.props.file) {
      const path = join(...this.props.path, this.props.file.name)
      contents = readFileSync(path)
    }

    let editor = ''
    const { editing } = this.props
    if (this.props.editing) {
      return (
        <Editor contents={contents}
          save={val => this.save(val)}
          setUnsaved={this.props.setUnsaved}
          exit={this.props.exit}
          mode={this.props.mode}
        />
      )
    } else {
      let __html = 'No file selected'

      if (this.props.file) {
        const html = marked(contents, {
          highlight: code => highlightAuto(code).value
        })
        __html = sanitize(html)
      }

      return (
        <div className="Detail Grid-cell--body markdown-body"
          dangerouslySetInnerHTML={{__html}}
        ></div>
      )
    }
  }
}
