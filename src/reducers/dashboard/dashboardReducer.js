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
const InitialState = require('./dashboardInitialState').default
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./dashboardFormValidation').default

/**
 * ## Auth actions
 */
const {
  DASHBOARD_LOADED_POSTS
} = require('../../lib/constants').default

const initialState = new InitialState()
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
function authReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case DASHBOARD_LOADED_POSTS: {
      const {list, listTask, listId, limit} = action.data
      const objects = list.map(fromParsePost)

      var nextTask = state.get(listId)
      if (!!nextTask) {
        let lastResults = nextTask.get('results')
        let combinedResults = lastResults.concat(objects)
        nextTask = nextTask.set('results', combinedResults)
          .set('pageIndex', nextTask.get('pageIndex') + 1)
      } else {
        nextTask = Map({
          id: listId,
          hasMore: true,
          ready: true,
          totalCount: 100,
          limit: limit,
          pageIndex: 2,
          firstPagination: false,
          results: objects
        })
      }

      let nextState = state
        .set(listId, nextTask)

      return nextState
    }

    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case SIGNUP_REQUEST:


    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
    case SET_STATE:
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

export default authReducer
