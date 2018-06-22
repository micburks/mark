import React from 'react'
import { prevent } from '../utils.js'

export default function Breadcrumbs (props) {
  let rootLink = ''
  if (props.path.length > 0) {
    rootLink =
      <span className="Breadcrumbs-item">
        <a className="Breadcrumbs-link" href="" onClick={e => prevent(e) && props.selectRootDir()}>root</a>
        &nbsp;/&nbsp;
      </span>
  }

  return (
    <small className="Breadcrumbs">
      {rootLink}
      {props.path.map((slug, index) =>
        <span className="Breadcrumbs-item" key={index}>
          <a className={`Breadcrumbs-link ${index === (props.path.length-1) ? 'Breadcrumbs-link--disabled' : ''}`}
            href=""
            onClick={index === (props.path.length-1) ? prevent : (e) => props.selectDir(e, slug)}
          >
            {slug}
          </a>
          &nbsp;/&nbsp;
        </span>
      )}
    </small>
  )
}
