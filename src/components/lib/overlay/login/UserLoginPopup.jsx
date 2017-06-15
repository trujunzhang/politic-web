import Telescope from '../../index'
import React, { Component } from 'react'

class UserLoginPopup extends Component {
  constructor (props) {
    super(props)


    const {comp} = this.props
    const {model} = comp
    var _formState = 'MAIN'
    if (model&& Object.keys(model).indexOf('formState') !== -1) {
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
      case 'MAIN':
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserLoginMain toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
      case 'SIGNIN':
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserEmailSignIn toggleEvent={this.switchFormState.bind(this)}/>
          </div>
        )
      case 'REGISTER':
        return (
          <div className='tcomb_panel'>
            <Telescope.components.UserEmailSignUp toggleEvent={this.switchFormState.bind(this)}/>
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

export default UserLoginPopup
