import React from 'react'
import { join } from 'path'
import { noOp, prevent } from '../utils/callback.js'
import { mkNewDir, writeNewFile } from '../utils/file.js'

// TODO: create file from template

function getUniqueName () {
  const id = Math.random().toString(36).substring(7)

  return `untitled-${id}`
}

export default class NewFileOrFolder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'file',
      name: getUniqueName(),
      error: null
    }

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  formSubmit (e) {
    prevent(e)

    const path = join(...this.props.path, this.state.name)
    let promise

    if (this.state.type === 'file') {
      promise = writeNewFile(path, '')
    } else {
      promise = mkNewDir(path)
    }

    promise .then(
      () => this.props.callback(this.state.type),
      ({ message }) => this.setState({ error: message })
    )
  }

  formChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value, error: null })
  }

  render () {
    return (
      <form className="Form" onSubmit={this.formSubmit}>
        <h5 className="Form-title">New</h5>
        <div className="Form-group">
          <select value={this.state.type} onChange={this.formChange} name="type">
            <option value="file">file</option>
            <option value="folder">folder</option>
          </select>
        </div>
        <div className="Form-group">
          <input className="Form-input" type="text" name="name" value={this.state.name} onChange={this.formChange} />
          {this.state.error && <small className="Form-error">{this.state.error}</small>}
        </div>
        <div className="Form-group Form-group--right">
          <input className="Form-submit" type="submit" value="Create"/>
        </div>
      </form>
    )
  }
}
