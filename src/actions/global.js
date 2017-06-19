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

import type { Action, ThunkAction } from './types'

/**
 * The states were interested in
 */
const {
  OVERLAY_MODEL_PUSH,
  OVERLAY_MODEL_DISMISS,
  OVERLAY_POSTS_DISMISS,
  LIST_VIEW_RESET_ALL_POSTS
} = require('../lib/constants').default

function pushModel (modelType: string, position: object = null, model: object = null): Action {
  const data = {
    modelType: modelType,
    position: position,
    model: model
  }

  // TODO: Make sure reducers clear their state
  return {type: OVERLAY_MODEL_PUSH, data: data}
}

function dismissPopModel (): Action {
  return {type: OVERLAY_MODEL_DISMISS}
}

function resetOverlayPosts (): Action {
  return {type: OVERLAY_POSTS_DISMISS}
}

function resetPostsDaily (): Action {
  return {type: LIST_VIEW_RESET_ALL_POSTS}
}

export default {pushModel, dismissPopModel, resetOverlayPosts}
