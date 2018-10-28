import React, { Component } from 'react'
import { LeftIcon, PlusIcon } from './Icons.jsx'
import Context from '../context.js'
import Modal from './Modal/Modal.jsx'
import NewFileOrFolder from './NewFileOrFolder.jsx'
import { Action, ActionGroup } from './Actions/Actions.jsx'

export default class NavActions extends Component {
  static contextType = Context
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false
    }

    this.hideModal = this.hideModal.bind(this)
  }

  hideModal () {
    this.setState({ modalVisible: false })
  }

  render () {
    const { path, selectDir } = this.context

    return (
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
              <Modal exit={this.hideModal} header="new">
                <NewFileOrFolder callback={this.hideModal} />
              </Modal>
            )}
          </ActionGroup>
    )
  }
}
