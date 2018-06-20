import React from 'react'

export default function Header (props) {
  return (
    <div className="Header Grid-cell--header">
      <h1 className="Header-text">{props.children}</h1>
      <div className="Header-action Action Action--toggle">
        <label htmlFor="Header-control">{props.controlLabel}</label>
        <input type="checkbox"
          id="Header-control"
          checked={props.controlEnabled}
          onChange={props.onControlChange}
        />
        <div className="Action-control" onClick={props.onControlChange}></div>
      </div>
    </div>
  )
}
