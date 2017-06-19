import React, { Component } from 'react'
import { withRouter } from 'react-router'

var {pushForTopic} = require('../../../lib/link')

class PostsItemTopics extends Component {

  /**
   * issue 14
   * 1) All banned topics should be added to a database
   * 2) Scraper should not use any words from the banned topics database in the articles tags/topics.
   * 3) No user should be able to add the banned topics/tags on Submit an Article page.
   * @returns {XML}
   */
  render () {
    const {topics} = this.props.post,
      tagsMoreCount = topics.length > 0 ? topics.length - 1 : 0

    if (topics.length !== 0) {
      return (
        <div className="associations_2dmvY">
          <div>
            <span
              className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidletiant_2wWrf"
              onClick={this.onTagClick.bind(this)}>
              <div className="buttonContainer_wTYxi">{topics[0].name}</div>
            </span>
            {tagsMoreCount === 0 ? null : (
              <span ref="moreTopicsButton"
                    className="moreAssociations_28e7H"
                    id="moreTopicsButton"
                    onClick={this.props.onMoreTopicsClick}>
                <span className="secondaryText_PM80d subtle_1BWOT base_3CbW2 margin_left4">
                  {`+${tagsMoreCount}`}
                </span>
              </span>
            )}
          </div>
        </div>
      )
    }

    return null
  }

  onTagClick (event) {
    event.preventDefault()

    const {post, router} = this.props,
      {topics} = post

    if (topics.length > 0) {
      pushForTopic(router, topics[0])
    }

    event.stopPropagation()
  }
}

export default withRouter(PostsItemTopics)
