import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { readdir } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

const readDir = promisify(readdir)

// TODO: isDir and isMd are not checking file type with fs.stat
const isDir = name => /^[^.]+$/.test(name)
const isMd = name => /\.md$/.test(name)
const isNotDotfile = name => /^[^.]/.test(name)
const isDirOrMd = name => (isDir(name) || isMd(name))

function getRoot () {
  if (process.argv > 2) {
    return process.argv[2]
  } else {
    return process.cwd()
  }
}

async function init () {
  let files = []
  let error = null
  try {
    const contents = await readDir(getRoot())

    files = contents
      .filter(isNotDotfile)
      .filter(isDirOrMd)
      .map(name => {
        return {
          name,
          path: join(__dirname, name),
          isDir: isDir(name)
        }
      })

    console.log({ files })
  } catch (e) {
    error = e
    console.error(e)
  }

  ReactDOM.render(
    (
      <div>
        <h2>{error === null ? 'file browser' : `aint got nothing: ${error}`}</h2>
        {files.map(({name}, index) => <p key={index}>{name}</p>)}
      </div>
    ),
    document.getElementById('app')
  )
}

init()
