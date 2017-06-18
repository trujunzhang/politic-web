import Telescope from '../../index'
import React, { Component } from 'react'
import Posts from '../../../../lib/posts'
import { Link } from 'react-router'

const {loadPosts} = require('../../../../actions').default

const {
  DASHBOARD_LOADED_POSTS
} = require('../../../../lib/constants').default

var {convertToObject} = require('../../../../lib/utils')

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
    const {location} = this.props,
      terms = {
        ...location.query,
        listId: 'admin.posts.list',
        limit: 10
      }
    const nextDashboard = convertToObject(this.props.dashboard)
    this.props.dispatch(loadPosts(nextDashboard, terms.listId, terms, DASHBOARD_LOADED_POSTS))
  }

  onDateSelectorChange (event) {
    let value = event.target.value
    this.setState({dateSelector: value})

    const {router, location} = this.props,
      {pathname, query} = location,
      nextQuery = {...query, data: value}
    router.push({pathname: pathname, query: nextQuery})
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

    return (query.status === 'trash') ? (<strong>{item.title}</strong>) : (
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

  customRowRender (row, item, index) {
    const {name, tag, field, isText} = row
    switch (tag) {
      case 'title':
        return (
          <td key={index} className="title column-title has-row-actions column-primary page-title">
            {this.renderTitle(item)}
            <Telescope.components.AppAdminPostItemAction post={item}/>
          </td>
        )
      case 'topics':
        return (<Telescope.components.AdminTablesTopicsColumn key={index} results={item.topics}/>)
    }
  }

  render () {
    const props = this.props
    const data = {
      selectAll: true,
      hasEditSingle: true,
      hasEditAll: true,
      tableType: 'Posts',
      rows: [
        {name: 'Title', field: 'withAction', tag: 'title', sort: true, primary: true, customRender: true},
        {name: 'Source Name', field: 'sourceFrom', tag: 'source'},
        {name: 'Curator', field: 'author', tag: 'curator'},
        {name: 'Topics', field: 'withTopics', tag: 'topics', customRender: true},
        {name: 'Date', field: 'date', tag: 'date', sort: true}
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

    const renderTitleActionButton = (<Link className="page-title-action" to="/article/new">Add New</Link>)

    return (
      <Telescope.components.AdminTables
        data={data}
        renderTitleActionButton={renderTitleActionButton}
        renderRowsEditSingle={this.renderRowsEditSingle.bind(this)}
        renderRowsEditAll={this.renderRowsEditAll.bind(this)}
        tableCount={Posts.getTotalCount(this.props, this.props.location.query.status)}
        componentLeftActionBar={Telescope.components.AppAdminPostsAction}
        renderFilter={this.renderFilter.bind(this)}
        componentTopActionBar={Telescope.components.AppAdminPostsTopAction}
        countsProps={countsProps}
        customRowRender={this.customRowRender.bind(this)}
      />
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
    dashboard: store.dashboard
  }
}

export default connect(select)(AppAdminPostsList)

