/**
 * # dashboardReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for dashboard
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./dashboardInitialState').default
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./dashboardFormValidation').default

/**
 * ## Dashboard actions
 */
const {
  DASHBOARD_LOADED_POSTS,
  RESET_DASHBOARD
} = require('../../lib/constants').default

const initialState = new InitialState()
/**
 * ## dashboardReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function dashboardReducer (state = initialState, action) {
  // if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  debugger
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case DASHBOARD_LOADED_POSTS: {
      debugger
      const {list, listTask, listId, limit} = action.data
      const objects = list.map(fromParsePost)

      debugger

      var nextTask = state.get(listId)

      let nextState = state
        .set(listId, nextTask)

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
        .setIn(['form', 'error'], form.error)
        .setIn(['form', 'isValid'], form.isValid)
        .setIn(['form', 'isFetching'], false)
        .setIn(['form', 'fields', 'username'], form.fields.username)
        .setIn(['form', 'fields', 'usernameHasError'], form.fields.usernameHasError)
        .setIn(['form', 'fields', 'email'], form.fields.email)
        .setIn(['form', 'fields', 'emailHasError'], form.fields.emailHasError)
        .setIn(['form', 'fields', 'password'], form.fields.password)
        .setIn(['form', 'fields', 'passwordHasError'], form.fields.passwordHasError)
        .setIn(['form', 'fields', 'passwordAgain'], form.fields.passwordAgain)
        .setIn(['form', 'fields', 'passwordAgainHasError'], form.fields.passwordAgainHasError)

      return next
  }
  /**
   * ## Default
   */
  return state
}

export default dashboardReducer
