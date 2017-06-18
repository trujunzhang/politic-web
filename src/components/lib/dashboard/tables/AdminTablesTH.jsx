import Telescope from '../../index'
import React, { Component } from 'react'

class AdminTablesTH extends Component {

  render () {
    const {row} = this.props,
      {primary, sort} = row
    let thClass = 'manage-column column-' +
      row.tag +
      (!!primary ? ' column-primary ' : '') +
      (!!sort ? ' sortable desc' : '')

    return (
      <th scope="col" id={row.tag} className={thClass}>
        {!!sort ? (
          <a>
            <span>{row.name}</span>
          </a>
        ) : row.name
        }
      </th>
    )
  }
}

export default AdminTablesTH
