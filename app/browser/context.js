import { createContext } from 'react'

export default createContext({
  path: [],
  selected: null,
  selectDir: () => {},
  selectFile: () => {}
})
