/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */

/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from './LoginForm'

/**
 * The necessary React components
 */
import React, { Component } from 'react'

/**
 * The states were interested in
 */
const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../../lib/constants').default

const I18n = require('./Translate').default

class LoginRender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain
      }
    }
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps (nextprops) {
    this.setState({
      value: {
        username: nextprops.auth.form.fields.username,
        email: nextprops.auth.form.fields.email,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain
      }
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange (value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email)
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password)
    }
    if (value.passwordAgain !== '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
    }
    this.setState(
      {value}
    )
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render () {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }

  renderForgotPassword () {
    return (
      <div className="login-in-left-buttons">
        <div className="login-via-email">
          <button
            onClick={this.props.onForgotPasswordPress}
            id="button_for_forgot_password"
            className="button button--primary button--large button--chromeless button--link u-accentColor--buttonNormal u-marginTop15">
            {'Forgot password?'}
          </button>
        </div>
      </div>
    )
  }

  renderContent () {
    const {formType, footerLink} = this.props
    const {left, right} = footerLink

    return (
      <div id="user-signin-panel" className="overlay--dark">

        {/*Row 01: Form*/}
        <LoginForm
          formType={formType}
          form={this.props.auth.form}
          value={this.state.value}
          onChange={this.onChange.bind(this)}/>

        {/*Row 02: Button*/}

        <div className='right_1jQ6K buttonGroup_2NmU8 right_2JztM' id='user-submit-button-panel'>
          {!!this.props.onForgotPasswordPress ? this.renderForgotPassword() : null}

          <div className='buttonWithNotice_3bRZb'>
            <button
              onClick={this.props.onButtonPress}
              disabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
              className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf'
              type='submit'>
              <div className='buttonContainer_wTYxi'>{this.props.loginButtonText}</div>
            </button>
          </div>
        </div>

        {/*Row 03: Other Links*/}

        <div className='login_footer_links light' id='__w2_VNnJBb6_social_signup_links'>
          {
            !!left ? (
              <a onClick={(e) => { this.props.toggleEvent(e, left.tag)}}>
                {left.title}
              </a>
            ) : null
          }

          <span className='bullet'> · </span>
          {
            !!right ? (
              <a onClick={(e) => {this.props.toggleEvent(e, right.tag)}}>
                {right.title}
              </a>
            ) : null
          }

        </div>

      </div>
    )
  }
}

/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../../../../reducers/auth/authActions'

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginRender)
