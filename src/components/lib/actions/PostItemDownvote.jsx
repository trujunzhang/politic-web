import React, {Component} from 'react';
import Users from '../../../lib/users';

const {timeout, postsItemVoting} = require('../../../actions').default

class PostItemDownvote extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState = {
      fade: false,
      isWaiting: false
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

  onDownvoteClick(event) {
    event.preventDefault();

    const {post, currentUser, isLoggedIn} = this.props
    if (isLoggedIn === false) {
      this.props.onShowLoginOverlay()
    } else if (Users.hasDownvoted(currentUser, post)) {
      this.onVotingPress('cancelDownvote')
    } else {
      this.setState({fade: true});
      this.onVotingPress('downvote')
    }

    event.stopPropagation();
  }

  async onVotingPress(operation: string) {
    if (this.state.isWaiting) {
      return
    }

    this.setState({isWaiting: true})

    const {dispatch, post, currentUser} = this.props

    let postId = post.id
    let userId = currentUser.id
    let isDownvoted = Users.hasDownvoted(currentUser, post)
    let isUpvoted = Users.hasUpvoted(currentUser, post)

    try {
      await Promise.race([
        dispatch(postsItemVoting(postId, userId, operation)),
        timeout(15000),
      ])
    } catch (e) {
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
    } finally {
      debugger
      this.setState({isWaiting: false})
    }
  }

  render() {
    const {post, currentUser} = this.props,
      {fade} = this.state

    const hasDownvoted = Users.hasDownvoted(currentUser, post);
    const buttonClass =
      hasDownvoted ?
        "button_2I1re active_2heMV smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 button_2n20W" :
        "button_2I1re smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 button_2n20W";

    let postVoteClass = "postDownvoteArrow_2xABl" + (hasDownvoted ? " upvoted_172lX" : "");
    if (fade) {
      postVoteClass = postVoteClass + ' animate_asuDN';
    }

    return (
      <button className={buttonClass} rel="vote-button" onClick={this.onDownvoteClick.bind(this)}>
        <div className="buttonContainer_wTYxi">
          <div ref='button' className={postVoteClass}/>
          {post.downvoters.length || 0}
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

export default connect()(PostItemDownvote)
