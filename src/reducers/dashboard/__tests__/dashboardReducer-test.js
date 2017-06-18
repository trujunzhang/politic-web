/**
 * # authReducer-test.js
 *
 * Test the authReducer's only function, like all reducers, where the
 * state and action are passed in.
 *
 * This will confirm that given a specific action with a type and
 * payload, that the state object is modified accordingly.
 *
 * *Note*: in this app,```state``` is an Immutable.js object
 *
 */
'use strict'

/**
 * ## Imports
 *
 * These actions are sufficient to test the reducer as many of the
 * case statements are shared amongst the actions.
 */
const {
  LOGOUT,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,

  ON_AUTH_FORM_FIELD_CHANGE,

  SIGNUP_FAILURE
} = require('../../../lib/constants').default

/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */
const authReducer = require('../dashboardReducer').default
/**
 * ## Tests
 *
 * authReducer
 */
describe('dashboardReducer', () => {

  /**
   * ### Signup failure will have an error associated with it
   *
   */
  describe('SIGNUP_FAILURE', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: SIGNUP_FAILURE,
        payload: {error: 'error'}
      }
      let next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBeDefined()
      expect(next.form.error.error).toBe('error')
    })
  })// SIGNUP_FAILURE

  /**
   * ### The user registers
   *
   */
  describe('REGISTER', () => {
    let initialState = null
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = authReducer(undefined, action)
    })
    /**
     * #### form is not valid with empty fields
     *
     * no data, not valid
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: REGISTER
      }
      let next = authReducer(initialState, action)

      expect(next.form.state).toBe(REGISTER)
      expect(next.form.isValid).toBe(true)
    })
    /**
     * #### form is  valid with valid fields
     *
     * The registration UI requires 4 valid fields before the form is
     * considered valid.
     *
     * Provide valid input and get a valid form
     */
    it('form is  valid with valid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'barton'}
      }
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'bar@ton.com'}
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'Bart0n!'}
      }
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'passwordAgain', value: 'Bart0n!'}
      }

      let userNameState = authReducer(initialState,
        userNameFieldChangeAction)
      let emailState = authReducer(userNameState,
        emailFieldChangeAction)
      let passwordState = authReducer(emailState,
        passwordFieldChangeAction)
      let passwordAgainState = authReducer(passwordState,
        passwordAgainFieldChangeAction)

      const action = {
        type: REGISTER
      }

      let next = authReducer(passwordAgainState, action)
      expect(next.form.state).toBe(REGISTER)
      expect(next.form.fields.usernameHasError).toBe(false)
      expect(next.form.fields.emailHasError).toBe(false)
      expect(next.form.fields.passwordHasError).toBe(false)
      expect(next.form.fields.passwordAgainHasError).toBe(false)
      expect(next.form.isValid).toBe(true)
    })
    /**
     * #### form is  invalid with invalid field
     *
     * Bad data in, invalid form out!
     */
    it('form is  invalid with invalid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'bart'}
      }
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'barton'}
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'Bart!'}
      }
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'passwordAgain', value: 'Ba!'}
      }

      let userNameState = authReducer(initialState,
        userNameFieldChangeAction)
      let emailState = authReducer(userNameState,
        emailFieldChangeAction)
      let passwordState = authReducer(emailState,
        passwordFieldChangeAction)
      let passwordAgainState = authReducer(passwordState,
        passwordAgainFieldChangeAction)

      const action = {
        type: REGISTER
      }

      let next = authReducer(passwordAgainState, action)
      expect(next.form.state).toBe(REGISTER)
      expect(next.form.fields.usernameHasError).toBe(true)
      expect(next.form.fields.emailHasError).toBe(true)
      expect(next.form.fields.passwordHasError).toBe(true)
      expect(next.form.fields.passwordAgainHasError).toBe(true)
      expect(next.form.isValid).toBe(false)
    })
  })// REGISTER
})// authReducer
