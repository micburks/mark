import React, { Component } from 'react'
import cn from 'classnames'
import { LeftIcon, PlusIcon } from './Icons.jsx'
import { Consumer } from '../context.js'
import { onEnter, noOp } from '../utils/callback.js'
import Modal from './Modal/Modal.jsx'
import NewFileOrFolder from './NewFileOrFolder.jsx'

export default class NavActions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false
    }
  }

  render () {
    return (
      <Consumer>
        {({ path, selectDir }) => (
          <ActionGroup>
            <Action text="BACK"
              Icon={LeftIcon}
              iconAfter={false}
              callback={() => selectDir(path.slice(0, -1))}
              disabled={path.length === 0}
            />
            <Action text="NEW"
              Icon={PlusIcon}
              iconAfter={true}
              callback={() => this.setState({ modalVisible: true })}
            />
            {this.state.modalVisible && (
              <Modal exit={() => this.setState({ modalVisible: false })} header="new">
                <NewFileOrFolder />
              </Modal>
            )}
          </ActionGroup>
        )}
      </Consumer>
    )
  }
}

function Action (props) {
  const { Icon } = props
  const cb = props.disabled ? noOp : props.callback
  const classes = cn('Action', {
    'Action--disabled': props.disabled
  })

  return (
    <span className={classes} onClick={cb} onKeyUp={onEnter(cb)} tabIndex="0">
      {(!props.iconAfter && Icon) && <Icon />}
      <span className="Action-text">{props.text}</span>
      {(props.iconAfter && Icon) && <Icon />}
    </span>
  )
}

function ActionGroup (props) {
  return (
    <div className="Action-group">
      {props.children}
    </div>
  )
}
