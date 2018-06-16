import React from 'react'
import File from './File.jsx'
import Dir from './Dir.jsx'

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
    <ul className={`List Grid-cell--sidebar ${emptyClass}`}>
      <li className="List-item List-item--inert">
        <span className={`Action ${props.isRoot ? 'Action--disabled' : ''}`}
          onClick={props.isRoot ? ()=>{} : props.back}
        >
          <i className="material-icons">chevron_left</i>
          BACK
        </span>
      </li>
      {content}
    </ul>
  )
}
