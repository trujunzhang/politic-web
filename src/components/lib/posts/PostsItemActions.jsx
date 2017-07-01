import Telescope from '../index'
import React, {Component} from 'react'
import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

import {withRouter} from 'react-router'

const {pushModel, resetPostsDaily} = require('../../../actions').default

let {pushForTopic} = require('../../../lib/link')

/**
 * The states were interested in
 */
const {
    VOTE_BUTTON_LIST_UPVOTE,
    VOTE_BUTTON_LIST_DOWNVOTE
} = require('../../../lib/constants').default

class PostsItemActions extends Component {


    /**
     * Rendering the post's e button, such as 'save' or 'remove'
     * @returns {XML}
     */
    renderSaveRemoveArticleButton() {
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

    renderPostStatus() {
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

    render() {
        const {post, currentUser, isLoggedIn, listId, upVoteCount, downVoteCount} = this.props,
              imageSet = Posts.getThumbnailSet(post),
              panelClass = 'meta_2lIV- ' + (!!imageSet.small ? 'meta_2lIV-thumbnail' : 'meta_2lIV-no_thumbnail')

        return (
            <div className={panelClass} ref="saveButton">
                <div className="actionButtons_2mJsw">
                    <Telescope.components.PostItemVoteButton
            post={post}
            voteType={VOTE_BUTTON_LIST_UPVOTE}
            listId={listId}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            voteCount={upVoteCount}
            hasVoted={Users.hasUpvoted(currentUser, post)}
            voteClass={"postUpvoteArrow_2xABl"}
            onShowLoginOverlay={this.onShowLoginOverlay.bind(this)}/>
                    <Telescope.components.PostItemVoteButton
            post={post}
            voteType={VOTE_BUTTON_LIST_DOWNVOTE}
            listId={listId}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            voteCount={downVoteCount}
            hasVoted={Users.hasDownvoted(currentUser, post)}
            voteClass={"postDownvoteArrow_2xABl"}
            onShowLoginOverlay={this.onShowLoginOverlay.bind(this)}/>
                    <Telescope.components.PostsCommenters post={post}/>
                    <div className="additionalActionButtons_BoErh">
                        {this.renderSaveRemoveArticleButton()}
                    </div>
                </div>
                <Telescope.components.PostsItemTopics
          post={post}
          onFirstTopicClick = {this.onFirstTopicClick.bind(this)}
          onMoreTopicsClick={this.onMoreTopicsClick.bind(this)}/>
            </div>
        )
    }

    onFirstTopicClick(e){
        e.preventDefault()

        const {dispatch, post, router} = this.props,
              {topics} = post

        if (topics.length > 0) {
            dispatch(resetPostsDaily())
            pushForTopic(router, topics[0])
        }

        e.stopPropagation()
    }

    popoverSaveButtonClick() {
        const {post} = this.props,
              isMobileAndPortrait = false

        let clientRect = this.refs.saveButton.getBoundingClientRect()
        this.props.dispatch(pushModel('SaveButton', {
            top: clientRect.top + window.pageYOffset,
            left: clientRect.left + window.pageXOffset + 60,
            width: 20 + (isMobileAndPortrait ? 0 : 40),
            height: 20
        }, {title: post.title, savedPostId: post.id}))
    }

    onSaveButtonClick(e) {
        e.preventDefault()

        if (this.props.isLoggedIn) {
            this.popoverSaveButtonClick()
        } else {
            this.onShowLoginOverlay()
        }

        e.stopPropagation()
    }

    onShowLoginOverlay() {
        this.props.dispatch(pushModel('LoginUI', {}, {showCloseIcon: true, title: ''}))
    }

    onRemoveButtonClick(e) {
        e.preventDefault()

        e.stopPropagation()
    }

    onMoreTopicsClick(e) {
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
let {connect} = require('react-redux')

function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
        currentUser: store.user
    }
}

export default withRouter(connect(select)(PostsItemActions))

