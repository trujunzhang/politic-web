import React, { Component } from 'react'
import { withRouter } from 'react-router'

class MoreTagsPopoverMenu extends Component {

  onTagClick (topic) {
    // this.context.messages.dismissPopoverMenu();
    // this.context.messages.pushForTopic(this.props.router, topic);
  }

  render () {
    const {comp} = this.props
    const {position} = comp
    const top = position.top + position.height + 14
    const left = position.left + position.width - 22
    const object = comp.model.moreTopics

    return (
      <div className="popover v-bottom-right" style={{top: top, left: left}}>
        <ul className="content_2mq4P">

          {object.map((menu, key) => {
            return (
              <li key={key}
                  className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                <a onClick={this.onTagClick.bind(this, menu)}
                   className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
                   title={menu.name}>
                  <div className="buttonContainer_wTYxi">{menu.name}</div>
                </a>
              </li>
            )
          })}

        </ul>
      </div>
    )
  }

}

export default withRouter(MoreTagsPopoverMenu)
