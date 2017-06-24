import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

class UsersSingle extends Component {

  constructor(props) {
    super(props)

    const {currentUser} = props

    this.state = this.initialState = {}
  }

  render() {
    const terms = {"telescope.slug": this.props.params.slug};
    const path = this.props.location.pathname;


    return (
      <Telescope.components.UsersProfile {...this.props}/>
    )
  }
}


//   const  = (props, context) => {
//
//     return (
//       //Important: Using <*PostDocumentContainer*> here.
//         <Telescope.components.PostDocumentContainer
//         key={path}
//         collection={Users}
//         publication="users.profile"
//         selector={terms}
//         terms={terms}
//         component={Telescope.components.}
//         componentProps={{children: props.children}}
//         documentPropName="user"
//       />
//     )
// };


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


export default withRouter(connect(select)(UsersSingle))

