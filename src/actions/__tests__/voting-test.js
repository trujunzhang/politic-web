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
    let gameValue = 123

    beforeEach(() => {
      gameValue = 234
    });

    it('down vote a post', () => {
      // var json = {
      //   className: 'Item',
      //   createdAt: '2013-12-14T04:51:19Z',
      //   objectId: 'I1',
      //   size: 'medium'
      // };
      // var o = ParseObject.fromJSON(json);

      expect(gameValue).toBe(234)
    })
  })// downvote

})// voting
