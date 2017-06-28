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


/**
 * The states were interested in
 */
const {
  POSTS_UPVOTE,
  POSTS_DOWNVOTE,
  POSTS_UPVOTE_CACEL,
  POSTS_DOWNVOTE_CACEL,
} = require('../../lib/constants').default

const Parse = require('parse')
const {operatePostsOnItem, operateUsersOnItem} = require('../voting').default
let {ParsePost, ParseFolder, ParseUser} = require('../../parse/objects').default

/**
 * ## Tests
 *
 * voting
 */
describe('voting', () => {
  let postId = 'ELxe8ZjTWL'
  let userId = 'RqlbSRQRAU'

  let user = ParseUser.createWithoutData(userId)
  let post = ParsePost.createWithoutData(postId)


  /**
   * ### Signup failure will have an error associated with it
   *
   */
  describe('test method called "operateUsersOnItem"', () => {
    it('down vote by user', () => {
      operateUsersOnItem(user, postId, POSTS_DOWNVOTE)
      expect(user.get('downvotedPosts').length).toBe(1)
      operateUsersOnItem(user, postId, POSTS_DOWNVOTE_CACEL)
      expect(user.get('downvotedPosts').length).toBe(0)

    })

    it('up vote by user', () => {
      operateUsersOnItem(user, postId, POSTS_UPVOTE)
      expect(user.get('upvotedPosts').length).toBe(1)
      operateUsersOnItem(user, postId, POSTS_UPVOTE_CACEL)
      expect(user.get('upvotedPosts').length).toBe(0)
    })
  })// operateUsersOnItem


  describe('test method called "operatePostsOnItem"', () => {
    it('down vote for a post', () => {
      operatePostsOnItem(post, userId, POSTS_DOWNVOTE)
      expect(post.get('downvoters').length).toBe(1)
      operatePostsOnItem(post, userId, POSTS_DOWNVOTE_CACEL)
      expect(post.get('downvoters').length).toBe(0)
    })

    it('up vote for a post', () => {
      operatePostsOnItem(post, userId, POSTS_UPVOTE)
      expect(post.get('upvoters').length).toBe(1)
      operatePostsOnItem(post, userId, POSTS_UPVOTE_CACEL)
      expect(post.get('upvoters').length).toBe(0)
    })
  })// operatePostsOnItem


})// voting
