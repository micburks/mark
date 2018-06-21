import React from 'react'
import File from './File.jsx'
import Dir from './Dir.jsx'
import { onEnter, noOp } from '../utils.js'

function LeftIcon () {
  return <i className="material-icons">chevron_left</i>
}

export default function Filelist (props) {
  let content
  let emptyClass = ''

  if (props.files.length > 0) {
    content = props.files.map(
      (entry, index) => {
        if (entry.isDir) {
          return (
            <Dir name={entry.name}
              key={index}
              clickHandler={() => props.selectDir(entry.name)}
            />
          )
        } else {
          return (
            <File name={entry.name}
              key={index}
              isSelected={index === props.selectedIndex}
              clickHandler={() => props.selectFile(index)}
            />
          )
        }
      }
    )
  } else {
    emptyClass = 'List--empty'
    content = <li className="List-item List-item--message">Directory empty</li>
  }

  return (
    <div className="Grid-cell--sidebar">
      <div className="Action-group">
        <span className={`Action ${props.isRoot ? 'Action--disabled' : ''}`}
          onClick={props.isRoot ? noOp : props.back}
          onKeyUp={onEnter(props.isRoot ? noOp : props.back)}
          tabIndex="0"
        >
          <LeftIcon/>
          <span className="Action-text">BACK</span>
        </span>
      </div>
      <ul className={`List ${emptyClass}`}>{content}</ul>
    </div>
  )
}
