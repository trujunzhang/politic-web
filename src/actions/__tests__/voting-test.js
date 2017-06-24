/**
 * # voting-test.js
 *
 * Test the voting's only function, like all reducers, where the
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

/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */

const voingtActions = require('../voting').default

/**
 * ## Tests
 *
 * voting
 */
describe('voting', () => {

  /**
   * ### Signup failure will have an error associated with it
   *
   */
  describe('downvote', () => {
    it('down vote a post', () => {


      expect(2 + 2).toBe(14)
    })
  })// downvote

})// voting
