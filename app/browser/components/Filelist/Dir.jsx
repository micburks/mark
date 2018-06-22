import React from 'react'
import { onEnter } from '../../utils/callback.js'

export default function Dir (props) {
  return (
    <li className="List-item"
      onClick={props.clickHandler}
      onKeyUp={onEnter(props.clickHandler)}
      tabIndex="0"
    >
      <i className="material-icons">subdirectory_arrow_right</i>
      {props.name}
    </li>
  )
}
