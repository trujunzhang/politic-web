import Telescope from '../../index';
import {FormattedMessage, intlShape} from 'react-intl';
import React, {Component} from 'react';

class UserLoginMain extends Component {

    oauthSignIn(serviceName) {

    }

    loginTwitter() {

    }

    loginFacebook() {

    }

    renderLoginFooterLinks() {
        return (
            <div className="login_footer_links light" id="__w2_VNnJBb6_social_signup_links">
                <a id="user_login_link"
                   onClick={(e) => {
                       this.props.switchFormState(e, "SIGNIN")
                   }}>
                    I Have a Politicl Account
                </a>
                <span className="bullet"> · </span>
                <a id="user_email_register_link"
                   onClick={(e) => {
                       this.props.switchFormState(e, "REGISTER")
                   }}>
                    Sign Up With Email
                </a>
            </div>
        )
    }

    renderLoginForm() {
        return (
            <div className="buttonGroup_1mB5C">
                <a className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf"
                   rel="login-with-twitter"
                   onClick={this.loginTwitter.bind(this)}>
                    <div className="buttonContainer_wTYxi">Log in with twitter</div>
                </a>
                <a className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf"
                   rel="login-with-facebook"
                   onClick={this.loginFacebook.bind(this)}>
                    <div className="buttonContainer_wTYxi">Log in with facebook</div>
                </a>
            </div>
        )
    }

    render() {
        return (
            <div id="login_main_section">
              <span>
                  {this.renderLoginForm()}
                  <p className="login-fullscreen--login-info">We'll never post to Twitter or Facebook without your permission.</p>
                  {this.renderLoginFooterLinks()}
            </span>
            </div>
        )
    }
}


UserLoginMain.displayName = "UserLoginMain";

module.exports = UserLoginMain;
