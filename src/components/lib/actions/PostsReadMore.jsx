import React from 'react'

const PostsReadMore = (props, context) => {
  return (
    <span className="comboButton_1rStc tech_25H3R" id={props.customId ? props.customId : 'header-read-more'}>
          <span className="secondaryBoldText_1PBCf secondaryText_PM80d default_tBeAo base_3CbW2">
              <span className="inactiveLink_C7GyP baseLink_8cU0P">
                  <a target="_blank" href={props.post.url}>read</a>
              </span>
          </span>
      </span>
  )
}

export default PostsReadMore

