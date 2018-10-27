import React from 'react'
import PropTypes from 'prop-types'
import './Layout.css'

export default function Layout ({ Banner, Sidebar, Body }) {
  return (
    <div className="Layout">
      <div className="Layout-cell--banner">
        <Banner />
      </div>
      <div className="Layout-cell--sidebar">
        <Sidebar />
      </div>
      <div className="Layout-cell--body">
        <Body />
      </div>
    </div>
  )
}

Layout.propTypes = {
  Banner: PropTypes.element.isRequired,
  Sidebar: PropTypes.element.isRequired,
  Body: PropTypes.element.isRequired
}

export function JustifyBetween (props) {
  return (
    <div className="u-justifyBetween">
      {props.children}
    </div>
  )
}