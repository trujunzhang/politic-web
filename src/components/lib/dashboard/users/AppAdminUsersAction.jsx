import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'
import Users from '../../../../lib/users'

import {withRouter} from 'react-router'

class AppAdminUsersAction extends Component {

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
    switch (this.state.actionType) {
      case "trash":

        break;
      case "filter":

        break;
      case "restore":

        break;
      case "delete":

        break;
    }
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
        </select>
        <input type="submit"
               id="doaction"
               className="button action"
               value="Apply"
               onClick={this.onActionApplyClick}/>
      </div>
    )
  }

  render() {
    const location = this.props.location || {},
      query = location.query || {},
      status = query.status || ''

    switch (status) {
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

export default withRouter(AppAdminUsersAction)
