/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict'

import type { Action } from '../actions/types'

/**
 * The states were interested in
 */
const {
  POSTS_OVERLAY_PUSH,
  POSTS_OVERLAY_POP,
  POSTS_OVERLAY_EMPTY,
  POSTS_OVERLAY_BACKWARD,
  POSTS_OVERLAY_FORWARD,
  LOADED_POSTS_PAGE,
  LOADED_RELATED_POSTS
} = require('../lib/constants').default

const {fromParsePost} = require('./parseModels')

const initialState = {
  isFetching: true,
  isFetchingRelated: true,
  currentModel: null,
  currentRelatedPosts: [],
  pages: []
}

function postsOverlay (state: State = initialState, action: Action): State {
  if (action.type === LOADED_POSTS_PAGE) {
    let {objectId, object} = action.data
    let model = fromParsePost(object)
    return {
      isFetching: false,
      currentModel: {objectId: object, model: model},
      currentRelatedPosts: [],
      pages: {objectId: model}
    }
  }
  if (action.type === LOADED_RELATED_POSTS) {
    const {list, listTask, listId, limit, totalCount} = action.data
    const objects = list.map(fromParsePost)
    const nextState = Object.assign({}, state, {
      currentRelatedPosts: objects,
      isFetchingRelated: false,
    })
    return nextState
  }

  if (action.type === POSTS_OVERLAY_PUSH) {
    return {
      isFetching: true,
      currentModel: null,
      currentRelatedPosts: [],
      pages: []
    }
  }

  return state
}

export default postsOverlay
