import React from 'react'

export default function Dir (props) {
  return (
    <li className="List-item"
      onClick={props.clickHandler}
    >
      <i className="material-icons">subdirectory_arrow_right</i>
      {props.name}
    </li>
  )
}
