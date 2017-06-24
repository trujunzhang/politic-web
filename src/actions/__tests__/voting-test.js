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
  describe('test method called "operateUsersOnItem"', () => {
    let postId = 'ELxe8ZjTWL'
    let userId = 'RqlbSRQRAU'

    let userJson = {
      className: 'User',
      createdAt: '2013-12-14T04:51:19Z',
      objectId: userId,
      username: 'medium'
    };
    let user = ParseUser.createWithoutData(userId)

    beforeEach(() => {
    });

    it('down vote a post', () => {
      operateUsersOnItem(user, postId, 'downvote')
      expect(user.get('downvotedPosts').length).toBe(1)
      operateUsersOnItem(user, postId, 'cancelDownvote')
      expect(user.get('downvotedPosts').length).toBe(0)

    })

    it('up vote a post', () => {
      operateUsersOnItem(user, postId, 'upvote')
      expect(user.get('upvotedPosts').length).toBe(1)
      operateUsersOnItem(user, postId, 'cancelUpvote')
      expect(user.get('upvotedPosts').length).toBe(0)
    })
  })// downvote

})// voting
