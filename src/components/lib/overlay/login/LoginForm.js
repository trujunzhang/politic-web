/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
/**
 * ## Import
 *
 * React
 */
import React, { PropTypes, Component } from 'react'

/**
 * States of login display
 */
const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../../../lib/constants').default

/**
 *  The fantastic little form library
 */
// const t = require('../../../vendor/tcomb-form').default
const t = require('tcomb-form')
let Form = t.form.Form

const I18n = require('./Translate').default

class LoginForm extends Component {

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render () {
    let formType = this.props.formType

    let options = {
      fields: {}
    }

    let username = {
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: this.props.form.fields.usernameErrorMsg
    }

    let email = {
      label: I18n.t('LoginForm.email'),
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg
    }

    let secureTextEntry = !this.props.form.fields.showPassword

    let password = {
      label: I18n.t('LoginForm.password'),
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg
    }

    let passwordAgain = {
      label: I18n.t('LoginForm.password_again'),
      secureTextEntry: secureTextEntry,
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg
    }

    let loginForm
    switch (formType) {
      /**
       * ### Registration
       * The registration form has 4 fields
       */
      case (REGISTER):
        loginForm = t.struct({
          username: t.String,
          email: t.String,
          password: t.String,
          passwordAgain: t.String
        })
        username.label = 'Name'
        options.fields['username'] = username
        options.fields['username'].attrs = {
          id: 'login_username',
          placeholder: 'Your name'
        }
        options.fields['email'] = email
        options.fields['email'].attrs = {
          id: 'login_email',
          placeholder: 'yourname@example.com'
        }
        options.fields['password'] = password
        options.fields['password'].attrs = {
          id: 'login_password',
          placeholder: I18n.t('LoginForm.password')
        }
        options.fields['passwordAgain'] = passwordAgain
        options.fields['passwordAgain'].attrs = {
          id: 'login_password_again',
          placeholder: I18n.t('LoginForm.password_again')
        }
        break

      /**
       * ### Login
       * The login form has only 2 fields
       */
      case (LOGIN):
        loginForm = t.struct({
          username: t.String,
          password: t.String
        })
        username.label = 'Email or Username'
        options.fields['username'] = username
        options.fields['username'].className = 'class_username'
        options.fields['username'].attrs = {
          id: 'login_username',
          placeholder: 'yourname@emaple.com or username'
        }
        options.fields['password'] = password
        options.fields['password'].className = 'class_password'
        options.fields['password'].attrs = {
          id: 'login_password',
          placeholder: I18n.t('LoginForm.password')
        }
        break

      /**
       * ### Reset password
       * The password reset form has only 1 field
       */
      case (FORGOT_PASSWORD):
        loginForm = t.struct({
          email: t.String
        })
        options.fields['email'] = email
        options.fields['email'].autoCapitalize = 'none'
        options.fields['email'].placeholder = I18n.t('LoginForm.email')
        break
    } // switch

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref='form'
            type={loginForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />

    )
  }
}

/**
 * ## LoginForm class
 *
 * * form: the properties to set into the UI form
 * * value: the values to set in the input fields
 * * onChange: function to call when user enters text
 */
LoginForm.propTypes = {
  formType: PropTypes.string,
  form: PropTypes.object,
  value: PropTypes.object,
  onChange: PropTypes.func
}

export default LoginForm
