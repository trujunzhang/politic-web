import Telescope from '../index'
import React, { Component } from 'react'
import Posts from '../../../lib/posts'
// import Users from '../../../lib/users';
import { withRouter } from 'react-router'

class PostsItem extends Component {
  // A: Title + Image should open the “Read More” link - link to the original article
  // B: Title + Image in post list is like in post detail. click them will open original url?
  // A: YES

  renderContent (showActionButtons) {
    const {post} = this.props
    return (
      <div className={'row ' + (showActionButtons ? 'posts_content row_margin_bottom30' : '')}>
        <div>
          <span onClick={this.onReadMoreClick.bind(this)}
                className="title_2p9fd featured_2W7jd default_tBeAo base_3CbW2 post-title">
            {post.title}
          </span>
          <Telescope.components.PostsDomain post={post} domainClass=""/>
        </div>

        <div className="post_description post_description_p"
             onClick={this.onReadMoreClick.bind(this)}>
          {Posts.getLimitedContent(post.body, 150)}
        </div>

        <Telescope.components.PostsItemActions {...this.props}/>

      </div>
    )
  }

  renderThumbnail () {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post)

    if (imageSet.small) {
      return (
        <div className="post-thumbnail thumbnail_JX64A post-left-thumbnail">
          <div onClick={this.onReadMoreClick.bind(this)}
               className="container_22rD3 post-list-thumbnail">
            <Telescope.components.BlurryImage
              imageId={post._id + '-thumbnail'}
              containerClass={'container__Ql6q lazyLoadContainer_3KgZD'}
              imageClass={'post-list-thumbnail'}
              imageSet={imageSet}
              imageTitle={post.title}
            />
          </div>
        </div>
      )
    }
    return null
  }

  render () {
    const showActionButtons = false

    const itemDisabled = false//post.status !== Posts.config.STATUS_APPROVED;

    return (
      <li className='postItem_block'>
        <div disabled={itemDisabled} className="postItem_2pV9v">
          <div className="link_3fUGJ" onClick={this.onReadMoreClick.bind(this)}>
            {this.renderThumbnail()}
            {this.renderContent(showActionButtons)}
          </div>
        </div>
      </li>
    )
  }

  onReadMoreClick (e) {
    e.preventDefault()
    // const {post} = this.props;
    // const url = post.url;

    // Users.openNewBackgroundTab(e.target, url);

    e.stopPropagation()
  }

  popupDetail (event) {
    event.preventDefault()

    // const {user} = this.props; // Important: <* props.user (Maybe user is not Logged user)*>
    // const {router, post, location} = this.props;
    // if (post.status === Posts.config.STATUS_APPROVED) {
    //     this.context.messages.pushRouterForDetailPage(router, post, Users.checkIsAdmin(location, user));
    // }

    event.stopPropagation()
  }

}

PostsItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

export default withRouter(PostsItem)
