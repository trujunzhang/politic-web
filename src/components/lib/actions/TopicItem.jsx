import React from 'react'
import {Link} from 'react-router'

const {resetOverlayDetailedPosts} = require('../../../actions').default

const TopicItem = ({topic, dispatch}) => {

  return (
    <Link title={topic.name}
          onClick={(e) => {
            dispatch(resetOverlayDetailedPosts())
          }}
          className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
          to={`/topic/${topic.id}/${topic.name}`}>
      <div className="buttonContainer_wTYxi">{topic.name}</div>
    </Link>
  )
}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

/**
 * Connect the properties
 */

export default connect()(TopicItem)

