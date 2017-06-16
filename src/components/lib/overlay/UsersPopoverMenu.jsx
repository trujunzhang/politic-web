import React, { Component } from 'react'
import Users from '../../../lib/users'
import Cookie from 'react-cookie'
import { withRouter } from 'react-router'

class UsersPopoverMenu extends Component {

  constructor (props, context) {
    super(props)

    const {currentUser} = props,
      isMobileDevice = false

    this.state = this.initialState = {
      loggedUserMenu: Users.getPopoverMenuArray(currentUser, isMobileDevice)
    }
  }

  onMenuItemClick (menu) {
    const {router} = this.props
    const {messages} = this.context
    switch (menu.type) {
      case 'logout':

        break
      case 'line':
        break
      default:

        break
    }
  }

  render () {
    const {comp} = this.props,
      {loggedUserMenu} = this.state

    const top = comp.top + comp.height + 24
    let left = (comp.left + comp.width / 2) - 75

    let popoverClass = 'v-bottom-center'
    // if (left + 150 >= $(window).width()) {
    //     popoverClass = "v-bottom-left";
    //     left = left - 50;
    // }

    const popover = Users.getCollectionsPopover(left, top, 148, -1, 0, popoverClass)

    return (
      <div id="medium-popover-user-menus" className={popover.className} style={popover.style}>
        <ul className="content_2mq4P">
          {loggedUserMenu.map((menu, key) => {
            if (menu.type === '') {
              return (<li key={key}/>)
            }
            else if (menu.type === 'separator') {
              return (<li key={key} className="list-item list-item--separator"/>)
            }
            return (
              <li key={key}
                  className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                <a className="button button--dark button--chromeless u-baseColor--buttonDark"
                   id={`user_pop_menu_${menu.type}`}
                   onClick={this.onMenuItemClick.bind(this, menu)}>
                  {menu.title}
                </a>
              </li>
            )
          })}
        </ul>

      </div>
    )
  }

}

export default withRouter(UsersPopoverMenu)
