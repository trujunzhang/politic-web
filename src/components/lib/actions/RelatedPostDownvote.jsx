import React, {Component} from 'react';
import Users from '../../../lib/users';

class RelatedPostDownvote extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            fade: false
        };
        this.fadingDone = this.fadingDone.bind(this)
    }

    componentDidMount() {
        const elm = this.refs.button;
        elm.addEventListener('animationend', this.fadingDone)
    }

    componentWillUnmount() {
        const elm = this.refs.button;
        elm.removeEventListener('animationend', this.fadingDone)
    }

    fadingDone() {
        // will re-render component, removing the animation class
        this.setState({fade: false})
    }

    onRelatedPostDownvoteClick(event) {
        event.preventDefault();

        // const {post} = this.props,
        //     {currentUser} = this.context;
        //
        // if (!currentUser) {
        //     this.context.messages.showLoginUI();
        //
        // } else if (currentUser.hasDownvoted(post)) {
        //     this.context.actions.call('posts.cancelDownvote', post._id, (error, result) => {
        //         this.context.events.track("post downvote cancelled", {'_id': post._id});
        //     });
        // } else {
        //     this.setState({fade: true});
        //     this.context.actions.call('posts.downvote', post._id, (error, result) => {
        //         this.context.events.track("post downvoted", {'_id': post._id});
        //     });
        // }

        event.stopPropagation();
    }

    render() {
        const currentUser = null;
        const {post} = this.props,
            {fade} = this.state,
            hasDownvoted = Users.hasDownvoted(currentUser, post),
            buttonClass = hasDownvoted ?
                "button_2I1re active_2heMV smallSize_1da-r secondaryText_PM80d simpleVariant_relate_vote_1Nl54 button_2n20W" :
                "button_2I1re smallSize_1da-r secondaryText_PM80d simpleVariant_relate_vote_1Nl54 button_2n20W",
            postVoteClass = "postDownvoteArrow_2xABl" + (hasDownvoted ? " upvoted_172lX" : "") + (fade ? ' animate_asuDN' : "");

        return (
            <a className={buttonClass} onClick={this.onRelatedPostDownvoteClick.bind(this)}>
                <div ref='button' className={postVoteClass}/>
                {post.downvotes || 0}
            </a>
        )
    }
}

RelatedPostDownvote.propTypes = {
    post: React.PropTypes.object.isRequired, // the current post
};

module.exports = RelatedPostDownvote;
export default RelatedPostDownvote;
