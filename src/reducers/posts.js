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


const createParseReducer = require('./createParseReducer').default


export type Post = {
    id: string;
    url: string;
    title: string;
    slug: string;
    body: string;
    sourceFrom: string;
    thumbnailUrl: string;
    userId: string;
    author: string;
};


export type Topic = {
  id: string;
name: string;
slug: string;
status: string;
isIgnore: boolean;
active: boolean;
}


function fromParseTopic(map: Object): Topic {
  var pic = map.get('speakerPic');
  return {
    id: map.id,
    name: map.get('name'),
    slug: map.get('slug'),
    status: map.get('status'),
    isIgnore: map.get('isIgnore'),
    active: map.get('active')
  };
}

function fromParseObject(map: Object): Post {
    // console.log("after post: " + JSON.stringify(map));
    return {
        id: map.id,
        url: map.get('url'),
        title: map.get('title'),
        slug: map.get('slug'),
        body: map.get('body'),
        sourceFrom: map.get('sourceFrom'),
        thumbnailUrl: map.get('thumbnailUrl'),
        userId: map.get('userId'),
        author: map.get('author'),
        topics: (map.get('topics') || []).map(fromParseTopic)
    };
}

export default createParseReducer('LOADED_POSTS', fromParseObject);
