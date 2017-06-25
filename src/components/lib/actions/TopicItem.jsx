import React from 'react'
import {Link} from 'react-router'

const {dismissPopModel} = require('../../../actions').default

const TopicItem = ({topic}) => {
  return (
    <Link title={topic.name}
          onClick={(e) => {
            this.props.dispatch(dismissPopModel())
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

