import React from 'react'
import PropTypes from 'prop-types'
import './Layout.css'

export default function Layout ({ banner, sidebar, body }) {
  return (
    <div className="Layout">
      <div className="Layout-cell--banner">
        {banner}
      </div>
      <div className="Layout-cell--sidebar">
        {sidebar}
      </div>
      <div className="Layout-cell--body">
        {body}
      </div>
    </div>
  )
}

Layout.propTypes = {
  banner: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired
}

export function JustifyBetween (props) {
  return (
    <div className="u-justifyBetween">
      {props.children}
    </div>
  )
}