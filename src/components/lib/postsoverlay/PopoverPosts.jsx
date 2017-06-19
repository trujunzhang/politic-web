import Telescope from '../../lib'
import React, { Component } from 'react'

const {loadPostPage} = require('../../../actions').default

class PopoverPosts extends Component {
  constructor (props, context) {
    super(props)

  }

  componentDidMount () {
    this.props.dispatch(loadPostPage('cDJao7Bw3P'))
  }

  renderContent () {
    const {postsOverlay} = this.props,
      {isFetching, currentModel} = postsOverlay

    if (isFetching) {
      return (
        <div className="placeholder_1WOC3">
          <div className="loader_54XfI animationRotate loader_OEQVm">
          </div>
        </div>
      )
    }

    return (<Telescope.components.PostsPage post={currentModel.model}/>)
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

