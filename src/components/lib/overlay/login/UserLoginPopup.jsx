import Telescope from '../../index'
import React, { Component } from 'react'


/**
 * States of login display
 */
const {
  LOGIN_FORM_TYPE_MAIN,
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../../lib/constants').default



class UserLoginPopup extends Component {
  constructor (props) {
    super(props)

    const {comp} = this.props
    const {model} = comp
    let _formState = LOGIN_FORM_TYPE_MAIN
    if (model && Object.keys(model).indexOf('formState') !== -1) {
      _formState = model['formState']
    }

    this.state = this.initialState = {
      titles: {
        MAIN: 'Login to',
        SIGNIN: 'Login to',
        REGISTER: 'Sign up to'
      },
      formState: _formState,
    }
  }

  switchFormState (event, state) {
    event.preventDefault()
    this.setState({formState: state})
  }

  renderLoginPanel () {
    switch (this.state.formState) {
      case LOGIN_FORM_TYPE_MAIN:
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserLoginMain
              actions={this.props.actions}
              auth={this.props.auth}
              toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
      case LOGIN_FORM_TYPE_LOGIN:
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserEmailSignIn
              actions={this.props.actions}
              auth={this.props.auth}
              toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
      case LOGIN_FORM_TYPE_REGISTER:
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserEmailSignUp
              actions={this.props.actions}
              auth={this.props.auth}
              toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
    }
  }

  render () {
    const {formState, titles} = this.state,
      {comp} = this.props,
      {showCloseIcon, title, subtitle} = comp.model

    const formTitle = titles[formState],
      extTitle = (title) || 'Politicl'

    return (
      <Telescope.components.UserLoginLayout
        title={formTitle + ' ' + extTitle}
        showCloseIcon={showCloseIcon}
        formState={formState}
        child={this.renderLoginPanel()}/>
    )
  }
}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

import * as authActions from '../../../../reducers/auth/authActions'
import { bindActionCreators } from 'redux'

function select (store) {
  return {
    auth: store.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(UserLoginPopup)
