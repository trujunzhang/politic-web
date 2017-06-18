import Telescope from '../index'
import React, { Component } from 'react'

class AppAdminLayout extends Component {

  render () {
    return (
      <div className="wrapper">
        <Telescope.components.AppAdminHeader />
        <Telescope.components.AppAdminSidebar location={this.props.location}/>

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
    )
  }

}

export default AppAdminLayout
