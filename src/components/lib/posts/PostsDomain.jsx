import React, {Component} from 'react';
import {withRouter} from 'react-router';

class PostsDomain extends Component {
    // A: Remove “THE-VIEWSPAPER” from there
    // B: YES
    // A: “theviewspaper.net” on a line between the title and read more and link it to the domain page
    // B: “theviewspaper.net” on a line between the title and read more and link it to the domain page, need to add click event?
    // A: YES
    onDomainClick(event) {
        event.preventDefault();

        const {post} = this.props;
        // this.context.messages.dismissAllPopoverPosts();
        // this.context.messages.pushNewLocationPathWithDelay(this.props.router, {
        //     pathname: "/",
        //     query: {from: post.sourceFrom}
        // });

        event.stopPropagation();
    }

    render() {
        const {post, domainClass} = this.props;
        return (
            <span className={`domain_item ${domainClass}`}>
              <span className="domain"
                    onClick={this.onDomainClick.bind(this)}>
                  { (post.sourceFrom ? post.sourceFrom : '').replace('www.', '')}
              </span>
          </span>
        )
    }
}

PostsDomain.displayName = "PostsDomain";

module.exports = withRouter(PostsDomain);
export default withRouter(PostsDomain);


