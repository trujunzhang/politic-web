import Telescope from '../index';
import React, {Component} from 'react';

import Cookie from 'react-cookie';
import moment from 'moment';

class PostsDaily extends Component {

    constructor(props) {
        super(props);

        const showPopularPostsThisWeek = Cookie.load('showPopularPostsThisWeek') !== "no";

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
        const postsDays = [];
        if (this.state.showPopularPostsThisWeek) {
            postsDays.push(<Telescope.components.PostsPopularThisWeek key={100} callBack={e => {
                this.setState({showPopularPostsThisWeek: false})
            }}/>)
        }
        const days = this.getLastNDates(this.state.days);
        days.map((date, index) => {
            postsDays.push(<Telescope.components.PostsDay key={index} date={date} number={index}/>);
        });
        const loadMoreDays = this.loadMoreDays.bind(this);

        return (
            <Telescope.components.InfiniteScroll
                element="div"
                currentPage={days.length / this.props.increment}
                hasMore={true}
                loadMore={loadMoreDays}>

                {postsDays}
                <a className="posts-load-more-days" onClick={loadMoreDays}>Load More Days</a>

            </Telescope.components.InfiniteScroll>
        )
    }
}

PostsDaily.propTypes = {
    days: React.PropTypes.number,
    increment: React.PropTypes.number
};

PostsDaily.defaultProps = {
    days: 3,
    increment: 3
};

module.exports = PostsDaily;
export default PostsDaily;
