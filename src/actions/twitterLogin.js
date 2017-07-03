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

let OAuth2 = require('oauth').OAuth2;

let Twitter = require('twitter-node-client').Twitter;
//Get this data from your twitter apps dashboard
let twitterAPI = {
  'consumerKey': 'rkBigq6to0XYLpn81HwfkvweJ',
  'consumerSecret': '30D0x2SOCHaU5bzyRWPfw8DCRleOFVyIRmQjRBfzvk4QV2xz6N',
  'accessToken': '2940065714-kE1sBFQj1KCG7TI7UzBGTwgDsTR7JwOM8alLVH3',
  'accessTokenSecret': 'cnqD4ubhilKScTQwjtW1fflUTl1UbUAjMG2QIfCqbhKGv',
  'callBackUrl': 'http://localhost:3000/auth/twitter/callback'
  // 'callBackUrl': 'http://politicl.com'
}


async function ParseTwitterLogin(scope): Promise {
  return new Promise((resolve, reject) => {


    //TWITTER AUTHENICATION
    let token = null;
    let oauth2 = new OAuth2(
      twitterAPI.consumerKey,
      twitterAPI.consumerSecret,
      'https://api.twitter.com/',
      null,
      'oauth2/token',
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
      }
    );
    oauth2.getOAuthAccessToken('', {
      'grant_type': 'client_credentials'
    }, function (e, access_token) {
      debugger
      token = access_token;
    });

  })
}

async function queryTwitterAPI(path, ...args): Promise {
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

async function _logInWithTwitter(source: ? object): Promise<Array<Action>> {
  const twitterUser = await ParseTwitterLogin('public_profile,email,name,user_friends');
  const profile = await queryTwitterAPI('/me', {fields: 'name,email'});

  let user = twitterUser

  user.set('username', profile.name)
  user.set('slug', slugify(username, '_'))
  user.set('email', profile.email)
  user.set('loginType', 'twitter')
  await user.save();

  // await updateInstallation({user})

  const action = {
    type: LOGGED_IN,
    payload: getUserCallback(user)
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function logInWithTwitter(source: ?object): ThunkAction {
  return (dispatch) => {
    const login = _logInWithTwitter(source)

    // Loading friends schedules shouldn't block the login process
    login.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return login
  }
}


function logOut(): ThunkAction {
  return (dispatch) => {
    Parse.User.logOut()
    // FB.logout()
    //FacebookSDK.logout()

    //updateInstallation({user: null, channels: []})

    // TODO: Make sure reducers clear their state
    return dispatch({
      type: 'LOGGED_OUT',
    })
  }
}

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
const {updateInstallation} = require('./installation')

let {ParseFolder, ParsePost} = require('../parse/objects').default
let {makeNewFolderForUser} = require('../parse/api').default

const {fromParseUser} = require('../reducers/parseModels')

import type {Action, ThunkAction} from './types'

function getUserCallback(user) {
  return fromParseUser(user)
}

export default {logInWithTwitter}
