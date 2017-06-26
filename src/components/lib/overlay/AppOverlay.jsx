import Telescope from '../index'
import React, {Component} from 'react'

var {Modal} = require('../../vendor/react-overlays')

const {dismissPopModel} = require('../../../actions').default

const modalStyle = {
  position: 'absolute',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
}

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: 'transparent',
  opacity: 0.5
}

class AppOverlay extends Component {

  renderMenu(popoverMenu) {
    switch (popoverMenu.modelType) {
      case 'LoggedUserMenu':
        return (<Telescope.components.UsersPopoverMenu comp={popoverMenu}/>)
      case 'SaveButton':
        return (<Telescope.components.UserCollectionsPopover
          key={popoverMenu.model.savedPostId}
          comp={popoverMenu}/>)
      case 'moreTopicsList':
        return (<Telescope.components.MoreTagsPopoverMenu comp={popoverMenu}/>)
      case 'submitFlag':
        return (<Telescope.components.SubmitFlagPopover comp={popoverMenu}/>)
      case 'messagesList':
        return (<Telescope.components.MessagesListPopover comp={popoverMenu}/>)
      case 'UserDeleteConfirm':
        return (<Telescope.components.UsersPopoverDeleteConfirm comp={popoverMenu}/>)
      case 'LoginUI':
        return (<Telescope.components.UserLoginPopup comp={popoverMenu}/>)
      default:
        return null
    }
  }


  close() {
    this.props.dispatch(dismissPopModel())
    // debugger
    // this.setState({showModal: false});
  }

  render() {
    const {showOverlay, currentModel} = this.props.popModels

    return (showOverlay ? (
      <div id='show_popover_menu'>
        <Modal
          aria-labelledby='modal-label'
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={true}
          onHide={this.close.bind(this)}>
          {this.renderMenu(currentModel)}
        </Modal>

      </div>
    ) : null)
  }

}

/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

function select(store) {
  return {
    popModels: store.popModels
  }
}

/**
 * Connect the properties
 */
export default connect(select)(AppOverlay)
