import Telescope from '../index'
import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Layout extends Component {
  constructor (props, context) {
    super(props)
  }

  componentDidMount () {
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
    return (
      <div id='web-app-panel'>

        <Telescope.components.HeaderContent />

        <Telescope.components.AppOverlay />

        {this.renderContent()}

      </div>
    )
  }
}

export default withRouter(Layout)
