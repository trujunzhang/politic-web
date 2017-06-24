import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'


const UsersCollectionFoldersList = (props, context) => {
  const {currentUser} = props

  const folders = currentUser.folders || [],
    foldersCount = folders.length

  const terms = {
    view: 'best',
    userId: currentUser.id,
    listId: "user.profile.collection.folder.list",
    limit: 10
  };
  // const {selector, options} = Folders.parameters.get(terms);

  return (
    <Telescope.components.FoldersList
      title={foldersCount + " Collections"}
      emptyHint="No collections yet."
      user={currentUser}
      terms={terms}
      results={folders}
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

export default connect(select)(UsersCollectionFoldersList)


