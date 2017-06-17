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

// import type {Shipment} from '../../reducers/pagination/paginationReducer';

const {Record} = require('immutable')
import type { Post } from '../../reducers/parseModels'

function byListId (listContainerTasks: Any, listId: string): Record {
  // const createdShipments = shipments.filter((item) => item.status === 'created')

  // const createdShipmentsPickerData = []
  // for (var i = 0; i < createdShipments.length; i++) {
  //   createdShipmentsPickerData.push({key: i, label: createdShipments[i].name, tag: createdShipments[i].id})
  // }
  let task = listContainerTasks.tasks[listId]
  debugger

  if (!!task) {
    return task.toJS()
  }

  return {
    id: listId,
    hasMore: true,
    ready: true,
    totalCount: 100,
    limit: 10,
    firstPagination: true,
    pageIndex: 1,
    isDone: true,
    results: []
  }
}

export default  {byListId}
