import Telescope from '../../index'
import React, { Component } from 'react'
import Posts from '../../../../lib/posts'

const {loadPosts} = require('../../../../actions').default

const {
  DASHBOARD_LOADED_POSTS
} = require('../../../../lib/constants').default

class AppAdminPostsList extends Component {

  constructor (props) {
    super(props)

    const {location} = props,
      query = location.query || {}

    const dateSelectors = Posts.getDateSelectors()
    this.state = this.initialState = {
      dateSelector: query.date || '0',
      dateSelectors: dateSelectors
    }
  }

  componentDidMount () {
    this.loadMore()
  }

  loadMore () {
    // const nextDashboard = this.props.dashboard
    // this.props.dispatch(loadPosts(nextDashboard, this.props.listId, this.props.terms, DASHBOARD_LOADED_POSTS))
  }

  onDateSelectorChange (event) {
    let value = event.target.value
    this.setState({dateSelector: value})
    // this.context.messages.appManagement.appendQuery(this.props.router, 'date', value)
  }

  renderFilter () {
    const {dateSelectors} = this.state
    const dateOptions = []
    dateOptions.push(<option key="all" selected="selected" value="0">All dates</option>)
    dateSelectors.map((item, index) => {
      dateOptions.push(<option key={index} value={item.query}>{item.title}</option>)
    })

    return (
      <div className="alignleft actions">
        <label className="screen-reader-text">Filter by date</label>
        <select name="m" id="filter-by-date" onChange={this.onDateSelectorChange.bind(this)}
                value={this.state.dateSelector}>
          {dateOptions}
        </select>
        <input type="submit"
               name="filter_action"
               id="post-query-submit"
               className="button"
               value="Pending Approval"/>
      </div>
    )
  }

  renderRowsEditSingle (rows, item) {
    if (this.state.editSingle && this.state.editSingleId === item._id) {
      rows.push(
        <Telescope.components.AppAdminPostsEditSingle
          key="editsingle"
          onEditSingleCancelClick={this.onSingleEditCancelClick.bind(this)}
          editSingleHook={this.onSingleEditHook.bind(this)}
          post={item}/>
      )
      return true
    }
    return false
  }

  renderRowsEditAll (checkIds, onCheckRowChanged) {
    if (this.state.editAll) {
      return (
        <Telescope.components.AppAdminPostsEditAll
          key="editall"
          onBulkEditCancelClick={this.onBulkEditCancelClick.bind(this)}
          editAllHook={this.onBulkEditAllHook.bind(this)}
          checkRow={onCheckRowChanged}
          posts={this.context.messages.appManagement.getSelectedPosts(this.props.results, checkIds)}/>
      )
    }
    return null
  }

  renderTitle (item) {
    const {location} = this.props,
      query = location.query || {},
      postStatus = Posts.getPostStatus(item, ( query.status || 'all'))

    if (query.status === 'trash') {
      return (<strong>{item.title}</strong>)
    }
    return (
      <strong>
        <a className="row-title">{item.title}</a>
        {postStatus.length === 0 ? null : ' — ' }
        {(postStatus.length === 0 ? null : (postStatus.map((status, index) =>
          <span key={index} className="post-state">
            {status + (index < postStatus.length - 1 ? ', ' : '')}
          </span>
        )))}
      </strong>
    )
  }

  renderRowTitleWithAction (item, index) {
    return (
      <td key={index} className="title column-title has-row-actions column-primary page-title">
        {this.renderTitle(item)}
        <Telescope.components.AppAdminPostItemAction
          actionEvent={this.onRowItemActionEventClick.bind(this)}
          post={item}/>
      </td>
    )
  }

  renderTitleActionButton () {
    return (
      <a onClick={(e) => this.context.messages.pushRouter(this.props.router, {
        pathname: '/',
        query: {action: 'new'}
      })} className="page-title-action">Add New</a>
    )
  }

  renderWithTopics (item, index) {
    return (<Telescope.components.AdminTablesTopicsColumn key={index}/>)
  }

  render () {
    const props = this.props
    const data = {
      selectAll: true,
      hasEditSingle: true,
      hasEditAll: true,
      tableType: 'Posts',
      rows: [
        // {name: 'Title', field: 'withAction', tag: 'title', sort: true, primary: true},
        {name: 'Source Name', field: 'sourceFrom', tag: 'source'},
        {name: 'Curator', field: 'author', tag: 'curator'},
        // {name: 'Date', field: 'date', tag: 'date', sort: true}
      ]
    }
    const countsProps = {
      allCount: (props.allCount || 0),
      trashCount: (props.trashCount || 0),
      publishCount: (props.publishCount || 0),
      pendingCount: (props.pendingCount || 0),
      rejectedCount: (props.rejectedCount || 0),
      draftCount: (props.draftCount || 0),
    }

    return (
      <Telescope.components.AdminTables
        data={data}
        renderRowForTitleWithAction={this.renderRowTitleWithAction.bind(this)}
        renderTitleActionButton={this.renderTitleActionButton.bind(this)}
        renderRowsEditSingle={this.renderRowsEditSingle.bind(this)}
        renderRowsEditAll={this.renderRowsEditAll.bind(this)}
        tableCount={Posts.getTotalCount(this.props, this.props.location.query.status)}
        componentLeftActionBar={Telescope.components.AppAdminPostsAction}
        renderFilter={this.renderFilter.bind(this)}
        componentTopActionBar={Telescope.components.AppAdminPostsTopAction}
        countsProps={countsProps}

        { ...this.props}/>
    )
  }

}

/**
 * ## Imports
 *
 * Redux
 */
import { connect } from 'react-redux'

function select (store) {
  return {
    dashboard: store.dashboard.table
  }
}

/**
 * Connect the properties
 */

export default connect(select)(AppAdminPostsList)

