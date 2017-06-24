import React, {Component} from 'react';
import Users from '../../../lib/users';

class PostItemDownvote extends Component {

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

  onDownvoteClick(event) {
    event.preventDefault();

    const {post, currentUser, isLoggedIn} = this.props
    if (isLoggedIn === false) {
      this.props.onShowLoginOverlay()
    } else if (Users.hasDownvoted(currentUser, post)) {

    } else {
      this.setState({fade: true});

    }

    event.stopPropagation();
  }

  render() {
    const {post} = this.props;
    const currentUser = null;
    const {fade} = this.state;

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
          {post.downvotes || 0}
        </div>
      </button>
    )
  }
}

export default PostItemDownvote;
