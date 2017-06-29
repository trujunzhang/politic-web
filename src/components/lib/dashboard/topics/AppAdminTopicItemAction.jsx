import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'
import Users from '../../../../lib/users'
import {withRouter} from 'react-router';

class AppAdminTopicItemAction extends Component {

  onActionApplyClick(actionType) {
    this.props.actionEvent(actionType, this.props.topic);
  }

  renderRowAction() {
    const {topic} = this.props;
    return (
      <div className="row-actions">
              <span className="edit">
                  <a onClick={this.onActionApplyClick.bind(this, (topic.active ? "inactive" : "active"))}>
                      {topic.active ? "inactive" : "active"}
                      </a>
                  |
              </span>
        <span className="edit">
                  <a onClick={this.onActionApplyClick.bind(this, "filter")}>Filter in trending</a>
                  |
              </span>
        <span className="trash">
                  <a onClick={this.onActionApplyClick.bind(this, "trash")} className="submitdelete">Trash</a>
              </span>
      </div>
    )
  }

  renderRowActionForFilter() {
    return (
      <div className="row-actions">
              <span className="trash">
                  <a onClick={this.onActionApplyClick.bind(this, "trash")} className="submitdelete">Trash</a>
                  |
              </span>
        <span className="published">
                  <a onClick={this.onActionApplyClick.bind(this, "publish")} className="published">Published</a>
              </span>
      </div>
    )
  }

  renderRowActionForTrash() {
    return (
      <div className="row-actions">
              <span className="untrash">
                  <a onClick={this.onActionApplyClick.bind(this, "restore")} className="untrash">Restore</a>
                  |
              </span>
        <span className="delete">
                  <a onClick={this.onActionApplyClick.bind(this, "delete_permanently")} className="delete">Delete Permanently</a>
                  |
              </span>

      </div>
    )
  }

  render() {
    const status = this.props.location.query.status;
    switch (status) {
      case "filter":
        return (
          <div>{this.renderRowActionForFilter()}</div>
        );
      case "trash":
        return (
          <div>{this.renderRowActionForTrash()}</div>
        );
      default:
        return (
          <div>{this.renderRowAction()}</div>
        )
    }

  }

}

export default withRouter(AppAdminTopicItemAction)
