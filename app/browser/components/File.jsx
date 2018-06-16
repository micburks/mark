import React from 'react'

export default function File (props) {
  let selectedClass = ''

  if (props.isSelected) {
    selectedClass = 'selected'
  }

  return (
    <li className={`List-item ${selectedClass}`}
      onClick={props.clickHandler}
    >
      {props.name}
    </li>
  )
}
