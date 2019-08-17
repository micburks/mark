import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App.jsx'
import { ipcRenderer } from 'electron'
import { setRoot } from './utils/fsHelpers.js'

ipcRenderer.on('root', (event, store) => {
  setRoot(store)
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
})
