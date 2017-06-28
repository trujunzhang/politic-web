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

let {ParsePost, ParseFolder, ParseUser} = require('../parse/objects').default
let {getPostsParameters, getQueryByType} = require('../parse/parseUtiles').default

import Posts from '../lib/posts'

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_POSTS,
  DASHBOARD_LOADED_PAGINATION,
  OVERLAY_LOADED_POSTS_PAGE,
  USERPROFILE_LOADED
} = require('../lib/constants').default


async function _loadUsersPaginationDashboard(listTask: Any, listId: string, terms: Any): Promise<Array<Action>> {
  const {pageIndex, limit} = listTask
  const skipCount = (pageIndex - 1) * limit

  let dashboardQuery = getQueryByType()
  let objectsQuery = getPostsParameters(terms)

  let totalCount = await  new Parse.Query(ParsePost).count()

  let allCount = totalCount //dashboardQuery.equalTo("status": {$in: Posts.config.PUBLISH_STATUS}}), {noReady: true});
  let publishCount = await  new Parse.Query(ParsePost).equalTo("status", Posts.config.STATUS_APPROVED).count()
  let pendingCount = await  new Parse.Query(ParsePost).equalTo("status", Posts.config.STATUS_PENDING).count()
  let rejectedCount = await  new Parse.Query(ParsePost).equalTo("status", Posts.config.STATUS_REJECTED).count()
  let draftCount = await  new Parse.Query(ParsePost).equalTo("status", Posts.config.STATUS_SPAM).count()
  let trashCount = await  new Parse.Query(ParsePost).equalTo("status", Posts.config.STATUS_DELETED).count()

  let tableCount = await  objectsQuery.count()

  let countKeys = {
    allCount: allCount,
    publishCount: publishCount,
    pendingCount: pendingCount,
    rejectedCount: rejectedCount,
    draftCount: draftCount,
    trashCount: trashCount,
    tableCount: tableCount
  }

  let results = await objectsQuery.skip(skipCount).limit(limit).find({
    success: (list) => {
      // debugger
      // Flow can't guarantee {type, list} is a valid action
    },
    error: (error) => {
      debugger
    }
  })

  const payload = {
    list: results,
    listTask,
    listId,
    limit,
    countKeys,
    totalCount
  }

  const action = {
    type: DASHBOARD_LOADED_PAGINATION,
    payload: payload
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function loadUsersPaginationDashboard(listTask: Any, listId: string, terms: Any): ThunkAction {
  return (dispatch) => {
    const action = _loadUsersPaginationDashboard(listTask, listId, terms)

    // Loading friends schedules shouldn't block the login process
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}

export default {
  loadUsersPaginationDashboard

}
