/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */

import type {Action} from '../../actions/types'

const {Map, List} = require('immutable')

const initialState = Map({})

/**
 * The states were interested in
 */
const {
  LIST_VIEW_LOADED_POSTS,
  LIST_VIEW_RESET_ALL_POSTS,
  POSTS_VOTING_DONE
} = require('../../lib/constants').default

const {fromParsePost} = require('../parseModels')

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function paginationReducer(state: State = initialState, action): State {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case LIST_VIEW_LOADED_POSTS: {
      const {list, listTask, listId, limit, totalCount} = action.payload
      let nextTask = state.get(listId)
      if (!!nextTask) {

        nextTask = nextTask.set('results', nextTask.get('results').concat(list))
          .set('pageIndex', listTask.pageIndex + 1)
          .set('totalCount', totalCount)

      } else {
        nextTask = Map({
          id: listId,
          ready: true,
          totalCount: totalCount,
          limit: limit,
          pageIndex: listTask.pageIndex + 1,
          firstPagination: false,
          results: list
        })
      }

      let nextState = state
        .set(listId, nextTask)

      return nextState
    }

    // https://stackoverflow.com/questions/29589753/how-to-update-element-inside-list-with-immutablejs
    case POSTS_VOTING_DONE: {

      const {user, post} = action.payload,
        listId = action.payload.listId,
        postId = post.id

      var nextTask = state.get(listId),
        results = nextTask.get('results')

      let list = List(results)

      list.update(
        list.findIndex(function (item) {
          return item.id === postId;
        }), function (item) {
          item['upvoters'] = post.upvoters
          item['downvoters'] = post.downvoters
          return item
        }
      )

      let newResult = list.toJS()
      // nextTask.set('results', newResult)

      let nextState = state
        .setIn([listId, 'results'], newResult)

      return nextState
    }
    case LIST_VIEW_RESET_ALL_POSTS: {
      return Map({})
    }

  }
  /**
   * ## Default
   */
  return state
}

export default paginationReducer
