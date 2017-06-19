import React from 'react'
import { Link } from 'react-router'

const PostsPageTopics = ({post}) => {
  let topicsArray = post.topics || []

  return (
    <div className="topics_39_B0" rel="topics-list">
      {topicsArray.map((topic, index) =>
        <div key={topic._id} className="topicWrap_2Uvaj" rel="topic-item">
          <span>
            <a className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
               title={topic.name}>
              <div className="buttonContainer_wTYxi">{topic.name}</div>
            </a>
          </span>
        </div>
      )}
    </div>
  )
}

export default PostsPageTopics
