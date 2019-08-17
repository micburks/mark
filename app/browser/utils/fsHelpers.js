import { join, resolve } from 'path'
import { promisify } from 'util'
import fs, { readdir } from 'fs'
import { isNotNull } from './type.js'

const stat = promisify(fs.stat)
const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

export const readDir = promisify(readdir)
export const writeFile = promisify(fs.writeFile)

const readFilePromise = promisify(fs.readFile)
export const readFile = path => {
  return readFilePromise(path, { encoding: 'utf-8' })
}

function reversePromise (promise, then, errorMessage) {
  return async (...args) => {
    try {
      await promise(...args)

      return Promise.reject(new Error(errorMessage))
    } catch (e) {
      return then(...args)
    }
  }
}

export const writeNewFile = reversePromise(
  path => access(path),
  writeFile,
  'Name in use; File cannot be created'
)

export const mkNewDir = reversePromise(
  path => access(path),
  mkdir,
  'Name in use; Directory cannot be created'
)

let root
export function setRoot (rootPath) {
  root = rootPath || resolve()
}

export function getRoot () {
  console.log('getroot')
  return root || process.cwd()
}

const isMd = name => /\.md$/.test(name)
const hasNoExt = name => /^[^.]+$/.test(name)
const isDotfile = name => /^\./.test(name)
// const hasMdOrNoExt = name => (isMd(name) || hasNoExt(name))

async function isDir (path) {
  const stats = await stat(path)
  return stats.isDirectory()
}

export async function getFiles (path = '') {
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

export function getFilePath (path, name) {
  console.log(getRoot(), path, name)
  return join(getRoot(), ...path, name)
}

export function getDirPath (path) {
  return join(...path)
}

export const NEW_FILE_TEMPLATE = `# Title

Body

> Quote`
