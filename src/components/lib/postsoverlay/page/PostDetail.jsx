import Telescope from '../../../lib'
import React, { Component } from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'

class PostDetail extends Component {
  onSaveButtonClick (event) {
    event.preventDefault()

    // const {post} = this.props,
    //   {currentUser} = this.context
    // if (!currentUser) {
    //   this.context.messages.showLoginUI('save "' + post.title + '" to collection.')
    // } else {
    //   let offset = $(this.refs.saveButton).offset()
    //   let top = offset.top + 14
    //   let left = offset.left - 105
    //   let width = 60
    //   let height = 20
    //   this.context.messages.showPopoverMenu('SaveButton', {
    //     title: post.title,
    //     savedPostId: post._id
    //   }, top, left, width, height)
    // }
  }

  renderMobileSaveButton () {
    const {post} = this.props,
      isMobileDevice = Users.isMobileDevice()
    if (!isMobileDevice) {
      return null
    }
    return (
      <button id="post-detail-header-save-button"
              className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d simpleVariant_1Nl54 shareButton_1occ0"
              ref="saveButton"
              onClick={this.onSaveButtonClick.bind(this)}>
        <div className="buttonContainer_wTYxi">
          <span>
            <svg width="13" height="10" viewBox="0 0 13 10">
              <path fill="#FFF"
                    d="M9,6 L6,6 L6,7 L9,7 L9,10 L10,10 L10,7 L13,7 L13,6 L10,6 L10,3 L9,3 L9,6 Z M0,0 L8,0 L8,1 L0,1 L0,0 Z M0,3 L8,3 L8,4 L0,4 L0,3 Z M0,6 L5,6 L5,7 L0,7 L0,6 Z"/>
            </svg>
          </span>
        </div>
      </button>
    )
  }

  render () {
    const {post} = this.props
    let html = post.htmlBody
    if (html) {
      html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '...</p>'
    }
    const htmlBody = {__html: html}
    return (
      <section className="container_3tEOd">
        {/*post's content*/}
        <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>

        <div className="container_1Nmia with_mobile_buttons">
          <Telescope.components.PostsReadMore post={post} customId="detail-read-more"/>
          {this.renderMobileSaveButton()}
        </div>

      </section>
    )
  }
}

export default PostDetail
