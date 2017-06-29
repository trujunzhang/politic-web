import Telescope from '../../index'
import React, {Component} from 'react'
import Posts from '../../../../lib/posts'
import {Link} from 'react-router'
import Users from '../../../../lib/users'
import {withRouter} from 'react-router';

class AppAdminTopicsTrending extends Component {

  constructor(props) {
    super(props);

    this.state = this.initialState = {
      // Edit
      isEdit: false,
    };
  }

  onGenerateTrendingTopics(e) {
    e.preventDefault();
    this.context.actions.call('topics.generate.trending.topics', (error, result) => {
    });
  }

  renderPreview() {
    return (
      <div id="post-body">
        <div className="wp-clearfix">
          <h3>Preview</h3>
          <div className="drag-instructions post-body-plain">
            <Telescope.components.AppWidgetTopics showTitle={false}/>
          </div>
          <div id="nav-menu-footer">
            <div className="major-publishing-actions wp-clearfix">
              <div className="publishing-action">
                <input type="submit" name="save_menu" id="save_menu_footer"
                       className="button button-primary menu-save"
                       onClick={this.onGenerateTrendingTopics.bind(this)}
                       value="Generate"/>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  render() {
    const {isEdit} = this.state;
    if (isEdit) {
      return (
        <div></div>
      )
    }
    return this.renderPreview();
  }
}

export default withRouter(AppAdminTopicsTrending)
