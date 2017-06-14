import {intlShape} from 'react-intl';
import React, {Component} from 'react';
import Users from '../../../../lib/users';
import {withRouter} from 'react-router';

class UsersRemovedAccount extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            message: '',
            wait: false
        };
    }

    componentDidMount() {

    }

    checkAndRemoveUser(currentUser) {

    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    render() {
        const {message} = this.state,
            {currentUser} = this.context;

        if (!currentUser) {
            return (<Telescope.components.UserLoginPopup
                comp={{object: {showCloseIcon: false, title: 'Account Deletion', subtitle: ''}}}/>);
        }
        else if (!!message) {
            return (
                <div className='password-reset-form'>
                    <div className="errorMessage_2lxEG">{message}</div>
                </div>
            )
        }
        return null;
    }
}

module.exports = withRouter(UsersRemovedAccount);
export default withRouter(UsersRemovedAccount);


