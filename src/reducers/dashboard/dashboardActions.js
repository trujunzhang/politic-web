/**
 * # dashboardActioins.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  DASHBOARD_LOADED_POSTS,
  RESET_DASHBOARD,
  TOGGLE_TABLE_ROW_CHECKBOX,
  TOGGLE_TABLE_ROW_ALL_CHECKBOXS,
  DASHBOARD_EDIT_ALL_ROWS,
  DASHBOARD_EDIT_SINGLE_ROW,
  DASHBOARD_EDIT_SINGLE_ROW_CANCEL
} = require('../../lib/constants').default

const _ = require('underscore')

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function toggleCheckbox (itemId) {
  return {
    type: TOGGLE_TABLE_ROW_CHECKBOX,
    payload: itemId
  }
}

export function toggleAllCheckbox () {
  return {
    type: TOGGLE_TABLE_ROW_ALL_CHECKBOXS
  }
}

export function editSingleRow (itemId) {
  return {
    type: DASHBOARD_EDIT_SINGLE_ROW,
    payload: itemId
  }
}

export function cancelEditSingleRow () {
  return {
    type: DASHBOARD_EDIT_SINGLE_ROW_CANCEL,
  }
}

export function resetPasswordFailure (error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error
  }
}
