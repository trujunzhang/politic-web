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

let {ParseFolder, ParsePost} = require('../parse/objects').default
let {makeNewFolderForUser} = require('../parse/api').default

const {fromParseUser} = require('../reducers/parseModels')

import type {Action, ThunkAction} from './types'

async function _logInWithPassword(username: string, password: string): Promise<Array<Action>> {
  const user = new Parse.User()
  user.set('username', username)
  user.set('password', password)

  await user.logIn()

  const action = {
    type: LOGGED_IN,
    payload: fromParseUser(user)
  };

  return Promise.all([
    Promise.resolve(action)
  ]);
}

function logInWithPassword(username: string, password: string): ThunkAction {
  return (dispatch) => {
    const login = _logInWithPassword(username, password);

    // Loading friends schedules shouldn't block the login process
    login.then(
      ([result]) => {
        dispatch(result);
      }
    );
    return login;
  };
}


async function _signUpWithPassword(username: string, email: string, password: string): Promise<Array<Action>> {
  const user = new Parse.User()
  user.set('username', username)
  user.set('slug', slugify(username, '_'))
  user.set('password', password)
  user.set('email', email)

  // await updateInstallation({user})
  await user.signUp({'loginType': 'email'})

  if ((user.get('folders') || []).length === 0) {
    const defaultFolder = await  makeNewFolderForUser(user)
    user.set('folders', [defaultFolder])
  }

  await user.save();

  const action = {
    type: LOGGED_IN,
    payload: fromParseUser(user)
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function signUpWithPassword(username: string, email: string, password: string): ThunkAction {
  return (dispatch) => {
    const login = _signUpWithPassword(username, email, password)

    // Loading friends schedules shouldn't block the login process
    login.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return login
  }
}


/**
 *
 * @param folder: Object
 * {
 * "name": folder._name
 * "folderId": folder._id|| false
 * "postExist": folder.post._exist|| false
 * }
 * @param postId
 * @param userId
 * @returns {Promise.<*>}
 * @private
 */
async function _newUserFolderWithPost(folder: object, postId: string, userId: string): Promise<Array<Action>> {
  const user = await Parse.User.currentAsync();
  const {folderName, folderId, postExist} = folder

  let newFolder = null
  if (folderId !== '') {// Exist
    if (postExist === false) {
      newFolder = await new Parse.Query(ParseFolder).get(folderId)
      let _posts = newFolder.get('posts')
      _posts.push(ParsePost.createWithoutData(postId))
      newFolder.set('posts', _posts)
      await newFolder.save()
      await user.save()
    }
  } else { // New
    newFolder = await  makeNewFolderForUser(user, folderName, postId)
    let _folders = user.get('folders')
    _folders.push(newFolder)
    user.set('folders', _folders)
    await user.save()
  }

  const action = {
    type: ADDED_NEW_FOLDER_WITH_POST,
    payload: fromParseUser(user)
  }

  return Promise.all([
    Promise.resolve(action)
  ])
}

function newUserFolderWithPost(folderName: string, postId: string, userId: string): ThunkAction {
  return (dispatch) => {
    const action = _newUserFolderWithPost(folderName, postId, userId)

    // Loading friends schedules shouldn't block the login process
    action.then(
      ([result]) => {
        dispatch(result)
      }
    )
    return action
  }
}


function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  }
}


async function _updateFolder(username: string, password: string): Promise<Array<Action>> {
  const user = new Parse.User()
  user.set('username', username)
  user.set('password', password)

  await user.logIn()

  const action = {
    type: LOGGED_IN,
    payload: fromParseUser(user)
  };

  return Promise.all([
    Promise.resolve(action)
  ]);
}

function updateFolder(username: string, password: string): ThunkAction {
  return (dispatch) => {
    const login = _logInWithPassword(username, password);

    // Loading friends schedules shouldn't block the login process
    login.then(
      ([result]) => {
        dispatch(result);
      }
    );
    return login;
  };
}


async function _sendEmail(username: string, password: string): Promise<Array<Action>> {
  // debugger

  await Parse.Cloud.run("email",
    {param1: "quantity1", param2: "quantity2"}
  ).then(function (result) {
    // make sure the set the enail sent flag on the object
    debugger
    console.log("result :" + JSON.stringify(result))
  }, function (error) {
    // error
    debugger
  })

  debugger
  const action = {
    type: 'xxx',
    payload: {}
  };

  return Promise.all([
    Promise.resolve(action)
  ]);
}

function sendEmail(username: string, password: string): ThunkAction {
  return (dispatch) => {
    const action = _sendEmail(username, password);

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
  signUpWithPassword,
  logInWithPassword,
  skipLogin, logOut,
  newUserFolderWithPost,
  sendEmail,
  updateFolder
}
