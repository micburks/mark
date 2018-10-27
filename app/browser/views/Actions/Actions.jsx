import React from 'react'
import cn from 'classnames'
import { noOp, onEnter } from '../../utils/callback.js'
import './Actions.css'

// Disabled elements should be taken out of tabbable context
const getTabIndex = disabled => disabled ? '-1' : '0'

export function Action (props) {
  const { Icon } = props
  const cb = props.disabled ? noOp : props.callback
  const classes = cn('Action', {
    'Action--disabled': props.disabled
  })

  return (
    <span className={classes} onClick={cb} onKeyUp={onEnter(cb)} tabIndex={getTabIndex(props.disabled)}>
      {(!props.iconAfter && Icon) && <Icon />}
      <span className="Action-text">{props.text}</span>
      {(props.iconAfter && Icon) && <Icon />}
    </span>
  )
}

Action.defaultProps = {
  disabled: false
}

export function ActionButton (props) {
  const cb = props.disabled ? noOp : props.callback
  const classes = cn('Action', 'Action-button', {
    'Action--disabled': props.disabled
  })

  return (
    <button
      className={classes}
      onClick={cb}
      onKeyUp={onEnter(cb)}
      tabIndex={getTabIndex(props.disabled)}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

ActionButton.defaultProps = {
  disabled: false
}

export function ActionGroup (props) {
  return (
    <div className="Action-group">
      {props.children}
    </div>
  )
}
