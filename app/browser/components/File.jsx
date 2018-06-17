import React from 'react'
import { onEnter } from '../utils.js'

export default function File (props) {
  let selectedClass = ''

  if (props.isSelected) {
    selectedClass = 'selected'
  }

  return (
    <li className={`List-item ${selectedClass}`}
      onClick={props.clickHandler}
      onKeyUp={onEnter(props.clickHandler)}
      tabIndex="0"
    >
      {props.name}
    </li>
  )
}
