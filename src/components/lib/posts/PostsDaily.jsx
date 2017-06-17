import Telescope from '../index';
import React, {Component} from 'react';

var _ = require('underscore');

import Cookie from 'react-cookie';
import moment from 'moment';

class PostsDaily extends Component {

    constructor(props) {
        super(props);

        // const showPopularPostsThisWeek = Cookie.load('showPopularPostsThisWeek') !== "no";

        const showPopularPostsThisWeek = true;

        this.state = {days: props.days, showPopularPostsThisWeek: showPopularPostsThisWeek};
    }

    // for a number of days "n" return dates object for the past n days
    getLastNDates(n) {
        let map = _.range(n).map(
            i => moment().subtract(i, 'days').startOf('day').toDate()
        );
        return map;
    }

    loadMoreDays() {
        this.setState({
            days: this.state.days + this.props.increment
        });
    }

    render() {
        let postsDays = [];
        if (this.state.showPopularPostsThisWeek) {
            postsDays.push(<Telescope.components.PostsPopularThisWeek
key="popular"
callBack={e => {
                this.setState({showPopularPostsThisWeek: false})
            }}/>)
        }

        postsDays = [];
        const days = this.getLastNDates(this.state.days);
        days.map((date, index) => {
            postsDays.push(<Telescope.components.PostsDay key={index} date={date} number={index}/>);
        });
        const loadMoreDays = this.loadMoreDays.bind(this);

        return (
            <div className="results_37tfm">
                {postsDays}
                <a className="posts-load-more-days" onClick={loadMoreDays}>Load More Days</a>
            </div>
        )
    }
}

PostsDaily.propTypes = {
    days: React.PropTypes.number,
    increment: React.PropTypes.number
};

PostsDaily.defaultProps = {
    days: 1,
    increment: 3
};

export default PostsDaily;
