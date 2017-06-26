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

    this.state = this.initialState = {
      folder: folder,
      canAccess: canAccess
    };
  }

  onBackToCollectionClick() {
    const {userProfile} = props,
      {folder} = this.state
  }

  renderFolderProfile() {
    const {userProfile} = props,
      {folder} = this.state

    const terms = {
      view: 'new',
      postsType: 'user.posts',
      listId: "user.folder.posts.list",
      limit: 10
    };
    // const {selector, options} = Posts.parameters.get(terms);

    return (
      <div className="collection-detail">
        {/*header section*/}
        <Telescope.components.UserFolderProfileHeader
          user={userProfile}
          folder={folder}
          callBack={this.onBackToCollectionClick.bind(this)}/>
        <div className="container">
          <div className="constraintWidth_ZyYbM">
            {/*back button section*/}
            <Telescope.components.UserFolderProfileBackButtonSection
              user={user}
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
var {connect} = require('react-redux')

function select(store) {
  return {
    currentUser: store.user
  }
}

export default withRouter(connect(select)(UsersFolderProfile))

