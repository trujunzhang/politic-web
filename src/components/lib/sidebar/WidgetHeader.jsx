import React, {Component} from 'react';

class WidgetHeader extends Component {

    renderTrendingTitle() {
        return (
            <div className="header_3GFef">
              <span className="sidebarTitle_25eeI secondaryBoldText_1PBCf secondaryText_PM80d default_tBeAo base_3CbW2">
                  <img className="margin_right4" width="24" height="24"
                       src="packages/public/images/trending-topics-icon.png"/>
                  TRENDING
              </span>
            </div>
        )
    }

    render() {
        if (this.props.message === "TRENDING") {
            return this.renderTrendingTitle();
        }
        return (
            <div className="header_3GFef">
              <span
                  className="sidebarTitle_25eeI secondaryBoldText_1PBCf secondaryText_PM80d default_tBeAo base_3CbW2">{this.props.message}
              </span>
            </div>
        )
    }

}

WidgetHeader.displayName = "WidgetHeader";

module.exports = WidgetHeader;
