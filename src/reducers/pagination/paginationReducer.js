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

import Immutable from 'immutable'

const TaskMap = Immutable.OrderedMap

const TaskRecord = Map({})

const initialState = new TaskMap()

/**
 * The states were interested in
 */
const {
  LOADED_POSTS,
  NEXT_PAGE,
  RESET_PAGE
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
      const objects = action.list.map(fromParsePost)

      return {
        tasks: {'single-list-view': objects}
      }
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
