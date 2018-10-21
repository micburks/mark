import { createContext } from 'react'

const { Provider, Consumer } = createContext({
  path: [],
  selected: null,
  selectDir: () => {},
  selectFile: () => {}
})

export { Consumer, Provider } 
