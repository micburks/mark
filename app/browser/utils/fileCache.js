class Cache {
  constructor () {
    this.__cache__ = {}
    this.__callbacks__ = {}
  }

  get (key) {
    return this.__cache__[key]
  }

  set (key, value) {
    this.__cache__[key] = value

    this.notify()
  }

  clear (key) {
    delete this.__cache__[key]

    this.notify()
  }

  has (key) {
    return key in this.__cache__
  }

  addListener (fn) {
    this.__callbacks__[fn] = fn
  }

  removeListener (fn) {
    delete this.__callbacks__[fn]
  }

  notify () {
    Object.keys(this.__callbacks__)
      .forEach(key => this.__callbacks__[key]())
  }
}

export default new Cache()
