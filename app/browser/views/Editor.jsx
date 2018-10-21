import React from 'react'
import codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/keymap/vim.js'

const codemirrorConfig = {
  mode: 'markdown',
  theme: 'solarized',
  keyMap: 'vim',
  tabSize: 2,
  smartIndex: true,
  lineNumbers: true,
  viewportMargin: Infinity
}

function getElement () {
  return document.getElementById('Detail-editor')
}

function getValue () {
  return getElement().value
}

let editor
export default class Editor extends React.Component {
  componentDidMount () {
    editor = codemirror.fromTextArea(
      getElement(),
      Object.assign({}, codemirrorConfig, { keyMap: this.props.mode || 'default' })
    )

    if (this.props.mode === 'vim') {
      codemirror.Vim.map('jk', 'Esc') // Not working
      codemirror.Vim.map(';', ':')
      codemirror.Vim.defineEx('w', null, () => {
        console.log('vim save')
        this.save()
      })
      codemirror.Vim.defineEx('wq', null, () => {
        console.log('vim save and exit')
        this.save()
        setImmediate(this.props.exit)
      })
    }

    editor.on('keydown', (cm, e) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        console.log('saving')
        this.save()
      }

      if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
        console.log('enter/exit')
        this.props.exit()
      }
    })

    editor.on('change', (cm, e) => {
      console.log('changed')
      this.props.setUnsaved()
    })

    editor.focus()
  }

  save () {
    editor.save()
    this.props.save(getValue())
  }

  componentWillUnmount() {
    console.log('gone')
    if (editor) {
      editor.toTextArea()
      editor = null
    }
  }

  render () {
    return (
      <textarea id="Detail-editor" className="Detail-editor" defaultValue={this.props.contents}></textarea>
    )
  }
}
