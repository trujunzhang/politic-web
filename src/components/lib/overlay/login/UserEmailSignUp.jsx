import Telescope from '../../index';
import {FormattedMessage, intlShape} from 'react-intl';
import React, {Component} from 'react';

class UserEmailSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            username: "",
            email: "",
            password: "",
            formState: "COMMON",
            // Message
            message: null,
            waiting: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    signUp() {

    }

    checkValidEmailCallBack(email, cb) {
        // Check whether need to resend a verify email, If the user already sign up with sending verify email.
        this.context.actions.call('check.email.need.verify.users', email, (error, result) => {
            if (!!error) {
                // this.context.messages.showMessage(this, T9n.get(`error.accounts.${error.reason}`) || T9n.get("Unknown error"), 'error');
                this.setState({waiting: false});
            } else {
                if (!!result) {
                    this.setState({waiting: false, userId: result._id, formState: "RESULT"});
                } else {
                    cb();
                }
            }
        });
    }

    SignUpWithOptions(_options) {

    }

    onResendVerificationLinkClick(event) {
        event.preventDefault();
    }

    renderSignupForm() {
        const {waiting} = this.state;
        return (
            <div id="user-signin-panel" className="overlay--dark">
                <div className="overlay-dialog--email">
                    <div className="overlay-content">
                        <div className="u-paddingTop10">Name</div>
                        <div className="inputGroup u-marginBottom0">
                            <input
                                type="text"
                                name="text"
                                className="textInput textInput--large u-marginBottom0 textInput--underlined textInput--signin js-email"
                                placeholder="Your name"
                                value={this.state.username}
                                onChange={(e) => this.setState({username: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="overlay-content">
                        <div className="u-paddingTop10">Email</div>
                        <div className="inputGroup u-marginBottom0">
                            <input
                                type="email"
                                name="email"
                                className="textInput textInput--large u-marginBottom0 textInput--underlined textInput--signin js-email"
                                placeholder="yourname@example.com"
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="overlay-content">
                        <div className="u-paddingTop10">Password</div>
                        <div className="inputGroup u-marginBottom0">
                            <input
                                type="password"
                                name="password"
                                className="textInput textInput--large u-marginBottom0 textInput--underlined textInput--signin js-password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="right_1jQ6K buttonGroup_2NmU8 right_2JztM" id="user-submit-button-panel">
                        <div className="buttonWithNotice_3bRZb">
                            <button
                                onClick={this.signUp.bind(this)}
                                disabled={waiting}
                                className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf"
                                type="submit">
                                <div className="buttonContainer_wTYxi">Sign up</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderLoginFooterLinks() {
        return (
            <span className="login_footer_links light" id="__w2_VNnJBb6_social_signup_links">
              <a id="user_main_link"
                 onClick={(e) => {
                     this.props.switchFormState(e, "MAIN")
                 }}
              >
                  Continue with Facebook and Twitter
              </a>
              <span className="bullet"> · </span>
              <a id="user_login_link"
                 onClick={(e) => {
                     this.props.switchFormState(e, "SIGNIN")
                 }}
              >
                  Login
              </a>
          </span>
        )
    }

    renderResult() {
        return (
            <div>
                <div className="alert alert-info" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign">
                  </span>
                    <span className="sr-only">Error:</span>
                    {"You need to verify your email address before using Politicl. "}
                    <a className="resend_verification_link"
                       onClick={this.onResendVerificationLinkClick.bind(this)}>Resend verification link</a>.
                </div>
            </div>
        )
    }

    render() {
        const {formState} = this.state;
        return (
            <div>
              <span>
                  {!!this.state.message ? <div className="errorMessage_2lxEG">{this.state.message.message}</div> : null}
                  {formState === "RESULT" ? this.renderResult() : this.renderSignupForm()}
              </span>
                {this.renderLoginFooterLinks()}
            </div>
        )
    }
}


UserEmailSignUp.displayName = "UserEmailSignUp";

module.exports = UserEmailSignUp;
export default UserEmailSignUp;