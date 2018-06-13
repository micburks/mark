import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { readdir } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

const readDir = promisify(readdir)
const isDir = name => /^[^.]+$/.test(name)
const isMd = name => /\.md$/.test(name)

function getRoot () {
  if (process.argv > 2) {
    return process.argv[2]
  } else {
    return process.cwd()
  }
}

async function init () {
  try {
    const contents = await readDir(getRoot())

    const files = contents
      .filter(name => /^[^.]/.test(name))
      .filter(name => {
        const dir = isDir(name)
        const md = isMd(name)

        return dir || (!dir && md)
      })
      .map(name => {
        return {
          name,
          path: join(__dirname, name),
          isDir: isDir(name)
        }
      })

    console.log({ files })
  } catch (e) {
    console.error(e)
  }
}

init()

const App = () => {
  return <div>lksjdf</div>
}

ReactDOM.render(
  <div>hello world: <App/></div>,
  document.getElementById('app')
)
