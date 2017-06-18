import Telescope from '../index'
import React, { Component } from 'react'
import Users from '../../../lib/users'
import moment from 'moment'
import { Link } from 'react-router'
import Avatar from 'react-avatar'

class AppAdminHeader extends Component {
  constructor (props) {
    super(props)
    this.state = this.initialState = {
      isOpenSidebar: true,
      my_account_hover: false
    }
  }

  componentDidMount () {
    // $('#right-user-menu').hover(
    //   function () {
    //     $(this).addClass('open')
    //   },
    //   function () {
    //     $(this).removeClass('open')
    //   }
    // )
  }

  onToggleSidebarIconClick () {
    // if (this.state.isOpenSidebar) {
    //   $('#admin-dashboard').removeClass('hold-transition skin-blue sidebar-mini').addClass('skin-blue sidebar-mini sidebar-collapse')
    // } else {
    //   $('#admin-dashboard').removeClass('skin-blue sidebar-mini sidebar-collapse').addClass('hold-transition skin-blue sidebar-mini')
    // }
    // this.setState({isOpenSidebar: !this.state.isOpenSidebar})
  }

  renderLoggedUser () {
    const {currentUser} = this.props
    const name = Users.getDisplayName(currentUser)

    return (
      <li className="dropdown user user-menu" id="right-user-menu">
        <a className="dropdown-toggle">
          <div className="row">
            <div className="col-lg-4">
              <Telescope.components.UsersMenu currentUser={currentUser}/>
            </div>
            <div className="col-lg-8">
              <span className="hidden-xs">{name}</span>
            </div>
          </div>
        </a>
        <ul className="dropdown-menu">
          <li className="user-header">
            <img src="" className="img-circle" alt="User Image"/>
            <p>
              {name}
              <small>Member since Nov. 2012</small>
            </p>
          </li>
          <li className="user-footer">
            <div className="pull-left">
              <a className="btn btn-default btn-flat">Profile</a>
            </div>
            <div className="pull-right">
              <a className="btn btn-default btn-flat">Sign out</a>
            </div>
          </li>
        </ul>
      </li>
    )
  }

  renderToggleSidebarIcon () {
    return (
      //admin-dashboard
      <a className="sidebar-toggle" id="sidebar-toggle" role="button"
         onClick={this.onToggleSidebarIconClick.bind(this)}>
        <span className="sr-only">Toggle navigation</span>
      </a>
    )
  }

  renderAdminbarLeft () {
    return (
      <ul id="wp-admin-bar-root-default" className="ab-top-menu">
        <li id="wp-admin-bar-site-name" className="menupop">
          <Link className="ab-item" to="/">
            {'Politicl'}
          </Link>
        </li>
        <li id="wp-admin-bar-comments">
          <a className="ab-item"
             onClick={(e) => {
               this.context.messages.appManagement.pushAdminSidebar(this.props.router, 'comments')
             }}
          >
            <span className="ab-icon">
            </span>
            <span id="ab-awaiting-mod"
                  className="ab-label awaiting-mod pending-count count-1">
                          1
            </span>
            <span className="screen-reader-text">
              1 comment awaiting moderation
            </span>
          </a>
        </li>
      </ul>
    )
  }

  renderAdminbarRight () {
    const {currentUser} = this.props,
      avatarObj = Users.getAvatarObj(currentUser),
      {my_account_hover} = this.state,
      name = Users.getDisplayName(currentUser)

    const myAccountClass = 'menupop with-avatar' + (my_account_hover ? ' hover' : '')
    return (
      <ul id="wp-admin-bar-top-secondary" className="ab-top-secondary ab-top-menu margin_left8">
        <li onMouseOut={(e) => this.setState({my_account_hover: false})}
            onMouseOver={(e) => this.setState({my_account_hover: true})}
            id="wp-admin-bar-my-account" className={myAccountClass}>
          <a className="ab-item">
            {'Howdy, ' + name}
            <Avatar {...avatarObj.avatar} size={26} round={true}/>
          </a>
          <div className="ab-sub-wrapper">
            <ul id="wp-admin-bar-user-actions" className="ab-submenu">
              <li id="wp-admin-bar-user-info">
                <a className="ab-item" onClick={(e) => {
                  // user profile
                  // this.context.messages.pushRouter(this.props.router, Users.getLinkObject('profile', currentUser))
                }}>
                  <Avatar className="avatar avatar-64 photo" {...avatarObj.avatar} size={64} round={false}/>
                  <span className="display-name">{name}</span>
                </a>
              </li>
              <li id="wp-admin-bar-edit-profile">
                <a className="ab-item"
                   onClick={(e) => { this.context.messages.pushRouter(this.props.router, Users.getLinkObject('editing'))}}>
                  Edit My Profile
                </a>
              </li>
              <li id="wp-admin-bar-logout">
                <a className="ab-item"
                   onClick={(e) => { Meteor.logout(function () {router.replace({pathname: '/'})})}}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    )
  }

  render () {
    return (
      <div id="wpadminbar">
        <div className="quicklinks" id="wp-toolbar" role="navigation">
          {this.renderAdminbarLeft()}
          {this.renderAdminbarRight()}
        </div>
        <a className="screen-reader-shortcut"
           href="http://localhost:8444/wp-login.php?action=logout&amp;_wpnonce=f334df5e37">Log Out</a>
      </div>
    )
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
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(AppAdminHeader)
