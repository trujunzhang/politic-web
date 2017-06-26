import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import Users from '../../../../lib/users'
import Folders from '../../../../lib/folder'

import {Link} from 'react-router'

class UserFolderProfileBackButtonSection extends Component {

  render() {
    return (
      <div className="collection-detail--action-buttons">
        <Link className="collection-detail--backlink" to={Users.getLinkObject('collections', this.props.user).pathname}>
          <span>
            <svg width="7" height="10" viewBox="0 0 7 10">
              <path
                d="M5.99875203,6.20445605 C6.88568897,5.53925334 7.60469343,5.89522409 7.60469343,6.99968461 L7.60469343,13.5003154 C7.60469343,14.6047107 6.88193573,14.9579317 5.99875203,14.295544 L2.21063483,11.454456 C1.32369788,10.7892533 1.32745112,9.70793173 2.21063483,9.04554395 L5.99875203,6.20445605 Z"
                transform="translate(-1 -5)" fill="#DA552F">
              </path>
            </svg>
          </span>
          {`Back to ${Users.getDisplayName(this.props.user)}'s Collections`}
        </Link>
      </div>
    )
  }
}

export default UserFolderProfileBackButtonSection
