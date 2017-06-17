import Telescope from '../index'
import React, { Component } from 'react'
import moment from 'moment'

class AppAdminFooter extends Component {

  render () {
    const year = moment(new Date()).format('YYYY')
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 2.4.7
        </div>
        <strong>{'Copyright © ' + year + ' '}</strong> All rights reserved.
      </footer>
    )
  }
}

export default AppAdminFooter
