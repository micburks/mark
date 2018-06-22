import React from 'react'
import mousetrap from 'mousetrap'
import { join } from 'path'
import { isNotNull } from '../utils/type.js'
import { getFiles, readFileSync } from '../utils/file.js'
import Header from './Header.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import Filelist from './Filelist.jsx'
import Detail from './Detail.jsx'
import Modal from './Modal.jsx'
import NewFileOrFolder from './NewFileOrFolder.jsx'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      files: [],
      newVisible: false,
      path: [],
      selectedIndex: null,
      unsaved: {},
      vim: true
    }

    this.back = this.back.bind(this)
    this.changeDir = this.changeDir.bind(this)
    this.refreshFileList = this.refreshFileList.bind(this)
    this.selectDir = this.selectDir.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.setDir = this.setDir.bind(this)
    this.setUnsaved = this.setUnsaved.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  getCurrentDirectory () {
    return join(...this.state.path)
  }

  retrieveFiles (path = null) {
    if (!path) {
      path = this.getCurrentDirectory()
    }

    return getFiles(path)
      .then(files => {
        this.setState({ files })
      })
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

    this.retrieveFiles(join(...path))
  }

  refreshFileList (type) {
    this.setState({ newVisible: false })
    this.successMessage(`${type} created`)
    this.retrieveFiles()
  }

  selectFile (index) {
    let selectedIndex = index

    if (index === this.state.selectedIndex) {
      selectedIndex = null
    }

    this.setState({ selectedIndex, editing: false })
  }

  componentDidMount () {
    this.retrieveFiles()

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

  successMessage (msg) {
    console.log(msg)
  }

  toggle (prop, val) {
    return () => {
      if (typeof val === 'undefined') {
        val = !this.state[prop]
      }

      this.setState({ [prop]: val })
    }
  }

  render () {
    return (
      <div className="Grid">
        <div className="Grid-cell--header">
          <Header controlLabel="vim mode"
            onControlChange={this.toggle('vim')}
            controlEnabled={this.state.vim}
          >
            markdown browser
          </Header>
        </div>
        <div className="Grid-cell--banner">
          <Breadcrumbs path={this.state.path}
            selectDir={this.selectDir}
            selectRootDir={() => this.setDir([])}
          />
        </div>
        <div className="Grid-cell--sidebar">
          <Filelist files={this.state.files}
            selectedIndex={this.state.selectedIndex}
            back={this.back}
            selectFile={this.selectFile}
            selectDir={this.changeDir}
            isRoot={this.state.path.length < 1}
            newCallback={this.toggle('newVisible', true)}
          />
        </div>
        <div className="Grid-cell--body">
          <Detail path={this.state.path}
            file={this.state.files[this.state.selectedIndex]}
            editing={this.state.editing}
            setUnsaved={this.setUnsaved}
            exit={this.toggle('editing', false)}
            showSaved={() => this.successMessage('file saved')}
            mode={this.state.vim ? 'vim' : 'default'}
          />
        </div>
        {this.state.newVisible &&
            <Modal exit={this.toggle('newVisible', false)}>
              <NewFileOrFolder callback={this.refreshFileList} path={this.state.path}/>
            </Modal>
        }
      </div>
    )
  }
}
