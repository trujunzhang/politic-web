import React, {Component} from 'react';

class ArticleUpvote extends Component {

    onUpvoteClick(event) {
        event.preventDefault();

        // const {post} = this.props;
        // const {currentUser} = this.context;
        //
        // if (!currentUser) {
        //     this.context.messages.showLoginUI();
        //
        // } else if (currentUser.hasUpvoted(post)) {
        //     this.context.actions.call('posts.cancelUpvote', post._id, (error, result) => {
        //     });
        // } else {
        //     this.context.actions.call('posts.upvote', post._id, (error, result) => {
        //     });
        // }

        event.stopPropagation();
    }

    render() {
        return (
            <a onClick={this.onUpvoteClick.bind(this)}
               className="post-vote-button v-inlined v-category-tech postVoteButton_WsFJU button_2I1re solidVariant_2wWrf mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d whiteSolidColor_18W4g">
              <span className="post-vote-button--arrow">
                  <svg width="9" height="8" viewBox="0 0 9 8">
                      <path d="M9 8H0l4.5-8L9 8z" fill="#000"/>
                  </svg>
              </span>
                <span className="post-vote-button--count">
                  {this.props.post.upvotes || 0}
              </span>
            </a>
        )
    }
}

ArticleUpvote.propTypes = {
    post: React.PropTypes.object.isRequired, // the current post
};

module.exports = ArticleUpvote;
export default ArticleUpvote;
