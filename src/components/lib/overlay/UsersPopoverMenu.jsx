import React, {Component} from 'react'
import Users from '../../../lib/users'
import {Link} from 'react-router'

const {logOut, dismissPopModel} = require('../../../actions').default

class UsersPopoverMenu extends Component {

  constructor(props, context) {
    super(props)

    const {currentUser} = props,
      isMobileDevice = false

    this.state = this.initialState = {
      loggedUserMenu: Users.getPopoverMenuArray(currentUser, isMobileDevice)
    }
  }

  onMenuItemClick(menu) {
    //const {router} = this.props
    switch (menu.type) {
      case 'logout':

        this.props.dispatch(logOut())
        this.props.dispatch(dismissPopModel())

        break
      case 'line':
        break
      default:

        break
    }
  }

  render() {
    const {comp} = this.props,
      {position} = comp,
      {loggedUserMenu} = this.state

    const top = position.top + position.height + 24
    let left = (position.left + position.width / 2) - 75

    let popoverClass = 'v-bottom-center'
    if (left + 150 >= window.innerHeight) {
      popoverClass = 'v-bottom-left'
      left = left - 50
    }

    const popover = Users.getCollectionsPopover(left, top, 148, -1, 0, popoverClass)

    return (
      <div id="medium-popover-user-menus" className={popover.className} style={popover.style}>
        <ul className="content_2mq4P">
          {loggedUserMenu.map((menu, key) => {
            const {type, title, link} = menu
            if (type === '') {
              return (<li key={key}/>)
            }
            else if (type === 'separator') {
              return (<li key={key} className="list-item list-item--separator"/>)
            }
            return (<li key={key}
                        className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
              {
                !!link ? (
                  <Link className="button button--dark button--chromeless u-baseColor--buttonDark" to={link}>
                    {title}
                  </Link>
                ) : (
                  <a className="button button--dark button--chromeless u-baseColor--buttonDark"
                     id={`user_pop_menu_${type}`}
                     onClick={this.onMenuItemClick.bind(this, menu)}>{title}
                  </a>
                )
              }

            </li>)
          })}
        </ul>

      </div>
    )
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
    currentUser: store.user
  }
}

export default connect(select)(UsersPopoverMenu)


