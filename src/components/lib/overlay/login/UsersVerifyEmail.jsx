import React, {Component} from 'react';
import {withRouter} from 'react-router'

class UsersVerifyEmail extends Component {

    constructor(props, context) {
        super(props);

        this.state = {
            message: '',
            wait: false
        };
    }

    componentDidMount() {
    }

    render() {
        const {message} = this.state;
        if (!!message) {
            return (
                <div className='password-reset-form'>
                    <div className="errorMessage_2lxEG">{message}</div>
                </div>
            );
        }
        return null;
    }
}


module.exports = withRouter(UsersVerifyEmail);
export default withRouter(UsersVerifyEmail);

