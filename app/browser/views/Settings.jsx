import React, { Component } from 'react'
import { InfoIcon, MoreIcon } from './Icons.jsx'
import Help from './Help/Help.jsx'
import Modal from './Modal/Modal.jsx'

export default class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false,
      type: null
    }

    this.hideModal = this.hideModal.bind(this)
  }

  hideModal () {
    this.setState({ modalVisible: false })
  }

  render () {
    return (
      <div>
        <InfoIcon
          onClick={() => this.setState({ type: 'help', modalVisible: true })}
        />
        <MoreIcon
          onClick={() => this.setState({ type: 'options', modalVisible: true })}
        />
        {this.state.modalVisible && (
          <Modal exit={this.hideModal} header={this.state.type}>
            {this.state.type === 'help' && <Help />}
            {this.state.type === 'options' && <Options />}
          </Modal>
        )}
      </div>
    )
  }
}

function Options () {
  return (
    <div>
      <label htmlFor="Header-control" />
      <input
        type="checkbox"
        id="Header-control"
        checked={false}
        onChange={() => {}}
      />
      <div className="Action-control" onClick={() => {}} />
    </div>
  )
}
