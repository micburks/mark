import './Breadcrumbs.css'
import React, { Component } from 'react'
import cn from 'classnames'
import { prevent } from '../../utils/callback.js'
import Context from '../../context.js'

const ROOT_DIR = []

export default class Breadcrumbs extends Component {
  static contextType = Context

  render () {
    const { path, selectDir } = this.context

    return (
      <small className="Breadcrumbs">
        {(path.length > 0) && (
          <span className="Breadcrumbs-item">
            <a className="Breadcrumbs-link" href="" onClick={prevent(() => selectDir(ROOT_DIR))}>root</a>
            {' / '}
          </span>
        )}
        {path && path.map((slug, index) =>
          <BreadcrumbLink key={index} path={path} index={index} selectDir={selectDir}>
            {slug}
          </BreadcrumbLink>
        )}
      </small>
    )
  }
}

function isLast (arr, index) {
  return index === (arr.length - 1)
}

function BreadcrumbLink ({ selectDir, path, index, children }) {
  const lastCrumb = isLast(path, index)

  const callback = e => {
    e.preventDefault()

    if (!lastCrumb) {
      selectDir(path.slice(0, index + 1))
    }
  }

  const classes = cn('Breadcrumbs-link', {
    'Breadcrumbs-link--disabled': lastCrumb
  })

  return (
    <span className="Breadcrumbs-item">
      <a className={classes} href="" onClick={callback}>
        {children}
      </a>
      {' / '}
    </span>
  )
}
