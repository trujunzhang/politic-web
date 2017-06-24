import Telescope from '../../../lib'
import React from 'react'

const PostsPageTopics = ({post}) => {
  let topicsArray = post.topics || []

  return (
    <div className="topics_39_B0" rel="topics-list">
      {topicsArray.map((topic, index) =>
        <div key={topic.id} className="topicWrap_2Uvaj" rel="topic-item">
          <span>
            <Telescope.components.TopicItem topic={topic}/>
          </span>
        </div>
      )}
    </div>
  )
}

export default PostsPageTopics
