import React, {Component} from 'react';
import Flags from '../../../lib/topics';
import Users from '../../../lib/users';
import {withRouter} from 'react-router';

import TextareaAutosize from 'react-textarea-autosize';

class SubmitFlagPopover extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            value: "",
            showError: false,
            isEventCalling: false
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.showError === true) {
            this.setState({showError: false});
        }
    }

    onSubmitFlagClick(event) {
        event.preventDefault();

    }

    render() {
        const {comp} = this.props,
            {isEventCalling} = this.state,
            top = comp.top + comp.height + 4,
            left = (comp.left + comp.width / 2) + 70,
            object = comp.object;

        const popover = Users.getCollectionsPopover(left, top, 300, 226, 0, "v-bottom-center");

        return (
            <div className={popover.className} style={popover.style}>
                <form className="popover_1ijp3" id="submit-flag-form">
                    <p className="featured_2W7jd default_tBeAo base_3CbW2">
                        Flag
                        <span className="productTitle_3NeF0">{object.title}</span>
                    </p>
                    {this.state.showError ?
                        <div className="errorMessage_2lxEG">Form can't be blank.</div> : null}
                    <TextareaAutosize
                        useCacheForDOMMeasurements
                        minRows={3}
                        maxRows={10}
                        value={this.state.value}
                        onChange={(e) => {
                            this.setState({value: e.target.value});
                        }}
                        placeholder="Why should this be removed?"/>
                    <button
                        disabled={isEventCalling}
                        className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf"
                        onClick={this.onSubmitFlagClick.bind(this)}>
                        <div className="buttonContainer_wTYxi">Submit</div>
                    </button>
                </form>
            </div>
        )
    }

}

SubmitFlagPopover.propTypes = {
    user: React.PropTypes.object
};

module.exports = withRouter(SubmitFlagPopover);
export default withRouter(SubmitFlagPopover);
