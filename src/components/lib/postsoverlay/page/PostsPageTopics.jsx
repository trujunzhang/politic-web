import React from 'react'

const PostsPageTopics = ({post, onTagClick}) => {
  let topicsArray = post.topicsArray ? post.topicsArray : []

  return (
    <div className="topics_39_B0" rel="topics-list">
      {topicsArray.map((topic, index) =>

        <div key={topic._id}
             className="topicWrap_2Uvaj"
             rel="topic-item"
             onClick={onTagClick.bind(this, topic)}>
          <span>
            <a
              className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
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
