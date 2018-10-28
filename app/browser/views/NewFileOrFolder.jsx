import React, { Component } from 'react'
import { getFilePath, NEW_FILE_TEMPLATE, mkNewDir, writeNewFile } from '../utils/fsHelpers.js'
import Context from '../context.js'

function getUniqueId () {
  const id = Math.random().toString(36).substring(7)
  const name = `untitled-${id}`

  return { id, name }
}

export default class NewFileOrFolder extends Component {
  static contextType = Context

  state = Object.assign(getUniqueId(), {
    type: 'file',
    error: null
  })

  constructor (props) {
    super(props)

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  formSubmit (e) {
    e.preventDefault()

    const path = getFilePath(this.context.path, this.state.name)
    let promise

    if (this.state.type === 'file') {
      promise = writeNewFile(path, NEW_FILE_TEMPLATE)
    } else {
      promise = mkNewDir(path)
    }

    promise .then(
      this.context.callback,
      ({ message }) => this.setState({ error: message })
    )
  }

  formChange (e) {
    const { name, value } = e.target

    this.setState({
      [name]: value,
      error: null
    })
  }

  render () {
    return (
      <form className="Form" onSubmit={this.formSubmit}>
        <div className="Form-group">
          <legend className="Form-legend">Type</legend>
          <Radio
            value="file"
            label="File"
            onChange={this.formChange}
            id={this.state.id}
            checked={this.state.type === 'file'}
            name="type"
          />
          <Radio
            value="folder"
            label="Folder"
            onChange={this.formChange}
            id={this.state.id}
            checked={this.state.type === 'folder'}
            name="type"
          />
        </div>
        <div className="Form-group">
          <label className="Form-label" htmlFor={`name-${this.state.id}`}>Name</label>
          <input className="Form-input"
            id={`name-${this.state.id}`}
            type="text"
            value={this.state.name}
            onChange={this.formChange}
            name="name"
          />
          {this.state.error && <small className="Form-error">{this.state.error}</small>}
        </div>
        <div className="Form-group Form-group--right">
          <input className="Form-submit" type="submit" value="Create"/>
        </div>
      </form>
    )
  }
}

function Radio ({ checked, label, id, name, onChange, value }) {
  const htmlId = `${value}-${id}`

  return (
    <div style={{paddingTop: 'var(--1gu)', paddingLeft: 'var(--1gu)'}}>
      <input
        className="Form-radio"
        type="radio"
        id={htmlId}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label className="Form-label" htmlFor={htmlId}>
        <small style={{textTransform: 'uppercase'}}>
          {label}
        </small>
      </label>
    </div>
  )
}
