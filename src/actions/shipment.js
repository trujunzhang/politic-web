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


const Parse = require('parse');
const ShippingTask = Parse.Object.extend('ShippingTask');

async function _clientRequestAShipment(): Promise<Array<Action>> {

    const object = new ShippingTask();
    object.set('status', "request");
    object.set('shipType', "clientRequest");
    object.set('shipName', "wanghao shipment ");

    var savedShippingTask = null;
    let task = object.save();
    await task.then((result) => {
        savedShippingTask = result;
        console.log("new Shipping Task, result: " + JSON.stringify(result));
    });

    console.log("asyn after savedShippingTask: " + JSON.stringify(savedShippingTask));

    const action = {
        type: 'New_Client_Invite_success'
    };

    return Promise.all([
        Promise.resolve(action)
    ]);
}

function clientRequestAShipment(): ThunkAction {

    return (dispatch) => {
        const task = _clientRequestAShipment();

        // Loading friends schedules shouldn't block the login process
        task.then(
            ([result]) => {
                dispatch(result);
            }
        );
        return task;
    };
}


export default {clientRequestAShipment};
