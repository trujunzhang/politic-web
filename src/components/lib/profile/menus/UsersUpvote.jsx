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
  const {userProfile} = props,
    posts = userProfile.upvotedPosts || [],
    count = posts.length

  const terms = {
    view: 'userVotePosts',
    postsType: 'user.posts',
    userProfileType: USERPROFILE_TYPE_UPVOTE,
    userId: userProfile.id,
    listId: "user.profile.upvote.posts.list",
    limit: 10
  };

  return (
    <Telescope.components.UserProfilePostsList
      title={count + " Upvotes"}
      emptyHint={"No upvotes yet."}
      user={userProfile}
      terms={terms}
      listId={terms.listId}
      limit={terms.limit}
    />
  )

}


export default UsersUpvote

