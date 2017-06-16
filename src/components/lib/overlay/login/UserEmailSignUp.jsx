import React, { Component } from 'react'

const {
  LOGIN_VIA_SOCIAL,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../../lib/constants').default

const I18n = require('./Translate').default

import LoginRender from './LoginRender'

const {signUpWithPassword} = require('../actions').default

class UserEmailSignUp extends Component {

  constructor (props) {
    super(props)
    this.state = this.initialState = {
      formState: 'COMMON',
      // Message
      message: null
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {

  }


  onButtonPress () {
    const {dispatch} = this.props;

    let username = this.props.auth.form.fields.username;
    let email = this.props.auth.form.fields.email;
    let password = this.props.auth.form.fields.password;

    // this.props.actions.signupRequest();

    try {
      await Promise.race([
        dispatch(signUpWithPassword(signUpWithPassword(username, email, password)),
        timeout(15000)
      ]);
    } catch (e) {
      this.props.actions.signupFailure(e);
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        // alert(message);
        // console.warn(e);
      }
    } finally {
      // this.props.actions.signupSuccess();
      this._isMounted && this.setState({isLoading: false});
    }
  }

  renderResult () {
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


  render () {
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
            left: {title: 'Continue with Facebook and Twitter', tag: 'MAIN'},
            right: {title: 'Login', tag: 'SIGNIN'}
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
          {!!this.state.message ? <div className='errorMessage_2lxEG'>{this.state.message.message}</div> : null}
          { content }
        </span>
      </div>
    )
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

function select (store) {
  return {
    auth: store.auth
  }
}

export default connect(select)(UserEmailSignUp)
