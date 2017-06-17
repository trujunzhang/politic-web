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
  NEXT_PAGE
} = require('../../lib/constants').default

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Pagination = Record({
  state: NEXT_PAGE,
  disabled: false,
  error: null,
  isValid: "xxxtrujun",
  listContainer: {}
})

const ListField = Record({
  hasMore: true,
  totalCount: 0,
  firstPagination: true,
  limit: 10,
  increment: 10,
  results: []
})

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  pagination: new Pagination()
})
export default {InitialState, ListField}

