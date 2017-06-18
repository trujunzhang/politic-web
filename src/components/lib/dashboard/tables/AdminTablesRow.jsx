import Telescope from '../../index'
import React, { Component } from 'react'

class AdminTablesRow extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {item} = this.props,
      {primary, sort} = item
    let thClass = 'manage-column column-' +
      item.tag +
      (!!primary ? ' column-primary ' : '') +
      (!!sort ? ' sortable desc' : '')

    return (
      <th scope="col" id={item.tag} className={thClass}>
        {!!sort ? (
          <a>
            <span>{item.name}</span>
          </a>
        ) : item.name
        }
      </th>
    )
  }
}

export default AdminTablesRow
