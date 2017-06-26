import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'


class UsersEdit extends Component {

  render() {
    const {user, currentUser} = props;

    const children = (<Telescope.components.UsersEditForm user={currentUser}/>);

    return (
      <Telescope.components.CanDo
        action="users.edit"
        document={user}
        displayNoPermissionMessage={true}>
        {children}
      </Telescope.components.CanDo>
    )
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
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(UsersEdit)

