import Telescope from '../index'
import React, {Component} from 'react'

import onClickOutside from 'react-onclickoutside'

const {dismissPopModel} = require('../../../actions').default

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

  handleClickOutside(event) {
    this.props.dispatch(dismissPopModel())
  }

  render() {
    const {showOverlay, currentModel} = this.props.popModels

    return (showOverlay ? (
      <div id='show_popover_menu'>
        {this.renderMenu(currentModel)}
      </div>
    ) : null)
  }

}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

function select(store) {
  return {
    popModels: store.popModels
  }
}

/**
 * Connect the properties
 */
export default connect(select)(onClickOutside(AppOverlay))
