import Telescope from '../../index'
import React, { Component } from 'react'

class AdminTablesCommonColumn extends Component {

  onTDClick () {
    const {tdType, tdValue} = this.props
    this.context.messages.appManagement.appendQuery(this.props.router, tdValue, tdValue)
  }

  render () {
    const {tdType, tdValue} = this.props

    return (
      <td className={`${tdType} column-${tdType}`}>
        <a onClick={this.onTDClick.bind(this)}>{tdValue}</a>
      </td>
    )
  }
}

export default AdminTablesCommonColumn
