import React, {Component} from 'react'

const {
  LOGIN_VIA_SOCIAL,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,

  LOGIN_FORM_TYPE_MAIN,
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,

} = require('../../../../lib/constants').default

const I18n = require('./Translate').default

import LoginRender from './LoginRender'

const {timeout, signUpWithPassword, dismissPopModel} = require('../../../../actions').default

class UserEmailSignUp extends Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = {
      formState: 'COMMON',
      // Message
      errorMessage: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  async onButtonPress() {
    const {dispatch} = this.props

    let username = this.props.auth.form.fields.username
    let email = this.props.auth.form.fields.email
    let password = this.props.auth.form.fields.password

    this.setState({errorMessage: null})
    var errorMessage = null

    this.props.actions.signupRequest()

    try {
      await Promise.race([
        dispatch(signUpWithPassword(username, email, password)),
        timeout(15000)
      ])
    } catch (e) {
      this.props.actions.signupFailure(e)
      const message = e.message || e
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        errorMessage = message
        // alert(message);
        // console.warn(e);
      }
    } finally {
      if (!!errorMessage) {
        this.setState({errorMessage: errorMessage})
      } else {
        this.props.dispatch(dismissPopModel())
        this.props.actions.signupSuccess()
      }
    }
  }

  renderResult() {
    return (
      <div>
        <div className='alert alert-info' role='alert'>
          <span className='glyphicon glyphicon-exclamation-sign'/>
          <span className='sr-only'>Error:</span>
          {'You need to verify your email address before using Politicl. '}
          <a className='resend_verification_link'
             onClick={this.onResendVerificationLinkClick.bind(this)}>Resend verification link</a>.
        </div>
      </div>
    )
  }

  render() {
    let content = null
    if (this.state.formState === 'RESULT') {
      content = this.renderResult()
    } else {
      content = (
        <LoginRender
          formType={REGISTER}
          loginButtonText={I18n.t('Register.register')}
          onButtonPress={this.onButtonPress.bind(this)}
          footerLink={{
            left: {title: 'Continue with Facebook and Twitter', tag: LOGIN_FORM_TYPE_MAIN},
            right: {title: 'Login', tag: LOGIN_FORM_TYPE_LOGIN}
          }}
          displayPasswordCheckbox
          auth={this.props.auth}
          toggleEvent={this.props.toggleEvent}
        />
      )
    }

    return (
      <div>
        <span>
          {!!this.state.errorMessage ? <div className='errorMessage_2lxEG'>{this.state.errorMessage}</div> : null}
          { content }
        </span>
      </div>
    )
  }
}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

function select(store) {
  return {
    auth: store.auth
  }
}

export default connect(select)(UserEmailSignUp)
