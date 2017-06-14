import Telescope from '../index';
import React, {Component} from 'react';
import moment from 'moment';
import Cookie from 'react-cookie';
import Posts from "../../lib/posts";

class PostsPopularThisWeek extends Component {

    constructor(props, context) {
        super(props);
        this.state = this.initialState = {
            isEventCalling: false,
            cachedIds: [],
            didMount: false
        };
        this.dismissBanner = this.dismissBanner.bind(this);
    }

    fetchCachedPostIds(today, week) {
        this.context.actions.call('posts.cached.ids', {
            view: "best",
            date: today,
            after: moment(week).format("YYYY-MM-DD"),
            before: moment(today).format("YYYY-MM-DD"),
        }, (error, result) => {
            if (!!error) {
            } else {
                this.setState({isEventCalling: true, cachedIds: result});
            }
        });
    }

    /**
     * One more thing. The “Popular This Week” section should have articles from the last 4 days.
     * Right now, it is showing articles from last 7 days.
     * at 31/03/2017
     */
    componentDidMount() {
        this.setState({didMount: true});

        const last_days = 4;
        const today = moment().subtract(0, 'days').startOf('day').toDate();
        const week = moment().subtract(last_days, 'days').startOf('day').toDate();
        this.fetchCachedPostIds(today, week);
    }

    dismissBanner(e) {
        if (e && e.preventDefault) e.preventDefault();

        this.setState({showPopularPostsThisWeek: false});

        // set cookie
        Cookie.save('showPopularPostsThisWeek', "no");

        this.props.callBack();
    }

    renderLoading() {
        return (
            <section className="results_37tfm">
                <div>
                    <div className="fullWidthBox_3Dggh box_c4OJj">
                        <div className="content_DcBqe">
                            <Telescope.components.PostsListTitle
                                title="Popular this week"
                                showClose={true}
                                dismissBanner={this.dismissBanner}/>
                        </div>
                    </div>
                </div>
                <Telescope.components.PostsLoading id="load.more.hint.posts"/>
            </section>
        )
    }

    render() {
        const {isEventCalling} = this.state;

        if (!!isEventCalling) {
            return this.renderPopularThisWeek();
        } else {
            return this.renderLoading();
        }
    }

    renderPopularThisWeek() {
        /**
         * Popular posts this week
         */
        const terms = {
            view: 'popular.this.week',
            cachedIds: this.state.cachedIds,
            limit: 5,
            listId: "posts.list.popular.this.week"
        };
        // const {selector, options} = Posts.parameters.get(terms);

        return (
            <div className="posts-day">
                <Telescope.components.PostsList
                    showHeader=true
                    checkReady=true
                    title="Popular this week"
                    showClose=true
                    dismissBanner=this.dismissBanner
                    limit:10
                />
            </div>
        )
    }

}

PostsPopularThisWeek.propTypes = {
    date: React.PropTypes.object,
    number: React.PropTypes.number
};


module.exports = PostsPopularThisWeek;
export default PostsPopularThisWeek;
