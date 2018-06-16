import React from 'react'
import { join } from 'path'
import { getFiles, readFileSync } from '../utils.js'
import Header from './Header.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import Filelist from './Filelist.jsx'
import Detail from './Detail.jsx'

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

  selectDir (e, name) {
    e.preventDefault()
    const index = this.state.path.findIndex(slug => slug === name)
    const path = this.state.path.slice(0, index+1)

    this.setDir(path)
  }

  setDir (path) {
    this.setState({
      selectedIndex: null,
      files: [],
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

  selectFile (index) {
    let selectedIndex = index

    if (index === this.state.selectedIndex) {
      selectedIndex = null
    }

    this.setState({ selectedIndex })
  }

  componentDidMount () {
    this.getFiles()
      .then(files => {
        this.setState({ files })
      })
  }

  render () {
    return (
      <div className="Grid">
        <Header>markdown browser</Header>
        <Breadcrumbs path={this.state.path} selectDir={(e, name) => this.selectDir(e, name)} selectRootDir={() => this.setDir([])} />
        <Filelist files={this.state.files}
          selectedIndex={this.state.selectedIndex}
          back={() => this.back()}
          selectFile={index => this.selectFile(index)}
          selectDir={name => this.changeDir(name)}
          isRoot={this.state.path.length < 1}
        />
        <Detail path={this.state.path} file={this.state.files[this.state.selectedIndex]} />
      </div>
    )
  }
}
