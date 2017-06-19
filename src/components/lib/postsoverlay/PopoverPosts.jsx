import Telescope from '../../lib'
import React, { Component } from 'react'

class PopoverPosts extends Component {
  constructor (props, context) {
    super(props)

  }

  componentDidMount () {

  }

  renderContent () {
    const {postsOverlay} = this.props,
      {isFetching} = postsOverlay

    if (isFetching || true) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm">
          </div>
        </div>
      )
    }

    return (
      {/*<Telescope.components.PostsSingle params={{'slug': currentPost.slug, '_id': currentPost._id}}/>*/}
    )
  }

  render () {
    return (
      <div>
        <Telescope.components.PopoverPostsLayout key="currentpost">
          {this.renderContent()}
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

