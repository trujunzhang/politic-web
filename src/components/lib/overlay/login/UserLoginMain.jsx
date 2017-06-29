import Telescope from '../../index'
import React, {Component} from 'react'

const {timeout, logInWithFacebook, logInWithTwitter, dismissPopModel} = require('../../../../actions').default


/**
 * States of login display
 */
const {
  LOGIN_FORM_TYPE_LOGIN,
  LOGIN_FORM_TYPE_REGISTER,
  LOGIN_FORM_TYPE_FORGOTPASSWORD,
  LOGIN_FORM_TYPE_RESET_PASSWD,
} = require('../../../../lib/constants').default


class UserLoginMain extends Component {

  async loginViaSocial(type) {
    this.props.actions.loginRequest()

    let loginEvent = (type === 'twitter') ? logInWithTwitter : logInWithFacebook

    var errorMessage = null

    try {
      await Promise.race([
        this.props.dispatch(loginEvent()),
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
        this.props.dispatch(dismissPopModel())
        this.props.actions.loginSuccess()
      }
    }
  }

  renderLoginFooterLinks() {
    return (
      <div className='login_footer_links light' id='__w2_VNnJBb6_social_signup_links'>
        <a onClick={(e) => {
          this.props.toggleEvent(e, LOGIN_FORM_TYPE_LOGIN)
        }}>
          I Have a Politicl Account
        </a>
        <span className='bullet'> · </span>
        <a onClick={(e) => {
          this.props.toggleEvent(e, LOGIN_FORM_TYPE_REGISTER)
        }}>
          Sign Up With Email
        </a>
      </div>
    )
  }

  renderLoginForm() {
    return (
      <div className='buttonGroup_1mB5C'>
        <a rel='login-with-twitter'
           className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf'
           onClick={this.loginViaSocial.bind(this, 'twitter')}>
          <div className='buttonContainer_wTYxi'>Log in with twitter</div>
        </a>
        <a rel='login-with-facebook'
           className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf'
           onClick={this.loginViaSocial.bind(this, 'facebook')}>
          <div className='buttonContainer_wTYxi'>Log in with facebook</div>
        </a>
      </div>
    )
  }

  render() {
    return (
      <div id='login_main_section'>
        <span>
          {this.renderLoginForm()}
          <p className='login-fullscreen--login-info'>
            {'We\'ll never post to Twitter or Facebook without your permission.'}
          </p>
          {this.renderLoginFooterLinks()}
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
let {connect} = require('react-redux')

export default connect()(UserLoginMain)

