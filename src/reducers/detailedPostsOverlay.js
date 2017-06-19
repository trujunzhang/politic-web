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
  OVERLAY_DETAILS_POSTS_DISMISS,
  OVERLAY_DETAILS_POSTS_PUSH,
  OVERLAY_LOADED_POSTS_PAGE,
  OVERLAY_LOADED_RELATED_POSTS
} = require('../lib/constants').default

const {fromParsePost} = require('./parseModels')

const initialState = {
  isFetching: true,
  currentModel: null,
  isFetchingRelated: true,
  currentRelatedPosts: [],
  pages: []
}

function detailedPostsOverlay (state: State = initialState, action: Action): State {
  if (action.type === OVERLAY_LOADED_POSTS_PAGE) {
    let {objectId, object} = action.payload

    const nextState = Object.assign({}, state, {
      isFetching: false,
      currentModel: {objectId: objectId, model: fromParsePost(object)},
    })
    return nextState
  }

  if (action.type === OVERLAY_LOADED_RELATED_POSTS) {
    const {list, listTask, listId, limit, totalCount} = action.payload

    const nextState = Object.assign({}, state, {
      currentRelatedPosts: list.map(fromParsePost),
      isFetchingRelated: false,
    })
    return nextState
  }

    if (action.type === OVERLAY_DETAILS_POSTS_DISMISS) {
        const nextState = Object.assign({}, state, initialState)
        return nextState
    }

    if (action.type === OVERLAY_DETAILS_POSTS_PUSH) {
        const post = action.payload

        const pages = state.pages.push(post)

        const nextState = Object.assign({}, state, {
            isFetching:false,
            currentModel: {objectId: post.id, model: post},
            isFetchingRelated: true,
            currentRelatedPosts: [],
            pages:pages
        })

        return nextState
    }

  return state
}

export default detailedPostsOverlay
