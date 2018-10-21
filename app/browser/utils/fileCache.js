class Cache {
  constructor () {
    this.__cache__ = {}
  }

  get (key) {
    return this.__cache__[key]
  }

  set (key, value) {
    this.__cache__[key] = value
  }

  clear (key) {
    this.__cache__[key] = null
  }
}

export default new Cache()
