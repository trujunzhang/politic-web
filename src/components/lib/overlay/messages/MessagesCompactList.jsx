import Telescope from '../../../../index';
import React, {Component} from 'react';
import {FormattedRelative} from 'react-intl';
import Messages from '../../../../lib/users';
import {withRouter} from 'react-router'

class MessagesCompactList extends Component {

    onMessageItemHover(message, haveView) {

    }

    onItemClick(information) {

    }

    renderRow(message, index) {
        const information = Messages.generateMessage(message);

        if (!information) {
            return null;
        }

        const haveView = Messages.haveView(message, this.context.currentUser),
            disabled = !information.link;

        // 18/12/2016
        // When the User clicks on this notification, the article opens up in a page.
        // The user should also be able to see the status of the submitted article.
        // There should be only 3 types of status for the user - Pending Approval, Approved, or Rejected.
        // So that when the user opens the article, he knows whether the article has been approved or not.
        return (
            <li key={index}
                id="message_item_link"
                disabled={disabled}
                className={haveView ? "itemIsSeen_8VH7C item_3BpQy" : "item_3BpQy"}
                onMouseOver={this.onMessageItemHover.bind(this, message, haveView)}>
                <a onClick={this.onItemClick.bind(this, information)} disabled={disabled}>
                    <span className="image_12RRD">
                        <span className="user-image">
                           <Telescope.components.UsersBlurryImageAvatar
                               avatarObj={information.avatarObj}
                               size={32}/>
                        </span>
                        {/*<span className="icon_2KQXZ">{information.icon}</span>*/}
                    </span>
                    <div className="popoverBody_15EL1">
                        {information.render}
                        <time className="time_1obuo">
                            <FormattedRelative value={message.postedAt}/>
                            <span className="message_status">{information.status}</span>
                        </time>
                    </div>
                </a>
            </li>
        )
    }

    renderLoading() {
        return (
            <div className="loader_BpwHc">
                <div className="loader_54XfI animationRotate loaderIndicator_1syiu"/>
            </div>
        )
    }

    renderContent() {
        const {results, ready} = this.props;
        if (!ready) {
            return this.renderLoading();
        }

        return (results.map((message, index) => this.renderRow(message, index)));
    }

    render() {
        return (
            <div className="popover_12_uF">
                <ul className="list_btu3F">
                    {this.renderContent()}
                </ul>
                <div className="viewAll_3RE0y">
                    <a onClick={(e) => this.context.messages.pushRouter(this.props.router, {pathname: '/activity_feed'})}>
                        View all activity
                    </a>
                </div>
            </div>
        )
    }

}


module.exports = withRouter(MessagesCompactList);
export default withRouter(MessagesCompactList);
