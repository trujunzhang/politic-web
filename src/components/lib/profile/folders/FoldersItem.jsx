import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'

import {Link} from 'react-router'

class FoldersItem extends Component {

  onFolderItemClick() {
    const {folder, user} = this.props,
      linkObject = Users.getLinkObject('folderItem', user, folder);

    // this.context.messages.pushRouter(this.props.router, linkObject);
  }

  render() {
    const {folder, user} = this.props,
      linkObject = Users.getLinkObject('folderItem', user, folder),
      visible = folder.visible,
      postsCount = folder.posts.length;

    const canAccess = true;//Folders.checkAccessPermission(folder, user.id, currentUser),

    const rightIcon = (visible === 'Lock' ) ?
      (<span className='collections-popover--collection--icon v-collect folder-visible-for-title fa fa-lock'/>) : null

    const content = (
      <div>
        <a className='link_1QbEt' disabled={!canAccess}>
          <span className='name_3GvIR featured_2W7jd inverse_1CN6F base_3CbW2'>{folder.name}</span>
          {rightIcon}
        </a>
        <button
          disabled={!canAccess}
          className='button_2I1re smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 follow_3OEqn'>
          <div className='buttonContainer_wTYxi'>{postsCount + ' posts'}</div>
        </button>
      </div>
    )

    if (canAccess) {
      return (
        <div className='backgroundImage_1hK9M card_2nuIG card_3kZOV users_folder_item'>
          <Link to={linkObject.pathname}>
            {content}
          </Link>
        </div>
      )
    }

    return (
      <div className='backgroundImage_1hK9M card_2nuIG card_3kZOV users_folder_item' disabled={false}>
        {content}
      </div>
    )


  }
}

export default FoldersItem
