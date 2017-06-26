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

import type {ThunkAction} from './types'

let {ParsePost, ParseFolder, ParseUser} = require('./objects').default

const PostsParameters = require('../parameters').Posts

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_POSTS,
  DASHBOARD_LOADED_POSTS,
  OVERLAY_LOADED_POSTS_PAGE,
  USERPROFILE_LOADED
} = require('../lib/constants').default

function loadParseObject(type: string, query: Parse.Query, objectId: string): ThunkAction {
  return (dispatch) => {
    return query.get(objectId, {
      success: (object) => {
        // Flow can't guarantee {type, list} is a valid action
        const payload = {
          objectId: objectId,
          object: object
        }
        dispatch({type, payload})
      },
      error: (error) => {
        debugger
      }
    })

  }

}

function loadParseQuery(type: string, query: Parse.Query, listTask: Any = {}, listId: string = 'list_id', limit: int = 10, beforeQuery = null): ThunkAction {
  return (dispatch) => {
    let queryFind = (() => {
      let _query = query
      if (!!beforeQuery) {
        _query = beforeQuery(_query)
      }
      return _query.find({
        success: (list) => {
          // debugger
          // debugger
          // Flow can't guarantee {type, list} is a valid action
          const payload = {
            list: list,
            listTask: listTask,
            listId: listId,
            limit: limit,
            totalCount: totalCount
          }
          dispatch({type, payload})
        },
        error: (error) => {
          debugger
        }
      })
    })

    let totalCount = 0
    return query.count({
      success: function (count) {
        totalCount = count
      },
      error: function (error) {
        debugger
        console.log('failure')
      }
    }).then(() => {
      // debugger
      return queryFind()
    })

  }
}

function getPostQuery() {
  return new Parse.Query(ParsePost).include('topics').include('postAuthor')
}

export default {
  loadUserProfile: (userId: string, slug: string): ThunkAction => {
    let pageQuery = new Parse.Query(ParseUser).equalTo('objectId', userId)

    return loadParseObject(USERPROFILE_LOADED, pageQuery, userId)
  },

  loadUserFolders: (userId: string): ThunkAction => {
    let query = new Parse.Query(ParseFolder).equalTo('user', Parse.User.createWithoutData(userId))

    return loadParseQuery(LOADED_USER_FOLDERS, query)
  },

  loadPosts: (listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_POSTS): ThunkAction => {
    const {pageIndex, limit} = listTask
    const skipCount = (pageIndex - 1) * limit

    let postQuery = new PostsParameters(getPostQuery())
      .addParameters(terms)
      .end()

    return loadParseQuery(type, postQuery, listTask, listId, limit, function (query) {
      return query.skip(skipCount).limit(limit)
    })
  },

  loadPostPage: (objectId: string): ThunkAction => {
    return loadParseObject(OVERLAY_LOADED_POSTS_PAGE, getPostQuery(), objectId)
  },

  statisticPosts: (listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_POSTS): ThunkAction => {
    const {pageIndex, limit} = listTask
    const skipCount = (pageIndex - 1) * limit

    let postQuery = new PostsParameters(getPostQuery())
      .addParameters(terms)
      .end()

    return loadParseQuery(type, postQuery.skip(skipCount).limit(limit), listTask, listId, limit)
  }

}
