export const noOp = ()=>{}

export function stop (e) {
  e.stopPropagation()
}

export function prevent (fn) {
  return e => {
    e.preventDefault()
    return fn ? fn() : null
  }
}

export function onEnter (fn) {
  return e => {
    if (e.which === 13) {
      return fn()
    }
  }
}
