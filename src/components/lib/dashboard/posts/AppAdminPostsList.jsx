import Telescope from '../../index'
import React, { Component } from 'react'
import Posts from 'meteor/nova:posts'
import Topics from 'meteor/nova:topics'
import Users from 'meteor/nova:users'

class AppAdminPostsList extends Component {

  constructor (props) {
    super(props)

    const dateSelectors = Posts.getDateSelectors()
    this.state = this.initialState = {
      dateSelector: this.props.location.query.date ? this.props.location.query.date : '0',
      // Edit
      editAll: false,
      editAllCallBack: null,
      editSingle: false,
      editSingleId: '',
      // common
      dateSelectors: dateSelectors
    }
  }

  onDateSelectorChange (event) {
    let value = event.target.value
    this.setState({dateSelector: value})
    this.context.messages.appManagement.appendQuery(this.props.router, 'date', value)
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
               onClick={(e) => Users.openNewWindow('/', {..._.clone(this.props.location.query), admin: true})}
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
    const {router} = this.props,
      {query} = router.location,
      postStatus = Posts.getPostStatus(item, (!!query.status ? query.status : 'all'))

    if (query.status === 'trash') {
      return (<strong>{item.title}</strong>)
    }
    return (
      <strong>
        <a onClick={(e) => { Users.openNewWindow('/', {postId: item._id, admin: true})}}
           className="row-title">{item.title}
        </a>
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
    const terms = {listId: 'admin.posts.topics.array', include: item.topics}
    const {selector, options} = Topics.parameters.get(terms)

    return (
      <Telescope.components.NewsListContainer
        key={index}
        collection={Topics}
        publication="admin.posts.topics.array"
        selector={selector}
        options={options}
        terms={terms}
        component={Telescope.components.AdminTablesTopicsColumn}
        listId={terms.listId}
      />
    )
  }

  render () {
    const data = {
      selectAll: true,
      hasEditSingle: true,
      hasEditAll: true,
      tableType: 'Posts',
      rows: [
        {name: 'Title', field: 'withAction', tag: 'title', sort: true, primary: true},
        {name: 'Source Name', field: 'sourceFrom', tag: 'source'},
        {name: 'Curator', field: 'author', tag: 'curator'},
        {name: 'Topics', field: 'withTopics', tag: 'topics'},
        {name: 'Comments', field: '', tag: 'comments', sort: true,},
        {name: 'Date', field: 'date', tag: 'date', sort: true}
      ]
    }
    const countsProps = this.context.messages.appManagement.getAllPostsCountsProps(this.props)
    return (
      <Telescope.components.AdminTables
        data={data}
        onCheckIdsChanged={this.onCheckIdsChanged.bind(this)}
        renderRowForTitleWithAction={this.renderRowTitleWithAction.bind(this)}
        renderWithTopics={this.renderWithTopics.bind(this)}
        renderTitleActionButton={this.renderTitleActionButton.bind(this)}
        renderRowsEditSingle={this.renderRowsEditSingle.bind(this)}
        renderRowsEditAll={this.renderRowsEditAll.bind(this)}
        tableCount={Posts.getTotalCount(this.props, this.props.location.query.status)}
        componentLeftActionBar={Telescope.components.AppAdminPostsAction}
        onLeftActionBarEventClick={this.listActionEvent.bind(this)}
        renderFilter={this.renderFilter.bind(this)}
        componentTopActionBar={Telescope.components.AppAdminPostsTopAction}
        countsProps={countsProps}
        toggleEvent={this.onToggleEvent.bind(this)}

        { ...this.props}/>
    )
  }

}

export default AppAdminPostsList
