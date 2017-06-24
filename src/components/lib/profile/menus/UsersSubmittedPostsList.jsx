import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

const UsersSubmittedPostsList = (props, context) => {
  const {currentUser} = props

  const postCount = currentUser.postCount || 0

  const terms = {
    view: 'userPosts',
    postsType: 'user.posts',
    userId: currentUser.id,
    submitter: currentUser.id,
    listId: "user.profile.submitted.posts.list",
    limit: 10
  };
  // const {selector, options} = Posts.parameters.get(terms);

  return (
    <Telescope.components.UserProfilePostsList
      title={postCount + " articles submitted "}
      emptyHint={"No submitted posts yet."}
      user={currentUser}
      terms={terms}
      canEdit={true}
      listId={terms.listId}
      limit={terms.limit}
    />
  )
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

export default connect(select)(UsersSubmittedPostsList)


