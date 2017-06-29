import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'


class UsersEdit extends Component {

  render() {
    const {isLoggedIn, currentUser} = this.props;

    if (!isLoggedIn) {
      return (<Telescope.components.UserLoginPopup comp={{MODEL: {showCloseIcon: false, title: '', subtitle: ''}}}/>)
    }

    return (<Telescope.components.UsersEditForm user={currentUser}/>)
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
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(UsersEdit)

