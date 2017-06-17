import React, {Component} from 'react';
import { Link } from 'react-router'


class PostsDomain extends Component {
    // A: Remove “THE-VIEWSPAPER” from there
    // B: YES
    // A: “theviewspaper.net” on a line between the title and read more and link it to the domain page
    // B: “theviewspaper.net” on a line between the title and read more and link it to the domain page, need to add click event?
    // A: YES
    render() {
        const {post, domainClass} = this.props;
        return (
            <span className={`domain_item ${domainClass}`}>
                <Link to="/from/">
                    <span className="domain">
                        {(post.sourceFrom || '').replace('www.', '')}
                    </span>
                </Link>
            </span>
        )
    }
}

export default PostsDomain


