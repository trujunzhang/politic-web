import Telescope from '../index'
import React, { Component } from 'react'

class Layout extends Component {
  constructor (props, context) {
    super(props)
  }

  renderContent () {
    return (
      <div id='container'>
        <Telescope.components.Newsletter />
        { this.props.children}
      </div>
    )
  }

  render () {
    if (this.props.location.pathname.indexOf('/management') !== -1) {
      return (
        <Telescope.components.AppAdminLayout location={this.props.location}/>
      )
    }
    return (
      <div id='web-app-panel'>
        <Telescope.components.HeaderContent />
        <Telescope.components.AppOverlay />
        {this.renderContent()}
      </div>
    )
  }
}

export default Layout
