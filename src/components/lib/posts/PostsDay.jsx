import Telescope from '../index';
import React, {Component} from 'react';
import moment from 'moment';
import Posts from "../../../lib/posts";
import {withRouter} from 'react-router'

class PostsDay extends Component {
    render() {

        const {date, number} = this.props;

        const title = Posts.getDailyDateTitle(date);
        let postsPerPage = (title.indexOf("Today") !== -1) ? 20 : 10;

        const {query} = this.props.router.location;
        const orderBy = !!query && !!query.orderby ? query.orderby : "Popular";

        const terms = {
            view: (orderBy === "Popular") ? "best" : "new",
            date: date,
            after: moment(date).format("YYYY-MM-DD"),
            before: moment(date).format("YYYY-MM-DD"),
            enableCache: number <= 15 ? true : false, // only cache first 15 days
            limit: postsPerPage,
            listId: `posts.list.${moment(date).format("YYYY-MM-DD")}`
        };

        // const {selector, options} = Posts.parameters.get(terms);

        return (
            <div className="posts-day">
                <Telescope.components.PostsList
                    showHeader={true}
                    checkReady={true}
                    title={title}
                    limit={10}
                />
            </div>
        )
    }

}

PostsDay.propTypes = {
    date: React.PropTypes.object,
    number: React.PropTypes.number
};

export default withRouter(PostsDay);
