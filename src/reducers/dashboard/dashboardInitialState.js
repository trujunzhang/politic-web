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
const {Record} = require('immutable')
const {
  REGISTER
} = require('../../lib/constants').default

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Table = Record({
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  results: [],
  pageIndex: 1,
  limit: 10,
  data: new (Record({
    editAll: false,
    editAllIds: [],
    editSingle: false,
    editSingleId: '',
    checkAll: false,
    checkIds: {},
    countKeys: {}
  }))()
})

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  table: new Table()
})
export default InitialState

