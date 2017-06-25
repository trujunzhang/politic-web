import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'


/**
 * The states were interested in
 */
const {
  USERPROFILE_TYPE_UPVOTE,
  USERPROFILE_TYPE_DOWNVOTE,
  USERPROFILE_TYPE_SUBMITTED_POSTS,
  USERPROFILE_TYPE_FOLDER_LIST
} = require('../../../../lib/constants').default


const UsersCollectionFoldersList = (props, context) => {
  const {userProfile} = props

  const folders = userProfile.folders || [],
    foldersCount = folders.length

  const terms = {
    view: 'best',
    userProfileType: USERPROFILE_TYPE_FOLDER_LIST,
    userId: userProfile.id,
    listId: "user.profile.collection.folder.list",
    limit: 10
  };
  // const {selector, options} = Folders.parameters.get(terms);

  return (
    <Telescope.components.FoldersList
      title={foldersCount + " Collections"}
      emptyHint="No collections yet."
      user={userProfile}
      terms={terms}
      results={folders}
      listId={terms.listId}
      limit={terms.limit}
    />
  )
}

export default UsersCollectionFoldersList


