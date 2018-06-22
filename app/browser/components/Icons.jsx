import React from 'react'

function Icon (props) {
  return (
    <i className={`material-icons ${props.classList}`}
      onClick={props.onClick}
    >
      {props.type}
    </i>
  )
}

export function LeftIcon (props) {
  return <Icon type="chevron_left" {...props}/>
}

export function PlusIcon (props) {
  return <Icon type="add" {...props}/>
}

export function XIcon (props) {
  return <Icon type="close" {...props}/>
}
