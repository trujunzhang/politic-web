import React, {Component} from 'react';
import {withRouter} from 'react-router';

class PostsNoResults extends Component {

    onSubmitOneClick() {
        // const {currentUser} = this.context;
        //
        // if (!currentUser) {
        //     this.context.messages.showLoginUI();
        //
        // } else {
        //     this.context.messages.pushRouter(this.props.router, {pathname: "/", query: {action: "new"}});
        // }
    }

    render() {
        let noMessageHint = "No articles yet. ";

        const {location, relatedList} = this.props;
        if (!relatedList && !!location.query.query) {
            noMessageHint = "We didn’t find anything with that search term.";
        }
        return (
            <div className="posts-no-results">
                <div className="posts-no-results-left">{noMessageHint + " Why not"}</div>
                <a onClick={this.onSubmitOneClick.bind(this)}>submit one</a>
                <div >?</div>
            </div>
        )
    }
}

PostsNoResults.displayName = "PostsNoResults";

module.exports = withRouter(PostsNoResults);
export default withRouter(PostsNoResults);
