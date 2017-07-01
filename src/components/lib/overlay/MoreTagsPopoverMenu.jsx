import React, { Component } from 'react'
import { withRouter } from 'react-router'

const {pushModel, resetPostsDaily} = require('../../../actions').default
let {pushForTopic} = require('../../../lib/link')

class MoreTagsPopoverMenu extends Component {

    onTagClick (topic) {
        this.props.dispatch(resetPostsDaily())
        pushForTopic(this.props.router, topic)
    }

    render () {
        const {comp} = this.props,
              {position} = comp,
              top = position.top + position.height + 14,
              left = position.left + position.width - 22,
              object = comp.model.moreTopics

        return (
            <div className="popover v-bottom-right" style={{top: top, left: left}}>
                <ul className="content_2mq4P">

                    {object.map((item, key) => {
                         return (
                             <li key={key}
                                 className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                                 <a onClick={this.onTagClick.bind(this, item)}
                                    className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
                                    title={item.name}>
                                     <div className="buttonContainer_wTYxi">{item.name}</div>
                                 </a>
                             </li>
                         )
                    })}

                </ul>
            </div>
        )
    }

}


/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

export default withRouter(connect()(MoreTagsPopoverMenu))

