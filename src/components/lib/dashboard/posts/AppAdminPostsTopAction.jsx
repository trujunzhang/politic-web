import Telescope from '../../index'
import React, { Component } from 'react'

let _ = require('underscore')
let numeral = require('numeral')

class AppAdminPostsTopAction extends Component {

  constructor (props) {
    super(props)

    const location = props.location || {},
      query = location.query || {}

    this.state = this.initialState = {
      query: query.query || ''
    }
  }

  onSearchChange (e) {
    let value = e.target.value
    this.setState({query: value})

    // const appManagement = this.context.messages.appManagement
    // const router = this.props.router
    // this.context.messages.delayEvent(function () {
    //   appManagement.appendQuery(router, 'query', value)
    // }, 400)
  }

  onTopActionStatusClick (status) {
    // this.setState({query: ''})
    // this.props.toggleEvent()
    // this.context.messages.appManagement.pushAdminFilterStatus(this.props.router, 'posts', status)
  }

  getStatusRows () {
    let allCount = (this.props.allCount || 0)
    let trashCount = (this.props.trashCount || 0)
    const rows = [
      {title: 'All', status: 'all', count: allCount},
      {title: 'Published', status: 'publish', count: (this.props.publishCount || 0)},
      {title: 'Pending', status: 'pending', count: (this.props.pendingCount || 20)},
      {title: 'Rejected', status: 'reject', count: (this.props.rejectedCount || 30)},
      {title: 'Drafts', status: 'draft', count: (this.props.draftCount || 0)},
      {title: 'Trash', status: 'trash', count: trashCount},
    ]

    const location = this.props.location || {},
      query = location.query || {},
      queryStatus = query.status || 'all'

    var length = 0
    _.forEach(rows, function (row) {
      if (row.count !== 0 || row.title === 'All') {
        length++
      }
    })

    return rows.map((item, index) => {
      if (item.count !== 0 || item.title === 'All') {
        return (
          <li key={index} className={item.status}>
            <a className={queryStatus === item.status ? 'current' : ''}>
              {item.title + ' '}
              <span className="count">{'(' + numeral(item.count).format('0,0') + ')' }</span>
            </a>
            {(index < length - 1 ) ? <span>{' |'}</span> : null  }
          </li>)
      }
    })
  }

  render () {
    return (
      <div className="top-action-panel">
        <div className="col-sm-8">
          <ul className="subsubsub">
            {this.getStatusRows()}
          </ul>
        </div>
        <div className="col-sm-4">
          <div id="example1_filter" className="dataTables_filter">
            <label>
              <input type="search"
                     id="admin-posts-search"
                     className="form-control input-sm admin-search-posts-input"
                     placeholder="Search Posts"
                     onChange={this.onSearchChange.bind(this)}
                     value={this.state.query}/>
            </label>
          </div>
        </div>
      </div>
    )
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

function select (store) {
  return {
    dashboard: store.dashboard
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(dashboardActions, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(AppAdminPostsTopAction)

