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

'use strict';

import type {Action} from '../actions/types';


/**
 * The states were interested in
 */
const {
  PUSH_OVERLAY_MODEL,
  POP_OVERLAY_MODEL,
  GET_OVERLAY_MODELS
} = require('../lib/constants').default


export type State = {
    showOverlay: boolean;
    currentModel: ? object;
};

const initialState = {
    showOverlay: false,
    currentModel: null
};

function popModel(state: State = initialState, action: Action): State {
    if (action.type === PUSH_OVERLAY_MODEL) {
        let { modelType,position, model} = action.data;
        if(modelType === 'LoginUI'){
            return {
                showOverlay: true,
                currentModel: action.data
            }
        }
        return {
            showOverlay: true,
            currentModel: action.data
        };
    }
    if (action.type === POP_OVERLAY_MODEL) {
        return {
            isLoggedIn: false,
            hasSkippedLogin: true,
            sharedSchedule: null,
            id: null,
            name: null,
            roleType: null
        };
    }
    if (action.type === GET_OVERLAY_MODELS) {
        return initialState;
    }
    return state;
}

export default popModel;
