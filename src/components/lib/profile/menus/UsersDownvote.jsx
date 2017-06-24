import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

const UsersDownvote = (props, context) => {
  const {currentUser} = props

  const posts = currentUser.downvotedPosts || [],
    count = posts.length

  const terms = {
    view: 'userVotePosts',
    postsType: 'user.posts',
    listId: "user.profile.downvote.posts.list",
    limit: 10
  };
  // const {selector, options} = Posts.parameters.get(terms);

  return (
    <div>
      <Telescope.components.UserProfilePostsList
        title={count + " Downvotes"}
        emptyHint={"No downvotes yet."}
        user={currentUser}
        terms={terms}
        listId={terms.listId}
        limit={terms.limit}
      />
    </div>
  )
};


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

export default connect(select)(UsersDownvote)

