/**
 * # dashboardReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'

import type {Action} from '../../actions/types'
import update from 'immutability-helper'

/**
 * ## Dashboard actions
 */
const {
  DASHBOARD_LOADED_PAGINATION,
  DASHBOARD_RESET,
  TOGGLE_TABLE_ROW_CHECKBOX,
  TOGGLE_TABLE_ROW_ALL_CHECKBOXS,
  DASHBOARD_EDIT_ALL_ROWS,
  DASHBOARD_EDIT_SINGLE_ROW,
  DASHBOARD_EDIT_SINGLE_ROW_CANCEL
} = require('../../lib/constants').default

const {Map} = require('immutable')

const initialState = {
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
}

/**
 * ## dashboardReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function dashboardReducer(state = initialState, action): State {
  // if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case DASHBOARD_LOADED_PAGINATION: {
      // console.log('Dashboard loaded posts: ')

      const {list, listTask, listId, limit, countKeys} = action.payload

      return {
        results: list,
        pageIndex: listTask.pageIndex + 1,
        limit: state.limit,
        ready: true,
        editAll: false,
        editAllIds: [],
        editSingle: false,
        editSingleId: '',
        checkAll: false,
        checkRows: {},
        countKeys
      }
    }

    case TOGGLE_TABLE_ROW_CHECKBOX: {
      const itemId = action.payload

      const checkRows = state['checkRows'],
        checkKeys = Object.keys(checkRows),
        checked = (checkKeys.indexOf(itemId) !== -1)

      checkRows[itemId] = !checked

      return Object.assign({}, state, {
        checkRows: checkRows
      })
    }

    // case TOGGLE_TABLE_ROW_ALL_CHECKBOXS: {
    //
    // }

    // case DASHBOARD_EDIT_ALL_ROWS: {
    //   return {...state, 'checkRows': checkRows}
    // }

    case  DASHBOARD_EDIT_SINGLE_ROW: {
      return Object.assign({}, state, {
        editSingle: true,
        editSingleId: action.payload
      })
    }

    case DASHBOARD_EDIT_SINGLE_ROW_CANCEL: {
      return Object.assign({}, state, {
        editSingle: false,
        editSingleId: ''
      })
    }


    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
    case DASHBOARD_RESET:
      let form = JSON.parse(action.payload).auth.form

      let next = state.setIn(['form', 'state'], form.state)
        .setIn(['form', 'disabled'], form.disabled)

      return next
  }

  /**
   * ## Default
   */
  return state
}

export default dashboardReducer
