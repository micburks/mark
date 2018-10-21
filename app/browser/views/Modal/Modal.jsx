import './Modal.css'
import React from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from '../Icons.jsx'
import { stop } from '../../utils/callback.js'

// TODO: tab indices
// TODO: listen for escape key to exit

export default function Modal (props) {
  return createPortal((
    <div className="Modal-overlay" onClick={props.exit}>
      <div className="Modal" onClick={stop}>
        <div className="Modal-fixedTop">
          {props.header && (
            <div className="Modal-header">
              {props.header.toUpperCase()}
            </div>
          )}
          <XIcon className="Modal-close" onClick={props.exit}/>
        </div>
        <div className="Modal-content">
          {props.children}
        </div>
      </div>
    </div>
  ),
    document.body
  )
}
