import Telescope from '../../index';
import React, {Component} from 'react';

class UserEmailSignIn extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            usernameOrEmail: "",
            password: "",
            // Message
            message: null,
            waiting: false
        };
    }

    signIn() {
    }

    verifyEmailBefore(loginSelector, cb) {

    }

    signInWithEmailCallback(loginSelector, password) {

    }

    forgotPasswordCallback(email) {
    }

    onForgotPasswordClick() {

    }

    renderSignInForm() {
        const {waiting} = this.state;
        return (
            <div id="user-signin-panel" className="overlay--dark">
                <div className="overlay-dialog--email">
                    <div className="overlay-content">
                        <div className="u-paddingTop10">Email or Username</div>
                        <div className="inputGroup u-marginBottom0">
                            <input
                                type="text"
                                name="usernameOrEmail"
                                id="signin_username_or_email_input"
                                className="textInput textInput--large u-marginBottom0 textInput--underlined textInput--signin js-email"
                                placeholder="yourname@emaple.com or username"
                                value={this.state.usernameOrEmail}
                                onChange={(e) => this.setState({usernameOrEmail: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="overlay-content">
                        <div className="u-paddingTop10">Password</div>
                        <div className="inputGroup u-marginBottom0">
                            <input
                                type="password"
                                name="password"
                                id="signin_password_input"
                                className="textInput textInput--large u-marginBottom0 textInput--underlined textInput--signin js-password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({"password": e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="right_1jQ6K buttonGroup_2NmU8 right_2JztM" id="user-submit-button-panel">
                        <div className="login-in-left-buttons">
                            <div className="login-via-email">
                                <button
                                    onClick={this.onForgotPasswordClick.bind(this)}
                                    disabled={waiting}
                                    id="button_for_forgot_password"
                                    className="button button--primary button--large button--chromeless button--link u-accentColor--buttonNormal u-marginTop15">
                                    Forgot password?
                                </button>
                            </div>
                        </div>
                        <div className="buttonWithNotice_3bRZb">
                            <button
                                onClick={this.signIn.bind(this)}
                                disabled={waiting}
                                id="button_for_login"
                                className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf">
                                <div className="buttonContainer_wTYxi">
                                    Login
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderLoginFooterLinks() {
        return (
            <div className="login_footer_links light" id="__w2_VNnJBb6_social_signup_links">
                <a onClick={(e) => {
                    this.props.switchFormState(e, "MAIN")
                }}
                   id="user_main_link">
                    Sign In
                </a>
                <span className="bullet"> · </span>
                <a onClick={(e) => {
                    this.props.switchFormState(e, "REGISTER")
                }}
                   id="user_email_register_link">
                    Sign Up With Email
                </a>
            </div>
        )
    }

    render() {
        return (
            <div >
              <span>
                  {!!this.state.message ? <div className="errorMessage_2lxEG">{this.state.message.message}</div> : null}
                  {this.renderSignInForm()}
                  {this.renderLoginFooterLinks()}
              </span>
            </div>
        )
    }
}


UserEmailSignIn.displayName = "UserEmailSignIn";

module.exports = UserEmailSignIn;
