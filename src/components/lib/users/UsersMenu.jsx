import Telescope from '../index'
import React, { Component } from 'react'
import Users from '../../../lib/users'

class UsersMenu extends Component {

  popoverUserMenus () {
    // let button = this.refs.userProfile
    // let top = button.offsetTop
    // let left = button.offsetLeft
    // let width = button.clientWidth
    // let height = button.clientHeight
    // this.context.messages.showPopoverMenu('LoggedUserMenu', {}, top, left, width, height)
  }

  render () {
    const {currentUser} = this.props,
      avatarObj = Users.getAvatarObj(currentUser),
      userName = Users.getDisplayName(currentUser)

    return (
      <button
        ref="userProfile"
        id="logged-user-menu"
        title={userName}
        className="button button--small button--chromeless u-baseColor--buttonNormal is-inSiteNavBar js-userActions"
        onClick={this.popoverUserMenus.bind(this)}>
        <Telescope.components.UsersBlurryImageAvatar
          avatarObj={avatarObj}
          size={32}
        />
      </button>
    )
  }

}

export default UsersMenu
