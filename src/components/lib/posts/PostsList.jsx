import Telescope from '../index';
import React, {Component} from 'react';
import Posts from "../../../lib/posts";
const {loadPosts} = require('../../../actions/index');

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            posts: nextProps.posts
        })
    }

    componentDidMount() {
        this.props.dispatch(loadPosts());
    }

    render() {
        const {
            results,
            hasMore,
            ready,
            count,
            totalCount,
            limit,
            firstPagination = false,
            loadMore,
            showHeader = false,
            title,
            showClose = false,
            infinite = false,
            dismissBanner = null
        } = this.props;

        const {posts} = this.state;


        const loadMoreMessage = "Load More";//context.intl.formatMessage({id: "load.more.hint.posts"});

        const showReady = true;//Posts.showReady(results, hasMore, ready, totalCount, limit, firstPagination);

        const headerView =
            (<div>
                <div className="fullWidthBox_3Dggh box_c4OJj">
                    <div className="content_DcBqe">
                        <Telescope.components.PostsListTitle title={title} showClose={showClose}
                                                             dismissBanner={dismissBanner}/>
                    </div>
                </div>
            </div>);

        if (showReady) {
            return (
                <section className="results_37tfm">
                    {showHeader ? headerView : null}
                    <Telescope.components.PostsLoading id={"load.more.hint.posts"}/>
                </section>
            )
        } else if (!!results && !!results.length) {
            return (
                <Telescope.components.PostsHomeList infinite={infinite} results={results} limit={limit}
                                                    hasMore={hasMore}
                                                    ready={ready} title={title} showClose={showClose}
                                                    showHeader={showHeader} dismissBanner={dismissBanner}
                                                    loadMore={loadMore}/>
            )
        } else {
            return (
                <section className="results_37tfm">
                    {showHeader ? headerView : null}
                    <Telescope.components.PostsNoResults relatedList={false}/>
                </section>
            )
        }

    }

}

/**
 * ## Imports
 *
 * Redux
 */
import {connect} from 'react-redux'

function select(store) {
    return {
        posts: store.posts
    }
}


/**
 * Connect the properties
 */
module.exports = connect(select)(PostsList);
export default connect(select)(PostsList);

