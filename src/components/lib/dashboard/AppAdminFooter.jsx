import Telescope from '../index'
import React, { Component } from 'react'
import moment from 'moment'

class AppAdminFooter extends Component {

  render () {
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 3.0.1
        </div>
        <strong>{`Copyright © ${moment(new Date()).format('YYYY')}  `}</strong> All rights reserved.
      </footer>
    )
  }
}

export default AppAdminFooter
