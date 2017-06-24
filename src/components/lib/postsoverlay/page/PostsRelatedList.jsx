import Telescope from '../../../lib'
import React, { Component } from 'react'

const {loadPosts} = require('../../../../actions').default

const {
  OVERLAY_LOADED_RELATED_POSTS
} = require('../../../../lib/constants').default

const RELATED_POSTS_COUNT = 6

class PostsRelatedList extends Component {

  componentDidMount () {
    const listTask = {
      pageIndex: 1,
      limit: RELATED_POSTS_COUNT
    }
    const terms = {
      related: {id: this.props.post.id, author: this.props.post.author}
    }
    this.props.dispatch(loadPosts(listTask, 'posts.related.list', terms, OVERLAY_LOADED_RELATED_POSTS))
  }

  render () {
    const {detailedPostsOverlay} = this.props,
      {isFetchingRelated} = detailedPostsOverlay,
      results = detailedPostsOverlay.currentRelatedPosts || []

    if (!isFetchingRelated && !!results.length) {
      return (
        <div>
          {results.map(post =>
            <Telescope.components.PostsRelatedItem key={post.id} post={post}/>
          )}
        </div>
      )
    } else if (isFetchingRelated) {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsLoading id='load.more.hint.posts'/>
        </section>
      )
    } else {
      return (
        <section className="results_37tfm">
          <Telescope.components.PostsNoResults relatedList={true}/>
        </section>
      )
    }
  }
}

/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

function select (store) {
  return {
    detailedPostsOverlay: store.detailedPostsOverlay
  }
}

/**
 * Connect the properties
 */

export default connect(select)(PostsRelatedList)
