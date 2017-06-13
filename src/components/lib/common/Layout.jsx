import React, {PropTypes, Component} from 'react';

class Layout extends Component {
    constructor(props, context) {
        super(props);
    }

    componentDidMount() {
    }


    renderContent() {
        return (
            <div id="container">

                <Telescope.components.Newsletter />

                { this.props.children}

            </div>
        )
    }


    render() {
        return (
            <div id="web-app-panel">

                <Telescope.components.HeaderContent />

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
