import Telescope from '../../../lib'
import React, { Component } from 'react'

const {loadPosts} = require('../../../../actions').default

const {
  LOADED_RELATED_POSTS
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
    this.props.dispatch(loadPosts({}, 'posts.related.list', terms, LOADED_RELATED_POSTS))
  }

  render () {
    const ready = false

    if (ready && !!results.length) {
      return (
        <div>
          {results.map(post =>
            <Telescope.components.PostsRelatedItem key={post._id} post={post} currentUser={currentUser}/>
          )}
        </div>
      )
    } else if (!ready) {
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
import { connect } from 'react-redux'

function select (store) {
  return {
    postsOverlay: store.postsOverlay
  }
}

/**
 * Connect the properties
 */

export default connect(select)(PostsRelatedList)
