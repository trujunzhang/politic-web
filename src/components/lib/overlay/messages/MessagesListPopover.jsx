import Telescope from '../../../../index';
import React, {Component} from 'react';
import Messages from '../../../../lib/users';
import Users from "../../../../lib/users";

var Dimensions = require('react-dimensions');

class MessagesListPopover extends Component {

    constructor(props, context) {
        super(props);


    }

    render() {
        const {comp, containerWidth, containerHeight} = this.props,
            {currentUser} = this.context,
            isMobileDevice = false,
            popClassName = isMobileDevice ? "v-center-center" : "v-bottom-left";

        const top = (comp.top + comp.height + 14);
        const left = isMobileDevice ? ((containerWidth - 385) / 2) : ((comp.left + comp.width / 2) - 456);

        const terms = {
            view: 'popover',
            userId: currentUser._id,
            listId: "messages.list.popover",
            limit: 10
        };
        // const {selector, options} = Messages.parameters.get(terms);

        const popover = Users.getCollectionsPopover(((comp.left + comp.width / 2) - 456), top, 385, 300, 0);

        return (
            <div className={popover.className} style={popover.style}>
                {/*<Telescope.components.NewsListContainer*/}
                    {/*collection={Messages}*/}
                    {/*publication="messages.list"*/}
                    {/*selector={selector}*/}
                    {/*options={options}*/}
                    {/*terms={terms}*/}
                    {/*joins={Messages.getJoins()}*/}
                    {/*component={Telescope.components.MessagesCompactList }*/}
                    {/*cacheSubscription={false}*/}
                    {/*listId={terms.listId}*/}
                    {/*limit={terms.limit}*/}
                {/*/>*/}
            </div>
        )
    }
}

export default  Dimensions()(MessagesListPopover);
