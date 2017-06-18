import Telescope from '../../index'
import React, { Component } from 'react'

class AppAdminPostItemAction extends Component {

  onActionApplyClick (actionType) {
    const {item} = this.props

    switch (actionType) {
      case 'edit': {
        this.props.actions.editSingleRow(item.id)
      }
    }

  }

  renderRowAction () {
    return (
      <div className="row-actions">
              <span className="edit">
                  <a onClick={this.onActionApplyClick.bind(this, 'edit')}>Edit</a>
                  |</span>
        <span className="edit">
                  <a onClick={this.onActionApplyClick.bind(this, 'quick_edit')}>Quick Edit</a>
                  |</span>
        <span className="trash">
                  <a className="submitdelete" onClick={this.onActionApplyClick.bind(this, 'trash')}>Trash</a>
                  |</span>
        <span className="view">
                  <a rel="permalink" onClick={this.onActionApplyClick.bind(this, 'preview')}>Preview</a>
              </span>
      </div>
    )
  }

  renderRowActionForTrash () {
    return (
      <div className="row-actions">
              <span className="untrash">
                  <a onClick={this.onActionApplyClick.bind(this, 'restore')}
                     className="untrash">
                      Restore
                  </a>
                  |
              </span>
        <span className="delete">
                  <a onClick={this.onActionApplyClick.bind(this, 'delete_permanently')}
                     className="delete">
                      Delete Permanently
                  </a>
                  |
              </span>

      </div>
    )
  }

  render () {
    const location = this.props.location || {},
      query = location.query || {},
      status = query.status || ''

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

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import * as dashboardActions from '../../../../reducers/dashboard/dashboardActions'

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(dashboardActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(AppAdminPostItemAction)

