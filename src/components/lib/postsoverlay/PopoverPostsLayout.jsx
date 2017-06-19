import Telescope from '../../lib'
import React, { Component } from 'react'
import { withRouter } from 'react-router'

const {resetOverlayDetailedPosts} = require('../../../actions').default

class PopoverPostsLayout extends Component {

  dismissCurrentPostPanel (e) {
    e.preventDefault()

    // this.props.router.goBack()
  }

  /**
   * Issue #107: 03/02/2017
   * If i open an article Then a related post article Then another related post article on the same browser window.
   * I have to click close button 3 times to close the overlay window. It should close on one click.
   * @param e
   */
  closingMultipleOverlayArticles (e) {
    e.preventDefault()

    this.props.dispatch(resetOverlayDetailedPosts())

    // router.replace({pathname: pathname})
  }

  renderNormalCloseIcon () {
    return (
      <a className="closeDesktop_XydFN" title="Close"
         onClick={this.closingMultipleOverlayArticles.bind(this)}>
        <span>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"/>
          </svg>
        </span>
      </a>
    )
  }

  renderMobileCloseIcon () {
    return (
      <a className="closeMobile_15z3i" title="Close"
         onClick={this.closingMultipleOverlayArticles.bind(this)}>
        <span>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"/>
          </svg>
        </span>
      </a>
    )
  }

  render () {
    return (
      <div className="overlay_1AkSl modal-spotlight" id="popover-detailed-post">
        {this.renderNormalCloseIcon()}
        {this.renderMobileCloseIcon()}
        {this.props.children}
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

/**
 * Connect the properties
 */

export default withRouter(connect()(PopoverPostsLayout))

