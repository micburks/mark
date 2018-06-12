const express = require('express')
const path = require('path')
const veggie = require('veggie')

const app = express()
const PORT = 3000
const resolve = (...args) => path.join(__dirname, ...args)

const middlewares = [
  (req, res, next) => {
    console.log(req.url)
    next()
  },
  express.static(resolve('../dist')),
  express.static(resolve('../demo')),
  veggie.router({ dir: 'data/index.js' })
]

middlewares.forEach(fn => app.use(fn))

app.listen(PORT, () => {
  console.log(`Demo running on http://localhost:${PORT}`)
})
