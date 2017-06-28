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


const Parse = require('parse')

const Parameters = require('../parameters')


let ParseUser = Parse.Object.extend('User')
let ParseCache = Parse.Object.extend('Cache')
let ParseHistory = Parse.Object.extend('History')
let ParseTopic = Parse.Object.extend('Topic')
let ParsePost = Parse.Object.extend('Post')
let ParseFolder = Parse.Object.extend('Folder')
let ParseComment = Parse.Object.extend('Comment')
let ParseMessage = Parse.Object.extend('Message')


function getQueryByType(type: string = 'post') {
  return new Parse.Query(ParsePost).include('topics').include('postAuthor')
}

function getPostsParameters(terms) {
  return new Parameters.Posts(getQueryByType())
    .addParameters(terms)
    .end()
}

export default {
  ParseUser,
  ParseCache,
  ParseHistory,
  ParseTopic,
  ParsePost,
  ParseFolder,
  ParseComment,
  ParseMessage,
  getQueryByType,
  getPostsParameters
}
