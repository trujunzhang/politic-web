import Telescope from '../../../../lib'
import React, { Component } from 'react'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class PostsSingleHeader extends Component {

  renderAction () {
    const {post} = this.props
    return (
      <div className="actions_vQA0Z">
        <Telescope.components.PostsReadMore post={post}/>
        <Telescope.components.ArticleUpvote post={post}/>
        <Telescope.components.ArticleDownvote post={post}/>
        <Telescope.components.PostsDomain post={post} domainClass="headline-source-from"/>
        <Telescope.components.PostsSingleHeaderRight post={post}/>
      </div>
    )
  }

  renderMobileBlock () {
    const {post} = this.props,
      isMobileDevice = Users.isMobileDevice()
    if (!isMobileDevice) {
      return null
    }
    return (
      <div>
        <div>
          <span className="secondaryText_PM80d inverse_1CN6F base_3CbW2">
            <time className="margin_left6">
              {/*2 months ago*/}
              <FormattedRelative value={post.createdAt}/>
            </time>
          </span>
        </div>
        <div>
          <span className="margin_left6">
            <Telescope.components.PostsDomain post={post} domainClass="headline-source-from-for-mobile"/>
          </span>
        </div>
      </div>
    )
  }

  render () {
    const {post} = this.props,
      imageSet = Posts.getThumbnailSet(post)

    let thumbnails = []
    if (!!imageSet.small) {
      thumbnails.push(
        <div key={post._id} className="post-thumbnail thumbnail_1qUpA">
          <a target="_blank" href={post.url}>
            <div className="container_22rD3" id="post-detail-thumbnail-panel">
              <Telescope.components.BlurryImage
                imageId={post._id + '-thumbnail'}
                containerClass={'container__Ql6q lazyLoadContainer_3KgZD'}
                imageClass={'post-detail-thumbnail-panel'}
                imageSet={imageSet}
                imageTitle={post.title}
              />
            </div>
          </a>
        </div>)
    }

    return (
      <div>
        <header className="backgroundImage_1hK9M header_1OPY8 post_detail_header">
          <div className="constraintWidth_ZyYbM content_1Truy">
            <main className="main_3Naik">
              {thumbnails}
              <div className="info_F11MZ">
                <div className="row">
                  <div className="headlineContainer_3dPf_">
                    <a target="_blank" href={post.url}>
                      <h1 className="article_headline_azIav inverse_1CN6F base_3CbW2">{post.title} </h1>
                    </a>
                    {this.renderMobileBlock()}
                  </div>
                  {this.renderAction()}
                </div>
              </div>
            </main>
          </div>
          <div className="timestamp_3yr9h">
            <span className="secondaryText_PM80d inverse_1CN6F base_3CbW2">
              <time className="margin_left6">
                {/*2 months ago*/}
                <FormattedRelative value={post.createdAt}/>
              </time>
            </span>
          </div>
        </header>
      </div>
    )

  }
}

export default PostsSingleHeader
