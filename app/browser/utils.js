import { join } from 'path'
import { promisify } from 'util'
import { default as fs, readdir } from 'fs'

const stat = promisify(fs.stat)

export const readDir = promisify(readdir)

export const readFileSync = path => {
  return fs.readFileSync(path, { encoding: 'utf-8' })
}

export const writeFile = promisify(fs.writeFile)

export function getRoot () {
  if (process.argv > 2) {
    return process.argv[2]
  } else {
    return process.cwd()
  }
}

const isMd = name => /\.md$/.test(name)
const hasNoExt = name => /^[^.]+$/.test(name)
const isDotfile = name => /^\./.test(name)
const hasMdOrNoExt = name => (isMd(name) || hasNoExt(name))
export const isNotNull = val => (val !== null)

async function isDir (path) {
  const stats = await stat(path)
  return stats.isDirectory()
}

export async function getFiles (path = '') {
  let error = null
  let files = []

  try {
    path = join(getRoot(), path)
    const dirContents = await readDir(path)

    files = dirContents
      .map(async name => {
        // Remove dotfiles
        if (isDotfile(name)) {
          return null
        }

        const result = {
          isMd: isMd(name)
        }

        // Only allow .md or files without extensions
        if (!(result.isMd || hasNoExt(name))) {
          return null
        }

        result.name = name
        result.path = join(path, name)
        result.isDir = await isDir(result.path)

        return result
      })
      .filter(isNotNull)

  } catch (e) {
    console.error(e)
  }

  return Promise.all(files)
    .then(files => files.filter(isNotNull))
}

export const prevent = e => (e.preventDefault(), true)
export function onEnter (fn) {
  return e => {
    if (e.which === 13) {
      return fn()
    }
  }
}
