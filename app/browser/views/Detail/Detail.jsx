import './Detail.css'
import React, { Component } from 'react'
import mousetrap from 'mousetrap'
import { join } from 'path'
import { isNotNull } from '../../utils/type.js'
import { readFile, writeFile } from '../../utils/file.js'
import Editor from '../Editor.jsx'
import Markdown from '../Markdown/Markdown.jsx'
import { Consumer } from '../../context.js'
import { ActionGroup, ActionButton } from '../Actions/Actions.jsx'
import fileCache from '../../utils/fileCache.js'

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
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit () {
    if (isNotNull(this.props.selected)) {
      this.setState(prevState => ({ editing: !prevState.editing }))
    }
  }

  componentDidMount () {
    mousetrap.bind(['command+s', 'ctrl+s'], this.save)
    mousetrap.bind(['command+e', 'ctrl+e'], this.toggleEdit)

    this.readFile()
  }

  readFile () {
    if (this.props.selected) {
      const path = join(...this.props.path, this.props.selected)

      readFile(path)
        .then(contents => this.setState({ contents }))
    }
  }

  getFilePath () {
    return join(...this.props.path, this.props.selected)
  }

  save () {
    const path = this.getFilePath()
    const contents = fileCache.get(path) || this.state.contents

    writeFile(path, contents)
      .then(() => {
        this.setState({ contents })

        // clear from cache
        fileCache.clear(path)

        console.log('saved')
        // this.props.showSaved(this.props.file.name)
      })
  }

  setUnsaved (contents) {
    // set in cache
    fileCache.set(this.getFilePath(), contents)
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


    return (
      <div style={{ margin: 'auto', maxWidth: '800px' }}>
        <ActionGroup>
          <ActionButton callback={this.save} disabled={!this.state.editing}>Save</ActionButton>
          <ActionButton callback={this.toggleEdit}>{this.state.editing ? 'Exit' : 'Edit'}</ActionButton>
        </ActionGroup>
        {
          this.state.editing
            ? (
              <Editor contents={this.state.contents}
                save={this.save}
                setUnsaved={this.setUnsaved}
                exit={() => this.setState({ editing: false })}
              />
            )
            : <Markdown className="Detail" markdown={this.state.contents} />
        }
      </div>
    )
  }
}
