import React from 'react'
import mousetrap from 'mousetrap'
import { join } from 'path'
import { getFiles, isNotNull, readFileSync } from '../utils.js'
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
      files: [],
      unsaved: {},
      editing: false,
      vim: true
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
      path,
      editing: false
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

    this.setState({ selectedIndex, editing: false })
  }

  componentDidMount () {
    this.getFiles()
      .then(files => {
        this.setState({ files })
      })
    mousetrap.bind(['command+e', 'ctrl+e'], () => {
      if (isNotNull(this.state.selectedIndex)) {
        this.setState({ editing: !this.state.editing })
      }
    })
  }

  getFileStatus () {
    const path = this.state.path.join('/')

    if (path in this.state.unsaved) {
      const status = this.state.unsaved[path]

      return this.state.files.map(file => {
        if (file.name in status) {
          return Object.assign({}, file, { unsaved: true })
        } else {
          return file
        }
      })
    } else {
      return this.state.files
    }
  }

  setUnsaved () {
    const path = this.state.path.join('/')
    const { unsaved } = this.state

    unsaved[path] = unsaved[path] || {}
    unsaved[path][name] = true

    this.setState({ unsaved })
  }

  toggleVimMode () {
    this.setState({ vim: !this.state.vim })
  }

  render () {
    return (
      <div className="Grid">
        <Header
          controlLabel="vim mode"
          onControlChange={()=>this.toggleVimMode()}
          controlEnabled={this.state.vim}
        >
          markdown browser
        </Header>
        <Breadcrumbs path={this.state.path}
          selectDir={(e, name) => this.selectDir(e, name)}
          selectRootDir={() => this.setDir([])}
        />
        <Filelist files={this.state.files}
          selectedIndex={this.state.selectedIndex}
          back={() => this.back()}
          selectFile={index => this.selectFile(index)}
          selectDir={name => this.changeDir(name)}
          isRoot={this.state.path.length < 1}
        />
        <Detail path={this.state.path}
          file={this.state.files[this.state.selectedIndex]}
          editing={this.state.editing}
          setUnsaved={() => this.setUnsaved()}
          exit={() => this.setState({ editing: false })}
          showSaved={()=>{}}
          mode={this.state.vim ? 'vim' : 'default'}
        />
      </div>
    )
  }
}
