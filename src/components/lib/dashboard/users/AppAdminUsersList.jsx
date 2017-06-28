import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'
import Users from '../../../../lib/users'

import {withRouter} from 'react-router'


const {loadPostsPaginationDashboard} = require('../../../../actions').default

const {
  DASHBOARD_LOADED_PAGINATION
} = require('../../../../lib/constants').default

var {convertToObject} = require('../../../../lib/utils')

class AppAdminUsersList extends Component {

  constructor(props) {
    super(props);

    this.state = this.initialState = {};
  }


  componentDidMount() {
    this.loadMore()
  }

  loadMore() {
    const {location} = this.props,
      terms = {
        ...location.query,
        listId: 'admin.users.list',
        limit: 10
      }
    const countKeys = [
      "allCount",
      "adminCount",
      "twitterCount",
      "facebookCount",
      "emailCount",
      "tableCount"
    ]
    const nextDashboard = convertToObject(this.props.dashboard)
    this.props.dispatch(loadPostsPaginationDashboard(nextDashboard, terms.listId, terms))
  }


  renderRowForMessagesCount(item, index) {
    const messagesCounterKeyName = Users.getMessagesCounterKeyName(),
      messagesCount = item[messagesCounterKeyName] ? item[messagesCounterKeyName] : 0;
    return (
      <td key={index} className="posts column-articles num">
        <a onClick={this.onMessagesCountClick.bind(this, item)}>{messagesCount}</a>
      </td>
    )
  }

  renderRowForPostsCount(item, index) {
    const postsCounterKeyName = Users.getCounterKeyName(),
      articlesCount = item[postsCounterKeyName] ? item[postsCounterKeyName] : 0,
      postsCount = item.telescope.postCount,
      postsCountError = (postsCount !== articlesCount) ? (
        <em className="error_color_red">{"{" + articlesCount + "}"}</em>) : null;

    return (
      <td key={index} className="posts column-articles num">
        <strong>
          <a onClick={this.onPostsCountClick.bind(this, item)}>{postsCount}{ postsCountError }</a>
        </strong>
      </td>
    )
  }

  renderRowForRoleType(item, index) {
    return (
      <td key={index} className="comments column-loginType">
        <strong>{ Users.getRole(item)}</strong>
      </td>
    )
  }

  renderRowForLoginType(item, index) {
    return (
      <td key={index} className="comments column-loginType">
        <strong>{Users.getLoginType(item)}</strong>
      </td>
    )
  }

  renderRowTitleWithAction(item, index) {
    const displayName = Users.getDisplayName(item),
      email = Users.getUserEmail(item),
      avatarObj = Users.getAvatarObj(item);
    return (
      <td key={index} className="username column-username has-row-actions column-primary">
        <div className="admin-users-item-section">
          <div className="admin-users-item-left-panel">
            <img alt={displayName}
                 id="admin-users-item-avator"
                 src={avatarObj.url}
                 className="avatar avatar-32 photo"
                 height="32" width="32"/>
          </div>
          <div id="admin-users-item-right-panel" className="row">
            <div><strong>{ displayName }</strong></div>
            <div><Telescope.components.MailTo email={email}/></div>
            <div><Telescope.components.AppAdminUserItemAction actionEvent={this.onRowItemActionEventClick.bind(this)}
                                                              user={item}/></div>
          </div>
        </div>
      </td>
    )
  }

  render() {
    const data = {
      selectAll: true,
      hasEditSingle: false,
      hasEditAll: false,
      tableType: 'Users',
      rows: [
        {name: "Username", field: "withAction", tag: "username", sort: true, primary: true},
        {name: "Role", field: "withRoleType", tag: "role"},
        {name: "Login Type", field: "withLoginType", tag: "type"},
        // {name: "Messages", field: "withMessagesCount", tag: "messages"},
        // {name: "Posts", field: "withPostsCount", tag: "posts", sort: true,},
        {name: "Date", field: "date", tag: "date", sort: true}
      ]
    };
    return (
      <Telescope.components.AdminTables
        data={data}
        renderRowForTitleWithAction={this.renderRowTitleWithAction.bind(this)}
        renderRowForRoleType={this.renderRowForRoleType.bind(this)}
        renderRowForLoginType={this.renderRowForLoginType.bind(this)}
        renderRowForMessagesCount={this.renderRowForMessagesCount.bind(this)}
        renderRowForPostsCount={this.renderRowForPostsCount.bind(this)}
        tableCount={this.props.tableCount || 0}
        componentLeftActionBar={Telescope.components.AppAdminUsersAction}
        componentTopActionBar={Telescope.components.AppAdminUsersTopAction}
      />
    )
  }
}

export default withRouter(AppAdminUsersList)
