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

let _ = require('underscore')

import type {Action, ThunkAction} from './types'

const {User, Post, fromParseUser, fromParsePost} = require('../reducers/parseModels')

let {ParsePost, ParseFolder, ParseUser} = require('../parse/objects').default


/**
 * The states were interested in
 */
const {
  POSTS_UPVOTE,
  POSTS_DOWNVOTE,
  POSTS_UPVOTE_CACEL,
  POSTS_DOWNVOTE_CACEL,
  POSTS_VOTING_DONE,
} = require('../lib/constants').default

function operatePostsOnItem(post: ParsePost, userId: string, operation: string) {
  let pointers = []
  switch (operation) {
  case POSTS_UPVOTE:
      post.add('upvoters', ParseUser.createWithoutData(userId))
      break;
    case POSTS_DOWNVOTE:
      post.add('downvoters', ParseUser.createWithoutData(userId))
      break;
    case POSTS_UPVOTE_CACEL:
      post.remove('upvoters', ParseUser.createWithoutData(userId))
      break;
    case POSTS_DOWNVOTE_CACEL:
      post.remove('downvoters', ParseUser.createWithoutData(userId))
      break;
  }

}

function operateUsersOnItem(user: ParseUser, postId: string, operation: string) {
  let pointers = []
  switch (operation) {
    case POSTS_UPVOTE:
      user.add('upvotedPosts', ParsePost.createWithoutData(postId))
      break;
    case POSTS_DOWNVOTE:
      user.add('downvotedPosts', ParsePost.createWithoutData(postId))
      break;
    case POSTS_UPVOTE_CACEL:
      user.remove('upvotedPosts', ParsePost.createWithoutData(postId))
      break;
    case POSTS_DOWNVOTE_CACEL:
      user.remove('downvotedPosts', ParsePost.createWithoutData(postId))
      break;
  }

}

function removeLastVoting(operation: string, isUpvoted: boolean, isDownvoted: boolean) {
  switch (operation) {
    case POSTS_UPVOTE:
      if (isDownvoted) {
        return POSTS_DOWNVOTE_CACEL
      }
      break;
    case POSTS_DOWNVOTE:
      if (isUpvoted) {
        return POSTS_UPVOTE_CACEL
      }
      break;
  }
  return null
}

async function _postsItemVoting(postId: string, userId: string, operation: string, listId: string, isUpvoted: boolean, isDownvoted: boolean): Promise<Array<Action>> {
  let preOperation = removeLastVoting(operation, isUpvoted, isDownvoted)

  const user = await Parse.User.currentAsync()
  operateUsersOnItem(user, postId, operation)
  if (!!preOperation) {
    operateUsersOnItem(user, postId, preOperation)
  }

  const post = await new Parse.Query(ParsePost).get(postId)
  operatePostsOnItem(post, userId, operation)
  if (!!preOperation) {
    operatePostsOnItem(post, userId, preOperation)
  }

  await user.save()
  await post.save()

  const action = {
    type: POSTS_VOTING_DONE,
    payload: {
      listId: listId,
      user: fromParseUser(user),
      post: fromParsePost(post)
    }
  };

  return Promise.all([
    Promise.resolve(action)
  ]);
}

function postsItemVoting(postId: string, userId: string, operation: string, listId: string, isUpvoted: boolean, isDownvoted: boolean): ThunkAction {
  return (dispatch) => {
    const action = _postsItemVoting(postId, userId, operation, listId, isUpvoted, isDownvoted)

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
