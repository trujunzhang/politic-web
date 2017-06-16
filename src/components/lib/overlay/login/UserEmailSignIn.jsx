import Telescope from '../../index'
import React, { Component } from 'react'
/**
 *   LoginRender
 */
import LoginRender from './LoginRender'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../../lib/constants').default

const I18n = require('./Translate').default

const {logInWithPassword, popModel} = require('../../../../actions').default

class UserEmailSignIn extends Component {

  constructor (props) {
    super(props)
    this.state = this.initialState = {
      // Message
      errorMessage: null
    }
  }

  async onButtonPress () {
    const {dispatch} = this.props

    let username = this.props.auth.form.fields.username
    let password = this.props.auth.form.fields.password

    this.setState({errorMessage: null})
    var errorMessage = null

    this.props.actions.loginRequest()

    try {
      await Promise.race([
        dispatch(logInWithPassword(username, password)),
        timeout(15000),
      ])
    } catch (e) {
      this.props.actions.loginFailure(e)
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
        this.props.dispatch(popModel())
        this.props.actions.loginSuccess()
      }
    }
  }

  onForgotPasswordPress () {
  }

  render () {
    return (
      <span>
          {!!this.state.errorMessage ? <div className='errorMessage_2lxEG'>{this.state.errorMessage}</div> : null}
        <LoginRender
          formType={LOGIN}
          loginButtonText={I18n.t('Login.login')}
          onButtonPress={this.onButtonPress.bind(this)}
          onForgotPasswordPress={this.onForgotPasswordPress.bind(this)}
          footerLink={{
            left: {title: 'Sign In', tag: 'MAIN'},
            right: {title: 'Sign Up With Email', tag: 'REGISTER'}
          }}
          auth={this.props.auth}
          toggleEvent={this.props.toggleEvent}
        />
      </span>
    )
  }
}

async function timeout (ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms)
  })
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

export default connect(select)(UserEmailSignIn)
