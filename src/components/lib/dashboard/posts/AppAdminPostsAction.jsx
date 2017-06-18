import Telescope from '../../index'
import React, { Component } from 'react'

class AppAdminPostsAction extends Component {

  constructor (props) {
    super(props)
    this.state = this.initialState = {
      // batch action
      actionType: 'action',
    }

    this.onActionTypeChange = this.onActionTypeChange.bind(this)
    this.onActionApplyClick = this.onActionApplyClick.bind(this)
  }

  onActionTypeChange (event) {
    this.setState({actionType: event.target.value})
  }

  onActionApplyClick () {

  }

  renderRowAction () {
    return (
      <div className="alignleft actions bulkactions">
        <label className="screen-reader-text">Select bulk action</label>
        <select name="action"
                id="bulk-action-selector-top"
                value={this.state.actionType}
                onChange={this.onActionTypeChange}>
          <option value="action">Bulk Actions</option>
          <option value="bulk-edit" className="hide-if-no-js">Edit</option>
          <option value="trash">Move to Trash</option>
        </select>
        <input type="submit" id="doaction" className="button action" value="Apply" onClick={this.onActionApplyClick}/>
      </div>
    )
  }

  renderRowActionForTrash () {
    return (
      <div className="alignleft actions bulkactions">
        <label className="screen-reader-text">Select bulk action</label>
        <select name="action"
                id="bulk-action-selector-top"
                value={this.state.actionType}
                onChange={this.onActionTypeChange}>
          <option value="action">Bulk Actions</option>
          <option value="restore">Restore</option>
          <option value="delete_permanently">Delete Permanently</option>
        </select>
        <input type="submit"
               id="doaction"
               className="button action"
               value="Apply"
               onClick={this.onActionApplyClick}/>
      </div>
    )
  }

  render () {
    const location = this.props.location || {},
      query = location.query || {}
    let status = query.status || 'all'

    switch (status) {
      case 'trash':
        return (
          <div>{this.renderRowActionForTrash()}</div>
        )
      default:
        return (
          <div>{this.renderRowAction()}</div>
        )
    }

  }

}

export default AppAdminPostsAction
