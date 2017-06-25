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


const UsersSubmittedPostsList = (props, context) => {
  const {userProfile} = props,
    postCount = currentUser.postCount || 0

  const terms = {
    view: 'userPosts',
    postsType: 'user.posts',
    userProfileType: USERPROFILE_TYPE_SUBMITTED_POSTS,
    userId: userProfile.id,
    submitter: userProfile.id,
    listId: "user.profile.submitted.posts.list",
    limit: 10
  };
  // const {selector, options} = Posts.parameters.get(terms);

  return (
    <Telescope.components.UserProfilePostsList
      title={postCount + " articles submitted "}
      emptyHint={"No submitted posts yet."}
      user={userProfile}
      terms={terms}
      canEdit={true}
      listId={terms.listId}
      limit={terms.limit}
    />
  )
}


export default UsersSubmittedPostsList


