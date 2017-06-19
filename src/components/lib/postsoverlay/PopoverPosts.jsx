import Telescope from '../../lib'
import React, { Component } from 'react'

class PopoverPosts extends Component {
  constructor (props, context) {
    super(props)

  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <Telescope.components.PopoverPostsLayout key="currentpost">
          {/*<Telescope.components.PostsSingle params={{'slug': currentPost.slug, '_id': currentPost._id}}/>*/}
        </Telescope.components.PopoverPostsLayout>
      </div>
    )
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

export default connect(select)(PopoverPosts)

