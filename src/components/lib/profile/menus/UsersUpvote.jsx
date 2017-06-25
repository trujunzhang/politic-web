import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'


/**
 * The states were interested in
 */
const {
  USERPROFILE_TYPE_UPVOTE,
  USERPROFILE_TYPE_DOWNVOTE,
  USERPROFILE_TYPE_SUBMITTED_POSTS,
  USERPROFILE_TYPE_FOLDER_LIST
} = require('../../../../lib/constants').default


const UsersUpvote = (props, context) => {
  const {currentUser} = props

  const posts = currentUser.upvotedPosts || [],
    count = posts.length

  const terms = {
    view: 'userVotePosts',
    postsType: 'user.posts',
    userProfileType: USERPROFILE_TYPE_UPVOTE,
    listId: "user.profile.upvote.posts.list",
    limit: 10
  };
  // const {selector, options} = Posts.parameters.get(terms);

  return (
    <div>
      <Telescope.components.UserProfilePostsList
        title={count + " Upvotes"}
        emptyHint={"No upvotes yet."}
        user={currentUser}
        terms={terms}
        listId={terms.listId}
        limit={terms.limit}
      />
    </div>
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

export default connect(select)(UsersUpvote)

