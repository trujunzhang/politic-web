import Telescope from '../../../lib'
import React, { Component } from 'react'
import Posts from '../../../../lib/posts'
import { withRouter } from 'react-router'

var {showDetailedPagePath} = require('../../../../lib/link')
const {pushOverlayDetailedPost} = require('../../../../actions').default

class PostsRelatedItem extends Component {

  renderVotesSection () {
    const {post} = this.props
    return (
      <div className="smallSize_center secondaryText_PM80d">
        <div className="row">
          <Telescope.components.RelatedPostUpvote post={post}/>
        </div>
        <div className="row">
          <Telescope.components.RelatedPostDownvote post={post}/>
        </div>
      </div>
    )
  }

  renderThumbnail () {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post)

    if (imageSet.small) {
      return (
        <div className="thumbnail_2Blny">
          <div className="post-thumbnail related-thumbnail" onClick={this.onRelatedPostClick.bind(this)}>
            <a className="container_22rD3 related-thumbnail">
              <Telescope.components.BlurryImage
                imageId={post.id + '-thumbnail'}
                containerClass={'container__Ql6q lazyLoadContainer_3KgZD'}
                imageClass={'post-list-thumbnail'}
                imageSet={imageSet}
                imageTitle={post.title}
                width={62}
                height={62}/>
            </a>
          </div>
        </div>
      )
    }

    return null
  }

  render () {
    const {post} = this.props

    return (
      <div className="link_2Cj8i">
        <div className="side_3fRtk related-left-panel">
          {this.renderThumbnail()}
          {this.renderVotesSection()}
        </div>
        <a onClick={this.onRelatedPostClick.bind(this)}>
          <h2 className="name_DrXo8 featured_2W7jd default_tBeAo base_3CbW2">{post.title}</h2>
          <p className="text_relate_3Wjo0 subtle_1BWOT base_3CbW2">
            {Posts.getLimitedContent(post.body, 100)}
          </p>
        </a>
      </div>
    )
  }

  onRelatedPostClick (event) {
    event.preventDefault()

    const {router, post} = this.props

    showDetailedPagePath(router, post)
    this.props.dispatch(pushOverlayDetailedPost(post))
  }

}

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

export default withRouter(connect()(PostsRelatedItem))
