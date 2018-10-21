import React from 'react'

function Icon (props) {
  return (
    <i className={`material-icons ${props.className}`}
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

export function DirIcon (props) {
  return <Icon type="subdirectory_arrow_right" {...props} />
}

export function InfoIcon (props) {
  return <Icon type="info" {...props} />
}

export function MoreIcon (props) {
  return <Icon type="more_vert" {...props} />
}
