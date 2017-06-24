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

const Parse = require('parse')
const {operatePostsOnItem, operateUsersOnItem} = require('../voting').default
let {ParsePost, ParseFolder, ParseUser} = require('../objects').default

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
    let postId = 'ELxe8ZjTWL'
    let userId = 'RqlbSRQRAU'

    let userJson = {
      className: 'User',
      createdAt: '2013-12-14T04:51:19Z',
      objectId: userId,
      username: 'medium'
    };
    let user = Parse.Object.fromJSON(userJson)

    beforeEach(() => {
      let xxx = user
      // debugger
    });

    it('down vote a post', () => {
      let operation = 'downvote'

      operateUsersOnItem(user, postId, operation)
      debugger
      // var o = ParseObject.fromJSON(json);

      // expect(gameValue).toBe(234)
    })
  })// downvote

})// voting
