import React from 'react'
import { getFilePath, NEW_FILE_TEMPLATE, mkNewDir, writeNewFile } from '../utils/file.js'
import { Consumer } from '../context.js'

const { assign } = Object

function getUniqueId () {
  const id = Math.random().toString(36).substring(7)
  const name = `untitled-${id}`

  return { id, name }
}

export default function Wrapper ({ callback }) {
  return (
    <Consumer>
      {state => <NewFileOrFolder {...state} callback={callback} />}
    </Consumer>
  )
}

class NewFileOrFolder extends React.Component {
  constructor (props) {
    super(props)

    this.state = assign(getUniqueId(), {
      type: 'file',
      error: null
    })

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  formSubmit (e) {
    e.preventDefault()

    const path = getFilePath(this.props.path, this.state.name)
    let promise

    if (this.state.type === 'file') {
      promise = writeNewFile(path, NEW_FILE_TEMPLATE)
    } else {
      promise = mkNewDir(path)
    }

    promise .then(
      this.props.callback,
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
        <h5 className="Form-title">New</h5>
        <div className="Form-group">
          <label className="Form-label" htmlFor={`type-${this.state.id}`}>Type</label>
          <select className="Form-dropdown"
            id={`type-${this.state.id}`}
            value={this.state.type}
            onChange={this.formChange}
            name="type"
          >
            <option value="file">file</option>
            <option value="folder">folder</option>
          </select>
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
