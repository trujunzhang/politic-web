/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import
 */
const {Record, OrderedMap} = require('immutable')



const PaginationRecord = Record({
    id: null,
    done: false,
    label: '',
    results: []
})

class ListContainerTask extends PaginationRecord {
    isDone() {
        return this.get('done');
    }

    getResult() {
        return this.get('results') || [];
    }
}

const ListContainerTaskMap = OrderedMap;

export default {ListContainerTask,ListContainerTaskMap};
