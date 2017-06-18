import Telescope from '../index'
import React, { Component } from 'react'
import Topics from '../../../lib/topics'

import Select from 'react-select'
var _ = require('underscore')

class ArticleTopics extends Component {

  handleMultiChange (options) {
    const {topicsArray, topics} = this.props,
      updatedState = Topics.updateTopicsState(topics, topicsArray, options)

    this.props.onTopicsChange(updatedState.topics, updatedState.topicsArray)
  }

  fetchSuggestionTopics (input, callback) {
    if (!input) {
      return Promise.resolve({options: []})
    }
    const self = this
    //this.context.messages.delayEvent(function () {
    self.getSuggestions(input, callback)
    //}, 400);
  }

  getSuggestions (input, callback) {
    const {topics} = this.props,
      self = this
    this.context.actions.call('topics.suggestions', input, topics, (error, result) => {
      if (!!error) {
      } else {
        callback(null, {
          options: self.getOptions(result)
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          //complete: true
        })
      }
    })
  }

  getOptions (topicsArray) {
    return topicsArray.map((item, index) => {
      return {value: item._id, label: item.name}
    })
  }

  promptTextCreator (label) {
    return `Create Topic "${label}"`
  }

  render () {
    const {topicsArray, topics} = this.props,
      options = this.getOptions(topicsArray)

    return (
      <Select.AsyncCreatable
        name="form-field-name"
        multi={true}
        ignoreCase={false}
        placeholder="Select Topics"
        loadOptions={this.fetchSuggestionTopics.bind(this)}
        value={options}
        promptTextCreator={this.promptTextCreator.bind(this)}
        onChange={this.handleMultiChange.bind(this)}
      />
    )
  }
}

export default ArticleTopics
