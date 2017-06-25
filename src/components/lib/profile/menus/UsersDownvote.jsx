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


const UsersDownvote = (props, context) => {
  const {userProfile} = props,
    posts = userProfile.downvotedPosts || [],
    count = posts.length

  const terms = {
    view: 'userVotePosts',
    postsType: 'user.posts',
    userProfileType: USERPROFILE_TYPE_DOWNVOTE,
    userId: userProfile.id,
    listId: "user.profile.downvote.posts.list",
    limit: 10
  }

  return (
    <Telescope.components.UserProfilePostsList
      title={count + " Downvotes"}
      emptyHint={"No downvotes yet."}
      user={userProfile}
      terms={terms}
      listId={terms.listId}
      limit={terms.limit}
    />
  )
}


export default UsersDownvote

