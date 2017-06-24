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

/**
 * The states were interested in
 */
const {
  LOGGED_IN,
  LOGGED_OUT,
  SET_SHARING,
  LOADED_USER_FOLDERS,
  SELECTED_USER_FOLDER,
  ADDED_NEW_FOLDER_WITH_POST
} = require('../lib/constants').default

const {User, fromParseFolder} = require('./parseModels')

import type {Action} from '../actions/types'
var slugify = require('slugify')

export type State = {
  ready: boolean,
  userProfile: User
}

const initialState = {
  ready: false,
  userProfile: null
}

function userProfileTask(state: State = initialState, action: Action): State {
  switch (action.type) {
    case LOGGED_IN:
    case ADDED_NEW_FOLDER_WITH_POST: {
      let {id, name, loginType, email, defaultFolderId, folders} = action.payload
      return {
        isLoggedIn: true,
        hasSkippedLogin: false,
        id,
        name,
        loginType,
        email,
        defaultFolderId,
        folders,
        slug: slugify(name, '_')
      }
    }
    case  LOADED_USER_FOLDERS: {
      return initialState
    }
    case LOGGED_OUT: {
      return initialState
    }
    case SET_SHARING: {
      return {
        ...state
      }
    }
  }

  return state
}

export default userProfileTask
