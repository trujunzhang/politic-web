import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'

const {loadPostsPaginationDashboard} = require('../../../../actions').default

const {
  DASHBOARD_LOADED_PAGINATION
} = require('../../../../lib/constants').default

var {convertToObject} = require('../../../../lib/utils')

class AppAdminPostsList extends Component {

  constructor(props) {
    super(props)

    const {location} = props,
      query = location.query || {}

    const dateSelectors = Posts.getDateSelectors()
    this.state = this.initialState = {
      dateSelector: query.date || '0',
      dateSelectors: dateSelectors
    }
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const {location} = this.props,
      terms = {
        ...location.query,
        listId: 'admin.posts.list',
        limit: 10
      }
    const countKeys = [
      "allCount",
      "publishCount",
      "pendingCount",
      "rejectedCount",
      "draftCount",
      "trashCount",
      "tableCount"
    ]
    const nextDashboard = convertToObject(this.props.dashboard)
    this.props.dispatch(loadPostsPaginationDashboard(nextDashboard, terms.listId, terms))
  }

  onDateSelectorChange(event) {
    let value = event.target.value
    this.setState({dateSelector: value})

    const {router, location} = this.props,
      {pathname, query} = location,
      nextQuery = {...query, data: value}
    router.push({pathname: pathname, query: nextQuery})
  }

  renderFilter() {
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

  renderTitle(item) {
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

  customRowRender(row, item, index) {
    const {name, tag, field, isText} = row
    switch (tag) {
      case 'title':
        return (
          <td key={index} className="title column-title has-row-actions column-primary page-title">
            {this.renderTitle(item)}
            <Telescope.components.AppAdminPostItemAction item={item}/>
          </td>
        )
      case 'topics':
        return (<Telescope.components.AdminTablesTopicsColumn key={index} results={item.topics}/>)
    }
  }

  render() {
    const data = {
      canSelectAllRows: true,
      canEditSingle: true,
      canEditAll: true,
      tableType: 'Posts',
      rows: [
        {name: 'Title', field: 'withAction', tag: 'title', sort: true, primary: true, customRender: true},
        {name: 'Source Name', field: 'sourceFrom', tag: 'source'},
        {name: 'Curator', field: 'author', tag: 'curator'},
        {name: 'Topics', field: 'withTopics', tag: 'topics', customRender: true},
        {name: 'Date', field: 'date', tag: 'date', sort: true}
      ]
    }
    return (
      <Telescope.components.AdminTables
        data={data}
        renderTitleActionButton={() => {
          return (<Link className="page-title-action" to="/article/new">Add New</Link>)
        }}
        renderRowsEditSingle={(item) => {
          return (<Telescope.components.AppAdminPostsEditSingle key={item.id} item={item}/>)
        }}
        renderRowsEditAll={(results, checkIds, onCheckRowChanged) => {
          return (
            <Telescope.components.AppAdminPostsEditAll
              key="editall" checkRow={onCheckRowChanged}
              posts={Posts.getSelectedPosts(results, checkIds)}/>
          )
        }}
        tableCount={Posts.getTotalCount(this.props, this.props.location.query.status)}
        componentLeftActionBar={Telescope.components.AppAdminPostsAction}
        renderFilter={this.renderFilter.bind(this)}
        componentTopActionBar={Telescope.components.AppAdminPostsTopAction}
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
var {connect} = require('react-redux')

function select(store) {
  return {
    dashboard: store.dashboard
  }
}

export default connect(select)(AppAdminPostsList)

