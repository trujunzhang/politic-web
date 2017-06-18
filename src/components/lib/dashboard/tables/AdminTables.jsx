import Telescope from '../../index'
import React, { Component } from 'react'
import moment from 'moment'

var {convertToObject} = require('../../../../lib/utils')

class AdminTables extends Component {

  constructor (props, context) {
    super(props)

    this.state = {
      dashboard: convertToObject(props.dashboard)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.state = {
      dashboard: convertToObject(nextProps.dashboard)
    }

    console.log('Receive table: ')
  }

  onCheckRowChanged (id, value) {
    const {rowState, checkAll} = this.state
  }

  toggleCheckAll () {

  }

  renderTableHeaderFooter () {
    const {data} = this.props,
      {selectAll, rows} = data
    return (
      <tr>
        {!!selectAll ? (
          <td id="cb" className="manage-column column-cb check-column">
            <label className="screen-reader-text">Select All</label>
            <input id="cb-select-all-1" type="checkbox" onChange={this.toggleCheckAll.bind(this)}
                   checked={this.state.checkAll}/>
          </td>) : null}
        {rows.map((row, index) => {
          return (<Telescope.components.AdminTablesTH key={index} row={row}/>)
        })}
      </tr>
    )
  }

  generateRowHeader (itemId, rowIndex) {
    const checked = (!!this.state.rowState) ? this.state.rowState[rowIndex].checked : false
    return (
      <th key="header" scope="row" className="check-column">
        <label className="screen-reader-text">{`Select ${this.props.data.tableType}` }</label>
        <input id="cb-select"
               type="checkbox"
               checked={checked}
               onChange={this.onCheckRowChanged.bind(this, itemId, !checked)}/>
        <div className="locked-indicator"/>
      </th>
    )
  }

  generateRow (row, item, index) {
    const {name, tag, field, isText} = row
    return (
      <td key={index} className={`${row.tag} column-${row.tag}`}>
        {item[row.field]}
      </td>
    )
  }

  onRowClick (tag, value) {
    // this.context.messages.appManagement.appendQuery(this.props.router, tag, value)
  }

  generateRowBody (item, rowIndex) {
    const {data} = this.props,
      {selectAll, rows} = data

    const rowItems = []
    rows.map((row, index) => {
      rowItems.push(this.generateRow(row, item, index))
    })
    return (
      <tr key={item._id}
          className="iedit author-other level-0 type-post status-draft format-standard has-post-thumbnail hentry category-all-reads tag-article-208 tag-cauvery-basin tag-cauvery-dispute tag-cauvery-water-disputes-tribunal tag-dipak-misra tag-houses-of-legislature tag-inter-state-river-water-disputes-act tag-karnataka tag-rules-of-procedure tag-supreme-court tag-tamil-nadu tag-uday-umesh-lalit">
        {selectAll ? this.generateRowHeader(item._id, rowIndex) : null}
        {rowItems}
      </tr>
    )
  }

  renderTableRows (results) {
    const {data} = this.props,
      {hasEditSingle, hasEditAll, tableType} = data,
      {checkIds} = this.state,
      items = results

    if (items.length === 0) {
      return (
        <tbody id="the-list">
        <tr>
          <td>
            <div className="row" id="table_no_items">
              <div className="admin-table-loading">{`No ${tableType} found.`}</div>
            </div>
          </td>
        </tr>
        </tbody>
      )
    }

    let rows = []

    items.map((item, rowIndex) => {
      let haveEdit = false
      if (hasEditSingle) {
        haveEdit = this.props.renderRowsEditSingle(rows, item)
      }
      if (!haveEdit) {
        rows.push(this.generateRowBody(item, rowIndex))
      }
    })
    const {renderRowsEditAll} = this.props,
      editAllBlock = (hasEditAll ? renderRowsEditAll(checkIds, this.onCheckRowChanged.bind(this)) : null)
    return (
      <tbody id="the-list">
      {editAllBlock }
      {rows}
      </tbody>
    )
  }

  renderLoading () {
    return (
      <tbody id="the-list">
      <tr>
        <td>
          <div className="admin-table-loading">
            <span className="loading_2hQxH subtle_1BWOT"><div className={'post-loadmore-spinner'}><span>Loading</span><div
              className="bounce1"/><div className="bounce2"/><div className="bounce3"/></div></span></div>
        </td>
      </tr>
      </tbody>
    )
  }

  renderLeftBar (position) {
    const Component = this.props.componentLeftActionBar,
      {renderFilter} = this.props,
      filterBlock = (renderFilter ? renderFilter() : null)

    return (
      <div>
        <Component actionEvent={this.onLeftActionBarEventClick.bind(this)}/>
        {position === 'top' ? filterBlock : null}
      </div>
    )
  }

  renderToolbar (position = 'top') {
    const {tableCount} = this.props

    return (
      <div className={`tablenav ${position}`}>

        {this.renderLeftBar(position)}

        {tableCount > 0 ? <Telescope.components.PaginationContainer
          tableCount={tableCount}
          countPerPage={this.state.postsPerPage}/>
          : null}
        <br className="clear"/>

      </div>
    )
  }

  onLeftActionBarEventClick (type, cb) {
    // const checkedIds = this.context.messages.appManagement.getCheckedIds(this.state.rowState)
    const self = this
    // this.props.onLeftActionBarEventClick(type, checkedIds, null, function (error, result) {
    //   self.resetTable()
    //   cb(error, result)
    // })
  }

  resetTable () {
    // let rowState = this.context.messages.appManagement.resetSelectRowState(this.props.results, [])
    // this.setState({checkAll: false, checkIds: [], rowState: rowState})
  }

  renderTopbar () {
    const Component = this.props.componentTopActionBar
    return (<Component {...this.props.countsProps} />)
  }

  renderTitle () {
    const {renderTitleActionButton} = this.props
    return (
      <h1 className="admin-posts-title">{this.props.data.tableType}
        {renderTitleActionButton ? renderTitleActionButton() : null}
        <Telescope.components.AppSearchTitle/>
      </h1>
    )
  }

  render () {
    return this.renderNormal()
  }

  renderNormal () {
    const {renderTableCustomTitle} = this.props
    return (
      <div className="wrap" id="admin-posts-ui">

        {renderTableCustomTitle ? renderTableCustomTitle() : this.renderTitle()}

        {this.renderTopbar()}

        {this.renderToolbar()}
        {this.renderTable()}
        {this.renderToolbar('bottom')}
      </div>
    )
  }

  renderTable () {
    const {data} = this.props,
      {dashboard} = this.state,
      results = dashboard.results || [],
      {tableType} = data

    console.log('render table: ' + results.length)

    return (
      <table className="wp-list-table widefat fixed striped posts" id={tableType.toLowerCase()}>
        {/*<thead>*/}
        {/*{this.renderTableHeaderFooter()}*/}
        {/*</thead>*/}
        {/*{!this.props.ready ? this.renderLoading() : this.renderTableRows(results)}*/}
        {/*<tfoot>*/}
        {/*{this.renderTableHeaderFooter()}*/}
        {/*</tfoot>*/}
      </table>
    )
  }

  renderTwoColumns () {
    const {renderLeftBar} = this.props
    return (
      <div className="wrap" id="admin-posts-ui">
        {this.renderTitle()}
        <div className="wp-clearfix">
          {this.renderTopbar()}
        </div>

        <div id="col-container" className="wp-clearfix">
          <div id="col-left">
            <div className="col-wrap margin_top10">
              {renderLeftBar()}
            </div>
          </div>
          <div id="col-right">
            <div className="col-wrap">
              <div id="posts-filter" method="post">
                {this.renderToolbar()}
                {this.renderTable()}
                {this.renderToolbar('bottom')}
              </div>
            </div>
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

function select (store) {
  return {
    dashboard: store.dashboard
  }
}

/**
 * Connect the properties
 */

export default connect(select)(AdminTables)
