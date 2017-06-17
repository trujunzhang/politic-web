
/**
 * # paginationReducer-test.js
 *
 * Test the paginationReducer's only function, like all reducers, where the
 * state and action are passed in.
 *
 * This will confirm that given a specific action with a type and
 * payload, that the state object is modified accordingly.
 *
 * *Note*: in this app,```state``` is an Immutable.js object
 *
 */
'use strict'

import Immutable from 'immutable';

/**
 * ## Imports
 *
 * These actions are sufficient to test the reducer as many of the
 * case statements are shared amongst the actions.
 */

/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */
const {ListContainerTask,ListContainerTaskMap} = require('../paginationInitialState').default

/**
 * ## Tests
 *
 * paginationReducer
 */
describe('ListContainerTaskMap', () => {

  /**
   * ### The use LOADED_POSTS
   *
   */
  describe('Posts Task', () => {
      const initialState = new ListContainerTaskMap();
      const mergeEntities = (state, newTasks) =>
            state.merge(newTasks.map((task) => new ListContainerTask(task)))

    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
    })
    /**
     * #### form is not valid with empty fields
     *
     * no data, not valid
     */
      it('Add_Task_For_Posts_With_ListId', () => {
          let state = initialState;
          let newTask = new  ListContainerTask()
          newTask.set('label','wanghao')
          let next = mergeEntities(state, Immutable.fromJS(newTask));

      //expect(next).toBe(LOADED_POSTS)
      // expect(next.form.listContainer).toBe({})
    })

  })// LOADED_POSTS
})// paginationReducer
 
