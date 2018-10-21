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
      {({ path }) => <Filelist path={path} key={path.join('/')} />}
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
      ? <List data={files} />
      : <EmptyList />
  }
}

function List ({ data }) {
  return (
    <Consumer>
      {({ path, selectDir, selectFile, selected }) => (
        <ul className="List">
          {data && data.map((entry, index) => (
            <File {...entry}
              key={index}
              path={path}
              selectDir={selectDir}
              selectFile={selectFile}
              isSelected={entry.name === selected}
            >
              {entry.name}
            </File>
          ))}
        </ul>
      )}
    </Consumer>
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
