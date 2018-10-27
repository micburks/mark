import React, { Component, Fragment } from 'react'
import cn from 'classnames'
import { watch } from 'fs'
import { onEnter } from '../utils/callback.js'
import { getDirPath, getFilePath, getFiles } from '../utils/fsHelpers.js'
import { DirIcon } from './Icons.jsx'
import { Consumer } from '../context.js'
import fileCache from '../utils/cache.js'

const { assign } = Object

export default function Wrapper (props) {
  return (
    <Consumer>
      {state => <Filelist {...state} key={state.path.join('/')} />}
    </Consumer>
  )
}

function setUnsavedChanges (path, file) {
  if (file.isDir) {
    return file
  } else {
    return assign({}, file, {
      hasUnsavedChanges: hasUnsavedChanges(path, file.name)
    })
  }
}

function hasUnsavedChanges(path, name) {
  return fileCache.has(getFilePath(path, name))
}

class Filelist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      files: [],
      watcher: null
    }

    this.retrieveFiles = this.retrieveFiles.bind(this)
    this.mapUnsavedChanges = this.mapUnsavedChanges.bind(this)
  }

  async retrieveFiles () {
    const files = await getFiles(getDirPath(this.props.path))

    this.setState({
      files: files.map(file => setUnsavedChanges(this.props.path, file))
    })
  }

  componentDidMount () {
    // Get initial files
    this.retrieveFiles()

    // Add listener for changes to the 'unsaved' cache
    fileCache.addListener(this.mapUnsavedChanges)

    // Create a filesystem watcher and keep a reference to it
    this.setState({
      watcher: watch(getDirPath(this.props.path), this.retrieveFiles)
    })
  }

  mapUnsavedChanges () {
    // Map over current file list and the 'unsaved' flag
    this.setState(prevState => ({
      files: prevState.files.map(file => setUnsavedChanges(this.props.path, file))
    }))
  }

  componentWillUnmount () {
    // Cleanup listeners
    fileCache.removeListener(this.retrieveFiles)
    this.state.watcher.close()
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
      {files && files.map((file, index) => (
        <File
          {...file}
          key={file.name}
          path={path}
          selectDir={selectDir}
          selectFile={selectFile}
          isSelected={file.name === selected}
        >
          {file.name}
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

function File ({ isSelected, isDir, path, name, selectDir, selectFile, children, hasUnsavedChanges }) {
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
      {hasUnsavedChanges && <small style={{marginRight: 'var(--1gu)'}}>( UNSAVED )</small>}
      {children}
    </li>
  )
}
