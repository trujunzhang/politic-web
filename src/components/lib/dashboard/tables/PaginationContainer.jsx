import Telescope from '../../index'
import React, {Component} from 'react'

import { withRouter } from 'react-router'

let numeral = require('numeral')

class PaginationContainer extends Component {

  constructor(props) {
    super(props)

    const current = this.getCurrentPage()
    this.state = this.initialState = {
      currentPage: current,
    }
  }

  setRouterPagedValue(newPaged) {
    this.setState({'currentPage': newPaged})
    // this.context.messages.appManagement.appendQuery(this.props.router, 'paged', newPaged)
  }

  onCurrentPageChange(e) {
    const totalPages = this.getTotalPages()
    let value = e.target.value
    value = Math.min(value, totalPages)
    value = Math.max(value, 1)
    this.setState({'currentPage': value})

    const appManagement = this.context.messages.appManagement
    const router = this.props.router

    this.context.messages.delayEvent(function () {
      // appManagement.appendQuery(router, 'paged', value)
    }, 400)
  }

  getTotalPages() {
    const tableCount = this.props.tableCount ? this.props.tableCount : 0
    const totoalPage = Math.floor(tableCount / this.props.countPerPage) + 1
    return Math.max(totoalPage, 1)
  }

  getCurrentPage() {
    const {location} = this.props,
      query = location.query || {},
      paged = query.paged || '1'

    return parseInt(paged)
  }

  onFirstPageClick() {
    this.setRouterPagedValue(1)
  }

  onLastPageClick() {
    const totalPages = this.getTotalPages()
    if (totalPages === 0) {
      return
    }
    this.setRouterPagedValue(totalPages)
  }

  onPreviousPageClick() {
    const currentPage = this.getCurrentPage()
    const previousPage = Math.max(currentPage - 1, 1)

    this.setRouterPagedValue(previousPage)
  }

  onNextPageClick() {
    const totalPages = this.getTotalPages()
    if (totalPages === 0) {
      return
    }

    const currentPage = this.getCurrentPage()
    let nextPage = currentPage + 1
    nextPage = Math.min(nextPage, totalPages)
    this.setRouterPagedValue(nextPage)
  }

  renderFirstArrow() {
    const currentPage = this.getCurrentPage()

    if (currentPage <= 2) {
      return (
        <span className="tablenav-pages-navspan" onClick={this.onFirstPageClick.bind(this)}>«</span>
      )
    }
    return (
      <a className="prev-page" onClick={this.onFirstPageClick.bind(this)}>
        <span className="screen-reader-text">Previous page</span>
        <span >«</span>
      </a>
    )
  }

  renderPreviousArrow() {
    const currentPage = this.getCurrentPage()

    if (currentPage === 1) {
      return (
        <span className="tablenav-pages-navspan" onClick={this.onPreviousPageClick.bind(this)}>‹</span>
      )
    }
    return (
      <a className="prev-page" onClick={this.onPreviousPageClick.bind(this)}>
        <span className="screen-reader-text">Previous page</span>
        <span >‹</span>
      </a>
    )
  }

  renderNextArrow() {
    const currentPage = this.getCurrentPage()
    const totalPages = this.getTotalPages()

    if (currentPage === totalPages) {
      return (
        <span className="tablenav-pages-navspan">›</span>
      )
    }
    return (
      <a className="next-page" onClick={this.onNextPageClick.bind(this)}>
        <span className="screen-reader-text">Next page</span>
        <span >›</span>
      </a>
    )
  }

  renderLastArrow() {
    const currentPage = this.getCurrentPage()
    const totalPages = this.getTotalPages()

    if (currentPage >= totalPages - 1) {
      return (
        <span className="tablenav-pages-navspan">»</span>
      )
    }
    return (
      <a className="last-page" onClick={this.onLastPageClick.bind(this)}>
        <span className="screen-reader-text">Last page</span>
        <span >»</span>
      </a>
    )
  }

  renderPagination() {
    const tableCount = this.props.tableCount ? this.props.tableCount : 0
    const currentPage = this.getCurrentPage()
    const totalPages = this.getTotalPages()
    return (
      <span className="pagination-links">
                  {this.renderFirstArrow()}
        {this.renderPreviousArrow()}

        <span className="paging-input">
                      <label className="screen-reader-text">Current Page</label>
                      <input
                        className="current-page"
                        id="current-page-selector"
                        type="text"
                        name="paged"
                        value={this.state.currentPage}
                        onChange={this.onCurrentPageChange.bind(this)}
                        size="4"/>
                      <span className="tablenav-paging-text">
                                of
                          <span className="total-pages">{totalPages}</span>
                      </span>
                  </span>

        {this.renderNextArrow()}
        {this.renderLastArrow()}
              </span>
    )
  }

  render() {
    const tableCount = this.props.tableCount ? this.props.tableCount : 0
    const totalPages = this.getTotalPages()
    const onePage = (tableCount <= this.props.countPerPage)

    return (
      <div className={'tablenav-pages' + (onePage ? ' one-page' : '')}>
        <span className="displaying-num">{numeral(tableCount).format('0,0') + ' items'}</span>
        {!onePage ? this.renderPagination() : null}
      </div>
    )
  }
}

export default withRouter(PaginationContainer)
