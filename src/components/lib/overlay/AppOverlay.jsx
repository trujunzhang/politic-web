import Telescope from '../index'
import React, { Component } from 'react'

const {popModel} = require('../../../actions').default

const excludeSelectors = [
  // Article's detail page's flag
  '#submit-flag-form',
  '#post-detail-submit-flag',
  '#post-detail-header-save-button',
  // user's collection
  '#save_to_folders_button',
  '#userCollectionPanel',
  '#addNewCollectionButton',
  '#newCollectionForm',
  '.additionalActionButtons_BoErh',
  // header's right user menu
  '#header_right_metamenu',
  // login ui
  'div.login-fullscreen',
  '#nav_signup_button',
  // UsersPopoverMenu
  '#logged-user-menu',
  '#medium-popover-user-menus',
  // More topics
  '#moreTopicsButton',
  // Messages
  '#messagesButton',
  'a.collections-popover--collection.popover--scrollable-list--element'
]

class AppOverlay extends Component {

  constructor (props, context) {
    super(props)

    props.dispatch(popModel())

    this.state = this.initialState = {
      popModel: props.popModel
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      popModel: nextProps.popModel
    })
  }

  renderMenu (popoverMenu) {
    switch (popoverMenu.modelType) {
      case 'LoggedUserMenu':
        return (<Telescope.components.UsersPopoverMenu comp={popoverMenu}/>)
      case 'SaveButton':
        return (<Telescope.components.UserCollectionsPopover comp={popoverMenu}/>)
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

  render () {
    const {showOverlay, currentModel} = this.state.popModel

    return (showOverlay ? (<div id='show_popover_menu'>{this.renderMenu(currentModel)}</div>) : null)
  }

}

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

function select (store) {
  return {
    popModel: store.popModel
  }
}

/**
 * Connect the properties
 */
export default connect(select)(AppOverlay)
