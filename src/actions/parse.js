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


const Parse = require('parse')

import type { ThunkAction } from './types'

var Objects = require('./objects').default

const PostsParameters = require('../parameters').Posts

/**
 * The states were interested in
 */
const {
  LOADED_POSTS,
  DASHBOARD_LOADED_POSTS
} = require('../lib/constants').default

function loadParseQuery (type: string, query: Parse.Query, listTask: Any, listId: string, limit: int): ThunkAction {
  return (dispatch) => {
    return query.find({
      success: (list) => {
        // debugger
        // Flow can't guarantee {type, list} is a valid action
        const data = {
          list: list,
          listTask: listTask,
          listId: listId,
          limit: limit
        }
        dispatch(({type, data}))
      },
      error: (error) => {
        debugger
      }
    })
  }
}

export default {
  loadPosts: (listTask: Any, listId: string, terms: Any, type: string = LOADED_POSTS): ThunkAction => {
    const {pageIndex, limit} = listTask
    const skipCount = (pageIndex - 1) * limit

    var postQuery = new Parse.Query(Objects.Post).include('topics')

    const param = new PostsParameters(postQuery)
    postQuery = param.addParameters(terms).end()

    var query = postQuery.skip(skipCount).limit(limit)

    return loadParseQuery(type, query, listTask, listId, limit)
  }
}
