import React, {PropTypes, Component} from 'react';

class Layout extends Component {
    constructor(props, context) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        const {popoverMenu, didMount, needRefreshHomePage} = this.state;


        return (
            <div id="web-app-panel">

                <Telescope.components.HeaderContent />

                <Telescope.components.PopoverPosts postsCollection={this.context.messages.postsCollection}/>

                {/*Rendering the popover menus*/}
                <Telescope.components.AppPopup popoverMenu={popoverMenu}/>

                <Telescope.components.PopoverFlashes flashBox={this.context.messages.flashBox}/>

                <div id="container">

                    <Telescope.components.Newsletter />

                    { this.props.children}

                </div>

            </div>
        )

    }
}

Layout.contextTypes = {
    messages: React.PropTypes.object
};

Layout.displayName = "Layout";

module.exports = withRouter(Layout);
export default withRouter(Layout);
