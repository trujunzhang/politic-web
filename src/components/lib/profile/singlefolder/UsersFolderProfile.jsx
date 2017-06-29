import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'

var _ = require('underscore')
import {withRouter} from 'react-router';


class UsersFolderProfile extends Component {
  constructor(props, context) {
    super(props);


    const {userProfile, fid, currentUser} = props
    const folder = _.find(userProfile.folders, function (item) {
      return item.id == fid
    })
    const canAccess = Folders.checkAccessPermission(folder, userProfile, currentUser);
    const canEditFolder = Folders.checkEditPermission(folder, userProfile, currentUser);

    this.state = this.initialState = {
      folder: folder,
      canAccess: canAccess,
      canEditFolder: canEditFolder
    };
  }

  onBackToCollectionClick() {
    const {userProfile} = this.props,
      {folder} = this.state
  }

  renderFolderProfile() {
    const {userProfile} = this.props,
      {folder, canAccess, canEditFolder} = this.state

    const terms = {
      view: 'new',
      postsType: 'user.posts',
      listId: "user.folder.posts.list",
      limit: 10
    };

    return (
      <div className="collection-detail">
        {/*header section*/}
        <Telescope.components.UserFolderProfileHeader
          user={userProfile}
          folder={folder}
          canEditFolder={canEditFolder}
          callBack={this.onBackToCollectionClick.bind(this)}/>
        <div className="container">
          <div className="constraintWidth_ZyYbM">
            {/*back button section*/}
            <Telescope.components.UserFolderProfileBackButtonSection
              user={userProfile}
              callBack={this.onBackToCollectionClick.bind(this)}/>
            {/*<Telescope.components.NewsListContainer*/}
            {/*collection={Posts}*/}
            {/*publication="posts.list"*/}
            {/*selector={selector}*/}
            {/*options={options}*/}
            {/*terms={terms}*/}
            {/*joins={Posts.getJoins()}*/}
            {/*component={Telescope.components.FolderPostsList}*/}
            {/*componentProps={*/}
            {/*{*/}
            {/*folder: folder,*/}
            {/*limit: terms.limit*/}
            {/*}*/}
            {/*}*/}
            {/*listId={"user.folder.posts.list"}*/}
            {/*limit={terms.limit}*/}
            {/*/>*/}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {location} = this.props,
      {canAccess} = this.state;

    if (!canAccess) {
      return (<Telescope.components.Error404/>)
    }

    return this.renderFolderProfile();
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
    currentUser: store.user
  }
}

export default withRouter(connect(select)(UsersFolderProfile))

