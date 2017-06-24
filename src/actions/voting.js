/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict'

const Parse = require('parse')

var _ = require('underscore')

import type {Action, ThunkAction} from './types'

const {User, Post, fromParseUser, fromParsePost} = require('../reducers/parseModels')

let {ParsePost, ParseFolder, ParseUser} = require('./objects').default


/**
 * The states were interested in
 */
const {
  POSTS_UPVOTE,
  POSTS_DOWNVOTE,
  POSTS_UPVOTE_CACEL,
  POSTS_DOWNVOTE_CACEL,
} = require('../lib/constants').default

function operatePostsOnItem(post: ParsePost, userId: string, operation: string) {
  let pointers = []
  switch (operation) {
    case POSTS_UPVOTE:
      pointers = (post.get('upvoters') || [])
      pointers.push(ParseUser.createWithoutData(userId))
      post.set('upvoters', pointers)
      break;
    case POSTS_DOWNVOTE:
      pointers = (post.get('downvoters') || [])
      pointers.push(ParseUser.createWithoutData(userId))
      post.set('downvoters', pointers)
      break;
    case POSTS_UPVOTE_CACEL:
      pointers = _.filter((post.get('upvoters') || []), function (item) {
        return item.id !== userId
      })
      post.set('upvoters', pointers)
      break;
    case POSTS_DOWNVOTE_CACEL:
      debugger
      pointers = _.filter((post.get('downvoters') || []), function (item) {
        return item.id !== userId
      })
      post.set('downvoters', pointers)
      break;
  }

}

function operateUsersOnItem(user: ParseUser, postId: string, operation: string) {
  let pointers = []
  switch (operation) {
    case POSTS_UPVOTE:
      pointers = (user.get('upvotedPosts') || [])
      pointers.push(ParsePost.createWithoutData(postId))
      user.set('upvotedPosts', pointers)
      break;
    case POSTS_DOWNVOTE:
      pointers = (user.get('downvotedPosts') || [])
      pointers.push(ParsePost.createWithoutData(postId))
      user.set('downvotedPosts', pointers)
      break;
    case POSTS_UPVOTE_CACEL:
      pointers = _.filter((user.get('upvotedPosts') || []), function (item) {
        return item.id !== postId
      })
      user.set('upvotedPosts', pointers)
      break;
    case POSTS_DOWNVOTE_CACEL:
      pointers = _.filter((user.get('downvotedPosts') || []), function (item) {
        return item.id !== postId
      })
      user.set('downvotedPosts', pointers)
      break;
  }

}

async function _postsItemVoting(postId: string, userId: string, operation: string, isUpvoted: boolean, isDownvoted: boolean): Promise<Array<Action>> {

  const user = await Parse.User.currentAsync()

  operateUsersOnItem(user, postId, operation)

  const post = await new Parse.Query(ParsePost).get(postId)
  operatePostsOnItem(post, userId, operation)

  await user.save()
  await post.save()

  const action = {
    type: 'LOGGED_INxxx',
    payload: []
  };

  return Promise.all([
    Promise.resolve(action)
  ]);
}

function postsItemVoting(postId: string, userId: string, operation: string, isUpvoted: boolean, isDownvoted: boolean): ThunkAction {
  return (dispatch) => {
    const action = _postsItemVoting(postId, userId, operation, isUpvoted, isDownvoted)
    // Loading friends schedules shouldn't block the login process
    action.then(
      ([result]) => {
        dispatch(result);
      }
    );
    return action;
  };
}

export default {
  postsItemVoting,

  // The following is just for testing
  operateUsersOnItem,
  operatePostsOnItem

}
