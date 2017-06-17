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
const InitialState = require('./paginationInitialState').default

/**
 * The states were interested in
 */
const {
  LOADED_POSTS,
  NEXT_PAGE,
  RESET_PAGE
} = require('../../lib/constants').default

const initialState = new InitialState()

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function paginationReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case LOADED_POSTS: {
      let nextState = state
        .setIn(['form', 'isFetching'], true)
        .setIn(['form', 'error'], null)
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

export default paginationReducer
