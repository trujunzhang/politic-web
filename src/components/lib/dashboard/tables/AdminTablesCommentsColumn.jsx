import Telescope from '../../index'
import React, { Component } from 'react'
import Posts from '../../../../lib/posts'

class AdminTablescommentsColumn extends Component {

  renderCommentsCount () {
    const {post, router} = this.props,
      {messages} = this.context,
      counterKeyName = Posts.getCommentCounterKeyName(),
      commentsCount = post[counterKeyName] ? post[counterKeyName] : 0

    if (commentsCount > 0) {
      return (
        <div className="post-com-count-wrapper">
          <a
            onClick={(e) => {
              e.preventDefault()
              messages.appManagement.pushCommentQuery(router, {
                postId: post.id,
                status: 'approved'
              })
            }}
            className="post-com-count post-com-count-approved">
            <span className="comment-count-approved">{commentsCount}</span>
            <span className="screen-reader-text">{commentsCount + 'comments'}</span>
          </a>
        </div>
      )
    }

    return (
      <div className="post-com-count-wrapper">
        <span >—</span>
        <span className="screen-reader-text">No comments</span>
      </div>
    )
  }

  render () {
    return (
      <td className="comments column-comments">
        {this.renderCommentsCount()}
      </td>
    )
  }
}

export default AdminTablescommentsColumn
