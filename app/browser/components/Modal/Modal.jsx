import './Modal.css'
import React from 'react'
import { XIcon } from '../Icons.jsx'
import { stop } from '../../utils/callback.js'

// TODO: tab indices
// TODO: listen for escape key to exit

export default function Modal (props) {
  return (
    <div className="Modal-overlay" onClick={props.exit}>
      <div className="Modal-content" onClick={stop}>
        <XIcon classList="Modal-close" onClick={props.exit}/>
        {props.children}
      </div>
    </div>
  )
}
