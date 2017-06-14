import Telescope from '../../index';
import React, {Component} from 'react';

class UserLoginPopup extends Component {

    constructor(props) {
        super(props);

        const {comp} = this.props;
        const {object} = comp;
        var _formState = "MAIN";
        if (object && Object.keys(object).indexOf("formState") !== -1) {
            _formState = object["formState"];
        }

        this.state = this.initialState = {
            titles: {
                MAIN: "Login to",
                SIGNIN: "Login to",
                REGISTER: "Sign up to"
            },
            formState: _formState,
        };
    }

    switchFormState(event, state) {
        event.preventDefault();
        this.setState({formState: state});
    }

    renderLoginPanel() {
        const {formState} = this.state;
        switch (formState) {
            case "MAIN":
                return (
                    <Telescope.components.UserLoginMain switchFormState={this.switchFormState.bind(this)}/>
                );
            case "SIGNIN":
                return (
                    <Telescope.components.UserEmailSignIn switchFormState={this.switchFormState.bind(this)}/>
                );
            case "REGISTER":
                return (
                    <Telescope.components.UserEmailSignUp switchFormState={this.switchFormState.bind(this)}/>
                );
        }
    }

    render() {
        const {formState, titles} = this.state,
            {comp} = this.props,
            {showCloseIcon, title, subtitle} = comp.object;

        const formTitle = titles[formState],
            extTitle = (!!title) ? title : "Politicl";

        return (
            <Telescope.components.UserLoginLayout
                title={formTitle + " " + extTitle}
                showCloseIcon={showCloseIcon}
                formState={formState}
                child={this.renderLoginPanel()}/>
        )
    }
}


module.exports = UserLoginPopup;
