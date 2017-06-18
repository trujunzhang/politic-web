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
        <div id="admin-dashboard" className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">
            <Telescope.components.AppAdminHeader />
            <Telescope.components.AppAdminSidebar location={this.props}/>
            <div className="content-wrapper admin-content">

              <div id="wpcontent">
                <div id="wpbody" role="main">

                  <div id="wpbody-content">
                    { this.props.children}
                  </div>
                </div>

              </div>
            </div>

            <Telescope.components.AppAdminFooter />
          </div>
        </div>
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
