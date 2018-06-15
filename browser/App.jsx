import React from 'react'
import { join } from 'path'
import { getFiles, readFileSync } from './utils.js'

function File (props) {
  let selectedClass = ''

  if (props.isSelected) {
    selectedClass = 'selected'
  }

  return (
    <li className={`File-list-item ${selectedClass}`}
      onClick={props.clickHandler}
    >
      {props.name}
    </li>
  )
}

function Dir (props) {
  return (
    <li className="File-list-item"
      onClick={props.clickHandler}
    >
      {props.name}
    </li>
  )
}

function Filelist (props) {
  return (
    <ul className="File-list">
      <li className="File-list-item"
        onClick={props.back}
      >
        Back
      </li>

      {props.files.map(
        (entry, index) => {
          if (entry.isDir) {
            return (
              <Dir name={entry.name}
                key={index}
                clickHandler={() => props.selectDir(entry.name)}
              />
            )
          } else {
            return (
              <File name={entry.name}
                key={index}
                isSelected={index === props.selectedIndex}
                clickHandler={() => props.selectFile(index)}
              />
            )
          }
        }
      )}
    </ul>
  )
}

function Detail (props) {
  let contents = 'No file selected'

  if (props.file) {
    const path = join(...props.path, props.file.name)
    contents = readFileSync(path)
  }

  return <div className="Detail">{contents}</div>
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: null,
      path: [],
      files: []
    }
  }

  getCurrentDirectory () {
    return join(...this.state.path)
  }

  getFiles () {
    return getFiles(this.getCurrentDirectory())
  }

  back () {
    const { path } = this.state
    path.pop()

    this.setDir(path)
  }

  changeDir (name) {
    console.log(this.state.path, name)
    const newPath = [...this.state.path, name]

    this.setDir(newPath)
  }

  setDir (path) {
    this.setState({
      selectedIndex: null,
      path
    })

    // TODO: Bug here becuase state hasn't changed by the time we fetch new files
    setTimeout(() => {
      this.getFiles()
        .then(files => {
          this.setState({ files })
        })
    })
  }

  componentDidMount () {
    this.getFiles()
      .then(files => {
        this.setState({ files })
      })
  }

  render () {
    return (
      <div className="Layout">
        <h1 className="Header">file browser</h1>
        <Filelist files={this.state.files}
          selectedIndex={this.state.selectedIndex}
          back={() => this.back()}
          selectFile={index => this.setState({ selectedIndex: index === this.state.selectedIndex ? null : index })}
          selectDir={name => this.changeDir(name)}
        />
        <Detail path={this.state.path} file={this.state.files[this.state.selectedIndex]} />
      </div>
    )
  }
}
