import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'

import {withRouter} from 'react-router';


class UsersFolderProfile extends Component {
  constructor(props, context) {
    super(props);

    debugger
    const {userProfile, fid} = props,
      folder = {},
      canAccess = Folders.checkAccessPermission(folder, folder.userId, currentUser);

    this.state = this.initialState = {
      canAccess: canAccess
    };
  }

  onBackToCollectionClick() {
    const {folder} = this.props,
      user = folder.folderUser,
      path = "/users/" + user.telescope.slug + "/collections";
    // this.context.messages.pushRouter(this.props.router, {pathname: path});
  }

  renderFolderProfile() {
    const {folder} = this.props;
    let user = folder.folderUser;

    const terms = {
      view: 'new',
      postsType: 'user.posts',
      listId: "user.folder.posts.list",
      limit: 10
    };
    const {selector, options} = Posts.parameters.get(terms);

    return (
      <div className="collection-detail">
        {/*header section*/}
        <Telescope.components.UserFolderProfileHeader
          user={user}
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

export default withRouter(UsersFolderProfile);

