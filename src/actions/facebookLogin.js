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
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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

// ========================
// For Web Apps
// ========================
const Parse = require('parse')

async function queryFacebookAPI(path, ...args): Promise {
  return new Promise((resolve, reject) => {
    FB.api('/me?fields=id,name,email,permissions', function (response) {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response && response.error);
      }
    })
  })
}


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

let slugify = require('slugify')
// const FacebookSDK = require('FacebookSDK')
const {updateInstallation} = require('./installation')

let {makeNewFolderForUser} = require('../parse/api').default

const {fromParseUser} = require('../reducers/parseModels')

import type {Action, ThunkAction} from './types'

async function ParseFacebookLogin(scope): Promise {
  return new Promise((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: resolve,
      error: (user, error) => reject(error && error.error || error),
    })
  })
}

async function _logInWithFacebook(source: ? object): Promise<Array<Action>> {
  const facebookUser = await ParseFacebookLogin('public_profile,email,name,user_friends');
  const profile = await queryFacebookAPI('/me', {fields: 'name,email'});

  let user = facebookUser

  user.set('username', profile.name)
  user.set('slug', slugify(profile.name, '_'))
  user.set('email', profile.email)
  user.set('loginType', 'facebook')

  if ((user.get('folders') || []).length === 0) {
    const defaultFolder = await  makeNewFolderForUser(user)
    user.set('folders', [defaultFolder])
  }
  await user.save();

  // await updateInstallation({user})

  const action = {
    type: LOGGED_IN,
    payload: fromParseUser(user)
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function logInWithFacebook(source: ?object): ThunkAction {
  return (dispatch) => {
    const login = _logInWithFacebook(source)

    // Loading friends schedules shouldn't block the login process
    login.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return login
  }
}


export default {logInWithFacebook}
