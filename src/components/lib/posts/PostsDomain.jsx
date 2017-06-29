import React, { Component } from 'react'
import { withRouter } from 'react-router'

/**
 * A: Remove “THE-VIEWSPAPER” from there
 * B: YES
 * A: “theviewspaper.net” on a line between the title and read more and link it to the domain page
 * B: “theviewspaper.net” on a line between the title and read more and link it to the domain page, need to add click event?
 * A: YES
 */
class PostsDomain extends Component {
  onDomainClick (event) {
    event.preventDefault()

    const {post, router} = this.props,
      domain = (post.sourceFrom || '').replace('www.', '')

    router.push({
      pathname: `/from/${domain}`,
      query: {}
    })

    event.stopPropagation()
  }

  render () {
    const {post, domainClass} = this.props,
      domain = (post.sourceFrom || '').replace('www.', '')

    return (
      <span className={`domain_item ${domainClass}`}>
        <span className="domain" onClick={this.onDomainClick.bind(this)}>
          { domain}
        </span>
      </span>
    )
  }
}

/**
 * ## Imports
 *
 * Redux
 */
let {connect} = require('react-redux')

export default withRouter(connect()(PostsDomain))


