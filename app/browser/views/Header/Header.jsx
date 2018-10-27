import './Header.css'
import React, { Component } from 'react'
import { InfoIcon, MoreIcon } from '../Icons.jsx'
import Modal from '../Modal/Modal.jsx'
import Help from '../Help/Help.jsx'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'help',
      modalVislible: false
    }

    this.hideModal = this.hideModal.bind(this)
  }

  hideModal () {
    this.setState({ modalVisible: false })
  }

  render () {
    return (
      <div className="Header">
        <div>{/* spacer - account for window frame buttons */}</div>
        <h1 className="Header-text">markdown browser</h1>
        <div className="Header-action Action Action--toggle">
          <InfoIcon onClick={() => this.setState({ type: 'help', modalVisible: true })} />
          <MoreIcon onClick={() => this.setState({ type: 'options', modalVisible: true })} />
          {this.state.modalVisible && (
            <Modal exit={this.hideModal} header={this.state.type}>
              {this.state.type === 'help' && <Help />}
              {this.state.type === 'options' && <Options />}
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

function Options () {
  return (
    <div>
      <label htmlFor="Header-control"></label>
      <input type="checkbox"
        id="Header-control"
        checked={false}
        onChange={()=>{}}
      />
      <div className="Action-control" onClick={()=>{}}></div>
    </div>
  )
}
