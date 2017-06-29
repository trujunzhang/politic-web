import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import {Link} from 'react-router'

import {withRouter} from 'react-router'

const {loadUserProfile} = require('../../../actions').default

class UsersSingle extends Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      ready: false,
      userProfile: null,
      userId: props.params.uid,
      userSlug: props.params.uslug
    }
  }

  componentWillReceiveProps(nextProps) {
    let {userProfile} = nextProps.userProfileTask
    if (!!userProfile && userProfile.id === this.state.userId) {
      this.setState({
        ready: true,
        userProfile: userProfile
      })
    }
  }

  componentDidMount() {
    this.props.dispatch(loadUserProfile(this.props.params.uid, this.props.params.uslug))
  }

  render() {
    const {ready, userProfile, userId, userSlug} = this.state

    //debugger

    if (!ready) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm">
          </div>
        </div>
      )
    } else if (!!this.props.params.fid) {// Detailed Folder item's List
      const childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          userProfile: userProfile,
          fid: this.props.params.fid
        })
      )
      return (<div>{childrenWithProps}</div>)
    }

    return (
      <Telescope.components.UsersProfile {...this.props} userProfile={userProfile}/>
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
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user,
    userProfileTask: store.userProfileTask
  }
}


export default withRouter(connect(select)(UsersSingle))

