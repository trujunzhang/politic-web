import React, { Component } from 'react'
import { withRouter } from 'react-router'

class PostsItemTopics extends Component {

  /**
   * issue 14
   * 1) All banned topics should be added to a database
   * 2) Scraper should not use any words from the banned topics database in the articles tags/topics.
   * 3) No user should be able to add the banned topics/tags on Submit an Article page.
   * @returns {XML}
   */
  render () {
    const {post} = this.props
    let topics = post.topics,
      tagsCount = topics.length,
      firstTag = tagsCount > 0 ? topics[0] : '',
      tagsMoreCount = tagsCount > 0 ? tagsCount - 1 : 0

    if (tagsCount !== 0) {
      return (
        <div className="associations_2dmvY">
          <div>
            <span
              className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidletiant_2wWrf"
              onClick={this.onTagClick.bind(this)}>
              <div className="buttonContainer_wTYxi">{firstTag.name}</div>
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

    let topics = this.props.post.topics

    if (topics.length > 0) {
      // this.context.messages.pushForTopic(router, topics[0])
    }

    event.stopPropagation()
  }
}

PostsItemTopics.propTypes = {
  post: React.PropTypes.object.isRequired
}

export default withRouter(PostsItemTopics)
