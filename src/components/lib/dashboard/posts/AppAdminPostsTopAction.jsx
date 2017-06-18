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
      {title: 'Pending', status: 'pending', count: (this.props.pendingCount || 0)},
      {title: 'Rejected', status: 'reject', count: (this.props.rejectedCount || 0)},
      {title: 'Drafts', status: 'draft', count: (this.props.draftCount || 0)},
      {title: 'Trash', status: 'trash', count: trashCount},
    ]

    const countRows = []
    _.forEach(rows, function (row) {
      if (row.count !== 0 || row.title === 'All') {
        countRows.push(row)
      }
    })

    let length = countRows.length
    const location = this.props.location || {},
      query = location.query || {}

    let queryStatus = query.status || 'all'
    const statusRows = []
    for (let i = 0; i < length; i++) {
      const row = countRows[i]
      statusRows.push(
        <li key={i} className={row.status}>
          <a className={queryStatus === row.status ? 'current' : ''}
             onClick={this.onTopActionStatusClick.bind(this, row.status)}>
            {row.title + ' '}
            <span className="count">
              {'(' + numeral(row.count).format('0,0') + ')' }
            </span>
          </a>
          {(i < length - 1 ) ? <span>{' |'}</span> : null  }
        </li>)
    }

    return statusRows
  }

  render () {

    const statusRows = this.getStatusRows()

    return (
      <div className="top-action-panel">
        <div className="col-sm-8">
          <ul className="subsubsub">
            {statusRows}
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

export default AppAdminPostsTopAction
