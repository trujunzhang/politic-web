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

const {User, fromParseUser} = require('../reducers/parseModels')

let {ParsePost, ParseFolder, ParseUser} = require('./objects').default

function operateOnItem(user: ParseUser, userInstance: User, postId: string, operation: string) {
  switch (operation) {
    case "upvote":

      break;
    case "downvote":
      let _downvotedPosts = user.get('downvotedPosts') || []
      _downvotedPosts.push(ParsePost.createWithoutData(postId))
      user.set('downvotedPosts', _downvotedPosts)
      break;
    case "cancelUpvote":

      break;
    case "cancelDownvote":

      break;
  }

}

async function _postsItemVoting(postId: string, userId: string, operation: string, isUpvoted: boolean, isDownvoted: boolean): Promise<Array<Action>> {
  const user = await Parse.User.currentAsync();
  const userInstance = fromParseUser(user)

  operateOnItem(user, userInstance, postId, operation)

  await user.save()

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

}
