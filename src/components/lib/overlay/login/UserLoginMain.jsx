import Telescope from '../../index'
import React, { Component } from 'react'

class UserLoginMain extends Component {

  oauthSignIn (serviceName) {

  }

  loginTwitter () {

  }

  loginFacebook () {

  }

  renderLoginFooterLinks () {
    return (
      <div className='login_footer_links light' id='__w2_VNnJBb6_social_signup_links'>
        <a onClick={(e) => { this.props.toggleEvent(e, 'SIGNIN')}}>
          I Have a Politicl Account
        </a>
        <span className='bullet'> · </span>
        <a onClick={(e) => {this.props.toggleEvent(e, 'REGISTER')}}>
          Sign Up With Email
        </a>
      </div>
    )
  }

  renderLoginForm () {
    return (
      <div className='buttonGroup_1mB5C'>
        <a rel='login-with-twitter'
           className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf'
           onClick={this.loginTwitter.bind(this)}>
          <div className='buttonContainer_wTYxi'>Log in with twitter</div>
        </a>
        <a rel='login-with-facebook'
           className='button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf'
           onClick={this.loginFacebook.bind(this)}>
          <div className='buttonContainer_wTYxi'>Log in with facebook</div>
        </a>
      </div>
    )
  }

  render () {
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

export default UserLoginMain
