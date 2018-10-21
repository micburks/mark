import './Detail.css'
import React, { Component } from 'react'
import mousetrap from 'mousetrap'
import { join } from 'path'
import { isNotNull } from '../../utils/type.js'
import { readFile, writeFile } from '../../utils/file.js'
import Editor from '../Editor.jsx'
import Markdown from '../Markdown/Markdown.jsx'
import { Consumer } from '../../context.js'

export default function Wrapper () {
  return (
    <Consumer>
      {({ path, selected }) => <Detail path={path} selected={selected} key={selected} />}
    </Consumer>
  )
}

class Detail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      contents: null
    }

    this.save = this.save.bind(this)
    this.setUnsaved = this.setUnsaved.bind(this)
  }

  componentDidMount () {
    // Save - should this be here?
    mousetrap.bind(['command+s', 'ctrl+s'], () => {
      if (isNotNull(this.props.file)) {
        console.log('cant save: i have no content')
        // this.save()
      }
    })

    // Edit
    mousetrap.bind(['command+e', 'ctrl+e'], () => {
      if (isNotNull(this.props.selected)) {
        this.setState(prevState => ({ editing: !prevState.editing }))
      }
    })

    this.readFile()
  }

  readFile () {
    if (this.props.selected) {
      const path = join(...this.props.path, this.props.selected)

      readFile(path)
        .then(contents => this.setState({ contents }))
    }
  }

  save (contents) {
    const path = join(...this.props.path, this.props.selected)

    writeFile(path, contents)
      .then(() => {
        console.log('saved')
        this.setState({ contents })
        // clear from cache
        // this.props.showSaved(this.props.file.name)
      })
  }

  setUnsaved (contents) {
    // set in cache
  }

  render () {
    // Need selected file and its contents to display anything
    if (this.props.selected === null || this.state.contents === null) {
      return (
        <div className="Detail Detail--empty">
          No file selected
        </div>
      )
    }


    if (this.state.editing) {
      // Editing file contents
      return (
        <Editor contents={this.state.contents}
          save={val => this.save(val)}
          setUnsaved={this.setUnsaved}
          exit={() => this.setState({ editing: false })}
        />
      )
    } else {
      // Not editing file contents
      return <Markdown className="Detail" markdown={this.state.contents} />
    }
  }
}
