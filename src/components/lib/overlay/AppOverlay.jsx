import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';

const excludeSelectors = [
    // Article's detail page's flag
    "#submit-flag-form",
    "#post-detail-submit-flag",
    "#post-detail-header-save-button",
    // user's collection
    "#save_to_folders_button",
    "#userCollectionPanel",
    "#addNewCollectionButton",
    "#newCollectionForm",
    ".additionalActionButtons_BoErh",
    // header's right user menu
    "#header_right_metamenu",
    // login ui
    "div.login-fullscreen",
    "#nav_signup_button",
    // UsersPopoverMenu
    "#logged-user-menu",
    "#medium-popover-user-menus",
    // More topics
    "#moreTopicsButton",
    // Messages
    "#messagesButton",
    "a.collections-popover--collection.popover--scrollable-list--element"
];

class AppOverlay extends Component {
    constructor(props, context) {
        super(props);

        this.state = this.initialState = {
            didMount: false
        };
    }

    needCheckClickEvent() {
        return !($("#popover_for_loginui").length > 0 || $("#user_profile_delete_popover_overlay").length > 0)
    }

    componentDidMount() {
        this.setState({didMount: true});

        // const {messages} = this.context;
        const self = this;
        $(document).bind('click touch', function (event) {
            //let back = $(event.target).parents().addBack();

            if ($("#show_popover_menu").length > 0) {
                const needCheckClickEvent = self.needCheckClickEvent();
                if (!!needCheckClickEvent) {
                    let isClicked = true;
                    excludeSelectors.forEach(
                        function addNumber(selector) {
                            if ($(event.target).parents().addBack().is(selector)) {
                                isClicked = false;
                            }
                        }
                    );
                    if (isClicked) {
                        // messages.dismissPopoverMenu();
                    }
                }
            }
        });
    }

    renderMenu(popoverMenu) {
        switch (popoverMenu.type) {
            case "LoggedUserMenu":
                return (<Telescope.components.UsersPopoverMenu comp={popoverMenu}/>);
            case "SaveButton":
                return (<Telescope.components.UserCollectionsPopover comp={popoverMenu}/>);
            case "moreTopicsList":
                return (<Telescope.components.MoreTagsPopoverMenu comp={popoverMenu}/>);
            case "submitFlag":
                return (<Telescope.components.SubmitFlagPopover comp={popoverMenu}/>);
            case "messagesList":
                return (<Telescope.components.MessagesListPopover comp={popoverMenu}/>);
            case "UserDeleteConfirm":
                return (<Telescope.components.UsersPopoverDeleteConfirm comp={popoverMenu}/>);
            case "LoginUI":
                return (<Telescope.components.UserLoginPopup comp={popoverMenu}/>);
            default:
                return null;
        }
    }

    render() {
        const {popoverMenu} = this.props;
        if (popoverMenu) {
            return (
                <div id="show_popover_menu">
                    {this.renderMenu(popoverMenu)}
                </div>
            )
        }

        return null;
    }

}


/**
 * ## Imports
 *
 * Redux
 */
import {connect} from 'react-redux'

function select(store) {
    return {
        popModel: store.popModel
    }
}


/**
 * Connect the properties
 */
module.exports = connect(select)(AppOverlay);
export default connect(select)(AppOverlay);
