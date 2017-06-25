import React, {Component} from 'react';
import Users from '../../../lib/users';

const {timeout, postsItemVoting} = require('../../../actions').default

/**
 * The states were interested in
 */
const {
  // Event Type
  POSTS_UPVOTE,
  POSTS_DOWNVOTE,
  POSTS_UPVOTE_CACEL,
  POSTS_DOWNVOTE_CACEL,
  // Type
  VOTE_BUTTON_LIST_UPVOTE,
  VOTE_BUTTON_LIST_DOWNVOTE
} = require('../../../lib/constants').default


class PostItemUpvote extends Component {

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

  onUpvoteClick(event) {
    event.preventDefault();

    const {post, currentUser, isLoggedIn, hasVoted} = this.props
    if (isLoggedIn === false) {
      this.props.onShowLoginOverlay()
    } else if (hasVoted) {
      this.onVotingPress()
    } else {
      this.setState({fade: true});
      this.onVotingPress()
    }

    event.stopPropagation();
  }

  async onVotingPress() {
    if (this.state.isWaiting) {
      return
    }
    const {dispatch, post, currentUser, listId, voteType, hasVoted} = this.props

    let operations = [POSTS_UPVOTE, POSTS_UPVOTE_CACEL, POSTS_DOWNVOTE, POSTS_DOWNVOTE_CACEL]
    let actionIndex = ((voteType === VOTE_BUTTON_LIST_UPVOTE) ? 0 : 1) * 2 + (hasVoted ? 1 : 0)
    let operation = operations[actionIndex]

    this.setState({isWaiting: true})

    let postId = post.id
    let userId = currentUser.id
    let isUpvoted = Users.hasUpvoted(currentUser, post)
    let isDownvoted = Users.hasDownvoted(currentUser, post)

    try {
      await Promise.race([
        dispatch(postsItemVoting(postId, userId, operation, listId, isUpvoted, isDownvoted)),
        timeout(15000),
      ])
    } catch (e) {
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
    } finally {
      this.setState({isWaiting: false})
    }
  }

  render() {
    const {voteCount, hasVoted, voteClass} = this.props,
      {fade} = this.state;

    const buttonClass =
      hasVoted ?
        "button_2I1re active_2heMV smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 button_2n20W" :
        "button_2I1re smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 button_2n20W";

    let postVoteClass = voteClass + (hasVoted ? " upvoted_172lX" : "");

    if (fade) {
      postVoteClass = postVoteClass + ' animate_asuDN';
    }

    return (
      <button className={buttonClass} rel="vote-button" onClick={this.onUpvoteClick.bind(this)}>
        <div className="buttonContainer_wTYxi">
          <div ref='button' className={postVoteClass}/>
          {voteCount}
        </div>
      </button>
    )
  }
}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

export default connect()(PostItemUpvote)

