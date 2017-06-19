import Telescope from '../../../lib'
import React, { Component } from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class PostsPage extends Component {

  constructor (props) {
    super(props)

    // const {post} = this.props
    // this.state = this.initialState = {
    //   status: post.status || 2
    // }
  }

  componentDidMount () {
  }

  onFlagClick () {
    const {post} = this.props,
      {currentUser, messages} = this.context

    // if (!currentUser) {
    //   messages.showLoginUI()
    // } else {
    //   let offset = $(this.refs.submitFlagButton).offset()
    //   let top = offset.top + 14
    //   let left = offset.left - 105
    //   let width = 60
    //   let height = 20
    //   messages.showPopoverMenu('submitFlag', {
    //     postId: post._id,
    //     authorId: post.userId,
    //     title: post.title
    //   }, top, left, width, height)
    // }
  }

  onTagClick (topic) {
    // this.context.messages.pushForTopic(this.props.router, topic)
  }

  renderFlag () {
    return (
      <div className="actions_1GPvO title_2vHSk subtle_1BWOT base_3CbW2" id="post-detail-submit-flag"
           ref="submitFlagButton">
        <a className="flag_1WIWE action_Tsg82" onClick={this.onFlagClick.bind(this)}>
          <span className="icon_Q-ny2">
            <svg width="12" height="15" viewBox="0 0 12 15">
              <path d="M0,15 L0,0 L1,0 L1,15 L0,15 Z M12,8 L2,8 L2,1 L12,1 L10,4.5 L12,8 Z" fillOpacity=".5"
                    fill="#999"/>
            </svg>
          </span>flag</a>
      </div>
    )
  }

  renderSideRelatedList () {
    return (
      <div className="relatedPosts_3XCIU" rel="related-posts">
        <h2 className="heading_woLg1 heading_AsD8K title_2vHSk subtle_1BWOT base_3CbW2">
          Related Articles
        </h2>
        <Telescope.components.PostsRelatedList post={this.props.post}/>
      </div>
    )
  }

  showUserProfile (curator) {
    this.context.messages.dismissAllPopoverPosts()
    this.context.messages.pushRouter(this.props.router, {pathname: '/users/' + curator.telescope.slug})
  }

  renderCuratorAvator (curator) {
    return (
      <button ref="userProfile"
              id="user-menu"
              className="button button--small button--chromeless u-baseColor--buttonNormal is-inSiteNavBar js-userActions">
        {/*<Telescope.components.UsersBlurryImageAvatar*/}
        {/*avatarObj={Users.getAvatarObj(curator)}*/}
        {/*size={32}/>*/}
      </button>
    )
  }

  renderCuratorSection () {
    const {post} = this.props,
      curator = post.user || {},
      displayName = Users.getDisplayName(curator)

    // 18/12/2016
    // Remove "Author" from all submitted articles". Only show Curator.
    if (!!curator) {
      return (
        <div className="wrapper_QLq-_">
          <section className="container_2Ripa">
            <div className="hunter_1sYZY">
              <span
                className="title_xMyDK secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">Curator</span>
              <div className="item_x2MDC">
                <a className="link_j6xU_"><span className="user-image">{this.renderCuratorAvator(curator)}</span></a>
                <a onClick={this.showUserProfile.bind(this, curator)}
                   className="userName_35k43 text_3Wjo0 default_tBeAo base_3CbW2">{displayName}</a>
              </div>
            </div>
          </section>
        </div>
      )
    }
    return (
      <div className="post_detail_container"/>
    )
  }

  renderContent () {
    const {post} = this.props,
      admin = false

    return (
      <div className="constraintWidth_ZyYbM body_1a08C">
        <main className="main_3lfDa">
          {/*post's tags*/}
          <Telescope.components.PostsPageTopics post={post}/>
          {/*middle left*/}
          <Telescope.components.PostDetail post={post}/>
          {/*Curator*/}
          {/*{this.renderCuratorSection()}*/}
          {/*comments*/}
          {/*<Telescope.components.PostsCommentsThread document={post}/>*/}
        </main>
        <aside className="aside_1sJP0">
          {this.renderFlag()}
          {/*{admin ? <Telescope.components.PostsAdminApproving post={post}/> : null}*/}
          {this.renderSideRelatedList()}
        </aside>
      </div>
    )
  }

  render () {
    return (
      <div className="page_content_3X9xi" id="overlay-article">
        <section className="postSection_1iIbk">
          <div className="sectionContent_21Amp">
            <Telescope.components.PostsSingleHeader post={this.props.post}/>
            {this.renderContent()}
          </div>
        </section>
      </div>
    )
  }
}

export default PostsPage
