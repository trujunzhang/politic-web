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

import type { Action } from '../../actions/types'

const {Map} = require('immutable')

const initialState = Map({})

/**
 * The states were interested in
 */
const {
  LOADED_POSTS,
} = require('../../lib/constants').default

const {fromParsePost} = require('../parseModels')

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function paginationReducer (state: State = initialState, action): State {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case LOADED_POSTS: {
      const {list, listTask, listId, limit, totalCount} = action.data
      const objects = list.map(fromParsePost)
      // debugger
      var nextTask = state.get(listId)
      if (!!nextTask) {
        nextTask = nextTask.set('results', nextTask.get('results').concat(objects))
          .set('pageIndex', listTask.pageIndex + 1)
          .set('totalCount', totalCount)
      } else {
        nextTask = Map({
          id: listId,
          hasMore: true,
          ready: true,
          totalCount: totalCount,
          limit: limit,
          pageIndex: listTask.pageIndex + 1,
          firstPagination: false,
          results: objects
        })
      }

      let nextState = state
        .set(listId, nextTask)

      return nextState
    }

    case NEXT_PAGE: {
      let nextState = state
        .setIn(['form', 'isFetching'], true)
        .setIn(['form', 'error'], null)
      return nextState
    }

    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
    case RESET_PAGE:
      var form = JSON.parse(action.payload).auth.form

      var next = state.setIn(['form', 'state'], form.state)
        .setIn(['form', 'disabled'], form.disabled)
      return next
  }
  /**
   * ## Default
   */
  return state
}

export default paginationReducer
