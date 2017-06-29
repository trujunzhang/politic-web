import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'
import Users from '../../../../lib/users'
import {withRouter} from 'react-router'


const {loadTopicsPaginationDashboard} = require('../../../../actions').default

const {
  DASHBOARD_LOADED_PAGINATION
} = require('../../../../lib/constants').default

let {convertToObject} = require('../../../../lib/utils')


class AppAdminTopicsList extends Component {

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
      "publishCount",
      "filterCount",
      "trashCount",
      "tableCount"
    ]
    const nextDashboard = convertToObject(this.props.dashboard)
    this.props.dispatch(loadTopicsPaginationDashboard(nextDashboard, terms.listId, terms))
  }

  renderRowTitleWithAction(topic, index) {
    const {router} = this.props;
    const topicStatus = Topics.getTopicStatus(topic, !!router.location.query.status ? router.location.query.status : "all");
    return (
      <td key={index} className="title column-title">
        <strong>
          <a className="row-title">{topic.name}</a>
          {topicStatus.length === 0 ? null : " — " }
          {(topicStatus.length === 0 ? null : (topicStatus.map((status, index) =>
            <span key={index}
                  className="post-state">{status + (index < topicStatus.length - 1 ? ", " : "")}</span>
          )))}
        </strong>
        <Telescope.components.AppAdminTopicItemAction
          topic={topic}/>
      </td>
    )
  }

  renderRowForCount(item, index) {
    const counterKeyName = Topics.getCounterKeyName(),
      count = item[counterKeyName] ? item[counterKeyName] : '-';
    return (
      <td key={index} className="curator column-count">
        <a onClick={() => Users.openNewWindow("/", {
          admin: true,
          topicId: item._id,
          title: item.name
        })}>{count}</a>
      </td>
    )
  }

  renderTrending() {
    return (
      <div className="form-wrap nav-menus-php">
        <Telescope.components.AppAdminTopicsTrending/>
      </div>
    )
  }

  render() {
    const data = {
      selectAll: true,
      hasEditSingle: false,
      hasEditAll: false,
      tableType: 'Topics',
      rows: [
        {name: "Title", field: "withAction", tag: "title", sort: true, primary: true},
        {name: "Slug", field: "slug", tag: "slug"},
        {name: "Count", field: "withCount", tag: "count"},
      ]
    };
    return (
      < Telescope.components.AdminTables
        data={data}
        renderRowForTitleWithAction={this.renderRowTitleWithAction.bind(this)}
        renderRowForCount={this.renderRowForCount.bind(this)}
        renderLeftBar={this.renderTrending.bind(this)}
        tableCount={!!this.props.tableCount ? this.props.tableCount : 0}
        componentLeftActionBar={Telescope.components.AppAdminTopicsAction}
        onLeftActionBarEventClick={this.listActionEvent.bind(this)}
        componentTopActionBar={Telescope.components.AppAdminTopicsTopAction}
      />
    )
  }
}


/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux')

function select(store) {
  return {
    dashboard: store.dashboard
  }
}

export default connect(select)(AppAdminTopicsList)
