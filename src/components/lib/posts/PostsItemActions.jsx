import Telescope from '../index'
import React, { Component } from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'
import { withRouter } from 'react-router'

const {pushModel} = require('../../../actions').default

class PostsItemActions extends Component {

  /**
   * Rendering the post's event button, such as 'save' or 'remove'
   * @returns {XML}
   */
  renderSaveRemoveArticleButton () {
    const type = 'save',
      isMobileAndPortrait = false,
      event = (type === 'save') ? this.onSaveButtonClick.bind(this) : this.onRemoveButtonClick.bind(this)

    const leftIcon = (type === 'remove') ? (<span className="remove-button fa fa-remove"/>) : (<span>
                <svg className={isMobileAndPortrait ? 'margin_left4' : ''} width="13" height="10" viewBox="0 0 13 10">
                  <path
                    d="M9,6 L6,6 L6,7 L9,7 L9,10 L10,10 L10,7 L13,7 L13,6 L10,6 L10,3 L9,3 L9,6 Z M0,0 L8,0 L8,1 L0,1 L0,0 Z M0,3 L8,3 L8,4 L0,4 L0,3 Z M0,6 L5,6 L5,7 L0,7 L0,6 Z"
                    fill="#FFF">
                  </path>
                </svg>
            </span>
    )

    return (
      <span label={type} onClick={event}
            className="button_2I1re smallSize_1da-r secondaryText_PM80d subtleVariant_tlhj3 simpleVariant_1Nl54 button_2n20W">
              <div className="buttonContainer_wTYxi">
                    <span className="post-item-event-button">
                        {leftIcon}
                      {/*{isMobileAndPortrait ? "" : type}*/}
                    </span>
              </div>
          </span>
    )
  }

  // issue #118
  // Remove
  renderMoreButton () {
    return (
      <span id="posts_item_read_more_button"
            className="button_2I1re smallSize_1da-r secondaryText_PM80d subtleVariant_tlhj3 simpleVariant_1Nl54 button_2n20W"
            onClick={this.onReadMoreClick.bind(this)}>
              <div className="buttonContainer_wTYxi">
                  <span>
                      <svg width="10" height="10" viewBox="0 0 10 10">
                          <path
                            d="M5.9816,1.0418 L8.2136,1.0418 L3.8976,5.3578 L4.6426,6.1018 L8.9586,1.7858 L8.9586,4.0188 L9.9996,4.0188 L9.9996,0.5208 C9.9996,0.2228 9.7766,-0.0002 9.4786,-0.0002 L5.9816,-0.0002 L5.9816,1.0418 Z M9,9 L1,9 L1,1 L3.97833252,1 L3.97833252,0 L0.51,0 C0.228,0 0,0.228 0,0.51 L0,9.49 C0,9.772 0.228,10 0.51,10 L9.49,10 C9.772,10 10,9.772 10,9.49 L10,6.02606201 L9,6.02606201 L9,9 Z"
                            fill="#FFF"/>
                      </svg>
                  </span>
              </div>
          </span>
    )
  }

  render () {
    const {user} = this.props // Important: <* props.user (Maybe user is not Logged user)*>

    const {location, post} = this.props,
      admin = false,
      showActionButtons = true

    // if (showActionButtons) {
    return this.renderActionButtons()
    // }

    // return this.renderPostStatus();
  }

  renderPostStatus () {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post),
      panelClass = 'meta_2lIV- ' + (!!imageSet.small ? 'meta_2lIV-thumbnail' : 'meta_2lIV-no_thumbnail')

    return (
      <div className={panelClass}>
        <div className="associations_2dmvY">
          <div>
            <h2 className="heading_woLg1 title_2vHSk subtle_1BWOT base_3CbW2">
              {/*{Posts.getPostItemStatusTitle(post.status)}*/}
            </h2>
          </div>
        </div>
      </div>
    )
  }

  renderActionButtons () {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post),
      panelClass = 'meta_2lIV- ' + (!!imageSet.small ? 'meta_2lIV-thumbnail' : 'meta_2lIV-no_thumbnail')

    return (
      <div className={panelClass} ref="saveButton">
        <div className="actionButtons_2mJsw">
          <Telescope.components.Upvote post={post}/>
          <Telescope.components.Downvote post={post}/>
          <Telescope.components.PostsCommenters post={post} event={this.popupDetail.bind(this)}/>
          <div className="additionalActionButtons_BoErh">
            {this.renderSaveRemoveArticleButton()}
          </div>
        </div>
        <Telescope.components.PostsItemTopics
          post={post}
          onMoreTopicsClick={this.onMoreTopicsClick.bind(this)}/>
      </div>
    )
  }

  onReadMoreClick (event) {
    event.preventDefault()

    // const {post} = this.props,
    //     {url} = post;

    // Users.openNewBackgroundTab(event.target, url);

    event.stopPropagation()
  }

  popupDetail (event) {
    event.preventDefault()

    // const {user} = this.props; // Important: <* props.user (Maybe user is not Logged user)*>
    // let {router, location, post} = this.props,
    //     admin = this.context.messages.appManagement.getAdmin(location, user);
    //
    // this.context.messages.pushRouterForDetailPage(router, post, admin);

    event.stopPropagation()
  }

  onSaveButtonClick (event) {
    event.preventDefault()

    // const {post} = this.props;
    // const {currentUser} = this.context;
    // if (!currentUser) {
    //     const title = 'save "' + post.title + '" to collection.';
    //     this.context.messages.showLoginUI(title);
    // } else {
    //     this.popoverSaveButtonClick();
    // }

    event.stopPropagation()
  }

  popoverSaveButtonClick () {
    // const {post} = this.props,
    //     isMobileAndPortrait = Users.isMobileAndPortrait();
    // let offset = $(this.refs.saveButton).offset();
    // let top = offset.top;
    // let left = offset.left + 60;
    // let width = 20 + (isMobileAndPortrait ? 0 : 40);
    // let height = 20;
    // this.context.messages.showPopoverMenu('SaveButton', {
    //     title: post.title,
    //     savedPostId: post._id
    // }, top, left, width, height);
  }

  onRemoveButtonClick (event) {
    event.preventDefault()

    // const {post} = this.props;
    // let {folder} = this.props;
    // folder['lastPost'] = post._id;
    //
    // const modifier = {...folder, lastPost: post._id};
    //
    // const deleteFolderConfirm = "Are you sure you want to delete this post? There is no way back. This is a path without return! Be brave?";
    // if (window.confirm(deleteFolderConfirm)) {
    //     this.context.actions.call('folders.removePost', folder, (error, result) => {
    //         if (!!error) {
    //             this.context.messages.flash(this.context.intl.formatMessage({id: "msg.error.folders.delete.post"}, {title: post.title}), "error");
    //         }
    //     });
    // }

    event.stopPropagation()
  }

  onMoreTopicsClick (event) {
    event.preventDefault()

    const {post} = this.props
    let top = this.refs.saveButton.offsetTop
    let left = this.refs.saveButton.offsetLeft
    let width = this.refs.saveButton.offsetWidth
    let height = this.refs.saveButton.offsetHeight

    this.props.dispatch(pushModel('moreTopicsList', {
      top: top,
      left: left,
      width: width,
      height: height
    }, {moreTopics: post.topics.slice(1)}))
    // this.context.messages.showPopoverMenu("", post.topicsArray.slice(1), top, left, width, height);

    event.stopPropagation()
  }
}

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

function select (store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    currentUser: store.user
  }
}

export default connect(select)(PostsItemActions)

