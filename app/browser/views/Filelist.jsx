import React, { Component, Fragment } from 'react'
import cn from 'classnames'
import { join } from 'path'
import { onEnter } from '../utils/callback.js'
import { getFiles } from '../utils/file.js'
import { DirIcon } from './Icons.jsx'
import { Consumer } from '../context.js'

export default function Wrapper (props) {
  return (
    <Consumer>
      {state => <Filelist {...state} key={state.path.join('/')} />}
    </Consumer>
  )
}

class Filelist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      files: []
    }
  }

  async retrieveFiles () {
    this.setState({
      files: await getFiles(join(...this.props.path))
    })
  }

  componentDidMount () {
    this.retrieveFiles()
  }

  render () {
    const { files } = this.state

    return (files.length > 0)
      ? <List {...this.props} files={files} />
      : <EmptyList />
  }
}

function List ({ files, path, selectDir, selectFile, selected }) {
  return (
    <ul className="List">
      {files && files.map((entry, index) => (
        <File
          key={index}
          isDir={entry.isDir}
          name={entry.name}
          path={path}
          selectDir={selectDir}
          selectFile={selectFile}
          isSelected={entry.name === selected}
        >
          {entry.name}
        </File>
      ))}
    </ul>
  )
}

function EmptyList () {
  return (
    <ul className="List List--empty">
      <li className="List-item List-item--message">Directory empty</li>
    </ul>
  )
}

function File ({ isSelected, isDir, path, name, selectDir, selectFile, children }) {
  const classes = cn('List-item', {
    selected: isSelected
  })

  let callback
  if (isDir) {
    callback = () => selectDir(path.concat(name))
  } else if (isSelected) {
    callback = () => selectFile(null)
  } else {
    callback = () => selectFile(name)
  }

  return (
    <li className={classes}
      onClick={callback}
      onKeyUp={onEnter(callback)}
      tabIndex="0"
    >
      {isDir && <DirIcon />}
      {children}
    </li>
  )
}
