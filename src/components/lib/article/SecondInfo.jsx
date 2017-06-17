import Telescope from '../index'
import React, { Component } from 'react'
import Posts from '../../../lib/posts'
import TextareaAutosize from 'react-textarea-autosize'

class SecondInfo extends Component {

  constructor (props) {
    super(props)

    const newPost = props.newPost
    this.state = this.initialState = {
      isSubmitting: false,
      // Post's keys
      linkValue: newPost['url'],
      titleValue: newPost['title'] ? newPost['title'] : '',
      description: newPost['body'] ? newPost['body'] : '',
      // categories is the array of the category's ids.
      categories: newPost['categories'] ? newPost['categories'] : [],
      topicsArray: newPost['topicsArray'] ? newPost['topicsArray'] : [],
      topics: newPost['topics'] ? newPost['topics'] : [],
      // For feature images
      thumbnailValue: newPost['thumbnailUrl'] ? newPost['thumbnailUrl'] : '',
      cloudinaryId: newPost['cloudinaryId'] ? newPost['cloudinaryId'] : '',
      cloudinaryUrls: newPost['cloudinaryUrls'] ? newPost['cloudinaryUrls'] : '',
      localUploadPath: newPost['localUploadPath'] ? newPost['localUploadPath'] : '',
      // Post's status
      status: newPost['status'] ? newPost['status'] : Posts.config.STATUS_PENDING,
    }
  }

  onNextClick (status) {
    const result = {}

    result ['url'] = this.state.linkValue
    result ['thumbnailUrl'] = this.state.thumbnailValue
    result ['cloudinaryId'] = this.state.cloudinaryId
    result ['cloudinaryUrls'] = this.state.cloudinaryUrls
    result ['localUploadPath'] = this.state.localUploadPath
    result ['title'] = this.state.titleValue
    result ['body'] = this.state.description
    result ['categories'] = this.state.categories
    result ['topicsArray'] = this.state.topicsArray
    result ['topics'] = this.state.topics
    result ['status'] = status
    result['sourceFrom'] = Posts.parseDomain(this.state.linkValue)

    this.setState({isSubmitting: true})

    this.props.submitClick(result)
  }

  onCategoryChange (categories) {
    this.setState({categories: categories})
  }

  onTopicsChange (topics, topicsArray) {
    this.setState({topicsArray: topicsArray, topics: topics})
  }

  onFeatureImageChange (thumbnailValue, cloudinaryId, localUploadPath) {
    this.setState({
      thumbnailValue: thumbnailValue,
      cloudinaryId: cloudinaryId,
      localUploadPath: localUploadPath
    })
  }

  renderFeatureImage () {
    const preview = Posts.getThumbnailSet({
      cloudinaryId: this.state.cloudinaryId,
      cloudinaryUrls: this.state.cloudinaryUrls,
      thumbnailUrl: this.state.thumbnailValue
    }).small
    return (
      <div className="field_1LaJb" id="thumbnail" onMouseOver={() => this.props.hint('thumbnail')}>
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Featured Image</span>
        <Telescope.components.ArticleFeatureImage
          thumbnailValue={this.state.thumbnailValue}
          imageId={this.state.cloudinaryId}
          preview={preview}
          onFeatureImageChange={this.onFeatureImageChange.bind(this)}
        />
        <hr className="ruler_1ti8u"/>
      </div>
    )
  }

  renderForTitle () {
    let {titleValue} = this.state
    return (
      <label className="field_1LaJb" onMouseOver={() => this.props.hint('title')}>
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Title</span>
        <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2" id="submit-new-topic-title-panel">
          <input type="text"
                 name="title"
                 id="submit-article-title"
                 value={titleValue}
                 onChange={(e) => this.setState({titleValue: e.target.value})}
          />
        </div>
        {titleValue === '' ?
          <span className="notice_33UMT secondaryText_PM80d subtle_1BWOT base_3CbW2">required</span> : ''}
        <hr className="ruler_1ti8u"/>
      </label>
    )
  }

  renderForDescription () {
    let {description} = this.state
    return (
      <label className="field_1LaJb" onMouseOver={() => this.props.hint('body')}>
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Description</span>
        <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2" id="submit-new-topic-title-panel">
          <TextareaAutosize
            useCacheForDOMMeasurements
            style={{boxSizing: 'border-box'}}
            id="submit-article-description"
            minRows={5}
            maxRows={20}
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
          />
        </div>
        {(description === '') ?
          <span className="notice_33UMT secondaryText_PM80d subtle_1BWOT base_3CbW2">required</span> : null}
        <hr className="ruler_1ti8u"/>
      </label>
    )
  }

  renderForTopics () {
    return (
      <label className="field_1LaJb" id="topics" onMouseOver={() => this.props.hint('topics')}>
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Topics</span>
        <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
          <Telescope.components.ArticleTopics
            topics={this.state.topics}
            topicsArray={this.state.topicsArray}
            onTopicsChange={this.onTopicsChange.bind(this)}
          />
        </div>
        <hr className="ruler_1ti8u"/>
      </label>
    )
  }

  renderForLink () {
    const {linkValue} = this.state
    return (
      <label className="field_1LaJb" onMouseOver={() => this.props.hint('link')}>
        <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Link</span>
        <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
          <input
            type="text"
            name="url"
            placeholder="https://"
            value={linkValue}
            onChange={(e) => this.setState({linkValue: e.target.value})}
          />
        </div>
        <hr className="ruler_1ti8u"/>
      </label>
    )
  }

  renderCommonSubmitButton (nextEnable) {
    const {status} = this.state
    return (
      <div className="right_1jQ6K buttonGroup_2NmU8 right_2JztM">
        <div className="buttonWithNotice_3bRZb">
          <button
            onClick={this.onNextClick.bind(this, status)}
            id="submit-article-button"
            className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidletiant_2wWrf"
            type="submit"
            disabled={!nextEnable}>
            <div className="buttonContainer_wTYxi article_button">Submit</div>
          </button>
        </div>
      </div>
    )
  }

  /**
   * 1. DELETE - Make it Red
   * 2. SAVE AS DRAFT - Make it yello
   * 3. PUBLISH - Make it green
   */
  renderAdminSubmitButton (nextEnable) {
    const title = Posts.getPostItemStatusTitle(this.state.status)
    return (
      <div className="right_1jQ6K buttonGroup_2NmU8 right_2JztM">

        <h2
          className="heading_woLg1  title_2vHSk subtle_1BWOT base_3CbW2 submitted_post_status">{'Status: (' + title + ')'}</h2>

        <div className="buttonWithNotice_3bRZb">
          <button
            onClick={this.onNextClick.bind(this, Posts.config.STATUS_SPAM)}
            className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d booksSolidColor_101bu solidletiant_2wWrf"
            type="submit"
            disabled={!nextEnable}>
            <div className="buttonContainer_wTYxi article_button">SAVE AS DRAFT</div>
          </button>
          <button
            onClick={this.onNextClick.bind(this, Posts.config.STATUS_DELETED)}
            className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d deleteSolidColor_B-2gO solidletiant_2wWrf"
            type="submit"
            disabled={!nextEnable}>
            <div className="buttonContainer_wTYxi article_button">DELETE</div>
          </button>
          <button
            onClick={this.onNextClick.bind(this, Posts.config.STATUS_APPROVED)}
            className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d podcastsSolidColor_2N0RG solidletiant_2wWrf"
            type="submit"
            disabled={!nextEnable}>
            <div className="buttonContainer_wTYxi article_button">PUBLISH</div>
          </button>
        </div>
      </div>
    )
  }

  render () {
    const {titleValue, linkValue, description, categories, isSubmitting, uploading} = this.state

    let nextEnable = ((linkValue !== '') && (titleValue !== '') && (description !== ''))
    // When uploading the image to cloudinary, set 'submit' button to disable.
    if (uploading || isSubmitting) {
      nextEnable = false
    }
    // TODO: djzhang
    // All fields except topics and featured image are compulsory, user should not be able to submit an article if any of them are empty.
    // 03/02/2017 Issue 61: Disable Categories
    //if (categories.length == 0) {
    //    nextEnable = false;
    //}
    let formStatus = 'errorField_1YQ0W'

    let admin = this.context.messages.appManagement.getAdmin(this.props.location, this.context.currentUser)

    return (
      <div >
        {/*Title*/}
        {this.renderForTitle()}
        {/*Feature Image*/}
        {this.renderFeatureImage()}
        {/*Description*/}
        {this.renderForDescription()}
        {/*Categories(TODO:03/02/2017 Issue 61: Disable Categories)*/}
        {/*{this.renderForCategories()}*/}
        {/*Topics*/}
        {this.renderForTopics()}
        {/*Submit button*/}
        {admin ? this.renderAdminSubmitButton(nextEnable) : this.renderCommonSubmitButton(nextEnable)}
      </div>
    )
  }
}

export default SecondInfo
