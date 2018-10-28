import './Detail.css'
import React, { PureComponent } from 'react'
import mousetrap from 'mousetrap'
import { getFilePath, readFile, writeFile } from '../../utils/fsHelpers.js'
import Editor from '../Editor.jsx'
import Markdown from '../Markdown/Markdown.jsx'
import Context from '../../context.js'
import { ActionGroup, ActionButton } from '../Actions/Actions.jsx'
import fileCache from '../../utils/cache.js'

export default class Detail extends PureComponent {
  static contextType = Context

  state = {
    editing: false,
    contents: null,
    hasUnsavedChanges: false
  }

  constructor (props) {
    super(props)

    this.save = this.save.bind(this)
    this.setUnsaved = this.setUnsaved.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.exitEditor = this.exitEditor.bind(this)
  }

  componentDidMount () {
    mousetrap.bind(['command+s', 'ctrl+s'], this.save)
    mousetrap.bind(['command+e', 'ctrl+e'], this.toggleEdit)
  }

  // TODO: Better with PureComponent, but still need to check cache
  componentDidUpdate () {
    // Read file
    if (this.context.selected) {
      const path = this.getFilePath()

      if (fileCache.has(path)) {
        // Read file from cache of unsaved changes
        this.setState({
          contents: fileCache.get(path),
          hasUnsavedChanges: true
        })
      } else {
        // Read file from disk
        readFile(path)
          .then(contents => {
            this.setState({
              contents,
              hasUnsavedChanges: false
            })
          })
      }
    }
  }

  save () {
    console.log('save')
    const path = this.getFilePath()

    // If there are unsaved changes in the cache
    if (fileCache.has(path)) {
      const contents = fileCache.get(path)

      writeFile(path, contents)
        .then(() => {
          this.setState({
            contents,
            hasUnsavedChanges: false
          })

          // Clear from cache
          fileCache.clear(path)

          console.log('saved')
          // this.props.showSaved(this.props.file.name)
        })
    }
  }

  setUnsaved (contents) {
    // Set in cache
    fileCache.set(this.getFilePath(), contents)
    this.setState({ hasUnsavedChanges: true })
  }

  getFilePath () {
    return getFilePath(this.context.path, this.context.selected)
  }

  toggleEdit () {
    this.setState(prevState => {
      if (prevState.editing) {
        this.exitEditor()
      } else {
        return { editing: true }
      }
    })
  }

  exitEditor () {
    this.setState(prevState => {
      const newState = {
        editing: false
      }

      if (prevState.hasUnsavedChanges) {
        newState.contents = fileCache.get(this.getFilePath())
      }

      return newState
    })
  }

  render () {
    // Need selected file and its contents to display anything
    if (this.context.selected === null || this.state.contents === null) {
      return (
        <div className="Detail Detail--empty">
          No file selected
        </div>
      )
    }

    return (
      <div style={{ margin: 'auto', maxWidth: '800px' }}>
        <ActionGroup>
          <ActionButton callback={this.save} disabled={!this.state.hasUnsavedChanges}>Save</ActionButton>
          {
            this.state.editing
              ? <ActionButton callback={this.exitEditor}>Exit</ActionButton>
              : <ActionButton callback={() => this.setState({ editing: true })}>Edit</ActionButton>
          }
        </ActionGroup>
        {
          this.state.editing
            ? (
              <Editor contents={this.state.contents}
                save={this.save}
                setUnsaved={this.setUnsaved}
                exit={this.exitEditor}
              />
            )
            : <Markdown className="Detail" markdown={this.state.contents} />
        }
      </div>
    )
  }
}
