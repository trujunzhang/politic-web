import Telescope from '../index'
import React, {Component} from 'react'
let Users = require('../../../lib/users').default
import Avatar from 'react-avatar'

const {pushModel} = require('../../../actions').default

class UsersMenu extends Component {

  popoverUserMenus() {
    let button = this.refs.userProfile
    let top = button.offsetTop
    let left = button.offsetLeft
    let width = button.clientWidth
    let height = button.clientHeight

    this.props.dispatch(pushModel('LoggedUserMenu', {top: top, left: left, width: width, height: height}))
    // this.context.messages.showPopoverMenu('LoggedUserMenu', {}, )
  }

  render() {
    const {currentUser} = this.props,
      avatarObj = Users.getAvatarObj(currentUser),
      userName = avatarObj.title

    return (
      <button
        ref="userProfile"
        id="logged-user-menu"
        title={userName}
        className="button button--small button--chromeless u-baseColor--buttonNormal is-inSiteNavBar js-userActions"
        onClick={this.popoverUserMenus.bind(this)}>
        <Avatar {...avatarObj.avatar} size={32} round={true}/>
      </button>
    )
  }

}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

export default connect()(UsersMenu)

