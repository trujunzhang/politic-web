import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'
import Users from '../../../../lib/users'
import {withRouter} from 'react-router';

let numeral = require('numeral');

class AppAdminTopicsAction extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState = {
      // batch action
      actionType: "action",
    };

    this.onActionTypeChange = this.onActionTypeChange.bind(this);
    this.onActionApplyClick = this.onActionApplyClick.bind(this);
  }

  onActionTypeChange(event) {
    let value = event.target.value;
    this.setState({actionType: value});
  }

  onActionApplyClick() {
    let self = this;
    this.props.actionEvent(this.state.actionType, function (error, result) {
      self.setState({actionType: "action"});
    });
  }

  renderRowActionForFilter() {
    return (
      <div className="alignleft actions bulkactions">
        <label className="screen-reader-text">Select bulk action</label>
        <select name="action" id="bulk-action-selector-top" value={this.state.actionType}
                onChange={this.onActionTypeChange}>
          <option value="action">Bulk Actions</option>
          <option value="filter_restore">Restore</option>
          <option value="trash">Move to Trash</option>
        </select>
        <input type="submit" id="doaction" className="button action" value="Apply" onClick={this.onActionApplyClick}/>
      </div>
    )
  }

  renderRowActionForTrash() {
    return (
      <div className="alignleft actions bulkactions">
        <label className="screen-reader-text">Select bulk action</label>
        <select name="action" id="bulk-action-selector-top" value={this.state.actionType}
                onChange={this.onActionTypeChange}>
          <option value="action">Bulk Actions</option>
          <option value="restore">Restore</option>
          <option value="delete_permanently">Delete Permanently</option>
        </select>
        <input type="submit" id="doaction" className="button action" value="Apply" onClick={this.onActionApplyClick}/>
      </div>
    )
  }

  renderRowAction() {
    return (
      <div className="alignleft actions bulkactions">
        <label className="screen-reader-text">Select bulk action</label>
        <select name="action" id="bulk-action-selector-top" value={this.state.actionType}
                onChange={this.onActionTypeChange}>
          <option value="action">Bulk Actions</option>
          <option value="trash">Move to Trash</option>
          <option value="filter">Filter in Trending</option>
        </select>
        <input type="submit" id="doaction" className="button action" value="Apply" onClick={this.onActionApplyClick}/>
      </div>
    )
  }

  render() {
    const status = this.props.location.query.status;

    switch (status) {
      case "filter":
        return (
          <div>{this.renderRowActionForFilter()}</div>
        );
      case "trash":
        return (
          <div>{this.renderRowActionForTrash()}</div>
        );
      default:
        return (
          <div>{this.renderRowAction()}</div>
        )
    }

  }

}

export default withRouter(AppAdminTopicsAction)
