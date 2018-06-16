import { join } from 'path'
import { promisify } from 'util'
import { default as fs, readdir } from 'fs'

export const readDir = promisify(readdir)

export const readFileSync = path => {
  return fs.readFileSync(path, { encoding: 'utf-8' })
}

export function getRoot () {
  if (process.argv > 2) {
    return process.argv[2]
  } else {
    return process.cwd()
  }
}

// TODO: isDir and isMd are not checking file type with fs.stat
const isDir = name => /^[^.]+$/.test(name)
const isMd = name => /\.md$/.test(name)
const isNotDotfile = name => /^[^.]/.test(name)
const isDirOrMd = name => (isDir(name) || isMd(name))

export async function getFiles (path = '') {
  let error = null
  let files = []

  try {
    const contents = await readDir(join(getRoot(), path))

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

  } catch (e) {
    console.error(e)
  }

  return files
}

export const prevent = e => (e.preventDefault(), true)
