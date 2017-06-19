import Telescope from '../index'
import React, { Component } from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

var {showDetailedPagePath} = require('../../../lib/link')
const {pushModel, pushOverlayDetailedPost} = require('../../../actions').default

class PostsItemActions extends Component {

  /**
   * Rendering the post's e button, such as 'save' or 'remove'
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
          <Telescope.components.PostsCommenters post={post} event={this.onPopupDetailPress.bind(this)}/>
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

  onPopupDetailPress (e) {
    e.preventDefault()

    // const {user} = this.props; // Important: <* props.user (Maybe user is not Logged user)*>
    let {router, location, post} = this.props,
      admin = false

    // this.context.messages.pushRouterForDetailPage(router, post, admin);
    showDetailedPagePath(router, post)
    this.props.dispatch(pushOverlayDetailedPost(post))

    e.stopPropagation()
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

  onSaveButtonClick (e) {
    e.preventDefault()

    e.stopPropagation()
  }

  onRemoveButtonClick (e) {
    e.preventDefault()

    e.stopPropagation()
  }

  onMoreTopicsClick (e) {
    e.preventDefault()

    let clientRect = this.refs.saveButton.getBoundingClientRect()
    this.props.dispatch(pushModel('moreTopicsList', {
      top: clientRect.top + window.pageYOffset,
      left: clientRect.left + window.pageXOffset,
      width: this.refs.saveButton.offsetWidth,
      height: this.refs.saveButton.offsetHeight
    }, {moreTopics: this.props.post.topics.slice(1)}))

    e.stopPropagation()
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

