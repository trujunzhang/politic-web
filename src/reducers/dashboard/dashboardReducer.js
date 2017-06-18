/**
 * # dashboardReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'

import type { Action } from '../../actions/types'

/**
 * ## Dashboard actions
 */
const {
  DASHBOARD_LOADED_POSTS,
  RESET_DASHBOARD,
  TOGGLE_TABLE_ROW_CHECKBOX
} = require('../../lib/constants').default

const {fromParsePost} = require('../parseModels')

const {Map} = require('immutable')

const initialState = Map({
  results: [],
  pageIndex: 1,
  limit: 10,
  ready: false,
  editAll: false,
  editAllIds: [],
  editSingle: false,
  editSingleId: '',
  checkAll: false,
  checkRows: {},
  countKeys: {}
})

/**
 * ## dashboardReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function dashboardReducer (state = initialState, action): State {
  // if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case DASHBOARD_LOADED_POSTS: {
      console.log('Dashboard loaded posts: ')

      const {list, listTask, listId, limit} = action.data
      const objects = list.map(fromParsePost)

      let nextState = state
        .set('pageIndex', listTask.pageIndex + 1)
        .set('ready', true)
        .set('results', objects)

      return nextState
    }

    case TOGGLE_TABLE_ROW_CHECKBOX: {
      const itemId = action.payload

      const checkRows = state.get('checkRows'),
        checkKeys = Object.keys(checkRows),
        checked = (checkKeys.indexOf(itemId) !== -1)

      checkRows[itemId] = !checked

      let nextState = state
        .set('checkRows', checkRows)

      return nextState
    }


    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
    case RESET_DASHBOARD:
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

export default dashboardReducer
