import React from 'react'
import File from './File.jsx'
import Dir from './Dir.jsx'
import { onEnter, noOp } from '../utils.js'
import { LeftIcon, PlusIcon } from './Icons.jsx'

export default function Filelist (props) {
  let content
  let emptyClass = ''
  let backClick = props.back
  let backClass = 'Action'

  if (props.isRoot) {
    backClick = noOp
    backClass = `${backClass} Action--disabled`
  }

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
    <div>
      <div className="Action-group">
        <span className={backClass} onClick={backClick} onKeyUp={onEnter(backClick)} tabIndex="0">
          <LeftIcon/>
          <span className="Action-text">BACK</span>
        </span>
        <span className="Action" onClick={props.newCallback} onKeyUp={onEnter(props.newCallback)} tabIndex="0">
          <span className="Action-text">NEW</span>
          <PlusIcon/>
        </span>
      </div>
      <ul className={`List ${emptyClass}`}>{content}</ul>
    </div>
  )
}
