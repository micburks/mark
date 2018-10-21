import React, { Component } from 'react'
import { LeftIcon, PlusIcon } from './Icons.jsx'
import { Consumer } from '../context.js'
import Modal from './Modal/Modal.jsx'
import NewFileOrFolder from './NewFileOrFolder.jsx'
import { Action, ActionGroup } from './Actions/Actions.jsx'

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
