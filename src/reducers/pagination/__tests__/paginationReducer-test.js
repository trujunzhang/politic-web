/**
 * # paginationReducer-test.js
 *
 * Test the paginationReducer's only function, like all reducers, where the
 * state and action are passed in.
 *
 * This will confirm that given a specific action with a type and
 * payload, that the state object is modified accordingly.
 *
 * *Note*: in this app,```state``` is an Immutable.js object
 *
 */
'use strict'

/**
 * ## Imports
 *
 * These actions are sufficient to test the reducer as many of the
 * case statements are shared amongst the actions.
 */
const {
  NEXT_PAGE,
  RESET_PAGE,

  LOADED_TOPICS,
  LOADED_POSTS
} = require('../../../lib/constants').default

/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */
const paginationReducer = require('../paginationReducer').default
/**
 * ## Tests
 *
 * paginationReducer
 */
describe('paginationReducer', () => {

  /**
   * ### The use LOADED_POSTS
   *
   */
  describe('LOADED_POSTS', () => {
    let initialState = null
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = paginationReducer(undefined, action)
    })
    /**
     * #### form is not valid with empty fields
     *
     * no data, not valid
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: LOADED_POSTS
      }
      let next = paginationReducer(initialState, action)

      expect(next.form.state).toBe(LOADED_POSTS)
      expect(next.form.isValid).toBe(true)
    })

  })// LOADED_POSTS
})// paginationReducer
