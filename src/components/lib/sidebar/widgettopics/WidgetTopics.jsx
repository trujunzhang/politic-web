import Telescope from '../../index';
import React, {Component} from 'react';
import {withRouter} from 'react-router';

class WidgetTopics extends Component {

    onTagClick(topic) {
        // ** Trending Topics **
        //  (Point 4 Explanation):
        //    When a person clicks tag “Demonitisation” Link: http://scruby.site/?title=Demonetisation&topicId=a387097638dc4b5946f357176a0f33a7
        //    It should open search query “Demonitisation” Link: http://scruby.site/?query=Demonitisation
        //    Because we will not be able to add “Demonitisation” tag in every articles, but all articles will have the word “Demonitisation”.

        // this.context.messages.pushForTopic(this.props.router, topic);
    }


    renderMenus() {
        const {results} = this.props;
        return (
            <div className="tags tags--postTags tags--light">
                {!!results && results.map((item, key) => {
                    return (
                        <a key={item.id}
                           className="link u-baseColor--link"
                           onClick={this.onTagClick.bind(this, item)}>
                            {/*{Topics.getTopicsTitle(item.name)}*/}
                        </a>
                    )
                })}
            </div>
        )
    }

    render() {
        const {results, ready, showTitle} = this.props;
        if (ready && !!results.length) {
            return (
                <div className="paddedBox_2UY-S box_transparent_c4OJj sidebarBox_1-7Yk sidebarBoxPadding_y0KxM">
                    <div className="content_DcBqe">

                        {!!showTitle ? <Telescope.components.WidgetHeader message="TRENDING"/> : null}

                        {this.renderMenus()}
                    </div>
                </div>
            )
        }

        return null;
    }
}


export default withRouter(WidgetTopics);
