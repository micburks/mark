export const noOp = ()=>{}
export const stop = e => (e.stopPropagation(), true)
export const prevent = e => (e.preventDefault(), true)

export function onEnter (fn) {
  return e => {
    if (e.which === 13) {
      return fn()
    }
  }
}
