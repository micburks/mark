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
    delete this.__cache__[key]
  }

  has (key) {
    return key in this.__cache__
  }
}

export default new Cache()
